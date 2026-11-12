import React from 'react';
import { TabId } from '../types';
import { Home, BookOpen, FileText, Bot, Info } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentTab, onSelectTab }) => {
  const items = [
    { id: 'trang-chu' as TabId, label: 'Trang chủ', icon: Home },
    { id: 'thu-vien' as TabId, label: 'Thư viện', icon: BookOpen },
    { id: 'chi-tiet' as TabId, label: 'Tư liệu', icon: FileText },
    { id: 'tro-ly-ai' as TabId, label: 'Hỏi AI', icon: Bot },
    { id: 'gioi-thieu' as TabId, label: 'Dự án', icon: Info },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F1724]/95 backdrop-blur-lg border-t border-[#D4A359]/30 lg:hidden px-2 py-1 shadow-2xl">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all ${
                isActive
                  ? 'text-[#F3C77C] font-bold'
                  : 'text-[#A0AEC0] hover:text-[#EDE7DE]'
              }`}
            >
              <div className={`p-1 rounded-md ${isActive ? 'bg-[#382618] border border-[#D4A359]/60' : ''}`}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4A359]' : 'text-[#8C9AA8]'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
