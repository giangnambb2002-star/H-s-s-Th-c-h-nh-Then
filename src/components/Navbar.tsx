import React, { useState } from 'react';
import { TabId } from '../types';
import { 
  Home, 
  BookOpen, 
  FileText, 
  Bot, 
  BookmarkCheck, 
  Info, 
  Menu, 
  X,
  Compass
} from 'lucide-react';

interface NavbarProps {
  currentTab: TabId;
  onSelectTab: (tab: TabId) => void;
  selectedRecordId: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentTab, 
  onSelectTab,
  selectedRecordId 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'trang-chu' as TabId, label: 'Trang chủ', icon: Home, badge: null },
    { id: 'thu-vien' as TabId, label: 'Thư viện di sản', icon: BookOpen, badge: '15 tư liệu' },
    { 
      id: 'chi-tiet' as TabId, 
      label: 'Chi tiết tư liệu', 
      icon: FileText, 
      badge: selectedRecordId ? selectedRecordId : 'Chọn bản ghi' 
    },
    { id: 'tro-ly-ai' as TabId, label: 'Trợ lý AI Gemini', icon: Bot, badge: 'Trực tuyến' },
    { id: 'nguon-tu-lieu' as TabId, label: 'Nguồn & Ghi nhận', icon: BookmarkCheck, badge: null },
    { id: 'gioi-thieu' as TabId, label: 'Giới thiệu dự án', icon: Info, badge: 'B01' },
  ];

  const handleNavClick = (tab: TabId) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#101826]/95 backdrop-blur-md border-b border-[#D4A359]/25 shadow-xl transition-all">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-[#2B1D12] via-[#4A3525] to-[#1A283D] px-4 py-1.5 text-xs text-[#FAF7F2]/90 border-b border-[#D4A359]/20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D4A359] animate-pulse"></span>
          <span className="font-medium tracking-wide">Chương trình Thực tập sinh Đợt 15 – FPT Polytechnic & IMTA TECH | Đề tài B01</span>
        </div>
        <div className="hidden md:flex items-center space-x-3 text-[11px] text-[#D8CFC4]">
          <span>Khu vực nghiên cứu: Định Hóa, Thái Nguyên</span>
          <span>•</span>
          <span className="text-[#D4A359]">Dự án xã hội phi lợi nhuận</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Project Title */}
          <div 
            onClick={() => handleNavClick('trang-chu')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#422B1D] to-[#172336] border border-[#D4A359] p-1.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              {/* Geometric emblem representing Dan Tinh and Tay star */}
              <svg viewBox="0 0 40 40" className="w-full h-full text-[#D4A359]" fill="none">
                <circle cx="20" cy="20" r="18" stroke="#D4A359" strokeWidth="1.5" strokeDasharray="3 2" />
                <polygon points="20,4 24,15 36,20 24,25 20,36 16,25 4,20 16,15" fill="#D4A359" opacity="0.3" stroke="#D4A359" strokeWidth="1" />
                <circle cx="20" cy="20" r="4" fill="#FAF7F2" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#D4A359] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#D4A359]" />
                Di sản văn hóa phi vật thể đại diện nhân loại
              </div>
              <h1 className="text-sm sm:text-base md:text-lg font-bold font-serif-heritage tracking-tight text-[#FAF7F2] leading-tight line-clamp-1 group-hover:text-[#F3C77C] transition-colors">
                HỒ SƠ SỐ THỰC HÀNH THEN – CỘNG ĐỒNG NGƯỜI TÀY
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-medium flex items-center space-x-2 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#382618] to-[#1E2E42] text-[#F3C77C] border border-[#D4A359]/60 shadow-md font-semibold'
                      : 'text-[#EDE7DE]/80 hover:text-[#FAF7F2] hover:bg-[#1E2A3C]/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4A359]' : 'text-[#A0AEC0]'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-[#D4A359] text-[#121927] font-bold' 
                        : 'bg-[#1C2738] text-[#D8CFC4] border border-white/10'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-[#1E2A3C] border border-[#D4A359]/30 text-[#EDE7DE] hover:text-[#D4A359] transition-colors"
              aria-label="Mở trình đơn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Prioritized for smartphone usage) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F1724] border-b border-[#D4A359]/30 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="text-xs uppercase tracking-wider text-[#D4A359] font-semibold px-2 py-1">
            Điều hướng 6 phân hệ di sản:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm text-left transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#4A3525] to-[#1E2E42] text-[#F3C77C] border border-[#D4A359] font-semibold'
                      : 'bg-[#152030] text-[#EDE7DE] border border-white/5 hover:border-[#D4A359]/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4A359]' : 'text-[#8C9AA8]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#101826] text-[#D4A359] border border-[#D4A359]/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 text-xs text-[#A0AEC0] px-2 flex justify-between items-center">
            <span>Khu vực: ATK Định Hóa, Thái Nguyên</span>
            <span className="text-[#D4A359]">Phạm Giang Nam - PH56715</span>
          </div>
        </div>
      )}
    </header>
  );
};
