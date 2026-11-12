import React, { useState, useRef, useEffect } from 'react';
import { BanGhiDiSan, ChatMessage, TabId } from '../types';
import { HeritageMotif } from '../components/HeritageMotif';
import { 
  Bot, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  ShieldAlert, 
  HelpCircle, 
  RotateCcw, 
  CheckCircle2,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface TroLyAiGeminiProps {
  records: BanGhiDiSan[];
  onSelectRecord: (recordId: string) => void;
  onNavigate: (tab: TabId) => void;
}

export const TroLyAiGemini: React.FC<TroLyAiGeminiProps> = ({ 
  records,
  onSelectRecord,
  onNavigate
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Kính chào quý vị và các bạn! Tôi là Trợ lý AI chuyên biệt về HỒ SƠ SỐ THỰC HÀNH THEN – CỘNG ĐỒNG NGƯỜI TÀY (Đề tài B01, Chương trình Thực tập sinh Đợt 15).\n\nTôi được thiết lập để CHỈ TRẢ LỜI DỰA TRÊN 15 TƯ LIỆU ĐÃ ĐƯỢC KIỂM CHỨNG trong hệ thống. Mọi câu trả lời đều trích dẫn Mã bản ghi và Nguồn tư liệu. Nếu câu hỏi nằm ngoài phạm vi dữ liệu đã lưu trữ, tôi sẽ thông báo chưa có tư liệu và tuyệt đối không tự suy đoán.',
      timestamp: 'Ngay bây giờ',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions
  const suggestedQuestions = [
    'Đàn tính tẩu của người Tày có cấu tạo và kỹ thuật gảy như thế nào?',
    'Lễ Lẩu Then Cấp sắc (Pụt Lẩu) của người Tày mang ý nghĩa gì?',
    'Khúc hát Then Tàng Bốc và Tàng Nặm mô tả chặng đường nào?',
    'Vì sao cần phân biệt Then của người Tày với Then của người Nùng và người Thái?',
    'Chùm xóc nhạc có vai trò gì trong dàn nhạc Then Tày?',
    'Người Tày tại Định Hóa có làn điệu Then nào cầu mùa màng?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const question = (textToSend || inputValue).trim();
    if (!question || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: question,
          history: messages.slice(-4).map(m => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Lỗi phản hồi máy chủ: ' + response.statusText);
      }

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.answer || 'Hệ thống chưa có tư liệu để trả lời câu hỏi này.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Lỗi khi gọi API chat:', err);

      // Graceful strictly-grounded local fallback matching
      const q = question.toLowerCase();
      const matched = records.filter(r => 
        r.tenDanhMuc.toLowerCase().includes(q) ||
        r.tenBanDia.toLowerCase().includes(q) ||
        r.loaiHinh.toLowerCase().includes(q) ||
        r.moTaChiTiet.toLowerCase().includes(q) ||
        r.maBanGhi.toLowerCase().includes(q)
      );

      let fallbackText = '';
      if (matched.length > 0) {
        const top = matched[0];
        fallbackText = `Dựa vào cơ sở dữ liệu đã lập mã [${top.maBanGhi}] - "${top.tenDanhMuc}" (Tên bản địa: ${top.tenBanDia}):\n\n• Loại hình: ${top.loaiHinh}\n• Cộng đồng: ${top.congDongThucHanh}\n• Địa danh: ${top.diaDanhHienNay}\n• Mô tả: ${top.moTaChiTiet}\n• Bối cảnh diễn xướng: ${top.boiCanhDienXuong}\n• Nguồn tư liệu: ${top.nguonTuLieu}\n\n(Lưu ý: Câu trả lời được đối chiếu trực tiếp từ kho lưu trữ disan.json theo nguyên tắc nghiên cứu Đề tài B01).`;
      } else {
        fallbackText = `Hiện tại hệ thống chưa có tư liệu về nội dung "${question}".\n\nTheo nguyên tắc nghiên cứu và đạo đức số hóa di sản của Đề tài B01 (FPT Polytechnic & IMTA TECH), trợ lý không tự suy đoán hoặc cung cấp thông tin chưa qua kiểm chứng từ nguồn tư liệu chính thức.`;
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        text: 'Cuộc hội thoại đã được đặt lại. Quý vị có thể đặt câu hỏi mới về Thực hành Then của người Tày tại vùng văn hóa Việt Bắc và Định Hóa, Thái Nguyên.',
        timestamp: 'Vừa xong',
      }
    ]);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Page Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1A2638] via-[#241A12] to-[#111A27] border border-[#D4A359]/30 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#382618] border border-[#D4A359]/50 text-xs text-[#F3C77C] font-semibold">
            <Bot className="w-4 h-4 text-[#D4A359]" />
            Trợ lý AI Gemini 3.8 Flash • Cơ chế bảo mật máy chủ
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#9AE6B4] bg-[#14261C] px-3 py-1 rounded-full border border-[#48BB78]/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#48BB78]" />
            <span>Chỉ trả lời từ dữ liệu đã kiểm chứng</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold font-serif-heritage text-[#FAF7F2]">
          Trợ Lý AI Tra Cứu Thực Hành Then Tày
        </h1>

        <p className="text-xs sm:text-sm text-[#D8CFC4] leading-relaxed max-w-3xl">
          Hỏi đáp trực tiếp với trợ lý thông minh được đào tạo trên kho dữ liệu di sản <strong className="text-[#FAF7F2]">disan.json</strong>. Trợ lý tuân thủ nghiêm ngặt nguyên tắc: trích dẫn mã bản ghi, không bịa thông tin, không gán văn hóa người Nùng hoặc người Thái sang người Tày, và thông báo rõ khi chưa có dữ liệu.
        </p>

        {/* 4 Strict Ethical Guidelines Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2 text-xs">
          <div className="p-2.5 rounded-lg bg-[#0F1724]/90 border border-white/5 text-[#D8CFC4]">
            <strong className="text-[#F3C77C] block mb-0.5">1. Trích dẫn bản ghi:</strong>
            Mọi thông tin đều gắn mã [THEN-DH-xxx].
          </div>
          <div className="p-2.5 rounded-lg bg-[#0F1724]/90 border border-white/5 text-[#D8CFC4]">
            <strong className="text-[#F3C77C] block mb-0.5">2. Không bịa thông tin:</strong>
            Tuyệt đối không suy đoán ngoài dữ liệu thật.
          </div>
          <div className="p-2.5 rounded-lg bg-[#0F1724]/90 border border-white/5 text-[#D8CFC4]">
            <strong className="text-[#F3C77C] block mb-0.5">3. Đúng chủ thể Tày:</strong>
            Không nhầm lẫn Then Tày với Nùng hay Thái.
          </div>
          <div className="p-2.5 rounded-lg bg-[#0F1724]/90 border border-white/5 text-[#D8CFC4]">
            <strong className="text-[#F3C77C] block mb-0.5">4. Cảnh báo thiếu nguồn:</strong>
            Minh bạch trạng thái thẩm định thực địa.
          </div>
        </div>
      </div>

      {/* CHAT CONTAINER */}
      <div className="rounded-2xl bg-[#121A26] border border-[#D4A359]/25 shadow-2xl overflow-hidden flex flex-col h-[620px]">
        
        {/* Chat Header Bar */}
        <div className="px-5 py-3.5 bg-[#0E1521] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#2A1D13] border border-[#D4A359] p-1 flex items-center justify-center">
              <HeritageMotif type="dan-tinh" className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#FAF7F2] flex items-center gap-1.5">
                <span>Then Tày AI Knowledge Agent</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="text-[10px] text-[#A0AEC0]">Grounded on 15 verified records (Định Hóa, Thái Nguyên)</div>
            </div>
          </div>

          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-lg text-xs text-[#A0AEC0] hover:text-[#FAF7F2] hover:bg-[#1A2637] flex items-center gap-1 transition-colors"
            title="Làm mới cuộc trò chuyện"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Đặt lại</span>
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border text-xs font-bold ${
                  isUser 
                    ? 'bg-[#382618] border-[#D4A359] text-[#F3C77C]' 
                    : 'bg-[#182638] border-[#D4A359]/60 text-[#D4A359]'
                }`}>
                  {isUser ? 'Bạn' : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-md ${
                  isUser
                    ? 'bg-gradient-to-r from-[#4A3525] to-[#382618] text-[#FAF7F2] border border-[#D4A359]/50 rounded-tr-none'
                    : 'bg-[#182436] text-[#EDE7DE] border border-white/10 rounded-tl-none'
                }`}>
                  <p>{msg.text}</p>
                  <div className={`text-[10px] mt-2 text-right ${isUser ? 'text-[#D8CFC4]/70' : 'text-[#8C9AA8]'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#182638] border border-[#D4A359]/60 text-[#D4A359] flex items-center justify-center">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-[#182436] border border-white/10 rounded-tl-none text-xs text-[#D4A359] flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A359] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#D4A359] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#D4A359] animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[#D8CFC4] ml-2">Đang tra cứu cơ sở dữ liệu Then Tày...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Shelf */}
        <div className="px-4 py-2.5 bg-[#0E1521] border-t border-white/5 overflow-x-auto flex items-center gap-2">
          <span className="text-[11px] text-[#D4A359] font-semibold shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Gợi ý câu hỏi:
          </span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="text-[11px] px-2.5 py-1 rounded-md bg-[#162232] hover:bg-[#203148] text-[#D8CFC4] hover:text-[#FAF7F2] border border-white/5 whitespace-nowrap transition-colors shrink-0 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-[#0B121C] border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Đặt câu hỏi về nghi lễ, làn điệu, đàn tính Then Tày..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#131C2A] border border-white/15 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#8C9AA8] focus:outline-none focus:border-[#D4A359]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A359] to-[#B38743] hover:from-[#F3C77C] hover:to-[#D4A359] text-[#121927] font-bold text-xs sm:text-sm flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all shrink-0"
            >
              <span>Gửi</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="text-[10px] text-center text-[#8C9AA8] mt-2">
            Trợ lý AI chỉ phản hồi thông tin có trong hệ thống và tuân thủ đạo đức nghiên cứu văn hóa dân tộc.
          </div>
        </div>

      </div>

    </div>
  );
};
