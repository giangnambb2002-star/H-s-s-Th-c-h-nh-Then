import React from 'react';

interface HeritageMotifProps {
  type: string;
  className?: string;
  accentColor?: string;
}

export const HeritageMotif: React.FC<HeritageMotifProps> = ({ 
  type, 
  className = "w-16 h-16", 
  accentColor = "#D4A359" 
}) => {
  switch (type) {
    case 'lute':
    case 'dan-tinh':
      // Authentic Đàn Tính Tẩu: Gourd (bầu đàn), long neck (cần đàn), 2 pegs (tai đàn), strings
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Cần đàn gỗ dâu vươn dài */}
          <line x1="30" y1="90" x2="70" y2="10" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          {/* Quả bầu già (Soundbox) */}
          <circle cx="34" cy="74" r="18" fill="#422B1D" stroke={accentColor} strokeWidth="2.5" />
          {/* Lỗ thoát âm hoa văn bán nguyệt/hoa hồi */}
          <circle cx="34" cy="74" r="5" fill="#172336" stroke={accentColor} strokeWidth="1" strokeDasharray="2 2" />
          {/* Ngựa đàn (cầu dây) */}
          <rect x="28" y="80" width="12" height="3" rx="1.5" fill={accentColor} />
          {/* Dây đàn (nặm & thang) */}
          <line x1="32" y1="80" x2="68" y2="16" stroke="#FAF7F2" strokeWidth="1" opacity="0.8" />
          <line x1="36" y1="80" x2="72" y2="18" stroke="#FAF7F2" strokeWidth="1" opacity="0.8" />
          {/* Đầu cần & trục vặn (tai đàn) */}
          <circle cx="70" cy="12" r="3" fill={accentColor} />
          <line x1="66" y1="18" x2="78" y2="15" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="64" y1="24" x2="76" y2="21" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'bells':
    case 'xoc-nhac':
      // Authentic Chùm Xóc Nhạc (chuỗi chuông đồng gõ nhịp)
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M20 30 Q50 15 80 30" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          {/* Chuông 1 */}
          <circle cx="30" cy="50" r="10" fill="#422B1D" stroke={accentColor} strokeWidth="2" />
          <line x1="28" y1="30" x2="30" y2="40" stroke={accentColor} strokeWidth="2" />
          <circle cx="30" cy="54" r="2.5" fill={accentColor} />
          {/* Chuông 2 trung tâm */}
          <circle cx="50" cy="65" r="12" fill="#5C4033" stroke={accentColor} strokeWidth="2.5" />
          <line x1="50" y1="22" x2="50" y2="53" stroke={accentColor} strokeWidth="2" />
          <circle cx="50" cy="70" r="3" fill="#F3C77C" />
          {/* Chuông 3 */}
          <circle cx="70" cy="50" r="10" fill="#422B1D" stroke={accentColor} strokeWidth="2" />
          <line x1="72" y1="30" x2="70" y2="40" stroke={accentColor} strokeWidth="2" />
          <circle cx="70" cy="54" r="2.5" fill={accentColor} />
        </svg>
      );

    case 'fan':
    case 'quat-then':
      // Quạt Then phong mã nghi lễ
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Khung nan quạt */}
          <path d="M50 85 L15 35 A 45 45 0 0 1 85 35 Z" fill="#1A283D" stroke={accentColor} strokeWidth="2" />
          {/* Các nan tre hướng tâm */}
          <line x1="50" y1="85" x2="25" y2="28" stroke={accentColor} strokeWidth="1" opacity="0.6" />
          <line x1="50" y1="85" x2="38" y2="20" stroke={accentColor} strokeWidth="1" opacity="0.6" />
          <line x1="50" y1="85" x2="50" y2="18" stroke={accentColor} strokeWidth="1.5" />
          <line x1="50" y1="85" x2="62" y2="20" stroke={accentColor} strokeWidth="1" opacity="0.6" />
          <line x1="50" y1="85" x2="75" y2="28" stroke={accentColor} strokeWidth="1" opacity="0.6" />
          {/* Tâm điểm cán quạt */}
          <circle cx="50" cy="85" r="4" fill={accentColor} />
          {/* Hoa văn mặt trời / mây phong mã */}
          <circle cx="50" cy="45" r="12" stroke={accentColor} strokeWidth="1.5" strokeDasharray="2 3" />
        </svg>
      );

    case 'altar':
    case 'cau-kham':
      // Gian thờ Cẩu Khảm trang nghiêm
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="15" y="20" width="70" height="60" rx="3" fill="#121C2B" stroke={accentColor} strokeWidth="2" />
          <line x1="10" y1="20" x2="90" y2="20" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="30" x2="80" y2="30" stroke={accentColor} strokeWidth="1" opacity="0.4" />
          {/* Lư hương tâm linh */}
          <path d="M42 62 L40 72 L60 72 L58 62 Z" fill="#422B1D" stroke={accentColor} strokeWidth="1.5" />
          {/* Tranh ngũ đại / tam thanh tượng trưng */}
          <rect x="25" y="36" width="12" height="20" stroke={accentColor} strokeWidth="1" fill="#1A283D" />
          <rect x="44" y="34" width="12" height="22" stroke={accentColor} strokeWidth="1.5" fill="#24364F" />
          <rect x="63" y="36" width="12" height="20" stroke={accentColor} strokeWidth="1" fill="#1A283D" />
          {/* Tia hương trầm */}
          <path d="M50 60 Q52 52 48 46" stroke="#F3C77C" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );

    case 'crown':
    case 'mu-phuong':
      // Mũ Phượng đại lễ Lẩu Then
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M25 70 C25 50 35 30 50 15 C65 30 75 50 75 70 Z" fill="#1A283D" stroke={accentColor} strokeWidth="2" />
          {/* Cánh phượng vươn */}
          <path d="M50 15 Q65 18 80 25 Q70 40 68 55" stroke={accentColor} strokeWidth="1.5" fill="none" />
          <path d="M50 15 Q35 18 20 25 Q30 40 32 55" stroke={accentColor} strokeWidth="1.5" fill="none" />
          <rect x="20" y="68" width="60" height="8" rx="2" fill="#422B1D" stroke={accentColor} strokeWidth="2" />
          {/* Dải ruy băng buông rủ */}
          <path d="M22 76 Q18 90 20 96" stroke="#C5943B" strokeWidth="2" strokeLinecap="round" />
          <path d="M78 76 Q82 90 80 96" stroke="#C5943B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'clothing':
      // Áo chàm năm thân Tày
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M30 20 L15 35 L24 42 L32 30 L32 85 L68 85 L68 30 L76 42 L85 35 L70 20 Z" fill="#172336" stroke={accentColor} strokeWidth="2" />
          {/* Cổ áo đứng và đường cài khuy nách phải */}
          <circle cx="50" cy="20" r="5" stroke={accentColor} strokeWidth="1.5" />
          <path d="M53 23 Q60 30 68 40" stroke={accentColor} strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Thắt lưng xanh/đỏ */}
          <rect x="32" y="52" width="36" height="5" fill="#422B1D" stroke={accentColor} strokeWidth="1" />
        </svg>
      );

    case 'brocade':
    default:
      // Hoa văn thổ cẩm quả trám hình học Tày đặc trưng
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <polygon points="50,10 90,50 50,90 10,50" stroke={accentColor} strokeWidth="2.5" fill="#172336" />
          <polygon points="50,22 78,50 50,78 22,50" stroke={accentColor} strokeWidth="1.5" fill="#121C2B" />
          <circle cx="50" cy="50" r="8" fill="#422B1D" stroke={accentColor} strokeWidth="1.5" />
          {/* 4 cánh hoa hồi Tày */}
          <line x1="50" y1="32" x2="50" y2="42" stroke={accentColor} strokeWidth="2" />
          <line x1="50" y1="58" x2="50" y2="68" stroke={accentColor} strokeWidth="2" />
          <line x1="32" y1="50" x2="42" y2="50" stroke={accentColor} strokeWidth="2" />
          <line x1="58" y1="50" x2="68" y2="50" stroke={accentColor} strokeWidth="2" />
        </svg>
      );
  }
};

export const BrocadeBorder: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`h-2.5 w-full bg-repeat-x flex items-center justify-center opacity-80 ${className}`}>
    <div className="w-full flex items-center justify-between overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-1 shrink-0 px-1">
          <span className="w-1.5 h-1.5 rotate-45 bg-[#D4A359]"></span>
          <span className="w-2.5 h-0.5 bg-[#8C6239]"></span>
          <span className="w-1.5 h-1.5 rotate-45 border border-[#D4A359]"></span>
        </div>
      ))}
    </div>
  </div>
);
