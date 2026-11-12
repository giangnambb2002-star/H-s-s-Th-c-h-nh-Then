import React, { useState, useEffect } from 'react';
import { TabId, BanGhiDiSan } from './types';
import { defaultDiSanList } from './data/disanData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { TrangChu } from './pages/TrangChu';
import { ThuVienDiSan } from './pages/ThuVienDiSan';
import { ChiTietTuLieu } from './pages/ChiTietTuLieu';
import { TroLyAiGemini } from './pages/TroLyAiGemini';
import { NguonTuLieu } from './pages/NguonTuLieu';
import { GioiThieu } from './pages/GioiThieu';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabId>('trang-chu');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>('THEN-DH-001');
  const [records, setRecords] = useState<BanGhiDiSan[]>(defaultDiSanList);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);

  // Sync records from server endpoint /api/disan
  useEffect(() => {
    async function fetchServerRecords() {
      try {
        setIsLoadingRecords(true);
        const res = await fetch('/api/disan');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setRecords(json.data);
          }
        }
      } catch (err) {
        console.warn('Sử dụng dữ liệu khởi tạo mặc định:', err);
      } finally {
        setIsLoadingRecords(false);
      }
    }

    fetchServerRecords();
  }, []);

  const handleSelectTab = (tab: TabId) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRecord = (recordId: string) => {
    setSelectedRecordId(recordId);
  };

  return (
    <div className="min-h-screen bg-[#0D141F] text-[#EDE7DE] flex flex-col font-sans selection:bg-[#D4A359] selection:text-[#121927]">
      {/* Top Main Navbar */}
      <Navbar 
        currentTab={currentTab} 
        onSelectTab={handleSelectTab}
        selectedRecordId={selectedRecordId}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'trang-chu' && (
          <TrangChu 
            onNavigate={handleSelectTab} 
            onSelectRecord={handleSelectRecord}
            records={records}
          />
        )}

        {currentTab === 'thu-vien' && (
          <ThuVienDiSan 
            records={records}
            onSelectRecord={handleSelectRecord}
            onNavigate={handleSelectTab}
          />
        )}

        {currentTab === 'chi-tiet' && (
          <ChiTietTuLieu 
            records={records}
            selectedRecordId={selectedRecordId}
            onSelectRecord={handleSelectRecord}
            onNavigate={handleSelectTab}
          />
        )}

        {currentTab === 'tro-ly-ai' && (
          <TroLyAiGemini 
            records={records}
            onSelectRecord={handleSelectRecord}
            onNavigate={handleSelectTab}
          />
        )}

        {currentTab === 'nguon-tu-lieu' && (
          <NguonTuLieu />
        )}

        {currentTab === 'gioi-thieu' && (
          <GioiThieu />
        )}
      </main>

      {/* Footer */}
      <Footer 
        currentTab={currentTab} 
        onSelectTab={handleSelectTab} 
      />

      {/* Mobile-friendly bottom navigation bar */}
      <MobileBottomNav 
        currentTab={currentTab} 
        onSelectTab={handleSelectTab} 
      />
    </div>
  );
}
