import React from 'react';
import { TabId, BanGhiDiSan } from '../types';
import { HeritageMotif, BrocadeBorder } from '../components/HeritageMotif';
import { 
  BookOpen, 
  Bot, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  ArrowRight,
  Music,
  Users,
  Compass,
  AlertCircle
} from 'lucide-react';

interface TrangChuProps {
  onNavigate: (tab: TabId) => void;
  onSelectRecord: (recordId: string) => void;
  records: BanGhiDiSan[];
}

export const TrangChu: React.FC<TrangChuProps> = ({ 
  onNavigate, 
  onSelectRecord,
  records 
}) => {
  // Highlighted records
  const featuredRecords = records.filter(r => 
    ['THEN-DH-001', 'THEN-DH-006', 'THEN-DH-003', 'THEN-DH-007'].includes(r.maBanGhi)
  );

  return (
    <div className="space-y-12 pb-16 animate-in fade-in duration-300">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1E2D44] via-[#152132] to-[#0E1622] border border-[#D4A359]/30 shadow-2xl p-6 sm:p-10 md:p-14">
        {/* Subtle Tay brocade background decorative watermarks */}
        <div className="absolute -top-16 -right-16 opacity-10 pointer-events-none">
          <HeritageMotif type="dan-tinh" className="w-96 h-96" />
        </div>
        <div className="absolute -bottom-10 -left-10 opacity-10 pointer-events-none">
          <HeritageMotif type="brocade" className="w-72 h-72" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#382618]/90 border border-[#D4A359]/60 text-xs text-[#F3C77C] font-semibold tracking-wide">
            <Award className="w-4 h-4 text-[#D4A359]" />
            UNESCO Inscribed 2019 • Di sản văn hóa phi vật thể đại diện của nhân loại
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-heritage text-[#FAF7F2] tracking-tight leading-tight">
            HỒ SƠ SỐ THỰC HÀNH THEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3C77C] via-[#D4A359] to-[#E6BA6E]">
              CỘNG ĐỒNG NGƯỜI TÀY
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#D8CFC4] leading-relaxed">
            Hệ thống cơ sở dữ liệu số hóa, lưu trữ khoa học và diễn giải tri thức bản địa về <strong className="text-[#FAF7F2]">Thực hành Then của cộng đồng người Tày</strong> tại vùng văn hóa Việt Bắc. Trọng tâm nghiên cứu thực địa dự kiến tại khu vực <strong className="text-[#F3C77C]">Định Hóa, tỉnh Thái Nguyên</strong>.
          </p>

          <div className="p-3.5 rounded-xl bg-[#121A27]/80 border border-[#D4A359]/20 flex items-start space-x-3 text-xs sm:text-sm text-[#DFD8CC]">
            <AlertCircle className="w-5 h-5 text-[#D4A359] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#FAF7F2]">Nguyên tắc nghiên cứu chuẩn mực Đề tài B01:</strong> Toàn bộ dữ liệu được trích xuất từ tài liệu di sản quốc gia và nguồn điền dã có thẩm định. Hệ thống không sử dụng hình ảnh AI giả mạo nghệ nhân, không bịa thông tin và phân định rõ ràng giữa Then Tày và các cộng đồng khác.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate('thu-vien')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4A359] to-[#B38743] hover:from-[#E6BA6E] hover:to-[#C5943B] text-[#121927] font-bold text-sm flex items-center space-x-2 shadow-lg shadow-[#D4A359]/20 hover:scale-[1.02] transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Khám phá Thư viện di sản</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('tro-ly-ai')}
              className="px-5 py-3 rounded-xl bg-[#172436] hover:bg-[#203148] text-[#EDE7DE] border border-[#D4A359]/40 font-semibold text-sm flex items-center space-x-2 hover:border-[#D4A359] transition-all"
            >
              <Bot className="w-4 h-4 text-[#D4A359]" />
              <span>Hỏi đáp Trợ lý AI Gemini</span>
            </button>
          </div>
        </div>

        <BrocadeBorder className="mt-8" />
      </section>

      {/* 3 CORE PILLARS: THỰC HÀNH THEN - CỘNG ĐỒNG NGƯỜI TÀY - VÙNG VĂN HÓA VIỆT BẮC */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#D4A359]">
            Trọng tâm nhận diện di sản
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif-heritage text-[#FAF7F2]">
            Không Gian Văn Hóa & Tín Ngưỡng Then Tày
          </h2>
          <p className="text-xs sm:text-sm text-[#A0AEC0]">
            Ba trụ cột căn bản hình thành nên giá trị nhân văn, nghệ thuật và xã hội của thực hành Then.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: Thực hành Then */}
          <div className="p-6 rounded-2xl bg-[#152030] border border-[#D4A359]/25 hover:border-[#D4A359]/60 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-[#2A1E14] border border-[#D4A359] p-2 flex items-center justify-center">
              <HeritageMotif type="lute" className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold font-serif-heritage text-[#FAF7F2] group-hover:text-[#F3C77C] transition-colors">
              1. Thực Hành Then Cổ Truyền
            </h3>
            <p className="text-xs sm:text-sm text-[#D8CFC4] leading-relaxed">
              Then (nghĩa là "Thiên" - Trời) là một loại hình diễn xướng tổng hợp độc đáo gồm ca hát, gảy đàn Tính tẩu, rung lắc xóc nhạc, múa thiêng và tụng lời cổ. Thầy Then đóng vai trò sứ giả kết nối thế giới con người trần gian với thế giới thần linh mường trời để cầu chúc phúc lộc, trị bệnh và bình an.
            </p>
            <div className="text-xs text-[#D4A359] font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UNESCO ghi danh ngày 12/12/2019</span>
            </div>
          </div>

          {/* Pillar 2: Cộng đồng người Tày */}
          <div className="p-6 rounded-2xl bg-[#152030] border border-[#D4A359]/25 hover:border-[#D4A359]/60 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-[#1A283D] border border-[#D4A359] p-2 flex items-center justify-center">
              <HeritageMotif type="clothing" className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold font-serif-heritage text-[#FAF7F2] group-hover:text-[#F3C77C] transition-colors">
              2. Cộng Đồng Người Tày
            </h3>
            <p className="text-xs sm:text-sm text-[#D8CFC4] leading-relaxed">
              Cộng đồng người Tày cư trú lâu đời bên các triền núi và thung lũng lúa nước màu mỡ. Đời sống tâm linh của người Tày gắn liền với ngôi nhà sàn truyền thống, trang phục vải bông nhuộm chàm giản dị mà thanh thoát, và hệ thống luân lý đạo hiếu tôn kính tổ tiên sâu sắc.
            </p>
            <div className="text-xs text-[#D4A359] font-medium flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>Chủ thể thực hành bền bỉ qua bao thế hệ</span>
            </div>
          </div>

          {/* Pillar 3: Vùng văn hóa Việt Bắc & Định Hóa */}
          <div className="p-6 rounded-2xl bg-[#152030] border border-[#D4A359]/25 hover:border-[#D4A359]/60 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-[#261D15] border border-[#D4A359] p-2 flex items-center justify-center">
              <HeritageMotif type="brocade" className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold font-serif-heritage text-[#FAF7F2] group-hover:text-[#F3C77C] transition-colors">
              3. Vùng Văn Hóa Việt Bắc & Định Hóa
            </h3>
            <p className="text-xs sm:text-sm text-[#D8CFC4] leading-relaxed">
              Việt Bắc là vùng nôi di sản của các tỉnh Thái Nguyên, Cao Bằng, Bắc Kạn, Lạng Sơn, Tuyên Quang, Hà Giang. Khu vực nghiên cứu dự kiến của đề tài là huyện Định Hóa (Thái Nguyên) - vùng đất ATK cách mạng lịch sử, nơi các nghệ nhân Then Tày còn gìn giữ nguyên vẹn các bài cúng chữ Nôm Tày.
            </p>
            <div className="text-xs text-[#D4A359] font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Cần xác minh xã hiện hành trước khi nhập chính thức</span>
            </div>
          </div>

        </div>
      </section>

      {/* HIGHLIGHTED HERITAGE RECORDS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#D4A359]">
              Tư liệu tiêu biểu đã lập mã
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-heritage text-[#FAF7F2]">
              Hồ Sơ Nổi Bật Trong Cơ Sở Dữ Liệu
            </h2>
          </div>
          <button
            onClick={() => onNavigate('thu-vien')}
            className="text-xs sm:text-sm font-semibold text-[#F3C77C] hover:text-[#FAF7F2] flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Xem toàn bộ 15 bản ghi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredRecords.map((item) => (
            <div
              key={item.maBanGhi}
              onClick={() => {
                onSelectRecord(item.maBanGhi);
                onNavigate('chi-tiet');
              }}
              className="p-5 rounded-xl bg-[#131C2A] border border-[#D4A359]/20 hover:border-[#D4A359] hover:bg-[#182436] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#382618] text-[#F3C77C] border border-[#D4A359]/40">
                    {item.maBanGhi}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#1C283B] text-[#A0AEC0]">
                    {item.loaiHinh}
                  </span>
                </div>

                <div className="w-14 h-14 mx-auto my-2 rounded-xl bg-[#0F1723] border border-white/10 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                  <HeritageMotif 
                    type={item.hinhAnh?.svgBieuTrung || 'brocade'} 
                    className="w-10 h-10" 
                  />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#FAF7F2] group-hover:text-[#F3C77C] transition-colors line-clamp-1">
                    {item.tenDanhMuc}
                  </h4>
                  <p className="text-xs text-[#D4A359] italic line-clamp-1">
                    Tên bản địa: {item.tenBanDia}
                  </p>
                </div>

                <p className="text-xs text-[#A0AEC0] line-clamp-3 leading-relaxed">
                  {item.moTaChiTiet}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8C9AA8]">
                <span>{item.congDongThucHanh}</span>
                <span className="text-[#D4A359] group-hover:translate-x-1 transition-transform">
                  Chi tiết →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SCIENTIFIC METRICS & ETHICAL COMMITMENT */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#20150E] via-[#1B2535] to-[#121A28] border border-[#D4A359]/30 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#101825]/80 border border-white/5 space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#F3C77C] font-mono">15+</div>
            <div className="text-xs text-[#D8CFC4]">Bản ghi thật được kiểm chứng</div>
          </div>
          <div className="p-4 rounded-xl bg-[#101825]/80 border border-white/5 space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#D4A359] font-mono">5</div>
            <div className="text-xs text-[#D8CFC4]">Phân loại hình thái di sản</div>
          </div>
          <div className="p-4 rounded-xl bg-[#101825]/80 border border-white/5 space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#F3C77C] font-mono">100%</div>
            <div className="text-xs text-[#D8CFC4]">Minh bạch nguồn tư liệu gốc</div>
          </div>
          <div className="p-4 rounded-xl bg-[#101825]/80 border border-white/5 space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#D4A359] font-mono">B01</div>
            <div className="text-xs text-[#D8CFC4]">Đề tài Thực tập Đợt 15</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10 text-xs text-[#A0AEC0]">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#D4A359]" />
            <span>Cam kết tuân thủ Đạo đức nghiên cứu Nhân học & Công ước UNESCO 2003</span>
          </div>
          <div className="text-[#D8CFC4]">
            Người thực hiện: <strong className="text-[#FAF7F2]">Phạm Giang Nam</strong> (PH56715) • Nhóm 1
          </div>
        </div>
      </section>

    </div>
  );
};
