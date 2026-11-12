export interface BanGhiDiSan {
  maBanGhi: string;
  tenDanhMuc: string;
  tenBanDia: string;
  loaiHinh: 'Làn điệu Then' | 'Nghi lễ Then' | 'Nhạc cụ & Pháp khí' | 'Không gian & Trang phục' | 'Văn bản diễn xướng' | string;
  congDongThucHanh: string;
  diaDanhHienNay: string;
  diaDanhLichSu: string;
  moTaChiTiet: string;
  boiCanhDienXuong: string;
  nguoiCungCap: string;
  daKiemChungNguoiCungCap: boolean;
  phamViSuDung: string;
  nguonTuLieu: string;
  daKiemChungNguon: boolean;
  hinhAnh?: {
    moTaHinhAnh: string;
    duocPhepCongBo: boolean;
    ghiChuQuyen: string;
    svgBieuTrung?: string;
  };
  amThanh?: {
    tieuDe: string;
    duocPhepCongBo: boolean;
    ghiChuQuyen: string;
    moTaAmThanh: string;
  };
  ghiChuXacMinh: string;
  ngayTao: string;
  ngayCapNhat: string;
}

export type TabId = 
  | 'trang-chu' 
  | 'thu-vien' 
  | 'chi-tiet' 
  | 'tro-ly-ai' 
  | 'nguon-tu-lieu' 
  | 'gioi-thieu';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isWarning?: boolean;
}
