import React from 'react';
import { ShieldCheck, MapPin, Mail, Phone, Heart } from 'lucide-react';
import { UserRole, SiteContentConfig } from '../types';
import { DEFAULT_SITE_CONTENT } from '../data/mockData';

interface FooterProps {
  currentRole: UserRole;
  onOpenRoleModal: () => void;
  content?: SiteContentConfig;
}

export const Footer: React.FC<FooterProps> = ({ 
  currentRole, 
  onOpenRoleModal,
  content = DEFAULT_SITE_CONTENT
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Wordmark & Identity */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 text-white font-bold text-lg mb-3">
              <img
                src="/assets/aistudio/SAVE_20240918_131449-removebg-preview_b7c4bfb0.png"
                alt="Logo PMII Rayon Tarbiyah"
                className="w-10 h-10 object-contain drop-shadow-md"
              />
              <div>
                <span className="block leading-tight text-white font-extrabold">{content.brandName || 'PMII Rayon Tarbiyah'}</span>
                <span className="text-[11px] text-[#fed100] font-semibold tracking-wider uppercase block">
                  {content.facultyName || 'Fakultas Tarbiyah'}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Pergerakan Mahasiswa Islam Indonesia (PMII) Rayon {content.facultyName || 'Fakultas Tarbiyah'}. Wadah pembinaan kader calon pendidik program studi PAI dan PGMI berkarakter Ahlussunnah wal Jama'ah An-Nahdliyyah dengan bekal nalar kritis, integritas moral, dan keunggulan pedagogis.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#fed100] font-medium">
              <span>Semboyan Perjuangan:</span>
              <span className="italic text-white">{content.motto || '“Dzikir, Fikir, Amal Sholeh”'}</span>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#profil" className="hover:text-white transition-colors">Profil Rayon Tarbiyah</a>
              </li>
              <li>
                <a href="#struktur" className="hover:text-white transition-colors">Struktur Pengurus</a>
              </li>
              <li>
                <a href="#pendaftaran" className="hover:text-white transition-colors">Pendaftaran Anggota Baru</a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-white transition-colors">Galeri Kegiatan</a>
              </li>
              <li>
                <a href="#agenda" className="hover:text-white transition-colors">Jadwal & Agenda</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sekretariat & Kontak */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Sekretariat & Hubungan
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{content.secretariatAddress || 'Gedung Pusat Kegiatan Mahasiswa (PKM) Fakultas Tarbiyah, Kampus Tarbiyah'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{content.contactPhone || '0812-3456-7890 (Biro Kaderisasi)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{content.contactEmail || 'rayon.tarbiyah@pmii.or.id'}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenRoleModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium transition-colors border border-slate-700 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{currentRole === 'admin' ? 'Panel Pengurus / Admin' : 'Login Pengurus / Admin'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 PMII Rayon Tarbiyah · Fakultas Tarbiyah. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="italic text-slate-400 font-medium tracking-wide">
              <i>XThree Development</i>
            </span>
            <span className="hidden sm:inline text-slate-700">·</span>
            <p className="flex items-center gap-1">
              <span>Salam Pergerakan! Tangan Terkepal dan Maju ke Muka.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
