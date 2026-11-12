import React, { useState, useMemo } from 'react';
import { BanGhiDiSan, TabId } from '../types';
import { HeritageMotif } from '../components/HeritageMotif';
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Music, 
  Sparkles, 
  ArrowRight,
  Info,
  Layers,
  MapPin
} from 'lucide-react';

interface ThuVienDiSanProps {
  records: BanGhiDiSan[];
  onSelectRecord: (recordId: string) => void;
  onNavigate: (tab: TabId) => void;
}

export const ThuVienDiSan: React.FC<ThuVienDiSanProps> = ({ 
  records, 
  onSelectRecord,
  onNavigate 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [filterVerification, setFilterVerification] = useState<string>('all');
  const [activeSpecialView, setActiveSpecialView] = useState<'all' | 'dan-tinh'>('all');

  // Filter types
  const loaiHinhOptions = [
    { id: 'all', label: 'Tất cả loại hình' },
    { id: 'Làn điệu Then', label: 'Làn điệu Then' },
    { id: 'Nghi lễ Then', label: 'Nghi lễ Then' },
    { id: 'Nhạc cụ & Pháp khí', label: 'Nhạc cụ & Pháp khí' },
    { id: 'Không gian & Trang phục', label: 'Không gian & Trang phục' },
    { id: 'Văn bản diễn xướng', label: 'Văn bản diễn xướng' },
  ];

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      // Search matching name, native name, code, description
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        r.tenDanhMuc.toLowerCase().includes(query) ||
        r.tenBanDia.toLowerCase().includes(query) ||
        r.maBanGhi.toLowerCase().includes(query) ||
        r.moTaChiTiet.toLowerCase().includes(query) ||
        r.nguonTuLieu.toLowerCase().includes(query);

      // Category matching
      const matchesType = selectedType === 'all' || r.loaiHinh === selectedType;

      // Verification status matching
      let matchesVerification = true;
      if (filterVerification === 'verified') {
        matchesVerification = r.daKiemChungNguoiCungCap === true;
      } else if (filterVerification === 'pending') {
        matchesVerification = r.daKiemChungNguoiCungCap === false;
      }

      return matchesSearch && matchesType && matchesVerification;
    });
  }, [records, searchQuery, selectedType, filterVerification]);

  const danTinhRecord = records.find(r => r.maBanGhi === 'THEN-DH-006');

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#172436] via-[#1F1912] to-[#121A26] border border-[#D4A359]/30 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#382618] border border-[#D4A359]/50 text-xs text-[#F3C77C] font-semibold">
            <Layers className="w-3.5 h-3.5 text-[#D4A359]" />
            Thư viện tư liệu số hóa di sản Then Tày
          </div>
          <div className="text-xs text-[#D8CFC4]">
            Tổng số: <strong className="text-[#FAF7F2] font-mono">{records.length}</strong> bản ghi nghiên cứu
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold font-serif-heritage text-[#FAF7F2]">
          Kho Lưu Trữ Di Sản Thực Hành Then
        </h1>

        <p className="text-xs sm:text-sm text-[#D8CFC4] max-w-3xl leading-relaxed">
          Tra cứu toàn diện các làn điệu Then cổ, nghi lễ vòng đời, nhạc cụ thiêng đàn tính, chùm xóc nhạc và trang phục truyền thống của người Tày tại vùng văn hóa Việt Bắc (trọng tâm khảo sát huyện Định Hóa, Thái Nguyên).
        </p>

        {/* Quick Tabs to toggle Dan Tinh Special Dossier */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setActiveSpecialView('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSpecialView === 'all'
                ? 'bg-[#D4A359] text-[#121927]'
                : 'bg-[#121C2B] text-[#D8CFC4] hover:bg-[#1E2E42]'
            }`}
          >
            Toàn bộ danh mục di sản ({records.length})
          </button>
          <button
            onClick={() => setActiveSpecialView('dan-tinh')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeSpecialView === 'dan-tinh'
                ? 'bg-[#D4A359] text-[#121927]'
                : 'bg-[#121C2B] text-[#D8CFC4] hover:bg-[#1E2E42]'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Chuyên đề: Cấu tạo & Âm sắc Đàn Tính</span>
          </button>
        </div>
      </div>

      {/* SPECIAL DOSSIER: ĐÀN TÍNH TẨU (Required in prompt: "Thông tin đàn tính") */}
      {activeSpecialView === 'dan-tinh' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#152234] border border-[#D4A359] shadow-2xl space-y-6 animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-[#3A281B] border border-[#D4A359] p-2 flex items-center justify-center">
                <HeritageMotif type="dan-tinh" className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#D4A359] uppercase tracking-wider">Nhạc cụ linh hồn di sản</span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif-heritage text-[#FAF7F2]">
                  Đàn Tính Tẩu Người Tày (Tính Tẩu)
                </h2>
              </div>
            </div>
            {danTinhRecord && (
              <button
                onClick={() => {
                  onSelectRecord(danTinhRecord.maBanGhi);
                  onNavigate('chi-tiet');
                }}
                className="px-4 py-2 rounded-lg bg-[#382618] hover:bg-[#4E3420] text-[#F3C77C] border border-[#D4A359]/50 text-xs font-bold flex items-center gap-1.5"
              >
                <span>Xem bản ghi chi tiết {danTinhRecord.maBanGhi}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-[#0F1724] border border-white/5 space-y-2">
              <h3 className="text-sm font-bold text-[#F3C77C] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A359]"></span>
                1. Bầu đàn (Tẩu Tính)
              </h3>
              <p className="text-xs text-[#D8CFC4] leading-relaxed">
                Làm từ nửa quả bầu già khô, tròn đều, dày dặn, được phơi sương ngâm kỹ. Bầu đàn đóng vai trò buồng cộng hưởng âm thanh độc đáo, tạo nên âm trầm ấm, vang vọng mộc mạc đặc trưng của núi rừng.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0F1724] border border-white/5 space-y-2">
              <h3 className="text-sm font-bold text-[#F3C77C] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A359]"></span>
                2. Cần đàn & Mặt đàn
              </h3>
              <p className="text-xs text-[#D8CFC4] leading-relaxed">
                Cần đàn bằng gỗ dâu rừng dẻo dai hoặc gỗ xoan, dài khoảng 80-90cm được vuốt thuôn thanh thoát. Mặt đàn làm bằng gỗ ngô đồng mỏng nhẹ, có khoét lỗ thoát âm hình hoa hồi hoặc bán nguyệt.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0F1724] border border-white/5 space-y-2">
              <h3 className="text-sm font-bold text-[#F3C77C] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A359]"></span>
                3. Dây đàn & Nghệ thuật gảy
              </h3>
              <p className="text-xs text-[#D8CFC4] leading-relaxed">
                Đàn Tính Định Hóa có loại 2 dây (dây trầm 'Nặm', dây bổng 'Thang') hoặc 3 dây trong lễ lớn. Dây tơ tằm cổ truyền cho âm sắc ngọt dịu. Nghệ nhân dùng ngón trỏ tay phải gảy tính, chân phải rung chùm xóc chuông đồng tạo thành nhịp điệu cuốn hút.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH AND FILTERS */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#121A26] border border-[#D4A359]/20 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#A0AEC0] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên bản ghi, tên bản địa tiếng Tày, mã (THEN-DH-001)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B121C] border border-white/10 text-sm text-[#FAF7F2] placeholder-[#8C9AA8] focus:outline-none focus:border-[#D4A359]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A0AEC0] hover:text-white"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Verification Status Filter */}
          <div className="w-full md:w-56">
            <select
              value={filterVerification}
              onChange={(e) => setFilterVerification(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0B121C] border border-white/10 text-xs sm:text-sm text-[#FAF7F2] focus:outline-none focus:border-[#D4A359]"
            >
              <option value="all">Tất cả trạng thái thẩm định</option>
              <option value="verified">Đã xác minh người cung cấp</option>
              <option value="pending">Chờ thẩm định / Chưa xác nhận</option>
            </select>
          </div>
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <Filter className="w-3.5 h-3.5 text-[#D4A359] shrink-0" />
          <span className="text-[#8C9AA8] shrink-0">Loại hình:</span>
          {loaiHinhOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedType(opt.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                selectedType === opt.id
                  ? 'bg-gradient-to-r from-[#4A3525] to-[#1E2E42] text-[#F3C77C] border border-[#D4A359] font-bold'
                  : 'bg-[#0E1622] text-[#A0AEC0] border border-white/5 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS COUNT & STATUS */}
      <div className="flex items-center justify-between text-xs text-[#A0AEC0] px-1">
        <div>
          Tìm thấy <strong className="text-[#FAF7F2]">{filteredRecords.length}</strong> tư liệu phù hợp
        </div>
        {(searchQuery || selectedType !== 'all' || filterVerification !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setFilterVerification('all');
            }}
            className="text-[#D4A359] hover:underline"
          >
            Đặt lại tất cả bộ lọc
          </button>
        )}
      </div>

      {/* HERITAGE GRID LIST */}
      {filteredRecords.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#121A26] border border-white/5 space-y-3">
          <Info className="w-10 h-10 text-[#D4A359] mx-auto opacity-70" />
          <h3 className="text-base font-bold text-[#FAF7F2]">Không tìm thấy bản ghi phù hợp</h3>
          <p className="text-xs text-[#A0AEC0] max-w-md mx-auto">
            Hệ thống tuân thủ nguyên tắc không bịa đặt dữ liệu ngoài kho lưu trữ đã kiểm chứng. Vui lòng thử từ khóa khác hoặc xóa bộ lọc.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRecords.map((item) => {
            const hasPendingConsent = !item.daKiemChungNguoiCungCap;

            return (
              <div
                key={item.maBanGhi}
                onClick={() => {
                  onSelectRecord(item.maBanGhi);
                  onNavigate('chi-tiet');
                }}
                className="group relative p-5 rounded-2xl bg-[#131C2A] border border-[#D4A359]/20 hover:border-[#D4A359] hover:bg-[#182436] transition-all cursor-pointer shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Bar: Code & Category */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#382618] text-[#F3C77C] border border-[#D4A359]/40">
                      {item.maBanGhi}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#1C283B] text-[#D8CFC4] border border-white/5">
                      {item.loaiHinh}
                    </span>
                  </div>

                  {/* Motif Icon */}
                  <div className="w-14 h-14 mx-auto my-2 rounded-xl bg-[#0E1520] border border-white/10 flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                    <HeritageMotif 
                      type={item.hinhAnh?.svgBieuTrung || 'brocade'} 
                      className="w-10 h-10" 
                    />
                  </div>

                  {/* Title & Native Name */}
                  <div>
                    <h3 className="text-base font-bold font-serif-heritage text-[#FAF7F2] group-hover:text-[#F3C77C] transition-colors line-clamp-1">
                      {item.tenDanhMuc}
                    </h3>
                    <p className="text-xs text-[#D4A359] italic line-clamp-1 mt-0.5">
                      Tên bản địa (Tày): {item.tenBanDia}
                    </p>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-[#A0AEC0] line-clamp-3 leading-relaxed">
                    {item.moTaChiTiet}
                  </p>

                  {/* Warning / Verification Badge */}
                  {hasPendingConsent ? (
                    <div className="p-2 rounded-lg bg-[#3D2514]/70 border border-[#D4A359]/40 flex items-center gap-2 text-[11px] text-[#F3C77C]">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#D4A359] shrink-0" />
                      <span className="line-clamp-1">Chờ thẩm định văn bản người cung cấp</span>
                    </div>
                  ) : (
                    <div className="p-2 rounded-lg bg-[#14261C]/70 border border-[#48BB78]/30 flex items-center gap-2 text-[11px] text-[#9AE6B4]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#48BB78] shrink-0" />
                      <span className="line-clamp-1">Nguồn & Người cung cấp đã xác minh</span>
                    </div>
                  )}

                  {/* Location Note */}
                  <div className="text-[11px] text-[#8C9AA8] flex items-center gap-1 line-clamp-1">
                    <MapPin className="w-3 h-3 text-[#D4A359] shrink-0" />
                    <span>{item.diaDanhHienNay}</span>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[#8C9AA8] text-[11px]">
                    Nguồn: {item.nguonTuLieu.split(' - ')[0] || 'Tài liệu di sản'}
                  </span>
                  <span className="text-[#F3C77C] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Xem chi tiết →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
