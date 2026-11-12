import React, { useState } from 'react';
import { BanGhiDiSan, TabId } from '../types';
import { HeritageMotif, BrocadeBorder } from '../components/HeritageMotif';
import { 
  ArrowLeft, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Volume2, 
  VolumeX, 
  Share2, 
  Copy, 
  BookOpen,
  Calendar,
  Lock,
  Compass,
  AlertCircle
} from 'lucide-react';

interface ChiTietTuLieuProps {
  records: BanGhiDiSan[];
  selectedRecordId: string | null;
  onSelectRecord: (recordId: string) => void;
  onNavigate: (tab: TabId) => void;
  onAddNewRecord?: (record: BanGhiDiSan) => void;
}

export const ChiTietTuLieu: React.FC<ChiTietTuLieuProps> = ({ 
  records, 
  selectedRecordId, 
  onSelectRecord,
  onNavigate 
}) => {
  const [copied, setCopied] = useState(false);

  // Fallback to first record if none selected
  const currentRecord = records.find(r => r.maBanGhi === selectedRecordId) || records[0];

  if (!currentRecord) {
    return (
      <div className="p-12 text-center rounded-2xl bg-[#131C2A] border border-[#D4A359]/20 space-y-4">
        <AlertCircle className="w-12 h-12 text-[#D4A359] mx-auto" />
        <h2 className="text-xl font-bold text-[#FAF7F2]">Chưa chọn bản ghi tư liệu</h2>
        <p className="text-sm text-[#A0AEC0]">Vui lòng quay lại Thư viện di sản để chọn một bản ghi cụ thể.</p>
        <button
          onClick={() => onNavigate('thu-vien')}
          className="px-5 py-2.5 rounded-xl bg-[#D4A359] text-[#121927] font-bold text-sm"
        >
          Đến Thư viện di sản
        </button>
      </div>
    );
  }

  // Prev / Next index
  const currentIndex = records.findIndex(r => r.maBanGhi === currentRecord.maBanGhi);
  const prevRecord = currentIndex > 0 ? records[currentIndex - 1] : null;
  const nextRecord = currentIndex < records.length - 1 ? records[currentIndex + 1] : null;

  const handleCopyCitation = () => {
    const citation = `[${currentRecord.maBanGhi}] ${currentRecord.tenDanhMuc} (${currentRecord.tenBanDia}) - Cộng đồng người Tày, ${currentRecord.diaDanhHienNay}. Nguồn: ${currentRecord.nguonTuLieu}. Thuộc Đề tài B01 - Chương trình Thực tập sinh Đợt 15.`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isConsentPending = !currentRecord.daKiemChungNguoiCungCap;
  const isSourcePending = !currentRecord.daKiemChungNguon;

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* Top Navigation & Record Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#121927] border border-[#D4A359]/25">
        <button
          onClick={() => onNavigate('thu-vien')}
          className="text-xs sm:text-sm font-semibold text-[#D4A359] hover:text-[#FAF7F2] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Thư viện di sản</span>
        </button>

        {/* Record Quick Selector */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <select
            value={currentRecord.maBanGhi}
            onChange={(e) => onSelectRecord(e.target.value)}
            className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg bg-[#0E1520] border border-white/10 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#D4A359]"
          >
            {records.map(r => (
              <option key={r.maBanGhi} value={r.maBanGhi}>
                {r.maBanGhi}: {r.tenDanhMuc}
              </option>
            ))}
          </select>

          {/* Prev / Next buttons */}
          <div className="flex items-center space-x-1 shrink-0">
            <button
              disabled={!prevRecord}
              onClick={() => prevRecord && onSelectRecord(prevRecord.maBanGhi)}
              className="p-1.5 rounded bg-[#1A2637] text-[#FAF7F2] hover:bg-[#D4A359] hover:text-[#121927] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Bản ghi trước"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              disabled={!nextRecord}
              onClick={() => nextRecord && onSelectRecord(nextRecord.maBanGhi)}
              className="p-1.5 rounded bg-[#1A2637] text-[#FAF7F2] hover:bg-[#D4A359] hover:text-[#121927] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Bản ghi kế tiếp"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* WARNING NOTIFICATION BANNER (Strict Requirement) */}
      {(isConsentPending || isSourcePending) && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#3D2514] to-[#25170C] border-2 border-[#D4A359] shadow-lg flex items-start space-x-3 text-xs sm:text-sm text-[#F3C77C]">
          <AlertTriangle className="w-5 h-5 text-[#D4A359] shrink-0 mt-0.5 animate-pulse" />
          <div className="space-y-1">
            <div className="font-bold text-[#FAF7F2] uppercase tracking-wide flex items-center gap-2">
              <span>Cảnh báo quản trị di sản & quy tắc đạo đức Đề tài B01:</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4A359] text-[#121927] font-extrabold">CHƯA ĐẦY ĐỦ XÁC THỰC</span>
            </div>
            <p className="text-[#DFD8CC] leading-relaxed">
              {isConsentPending && (
                <span>• Bản ghi này chưa hoàn tất văn bản thỏa thuận ủy quyền chia sẻ trực tiếp từ nghệ nhân/người cung cấp tại cơ sở Định Hóa. Dữ liệu đang được tạm công bố dưới hình thức lưu trữ trích xuất nghiên cứu học thuật. </span>
              )}
              {currentRecord.ghiChuXacMinh && (
                <span className="italic block mt-1 text-[#F3C77C] font-semibold">Ghi chú xác minh thực địa: {currentRecord.ghiChuXacMinh}</span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* MAIN RECORD CARD */}
      <div className="p-6 sm:p-10 rounded-2xl bg-[#141E2D] border border-[#D4A359]/30 shadow-2xl space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-md bg-[#382618] text-[#F3C77C] border border-[#D4A359]">
                Mã: {currentRecord.maBanGhi}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#1C283B] text-[#D4A359] border border-[#D4A359]/30 font-semibold">
                Loại hình: {currentRecord.loaiHinh}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#101724] text-[#A0AEC0]">
                Cập nhật: {currentRecord.ngayCapNhat}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-heritage text-[#FAF7F2] leading-tight">
              {currentRecord.tenDanhMuc}
            </h1>

            <div className="text-base sm:text-lg text-[#D4A359] italic flex items-center gap-2">
              <span>Tên gọi bản địa (tiếng Tày):</span>
              <strong className="text-[#F3C77C] not-italic">{currentRecord.tenBanDia}</strong>
            </div>
          </div>

          {/* Motif & Citation button */}
          <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#0D1522] border border-[#D4A359]/50 p-3 flex items-center justify-center shadow-inner">
              <HeritageMotif 
                type={currentRecord.hinhAnh?.svgBieuTrung || 'brocade'} 
                className="w-16 h-16 sm:w-20 sm:h-20" 
              />
            </div>
            
            <button
              onClick={handleCopyCitation}
              className="px-3.5 py-1.5 rounded-lg bg-[#1B2739] hover:bg-[#25364E] text-[#EDE7DE] border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <Copy className="w-3.5 h-3.5 text-[#D4A359]" />
              <span>{copied ? 'Đã sao chép trích dẫn!' : 'Sao chép trích dẫn'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Core Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Descriptive Text (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4A359] flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Mô tả chi tiết di sản
              </h3>
              <p className="text-sm sm:text-base text-[#EDE7DE] leading-relaxed bg-[#0E1624] p-5 rounded-xl border border-white/5">
                {currentRecord.moTaChiTiet}
              </p>
            </div>

            {/* Context of Performance */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4A359] flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Bối cảnh diễn xướng & Không gian văn hóa
              </h3>
              <p className="text-sm sm:text-base text-[#D8CFC4] leading-relaxed bg-[#0E1624] p-5 rounded-xl border border-white/5">
                {currentRecord.boiCanhDienXuong}
              </p>
            </div>

            {/* Multimedia Section (Ethical publication statement) */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4A359] flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Tư liệu hình ảnh & Âm thanh thực nghiệm
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Visual Documentation Card */}
                <div className="p-4 rounded-xl bg-[#0E1624] border border-white/10 space-y-2">
                  <div className="text-xs font-bold text-[#FAF7F2] flex items-center justify-between">
                    <span>Đồ họa tư liệu di sản</span>
                    {currentRecord.hinhAnh?.duocPhepCongBo ? (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#14261C] text-[#9AE6B4] border border-[#48BB78]/40">
                        Được phép công bố
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#3D2514] text-[#F3C77C]">
                        Hạn chế công bố
                      </span>
                    )}
                  </div>
                  <div className="w-full h-32 rounded-lg bg-[#141E2D] border border-white/5 flex flex-col items-center justify-center p-3 text-center">
                    <HeritageMotif 
                      type={currentRecord.hinhAnh?.svgBieuTrung || 'brocade'} 
                      className="w-16 h-16 mb-1" 
                    />
                    <span className="text-[11px] text-[#A0AEC0] italic line-clamp-1">
                      {currentRecord.hinhAnh?.moTaHinhAnh || 'Sơ đồ hình thái di sản chuẩn'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8C9AA8] leading-tight">
                    {currentRecord.hinhAnh?.ghiChuQuyen || 'Tuân thủ quy định không dùng ảnh AI giả mạo nghệ nhân.'}
                  </p>
                </div>

                {/* Audio Documentation Card */}
                <div className="p-4 rounded-xl bg-[#0E1624] border border-white/10 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#FAF7F2] flex items-center justify-between">
                      <span>Bản ghi âm diễn xướng</span>
                      {currentRecord.amThanh?.duocPhepCongBo ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#14261C] text-[#9AE6B4]">
                          Được công bố
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#3D2514] text-[#F3C77C] flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Lưu trữ nội bộ
                        </span>
                      )}
                    </div>
                    
                    <div className="my-3 p-3 rounded-lg bg-[#141E2D] border border-white/5 space-y-1">
                      <div className="text-xs font-semibold text-[#FAF7F2] line-clamp-1">
                        {currentRecord.amThanh?.tieuDe || 'Khúc hát Then cổ truyền'}
                      </div>
                      <div className="text-[11px] text-[#A0AEC0]">
                        {currentRecord.amThanh?.moTaAmThanh || 'Âm vang đàn tính 2 dây hòa nhịp xóc chuông đồng'}
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#8C9AA8] leading-tight border-t border-white/5 pt-2">
                    {currentRecord.amThanh?.ghiChuQuyen || 'Bản ghi âm giữ bảo mật cho đến khi có sự cho phép bằng văn bản của nghệ nhân theo Đề tài B01.'}
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Metadata, Geography, Verification, Legal Scope */}
          <div className="space-y-6">
            
            {/* Geographic & Community Identity */}
            <div className="p-5 rounded-xl bg-[#0E1624] border border-[#D4A359]/20 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4A359] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Địa danh & Cộng đồng thực hành
              </h4>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[#8C9AA8] block">Cộng đồng thực hành:</span>
                  <span className="font-semibold text-[#FAF7F2]">{currentRecord.congDongThucHanh}</span>
                </div>

                <div className="pt-1 border-t border-white/5">
                  <span className="text-[#8C9AA8] block">Địa danh hiện nay:</span>
                  <span className="font-semibold text-[#FAF7F2] leading-tight">{currentRecord.diaDanhHienNay}</span>
                </div>

                <div className="pt-1 border-t border-white/5">
                  <span className="text-[#8C9AA8] block">Địa danh tại thời điểm tư liệu:</span>
                  <span className="text-[#D8CFC4]">{currentRecord.diaDanhLichSu}</span>
                </div>
              </div>
            </div>

            {/* Informant & Provenance Verification */}
            <div className="p-5 rounded-xl bg-[#0E1624] border border-[#D4A359]/20 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4A359] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Chủ thể & Kiểm chứng nguồn
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#8C9AA8] block">Người cung cấp tư liệu:</span>
                  <span className="font-medium text-[#FAF7F2] leading-tight">{currentRecord.nguoiCungCap}</span>
                  <div className="mt-1">
                    {currentRecord.daKiemChungNguoiCungCap ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#9AE6B4]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#48BB78]" />
                        Đã xác minh danh tính người cung cấp
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#F3C77C]">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#D4A359]" />
                        Đang chờ biên bản chấp thuận tiếp cận
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <span className="text-[#8C9AA8] block">Nguồn tư liệu trích xuất:</span>
                  <span className="text-[#D8CFC4] italic block leading-relaxed">{currentRecord.nguonTuLieu}</span>
                  <div className="mt-1">
                    {currentRecord.daKiemChungNguon ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#9AE6B4]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#48BB78]" />
                        Nguồn xuất bản/hồ sơ đã thẩm định
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#F3C77C]">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#D4A359]" />
                        Nguồn điền dã sơ cấp chưa thẩm định
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <span className="text-[#8C9AA8] block">Phạm vi được phép sử dụng:</span>
                  <span className="font-medium text-[#F3C77C] block leading-tight">{currentRecord.phamViSuDung}</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation with Gemini AI */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#20150C] to-[#121A28] border border-[#D4A359]/40 space-y-2">
              <span className="text-xs font-bold text-[#F3C77C] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Hỏi thêm về bản ghi này?
              </span>
              <p className="text-[11px] text-[#D8CFC4] leading-relaxed">
                Trợ lý AI Gemini của hệ thống sẽ đối chiếu và giải đáp chi tiết dựa trên mã [{currentRecord.maBanGhi}].
              </p>
              <button
                onClick={() => onNavigate('tro-ly-ai')}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-[#D4A359] hover:bg-[#F3C77C] text-[#121927] font-bold text-xs transition-colors"
              >
                Hỏi đáp AI về {currentRecord.maBanGhi}
              </button>
            </div>

          </div>

        </div>

        <BrocadeBorder className="pt-4" />
      </div>

    </div>
  );
};
