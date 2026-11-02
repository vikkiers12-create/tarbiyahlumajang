import React, { useState, useEffect } from 'react';
import { 
  X, 
  Menu as MenuIcon,
  Compass,
  BookOpen, 
  Quote as QuoteIcon, 
  Sparkles, 
  Settings, 
  Moon, 
  Sun, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  MapPin, 
  Eye,
  Home,
  Users,
  UserPlus,
  Image as ImageIcon
} from 'lucide-react';
import { UserRole, MovementQuote, ProfileArticle, PhotoHighlight, GalleryItem } from '../types';
import { PROFILE_ARTICLES, PHOTO_HIGHLIGHTS } from '../data/mockData';

export type SidebarTab = 'menu' | 'artikel' | 'quotes' | 'sorotan' | 'setting';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onOpenRoleModal: () => void;
  onSwitchToGuest: () => void;
  onSwitchToAdmin?: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  quotes: MovementQuote[];
  galleryItems?: GalleryItem[];
  defaultTab?: SidebarTab;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  currentRole,
  onOpenRoleModal,
  onSwitchToGuest,
  isDarkMode,
  onToggleDarkMode,
  quotes,
  galleryItems = [],
  defaultTab = 'menu'
}) => {
  const [activeTab, setActiveTab] = useState<SidebarTab>(defaultTab);
  const [selectedArticle, setSelectedArticle] = useState<ProfileArticle | null>(null);
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoHighlight | GalleryItem | null>(null);

  // Sync default tab if changed from outside
  useEffect(() => {
    if (isOpen && defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedArticle) {
          setSelectedArticle(null);
        } else if (selectedPhoto) {
          setSelectedPhoto(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, selectedArticle, selectedPhoto, onClose]);

  const handleCopyQuote = (quote: MovementQuote) => {
    const textToCopy = `"${quote.kutipan}"\n— ${quote.tokoh} (${quote.peran})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedQuoteId(quote.id);
    setTimeout(() => {
      setCopiedQuoteId(null);
    }, 2000);
  };

  const handleNavClick = (anchorId: string) => {
    onClose();
    setTimeout(() => {
      if (anchorId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.querySelector(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <aside 
          className="w-screen max-w-md bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300 transition-colors"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sidebar-title"
        >
          {/* Header Drawer */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/SAVE_20240918_131449-removebg-preview_b7c4bfb0.png"
                alt="Logo PMII"
                className="w-8 h-8 object-contain shrink-0 drop-shadow-sm"
              />
              <div>
                <h2 id="sidebar-title" className="font-extrabold text-sm sm:text-base text-[#0c1b69] dark:text-blue-400 tracking-tight leading-tight">
                  PMII Rayon Tarbiyah
                </h2>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Dzikir · Fikir · Amal Sholeh
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              title="Tutup Menu (Esc)"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unified Navigation Tabs (Menu, Artikel, Quotes, Foto Sorotan, Setting) */}
          <div className="grid grid-cols-5 p-1.5 gap-1 bg-slate-100 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold">
            <button
              onClick={() => { setActiveTab('menu'); setSelectedArticle(null); }}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                activeTab === 'menu'
                  ? 'bg-white dark:bg-slate-800 text-[#0c1b69] dark:text-blue-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Compass className="w-4 h-4 mb-1" />
              <span>Menu</span>
            </button>

            <button
              onClick={() => { setActiveTab('artikel'); setSelectedArticle(null); }}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                activeTab === 'artikel'
                  ? 'bg-white dark:bg-slate-800 text-[#0c1b69] dark:text-blue-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4 mb-1" />
              <span>Artikel</span>
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                activeTab === 'quotes'
                  ? 'bg-white dark:bg-slate-800 text-[#0c1b69] dark:text-blue-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <QuoteIcon className="w-4 h-4 mb-1" />
              <span>Quotes</span>
            </button>

            <button
              onClick={() => setActiveTab('sorotan')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                activeTab === 'sorotan'
                  ? 'bg-white dark:bg-slate-800 text-[#0c1b69] dark:text-blue-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 mb-1" />
              <span>Sorotan</span>
            </button>

            <button
              onClick={() => setActiveTab('setting')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                activeTab === 'setting'
                  ? 'bg-white dark:bg-slate-800 text-[#0c1b69] dark:text-blue-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Settings className="w-4 h-4 mb-1" />
              <span>Setting</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            
            {/* TAB 0: MENU NAVIGASI UTAMA (Menjadikan satu dengan menu halaman) */}
            {activeTab === 'menu' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#0c1b69] dark:text-blue-400" />
                    Navigasi Halaman Portal
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold">
                    Rayon Tarbiyah
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleNavClick('#')}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/60 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-[#0c1b69] dark:text-blue-300">
                        <Home className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#0c1b69] dark:group-hover:text-blue-300 transition-colors">
                          Beranda Utama
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Halaman depan & informasi pembuka
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0c1b69] dark:group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={() => handleNavClick('#profil')}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/60 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#0c1b69] dark:group-hover:text-blue-300 transition-colors">
                          Profil & Landasan Gerak
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Nilai Dasar Pergerakan (NDP), Visi & Misi
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0c1b69] dark:group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={() => handleNavClick('#struktur')}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/60 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#0c1b69] dark:group-hover:text-blue-300 transition-colors">
                          Struktur Pengurus
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Badan Pengurus Harian & KOPRI Tarbiyah
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0c1b69] dark:group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={() => handleNavClick('#pendaftaran')}
                    className="w-full p-3 rounded-xl border-2 border-[#0c1b69]/40 dark:border-blue-600/40 bg-blue-50/60 dark:bg-blue-950/40 hover:bg-blue-100/70 dark:hover:bg-blue-900/50 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#0c1b69] text-white">
                        <UserPlus className="w-4 h-4 text-[#fed100]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#0c1b69] dark:text-blue-300">
                          Pendaftaran Calon Anggota (MAPABA)
                        </h4>
                        <p className="text-[11px] text-blue-700 dark:text-blue-300/80">
                          Formulir online resmi mahasiswa PAI & PGMI
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#0c1b69] text-white text-[10px] font-bold">
                      Daftar
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavClick('#galeri')}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/60 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#0c1b69] dark:group-hover:text-blue-300 transition-colors">
                          Galeri Kegiatan
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Dokumentasi kaderisasi & aksi sosial
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0c1b69] dark:group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={() => handleNavClick('#agenda')}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/60 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/50 text-[#e52421] dark:text-red-300">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#0c1b69] dark:group-hover:text-blue-300 transition-colors">
                          Agenda & Jadwal Kegiatan
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Timeline kegiatan rayon yang akan datang
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0c1b69] dark:group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>

                {/* Quick Section to Settings inside Menu */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setActiveTab('setting')}
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-between text-xs font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-[#0c1b69] dark:text-blue-400" />
                      <span>Buka Pengaturan (Mode Gelap & Admin)</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 1: ARTIKEL */}
            {activeTab === 'artikel' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#0c1b69] dark:text-blue-400" />
                    Wacana & Artikel Ilmiah
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold">
                    {PROFILE_ARTICLES.length} Tulisan
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ruang dialektika dan gagasan pedagogik kader PMII Fakultas Tarbiyah (PAI & PGMI) untuk kemajuan pendidikan Islam Nusantara.
                </p>

                <div className="space-y-3">
                  {PROFILE_ARTICLES.map((art) => (
                    <article
                      key={art.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-blue-400 dark:hover:border-blue-500 transition-all group cursor-pointer"
                      onClick={() => setSelectedArticle(art)}
                    >
                      <div className="flex items-center justify-between gap-2 text-[10px] text-slate-500 dark:text-slate-400 mb-1.5">
                        <span className="font-semibold px-2 py-0.5 bg-blue-100/70 dark:bg-blue-900/40 text-[#0c1b69] dark:text-blue-300 rounded">
                          {art.kategori}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {art.estimasiBaca}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-[#0c1b69] dark:group-hover:text-blue-300 transition-colors line-clamp-2 leading-snug">
                        {art.judul}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {art.ringkasan}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-700 dark:text-slate-300 text-[11px]">
                          {art.penulis}
                        </span>
                        <span className="text-[#0c1b69] dark:text-blue-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[11px]">
                          Baca <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: QUOTES */}
            {activeTab === 'quotes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <QuoteIcon className="w-3.5 h-3.5 text-amber-500" />
                    Kutipan Pergerakan Tokoh
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-semibold">
                    {quotes.length} Quotes
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Inspirasi perjuangan dari para pendiri, pendekar pena, dan mahaguru pendidikan Islam Aswaja.
                </p>

                <div className="space-y-3.5">
                  {quotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 relative overflow-hidden group hover:border-amber-400/80 transition-all"
                    >
                      <div className="absolute top-2 right-2 text-slate-200 dark:text-slate-800 group-hover:text-amber-200/40 dark:group-hover:text-amber-900/30 transition-colors pointer-events-none">
                        <QuoteIcon className="w-12 h-12 rotate-180 -mr-2 -mt-2" />
                      </div>

                      <p className="text-xs sm:text-sm italic font-serif leading-relaxed text-slate-800 dark:text-slate-200 relative z-10">
                        "{quote.kutipan}"
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between relative z-10">
                        <div>
                          <p className="text-xs font-bold text-[#0c1b69] dark:text-amber-300">
                            {quote.tokoh}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            {quote.peran}
                          </p>
                        </div>

                        <button
                          onClick={() => handleCopyQuote(quote)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400 transition-colors shrink-0"
                          title="Salin Kutipan"
                        >
                          {copiedQuoteId === quote.id ? (
                            <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold px-1">
                              <Check className="w-3 h-3" />
                              Tersalin
                            </span>
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: FOTO SOROTAN */}
            {activeTab === 'sorotan' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#e52421]" />
                    Foto Sorotan Kegiatan
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-semibold">
                    Sorotan Utama
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Dokumentasi rekam jejak pengkaderan formal MAPABA, bedah buku keilmuan, dan aksi Tarbiyah Mengajar.
                </p>

                <div className="space-y-4">
                  {PHOTO_HIGHLIGHTS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPhoto(item)}
                      className="group rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={item.imageUrl}
                          alt={item.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          {item.tanggal}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <span className="text-[11px] text-white font-medium flex items-center gap-1">
                            <Eye className="w-3 h-3" /> Klik untuk perbesar
                          </span>
                        </div>
                      </div>

                      <div className="p-3">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.judul}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                          <MapPin className="w-3 h-3 text-[#e52421]" />
                          <span>{item.lokasi}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                          {item.deskripsi}
                        </p>
                      </div>
                    </div>
                  ))}

                  {galleryItems.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPhoto(item)}
                      className="group rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={item.imageUrl}
                          alt={item.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0c1b69]/80 backdrop-blur-md text-white text-[10px] font-semibold uppercase">
                          {item.kategori}
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                          {item.judul}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                          <MapPin className="w-3 h-3 text-[#e52421]" />
                          <span>{item.lokasi}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SETTING (MODE GELAP & LOGIN ADMIN) */}
            {activeTab === 'setting' && (
              <div className="space-y-5">
                <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Settings className="w-3.5 h-3.5 text-[#0c1b69] dark:text-blue-400" />
                    Pengaturan Portal
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Sesuaikan tampilan tema dan kelola akses kepengurusan.
                  </p>
                </div>

                {/* 1. Pengaturan Mode Gelap (Dark Mode) */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-amber-400/20 text-amber-300' : 'bg-blue-100 text-[#0c1b69]'}`}>
                        {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          Mode Gelap (Dark Mode)
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {isDarkMode ? 'Tema malam aktif (nyaman di mata)' : 'Tema terang standar aktif'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={onToggleDarkMode}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0c1b69] focus:ring-offset-2 ${
                        isDarkMode ? 'bg-[#0c1b69] dark:bg-blue-600' : 'bg-slate-300'
                      }`}
                      role="switch"
                      aria-checked={isDarkMode}
                      title="Klik untuk beralih mode gelap / terang"
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isDarkMode ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => { if (isDarkMode) onToggleDarkMode(); }}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        !isDarkMode
                          ? 'bg-white text-[#0c1b69] border-[#0c1b69] shadow-sm ring-1 ring-[#0c1b69]'
                          : 'bg-transparent text-slate-400 border-slate-700 hover:bg-slate-700/50'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Mode Terang</span>
                    </button>

                    <button
                      onClick={() => { if (!isDarkMode) onToggleDarkMode(); }}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        isDarkMode
                          ? 'bg-blue-600 text-white border-blue-500 shadow-sm ring-1 ring-blue-400'
                          : 'bg-transparent text-slate-600 border-slate-300 hover:bg-slate-200/60'
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5 text-amber-300" />
                      <span>Mode Gelap</span>
                    </button>
                  </div>
                </div>

                {/* 2. Pengaturan Login Admin */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#0c1b69] text-white">
                      <ShieldCheck className="w-4 h-4 text-[#fed100]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Otoritas Pengurus & Admin
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {currentRole === 'admin' ? 'Anda masuk sebagai Pengurus Aktif' : 'Status saat ini: Tamu Publik'}
                      </p>
                    </div>
                  </div>

                  {currentRole === 'admin' ? (
                    <div className="space-y-2.5 pt-1">
                      <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                        <span className="font-medium flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Akses Admin Aktif
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-200/60 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded">
                          Terverifikasi
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Anda memiliki izin mengedit teks beranda, verifikasi data pendaftar MAPABA, serta upload foto kegiatan.
                      </p>

                      <div className="flex flex-col gap-2 pt-1">
                        <button
                          onClick={() => {
                            onClose();
                          }}
                          className="w-full py-2.5 px-3 bg-[#0c1b69] hover:bg-[#09174f] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-[#fed100]" />
                          <span>Lihat Dashboard Admin</span>
                        </button>

                        <button
                          onClick={() => {
                            onSwitchToGuest();
                            onClose();
                          }}
                          className="w-full py-2 px-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                          <span>Keluar / Beralih ke Mode Tamu</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2.5 pt-1">
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Khusus fungsionaris PMII Rayon Tarbiyah untuk verifikasi berkas pendaftar MAPABA, edit teks, dan kelola kegiatan.
                      </p>

                      <button
                        onClick={() => {
                          onClose();
                          onOpenRoleModal();
                        }}
                        className="w-full py-2.5 px-4 bg-[#0c1b69] hover:bg-[#09174f] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#fed100]" />
                        <span>Login Pengurus / Admin</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-center pt-3 text-[11px] text-slate-400 dark:text-slate-500">
                  PMII Rayon Tarbiyah · Versi 2026.1
                </div>
              </div>
            )}
          </div>

          {/* Footer of Sidebar */}
          <div className="p-3 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              "Tangan Terkepal dan Maju ke Muka"
            </p>
          </div>
        </aside>
      </div>

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <div 
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900/50 text-[#0c1b69] dark:text-blue-300">
                {selectedArticle.kategori}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700"
                title="Tutup (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-7 overflow-y-auto space-y-4">
              <h3 className="font-extrabold text-lg sm:text-2xl text-slate-900 dark:text-white leading-tight font-serif-display">
                {selectedArticle.judul}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedArticle.penulis}</span>
                <span>•</span>
                <span>{selectedArticle.jabatanPenulis}</span>
                <span>•</span>
                <span>{selectedArticle.tanggal}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedArticle.estimasiBaca}</span>
              </div>

              <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/30 border-l-4 border-[#0c1b69] dark:border-blue-500 rounded-r-lg text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic">
                "{selectedArticle.ringkasan}"
              </div>

              <div className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200 space-y-3 font-normal">
                {selectedArticle.isiLengkap.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Kajian Ilmiah PMII Rayon Tarbiyah
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 bg-[#0c1b69] text-white hover:bg-[#09174f] text-xs font-semibold rounded-lg"
              >
                Tutup Bacaan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHOTO PREVIEW MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 z-10 transition-colors"
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.judul}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="p-4 bg-slate-900 text-white">
              <h3 className="font-bold text-base">{selectedPhoto.judul}</h3>
              <p className="text-xs text-slate-300 mt-1">{selectedPhoto.deskripsi}</p>
              <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                <span>{selectedPhoto.tanggal}</span>
                <span>•</span>
                <span>{selectedPhoto.lokasi}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
