import React from 'react';
import { HeritageMotif, BrocadeBorder } from '../components/HeritageMotif';
import { 
  User, 
  GraduationCap, 
  Award, 
  Target, 
  Heart, 
  ShieldCheck, 
  Building, 
  Calendar,
  CheckCircle2,
  MapPin,
  Sparkles
} from 'lucide-react';

export const GioiThieu: React.FC = () => {
  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#172336] via-[#24170F] to-[#101928] border border-[#D4A359]/30 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#382618] border border-[#D4A359]/50 text-xs text-[#F3C77C] font-semibold">
          <GraduationCap className="w-4 h-4 text-[#D4A359]" />
          Chương trình Thực tập sinh Đợt 15 • Đề tài B01
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-heritage text-[#FAF7F2]">
          Giới Thiệu Dự Án & Người Thực Hiện
        </h1>

        <p className="text-xs sm:text-sm text-[#D8CFC4] leading-relaxed max-w-3xl">
          Sản phẩm thực tập chuyên ngành công nghệ và chuyển đổi số văn hóa di sản, hướng tới xây dựng một hệ thống lưu trữ khoa học, chuẩn mực và nhân văn về thực hành Then của cộng đồng người Tày vùng Việt Bắc.
        </p>
      </div>

      {/* STUDENT & PROGRAM PROFILE (Strictly required in prompt) */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#142030] border-2 border-[#D4A359] shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#422B1D] to-[#172336] border-2 border-[#D4A359] p-3 flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-[#F3C77C]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#D4A359] uppercase tracking-wider block">
                Người thực hiện dự án
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-heritage text-[#FAF7F2]">
                Phạm Giang Nam
              </h2>
              <div className="text-xs sm:text-sm text-[#F3C77C] font-mono mt-0.5">
                Mã sinh viên: <strong className="text-[#FAF7F2]">PH56715</strong> • Nhóm 1
              </div>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-[#2A1D13] border border-[#D4A359]/60 text-xs text-[#F3C77C] font-bold text-center self-start sm:self-auto">
            Dự án xã hội phi lợi nhuận
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#0F1724] border border-white/5 space-y-1">
            <span className="text-[#8C9AA8] block">Chương trình đào tạo:</span>
            <span className="font-semibold text-[#FAF7F2] text-sm">Chương trình Thực tập sinh Đợt 15</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0F1724] border border-white/5 space-y-1">
            <span className="text-[#8C9AA8] block">Đơn vị phối hợp:</span>
            <span className="font-semibold text-[#FAF7F2] text-sm">FPT Polytechnic & IMTA TECH</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0F1724] border border-white/5 space-y-1">
            <span className="text-[#8C9AA8] block">Mã số đề tài:</span>
            <span className="font-semibold text-[#F3C77C] text-sm font-mono">Đề tài B01</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1724] border border-white/5 flex items-center space-x-3 text-xs text-[#DFD8CC]">
          <MapPin className="w-4 h-4 text-[#D4A359] shrink-0" />
          <span>
            <strong className="text-[#FAF7F2]">Phạm vi nghiên cứu dự kiến:</strong> Khu vực Định Hóa, tỉnh Thái Nguyên (Cần xác minh xã hiện hành trước khi nhập dữ liệu chính thức theo quy trình thẩm định).
          </span>
        </div>
      </section>

      {/* PROJECT OBJECTIVE & SIGNIFICANCE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Mục tiêu dự án */}
        <div className="p-6 rounded-2xl bg-[#131C2A] border border-[#D4A359]/25 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#3A281A] border border-[#D4A359] p-2 flex items-center justify-center">
            <Target className="w-6 h-6 text-[#D4A359]" />
          </div>
          <h3 className="text-lg font-bold font-serif-heritage text-[#FAF7F2]">
            Mục Tiêu Xây Dựng Nền Tảng
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#D8CFC4] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A359] mt-2 shrink-0"></span>
              <span><strong>Số hóa chuẩn mực:</strong> Lưu trữ có hệ thống các làn điệu, nghi lễ, nhạc cụ và tri thức Then Tày theo chuẩn siêu dữ liệu di sản văn hóa phi vật thể.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A359] mt-2 shrink-0"></span>
              <span><strong>Phục vụ cộng đồng rộng rãi:</strong> Hỗ trợ người Tày, nghệ nhân Then, học sinh, sinh viên, nhà nghiên cứu văn hóa và khách tham quan tiếp cận tri thức chân xác mọi lúc trên thiết bị di động.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A359] mt-2 shrink-0"></span>
              <span><strong>Ứng dụng Trí tuệ nhân tạo có kiểm soát:</strong> Tích hợp Trợ lý AI Gemini với nguyên tắc chỉ trả lời dựa trên dữ liệu thật, trích dẫn bản ghi và không tự suy đoán.</span>
            </li>
          </ul>
        </div>

        {/* Ý nghĩa bảo tồn */}
        <div className="p-6 rounded-2xl bg-[#131C2A] border border-[#D4A359]/25 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#1A283D] border border-[#D4A359] p-2 flex items-center justify-center">
            <Heart className="w-6 h-6 text-[#D4A359]" />
          </div>
          <h3 className="text-lg font-bold font-serif-heritage text-[#FAF7F2]">
            Ý Nghĩa Bảo Tồn Văn Hóa Then
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#D8CFC4] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A359] mt-2 shrink-0"></span>
              <span><strong>Gìn giữ bản sắc cội nguồn:</strong> Then là linh hồn tinh thần của người Tày; việc số hóa giúp ngăn ngừa nguy cơ mai một khi các nghệ nhân cao tuổi dần thưa vắng.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A359] mt-2 shrink-0"></span>
              <span><strong>Bảo vệ Công ước UNESCO 2003:</strong> Nâng cao năng lực tự nhận thức và bảo tồn di sản của cộng đồng chủ thể văn hóa bản địa.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A359] mt-2 shrink-0"></span>
              <span><strong>Lan tỏa giá trị nhân văn:</strong> Đề cao đạo lý 'uống nước nhớ nguồn', tình yêu thiên nhiên, đạo hiếu gia đình và sự cố kết cộng đồng làng bản.</span>
            </li>
          </ul>
        </div>

      </section>

      {/* RESEARCH COMMITMENT & NEXT PHASES */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#101825] border border-[#D4A359]/25 space-y-4">
        <h3 className="text-base font-bold font-serif-heritage text-[#FAF7F2] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#D4A359]" />
          Lộ Trình Phát Triển & Hoàn Thiện Thực Địa (Đề tài B01)
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-[#D8CFC4] leading-relaxed">
          <p>
            Hiện tại, hệ thống đã hoàn thiện cấu trúc dữ liệu khoa học độc lập trong file <strong className="text-[#FAF7F2] font-mono">disan.json</strong> với 15 bản ghi thật chuẩn xác được đối chiếu từ hồ sơ quốc gia và công trình nghiên cứu xuất bản.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-[#162232] border border-white/5">
              <div className="font-bold text-[#F3C77C] mb-1">Giai đoạn 1 (Đã hoàn tất):</div>
              <div>Xây dựng nền tảng số hóa 6 trang chức năng, thiết kế giao diện văn hóa Việt Bắc, tích hợp AI Gemini bảo mật phía server.</div>
            </div>
            <div className="p-3 rounded-lg bg-[#162232] border border-white/5">
              <div className="font-bold text-[#F3C77C] mb-1">Giai đoạn 2 (Đang tiến hành):</div>
              <div>Xác minh các xã hiện hành tại Định Hóa, rà soát phân giới hành chính và đối chiếu hồ sơ nghệ nhân tại địa bàn.</div>
            </div>
            <div className="p-3 rounded-lg bg-[#162232] border border-white/5">
              <div className="font-bold text-[#F3C77C] mb-1">Giai đoạn 3 (Nghiệm thu):</div>
              <div>Ký kết biên bản chấp thuận tiếp cận tư liệu của người cung cấp, cập nhật bổ sung bản ghi âm và hình ảnh tư liệu được phép công bố.</div>
            </div>
          </div>
        </div>
      </section>

      <BrocadeBorder />
    </div>
  );
};
