import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

const DISAN_FILE_PATH = path.join(__dirname, 'disan.json');

// Helper to read disan data
function getDiSanData() {
  try {
    if (fs.existsSync(DISAN_FILE_PATH)) {
      const data = fs.readFileSync(DISAN_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading disan.json:', err);
  }
  return [];
}

// Helper to save disan data
function saveDiSanData(data: any[]) {
  fs.writeFileSync(DISAN_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// API: Get all heritage records
app.get('/api/disan', (_req: Request, res: Response) => {
  const records = getDiSanData();
  res.json({ success: true, total: records.length, data: records });
});

// API: Add or update a record
app.post('/api/disan', (req: Request, res: Response) => {
  try {
    const newRecord = req.body;
    if (!newRecord.maBanGhi || !newRecord.tenDanhMuc) {
      return res.status(400).json({ success: false, message: 'Thiếu mã bản ghi hoặc tên danh mục di sản.' });
    }

    const records = getDiSanData();
    const existingIndex = records.findIndex((r: any) => r.maBanGhi === newRecord.maBanGhi);
    
    if (existingIndex >= 0) {
      records[existingIndex] = {
        ...records[existingIndex],
        ...newRecord,
        ngayCapNhat: new Date().toISOString().split('T')[0],
      };
    } else {
      records.push({
        ...newRecord,
        ngayTao: new Date().toISOString().split('T')[0],
        ngayCapNhat: new Date().toISOString().split('T')[0],
      });
    }

    saveDiSanData(records);
    return res.json({ success: true, message: 'Lưu bản ghi di sản thành công.', record: newRecord });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Lỗi máy chủ nội bộ.' });
  }
});

// API: Gemini Chatbot for Then Tay Knowledge
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'Nội dung câu hỏi không hợp lệ.' });
    }

    const records = getDiSanData();

    // Prepare system instruction with the entire verified disan.json data as the sole ground truth
    const systemInstruction = `Bạn là Trợ lý AI chuyên biệt về HỒ SƠ SỐ THỰC HÀNH THEN – CỘNG ĐỒNG NGƯỜI TÀY (Đề tài B01, Chương trình Thực tập sinh Đợt 15 - FPT Polytechnic & IMTA TECH).

DƯỚI ĐÂY LÀ TOÀN BỘ KHO DỮ LIỆU ĐÃ ĐƯỢC LẬP TRONG HỆ THỐNG:
${JSON.stringify(records, null, 2)}

CÁC NGUYÊN TẮC BẮT BUỘC TUÂN THỦ NGHIÊM NGẶT:
1. CHỈ SỬ DỤNG DỮ LIỆU TRONG HỆ THỐNG ĐÃ CUNG CẤP Ở TRÊN ĐỂ TRẢ LỜI CÂU HỎI.
2. NẾU THÔNG TIN KHÔNG CÓ TRONG KHO DỮ LIỆU TRÊN: Bắt buộc phải thông báo rõ: "Hiện tại hệ thống chưa có tư liệu về vấn đề này. Theo nguyên tắc bảo tồn và đạo đức nghiên cứu di sản Đề tài B01, trợ lý không tự suy đoán hoặc cung cấp thông tin chưa qua kiểm chứng từ cộng đồng và nguồn tư liệu thực tế."
3. MỖI CÂU TRẢ LỜI CÓ THÔNG TIN BẮT BUỘC PHẢI TRÍCH DẪN RÕ RÀNG:
   - Mã bản ghi (ví dụ: [THEN-DH-001], [THEN-DH-006]...)
   - Tên danh mục và Tên bản địa tiếng Tày.
   - Nguồn tư liệu đã kiểm chứng.
4. TUYỆT ĐỐI KHÔNG TỰ SUY ĐOÁN, KHÔNG BỊA ĐẶT THÔNG TIN, KHÔNG BỊA TÊN NGHỆ NHÂN, KHÔNG BỊA ĐỊA DANH.
5. TUYỆT ĐỐI KHÔNG GÁN THÔNG TIN CỦA NGƯỜI NÙNG HOẶC NGƯỜI THÁI SANG CỘNG ĐỒNG NGƯỜI TÀY. Chỉ nói về Then của người Tày (vùng văn hóa Việt Bắc, trọng tâm nghiên cứu huyện Định Hóa, Thái Nguyên).
6. Nêu rõ trạng thái cảnh báo nếu bản ghi được tham chiếu có "daKiemChungNguoiCungCap": false hoặc đang chờ khảo sát xã hiện hành tại Định Hóa.
7. Giữ văn phong tôn trọng, học thuật, nhân văn và mang bản sắc văn hóa dân tộc Tày Việt Bắc. Sử dụng tiếng Việt chuẩn UTF-8.`;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback if API key is not yet configured in environment: perform strict rule-based search on disan.json
      console.warn('GEMINI_API_KEY is not set. Using local semantic matching fallback.');
      const query = message.toLowerCase();
      const matched = records.filter((r: any) => 
        r.tenDanhMuc.toLowerCase().includes(query) ||
        r.tenBanDia.toLowerCase().includes(query) ||
        r.loaiHinh.toLowerCase().includes(query) ||
        r.moTaChiTiet.toLowerCase().includes(query) ||
        r.maBanGhi.toLowerCase().includes(query)
      );

      if (matched.length === 0) {
        return res.json({
          success: true,
          answer: 'Hệ thống chưa có tư liệu về nội dung này. Theo quy định Đề tài B01, hệ thống không tự suy đoán hay bịa thông tin ngoài cơ sở dữ liệu đã kiểm chứng.',
          sources: [],
          disclaimer: 'Cảnh báo: Dữ liệu chưa bao hàm nội dung truy vấn.'
        });
      }

      const topMatch = matched[0];
      const answer = `Dựa vào tư liệu đã được lập mã [${topMatch.maBanGhi}] - "${topMatch.tenDanhMuc}" (${topMatch.tenBanDia}):
- Loại hình: ${topMatch.loaiHinh}
- Cộng đồng thực hành: ${topMatch.congDongThucHanh}
- Địa danh: ${topMatch.diaDanhHienNay}
- Mô tả: ${topMatch.moTaChiTiet}
- Bối cảnh diễn xướng: ${topMatch.boiCanhDienXuong}
- Nguồn tư liệu: ${topMatch.nguonTuLieu}
${!topMatch.daKiemChungNguoiCungCap ? '\n(Lưu ý: Bản ghi này đang trong tiến trình xin thẩm định xác nhận của người cung cấp tư liệu).' : ''}`;

      return res.json({
        success: true,
        answer,
        sources: matched.map((m: any) => ({
          maBanGhi: m.maBanGhi,
          tenDanhMuc: m.tenDanhMuc,
          nguonTuLieu: m.nguonTuLieu,
          daKiemChungNguoiCungCap: m.daKiemChungNguoiCungCap
        }))
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Build chat prompt
    let chatPrompt = `Câu hỏi của người dùng: "${message}"\n\nHãy trả lời nghiêm túc theo đúng 7 nguyên tắc trên.`;
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-4).map((h: any) => `${h.role === 'user' ? 'Người dùng' : 'Trợ lý'}: ${h.text}`).join('\n');
      chatPrompt = `Lịch sử trao đổi gần nhất:\n${recentHistory}\n\n${chatPrompt}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: chatPrompt,
      config: {
        systemInstruction,
      },
    });

    const replyText = response.text || 'Hệ thống chưa có tư liệu để trả lời câu hỏi này.';

    return res.json({
      success: true,
      answer: replyText,
    });
  } catch (err: any) {
    console.error('Error generating AI answer with Gemini, using grounded fallback:', err.message);

    try {
      const records = getDiSanData();
      const query = (req.body?.message || '').toLowerCase();
      const matched = records.filter((r: any) => 
        r.tenDanhMuc.toLowerCase().includes(query) ||
        r.tenBanDia.toLowerCase().includes(query) ||
        r.loaiHinh.toLowerCase().includes(query) ||
        r.moTaChiTiet.toLowerCase().includes(query) ||
        r.maBanGhi.toLowerCase().includes(query) ||
        (query.includes('đàn tính') && r.maBanGhi === 'THEN-DH-006') ||
        (query.includes('cấp sắc') && r.maBanGhi === 'THEN-DH-001') ||
        (query.includes('tàng bốc') && r.maBanGhi === 'THEN-DH-003') ||
        (query.includes('tàng nặm') && r.maBanGhi === 'THEN-DH-004') ||
        (query.includes('xóc') && r.maBanGhi === 'THEN-DH-007') ||
        (query.includes('cầu mùa') && r.maBanGhi === 'THEN-DH-013') ||
        (query.includes('cầu hoa') && r.maBanGhi === 'THEN-DH-005') ||
        (query.includes('mừng thọ') && r.maBanGhi === 'THEN-DH-010')
      );

      if (matched.length === 0) {
        return res.json({
          success: true,
          answer: 'Hệ thống chưa có tư liệu về nội dung này. Theo nguyên tắc nghiên cứu di sản Đề tài B01, hệ thống không tự suy đoán hoặc sáng tạo thông tin chưa qua kiểm chứng từ nguồn tư liệu thực tế.',
          sources: []
        });
      }

      const topMatch = matched[0];
      const answer = `Dựa trên dữ liệu đã kiểm chứng trong hệ thống [${topMatch.maBanGhi}] - "${topMatch.tenDanhMuc}" (Tên bản địa: ${topMatch.tenBanDia}):\n\n• Loại hình di sản: ${topMatch.loaiHinh}\n• Cộng đồng thực hành: ${topMatch.congDongThucHanh}\n• Địa danh: ${topMatch.diaDanhHienNay}\n• Mô tả chi tiết: ${topMatch.moTaChiTiet}\n• Bối cảnh diễn xướng: ${topMatch.boiCanhDienXuong}\n• Nguồn tư liệu: ${topMatch.nguonTuLieu}\n• Phạm vi sử dụng: ${topMatch.phamViSuDung}\n\n${!topMatch.daKiemChungNguoiCungCap ? '⚠️ Cảnh báo: Bản ghi này đang trong tiến trình chờ thẩm định văn bản đồng thuận từ người cung cấp tư liệu tại Định Hóa.' : '✓ Bản ghi đã được kiểm chứng nguồn tư liệu.'}`;

      return res.json({
        success: true,
        answer,
        sources: matched.map((m: any) => ({
          maBanGhi: m.maBanGhi,
          tenDanhMuc: m.tenDanhMuc,
          nguonTuLieu: m.nguonTuLieu
        }))
      });
    } catch (fallbackErr: any) {
      return res.status(500).json({
        success: false,
        message: 'Không thể xử lý câu hỏi lúc này.',
        error: fallbackErr.message
      });
    }
  }
});

// Setup dev Vite middleware or static prod serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Heritage Portal Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
