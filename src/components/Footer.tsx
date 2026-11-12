import React from 'react';
import { TabId } from '../types';
import { HeritageMotif, BrocadeBorder } from './HeritageMotif';
import { ShieldCheck, Heart, Award, Compass, MapPin } from 'lucide-react';

interface FooterProps {
  currentTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentTab, onSelectTab }) => {
  return (
    <footer className="bg-[#0B111A] text-[#EDE7DE] border-t border-[#D4A359]/25 pt-10 pb-20 md:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <BrocadeBorder className="mb-6 opacity-60" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Project Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#382618] border border-[#D4A359] p-1 flex items-center justify-center">
                <HeritageMotif type="dan-tinh" className="w-7 h-7" />
              </div>
              <h2 className="text-base font-bold font-serif-heritage text-[#FAF7F2]">
                HỒ SƠ SỐ THỰC HÀNH THEN – CỘNG ĐỒNG NGƯỜI TÀY
              </h2>
            </div>

            <p className="text-xs text-[#A0AEC0] leading-relaxed max-w-lg">
              Hệ thống lưu trữ số hóa, bảo tồn và giới thiệu thực hành Then của cộng đồng người Tày tại vùng văn hóa Việt Bắc. Trọng tâm nghiên cứu thực địa: Khu vực huyện Định Hóa, tỉnh Thái Nguyên.
            </p>

            <div className="flex items-center space-x-2 text-xs text-[#F3C77C]">
              <Award className="w-4 h-4 text-[#D4A359]" />
              <span>Di sản văn hóa phi vật thể đại diện của nhân loại (UNESCO 2019)</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4A359]">
              6 Trang Chức Năng
            </h3>
            <ul className="space-y-1.5 text-xs text-[#D8CFC4]">
              <li>
                <button 
                  onClick={() => onSelectTab('trang-chu')} 
                  className={`hover:text-[#F3C77C] transition-colors ${currentTab === 'trang-chu' ? 'text-[#D4A359] font-bold' : ''}`}
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('thu-vien')} 
                  className={`hover:text-[#F3C77C] transition-colors ${currentTab === 'thu-vien' ? 'text-[#D4A359] font-bold' : ''}`}
                >
                  Thư viện di sản (15 tư liệu)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('chi-tiet')} 
                  className={`hover:text-[#F3C77C] transition-colors ${currentTab === 'chi-tiet' ? 'text-[#D4A359] font-bold' : ''}`}
                >
                  Chi tiết tư liệu
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('tro-ly-ai')} 
                  className={`hover:text-[#F3C77C] transition-colors ${currentTab === 'tro-ly-ai' ? 'text-[#D4A359] font-bold' : ''}`}
                >
                  Trợ lý AI Gemini
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('nguon-tu-lieu')} 
                  className={`hover:text-[#F3C77C] transition-colors ${currentTab === 'nguon-tu-lieu' ? 'text-[#D4A359] font-bold' : ''}`}
                >
                  Nguồn tư liệu & Ghi nhận
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('gioi-thieu')} 
                  className={`hover:text-[#F3C77C] transition-colors ${currentTab === 'gioi-thieu' ? 'text-[#D4A359] font-bold' : ''}`}
                >
                  Giới thiệu dự án B01
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Details & Legal info */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4A359]">
              Thông Tin Thực Hiện
            </h3>
            <div className="text-xs text-[#D8CFC4] space-y-1">
              <div>Người thực hiện: <strong className="text-[#FAF7F2]">Phạm Giang Nam</strong></div>
              <div>Mã sinh viên: <span className="font-mono text-[#F3C77C]">PH56715</span></div>
              <div>Nhóm: <strong className="text-[#FAF7F2]">Nhóm 1</strong></div>
              <div>Chương trình Thực tập sinh Đợt 15</div>
              <div className="text-[#A0AEC0]">FPT Polytechnic & IMTA TECH</div>
              <div className="text-[11px] text-[#D4A359] font-semibold pt-1">
                Dự án xã hội phi lợi nhuận
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8C9AA8]">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4A359]" />
            <span>© 2026 Hồ Sơ Số Thực Hành Then Tày. Tuân thủ đạo đức nghiên cứu & Công ước UNESCO 2003.</span>
          </div>
          <div className="text-right">
            Phạm vi khảo sát: Huyện Định Hóa, Tỉnh Thái Nguyên
          </div>
        </div>

      </div>
    </footer>
  );
};
