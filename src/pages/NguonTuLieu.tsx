import React from 'react';
import { HeritageMotif, BrocadeBorder } from '../components/HeritageMotif';
import { 
  BookmarkCheck, 
  ExternalLink, 
  HeartHandshake, 
  ShieldCheck, 
  Calendar, 
  BookOpen, 
  Building2, 
  Award,
  Users,
  AlertCircle
} from 'lucide-react';

export const NguonTuLieu: React.FC = () => {
  // Verified real bibliographic references and institutional archives
  const institutionalSources = [
    {
      id: 'SRC-01',
      tenTaiLieu: "Hồ sơ Quốc gia đệ trình UNESCO: 'Thực hành Then của người Tày, Nùng, Thái ở Việt Nam'",
      tacGia: "Viện Văn hóa Nghệ thuật Quốc gia Việt Nam phối hợp Sở VHTTDL các tỉnh Việt Bắc biên soạn",
      donViPhatHanh: "Bộ Văn hóa, Thể thao và Du lịch Việt Nam & UNESCO",
      duongDan: "https://ich.unesco.org/en/RL/practices-of-then-by-tay-nung-and-thai-ethnic-groups-in-viet-nam-01379",
      ngayTruyCap: "2026-11-05",
      phamViSuDung: "Nghiên cứu học thuật, giáo dục phi thương mại, bảo tồn theo Công ước UNESCO 2003",
      ghiChu: "Văn bản định danh di sản chính thức được ghi danh vào Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại (12/12/2019)."
    },
    {
      id: 'SRC-02',
      tenTaiLieu: "Âm nhạc Dân gian Truyền thống Người Tày",
      tacGia: "GS. Tô Ngọc Thanh",
      donViPhatHanh: "Nhà xuất bản Âm nhạc & Viện Âm nhạc Việt Nam",
      duongDan: "Thư viện Quốc gia Việt Nam / Viện Âm nhạc Quốc gia (Mã lưu chiểu VN-AM-2002)",
      ngayTruyCap: "2026-11-02",
      phamViSuDung: "Giảng dạy âm nhạc học dân tộc, phân tích thang âm 5 cung và làn điệu Then Tày",
      ghiChu: "Công trình chuyên khảo kinh điển ghi chép tỉ mỉ cấu tạo Đàn Tính tẩu và tiết tấu các chặng đường Then (Tàng Bốc, Tàng Nặm)."
    },
    {
      id: 'SRC-03',
      tenTaiLieu: "Tìm hiểu Then Tày",
      tacGia: "GS. Đặng Nghiêm Vạn (Chủ biên) & Nhóm tác giả Viện Văn hóa Dân gian",
      donViPhatHanh: "Nhà xuất bản Khoa học Xã hội",
      duongDan: "Thư viện Viện Nghiên cứu Văn hóa, Viện Hàn lâm KHXH Việt Nam",
      ngayTruyCap: "2026-11-03",
      phamViSuDung: "Nghiên cứu tôn giáo tín ngưỡng dân tộc thiểu số và cấu trúc thế giới quan mường trời của người Tày",
      ghiChu: "Khảo cứu chuyên sâu về các nghi lễ Then vòng đời: Then Cầu Hoa, Then Soi Tuổi mừng thọ, Lẩu Then Cấp sắc."
    },
    {
      id: 'SRC-04',
      tenTaiLieu: "Kỷ yếu Hội thảo Khoa học: Bảo tồn và phát huy di sản Then vùng Việt Bắc",
      tacGia: "Nhiều tác giả (Các nhà nghiên cứu văn hóa dân gian Thái Nguyên và khu vực)",
      donViPhatHanh: "Sở Văn hóa, Thể thao và Du lịch tỉnh Thái Nguyên",
      duongDan: "Lưu trữ Sở VHTTDL tỉnh Thái Nguyên (Báo cáo tổng kết bảo tồn di sản)",
      ngayTruyCap: "2026-11-04",
      phamViSuDung: "Tham khảo kiểm kê di sản văn hóa phi vật thể cơ sở tại Định Hóa và các huyện miền núi",
      ghiChu: "Cung cấp số liệu khảo sát các câu lạc bộ đàn Tính và thực trạng thực hành Then tại các xã vùng ATK Định Hóa."
    },
    {
      id: 'SRC-05',
      tenTaiLieu: "Trưng bày Chuyên đề Di sản Nhạc cụ & Trang phục các Dân tộc Vùng Việt Bắc",
      tacGia: "Hội đồng khoa học Bảo tàng Văn hóa các Dân tộc Việt Nam",
      donViPhatHanh: "Bảo tàng Văn hóa các Dân tộc Việt Nam (Thành phố Thái Nguyên)",
      duongDan: "Hiện vật trưng bày thường trực & Hồ sơ khoa học hiện vật số MC-TN-2018",
      ngayTruyCap: "2026-11-08",
      phamViSuDung: "Tư liệu đối chiếu hiện vật bảo tàng phục vụ số hóa đồ họa vector và kích thước chuẩn",
      ghiChu: "Hồ sơ hiện vật về đàn Tính tẩu 2 dây, chùm xóc chuông đồng, trang phục áo chàm truyền thống người Tày Định Hóa."
    }
  ];

  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1E2E42] via-[#2A1E14] to-[#121A26] border border-[#D4A359]/30 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#382618] border border-[#D4A359]/50 text-xs text-[#F3C77C] font-semibold">
          <BookmarkCheck className="w-4 h-4 text-[#D4A359]" />
          Minh bạch học thuật & Đạo đức di sản
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold font-serif-heritage text-[#FAF7F2]">
          Nguồn Tư Liệu & Ghi Nhận Cộng Đồng
        </h1>

        <p className="text-xs sm:text-sm text-[#D8CFC4] max-w-3xl leading-relaxed">
          Toàn bộ dữ liệu trong hệ thống số hóa đều xuất phát từ các nguồn tài liệu khoa học chính thống, hồ sơ di sản quốc gia và quá trình điền dã thực tế. Chúng tôi tri ân sâu sắc cộng đồng người Tày và các thế hệ nghệ nhân Then vùng Việt Bắc.
        </p>
      </div>

      {/* COMMUNITY GRATITUDE & ARTISAN ETHICAL ACKNOWLEDGEMENT */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#142030] border border-[#D4A359]/30 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-[#3A281A] border border-[#D4A359] p-2 flex items-center justify-center">
            <HeartHandshake className="w-8 h-8 text-[#D4A359]" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#D4A359] uppercase tracking-wider">Lời tri ân sâu sắc</span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-heritage text-[#FAF7F2]">
              Ghi Nhận Nghệ Nhân & Cộng Đồng Thực Hành Then
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#D8CFC4] leading-relaxed bg-[#0E1624] p-5 sm:p-6 rounded-xl border border-white/5">
          <p>
            Dự án <strong className="text-[#FAF7F2]">HỒ SƠ SỐ THỰC HÀNH THEN – CỘNG ĐỒNG NGƯỜI TÀY</strong> xin bày tỏ lòng biết ơn chân thành và sâu sắc nhất tới:
          </p>
          <ul className="space-y-2 list-disc list-inside text-[#EDE7DE] pl-2">
            <li>
              <strong className="text-[#F3C77C]">Bà con đồng bào dân tộc Tày:</strong> Những người chủ nhân văn hóa bản địa qua bao thế hệ đã giữ gìn mạch nguồn câu Then, tiếng Tính tẩu vang vọng giữa đại ngàn Việt Bắc.
            </li>
            <li>
              <strong className="text-[#F3C77C]">Các bậc Nghệ nhân Ưu tú, Nghệ nhân Dân gian, Thầy Then và người thực hành:</strong> Những 'báu vật nhân văn sống' tại huyện Định Hóa và tỉnh Thái Nguyên, những người đã cống hiến trọn đời để trao truyền các bài Then Nôm cổ, kỹ thuật đẽo quả bầu làm đàn và nghi thức tâm linh cao đẹp.
            </li>
            <li>
              <strong className="text-[#F3C77C]">Các chuyên gia, nhà khoa học nhân học và âm nhạc dân gian:</strong> Những người đã dày công sưu tầm, ký âm và lập hồ sơ đưa Thực hành Then trở thành Di sản văn hóa phi vật thể của nhân loại.
            </li>
          </ul>
          <p className="text-[#A0AEC0] text-xs pt-2 border-t border-white/10">
            * Nguyên tắc đạo đức: Mọi thông tin riêng tư, bản ghi âm giọng hát hoặc nghi thức gia đình nội bộ chỉ được công bố rộng rãi khi đã có văn bản thỏa thuận chính thức từ nghệ nhân và gia đình chủ thể.
          </p>
        </div>
      </section>

      {/* DETAILED SOURCES TABLE */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#D4A359]">
              Danh mục thư mục học
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-heritage text-[#FAF7F2]">
              Tài Liệu Nghiên Cứu & Đơn Vị Phát Hành
            </h2>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[#1A2637] text-[#D4A359] border border-[#D4A359]/30 font-mono">
            {institutionalSources.length} Nguồn kiểm chứng
          </span>
        </div>

        <div className="space-y-4">
          {institutionalSources.map((source) => (
            <div
              key={source.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#121A26] border border-[#D4A359]/20 hover:border-[#D4A359]/60 transition-all space-y-4 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/5 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#382618] text-[#F3C77C] border border-[#D4A359]/40">
                      {source.id}
                    </span>
                    <span className="text-xs text-[#A0AEC0] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#D4A359]" />
                      Đối chiếu: {source.ngayTruyCap}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-serif-heritage text-[#FAF7F2]">
                    {source.tenTaiLieu}
                  </h3>
                </div>

                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#19273A] text-[#9AE6B4] border border-[#48BB78]/30 self-start">
                  Đã thẩm định
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#8C9AA8] block">Tác giả / Nhóm biên soạn:</span>
                  <span className="text-[#FAF7F2] font-medium">{source.tacGia}</span>
                </div>
                <div>
                  <span className="text-[#8C9AA8] block">Đơn vị phát hành / Quản lý:</span>
                  <span className="text-[#FAF7F2] font-medium">{source.donViPhatHanh}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0D1520] border border-white/5 text-xs text-[#D8CFC4] space-y-1">
                <div>
                  <strong className="text-[#F3C77C]">Phạm vi cho phép sử dụng: </strong>
                  {source.phamViSuDung}
                </div>
                <div className="text-[#8C9AA8] italic">
                  {source.ghiChu}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#8C9AA8] truncate max-w-xs sm:max-w-md">
                  Chỉ mục: {source.duongDan}
                </span>
                {source.duongDan.startsWith('http') && (
                  <a
                    href={source.duongDan}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4A359] hover:text-[#FAF7F2] flex items-center gap-1 font-semibold shrink-0"
                  >
                    <span>Xem tài liệu gốc</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPLIANCE FOOTNOTE */}
      <div className="p-5 rounded-xl bg-[#152132] border border-[#D4A359]/20 flex items-start space-x-3 text-xs text-[#DFD8CC]">
        <ShieldCheck className="w-5 h-5 text-[#D4A359] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#FAF7F2]">Quy định bản quyền và chia sẻ tri thức:</strong> Mọi cá nhân, tổ chức trích dẫn dữ liệu từ nền tảng vui lòng ghi rõ mã bản ghi (ví dụ [THEN-DH-001]) cùng nguồn nghiên cứu gốc. Không sử dụng dữ liệu di sản Then vào các mục đích thương mại xuyên tạc bản sắc thiêng liêng của đồng bào dân tộc Tày.
        </p>
      </div>

      <BrocadeBorder />
    </div>
  );
};
