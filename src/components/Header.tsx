import React from 'react';
import { UserRole } from '../types';
import { ShieldCheck, UserCheck } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onOpenRoleModal: () => void;
  onSwitchToAdmin: () => void;
  onSwitchToGuest: () => void;
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onOpenRoleModal,
  onSwitchToGuest,
  onOpenSidebar
}) => {

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8 h-16">
          {/* Zone 1: Single clean text element wordmark with official logo */}
          <a
            href="#"
            className="text-lg font-bold tracking-tight text-[#0c1b69] dark:text-blue-400 hover:text-[#09174f] dark:hover:text-blue-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5"
          >
            <img
              src="/assets/aistudio/SAVE_20240918_131449-removebg-preview_b7c4bfb0.png"
              alt="Logo Resmi PMII Rayon Tarbiyah"
              className="w-9 h-9 object-contain drop-shadow-sm shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-base leading-tight tracking-tight text-[#0c1b69] dark:text-blue-400">
                PMII Rayon Tarbiyah
              </span>
              <span className="text-[10px] font-semibold text-[#e52421] dark:text-red-400 tracking-wider uppercase">
                Dzikir · Fikir · Amal Sholeh
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 single-line text links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#profil" className="hover:text-[#0c1b69] dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
              Profil & Wacana
            </a>
            <a href="#struktur" className="hover:text-[#0c1b69] dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
              Struktur
            </a>
            <a href="#pendaftaran" className="hover:text-[#0c1b69] dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
              Pendaftaran
            </a>
            <a href="#galeri" className="hover:text-[#0c1b69] dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
              Galeri
            </a>
            <a href="#agenda" className="hover:text-[#0c1b69] dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
              Agenda
            </a>
          </nav>

          {/* Zone 3: Actions + Garis Sidebar Toggle at the top right */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {currentRole === 'admin' ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={onSwitchToGuest}
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#0c1b69] dark:text-blue-400" />
                  <span className="hidden sm:inline">Mode Tamu</span>
                </button>
                <button
                  onClick={onOpenRoleModal}
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-white bg-[#e52421] hover:bg-red-700 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href="#pendaftaran"
                  className="hidden sm:inline-block px-3.5 py-2 text-xs font-semibold text-white bg-[#0c1b69] hover:bg-[#09174f] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm border border-[#0c1b69] dark:border-blue-600"
                >
                  Daftar MAPABA
                </a>
              </div>
            )}

            {/* Unified Hamburger Sidebar Button (matches exact 3-line icon) */}
            <button
              onClick={onOpenSidebar}
              className="p-2 sm:px-2.5 sm:py-2 text-white bg-[#0c1b69] hover:bg-[#09174f] dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm border border-[#0c1b69] dark:border-slate-700 flex items-center justify-center cursor-pointer group"
              title="Menu & Sidebar (Navigasi, Artikel, Quotes, Sorotan, Setting)"
              aria-label="Buka Menu & Sidebar"
            >
              {/* 3 horizontal white bars */}
              <div className="flex flex-col gap-1 w-5 justify-center items-center py-0.5">
                <span className="w-5 h-0.5 bg-white dark:bg-slate-100 rounded-full group-hover:bg-[#fed100] transition-colors" />
                <span className="w-5 h-0.5 bg-white dark:bg-slate-100 rounded-full group-hover:bg-[#fed100] transition-colors" />
                <span className="w-5 h-0.5 bg-white dark:bg-slate-100 rounded-full group-hover:bg-[#fed100] transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

