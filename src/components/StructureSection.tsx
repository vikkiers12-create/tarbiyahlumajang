import React from 'react';
import { STRUCTURE_MEMBERS, DEFAULT_SITE_CONTENT } from '../data/mockData';
import { Users, GraduationCap, Shield } from 'lucide-react';
import { SiteContentConfig } from '../types';

interface StructureSectionProps {
  content?: SiteContentConfig;
}

export const StructureSection: React.FC<StructureSectionProps> = ({ content = DEFAULT_SITE_CONTENT }) => {
  return (
    <section id="struktur" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <span className="text-[#0c1b69] font-bold">Pengurus Harian & Biro</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#e52421] font-semibold">{content.facultyName || 'Fakultas Tarbiyah'}</span>
            <span aria-hidden="true">·</span>
            <span>Masa Khidmat 2026/2027</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {content.structureTitle || 'Struktur Kepengurusan Rayon Tarbiyah'}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {content.structureSubtitle || 'Digerakkan oleh kader-kader mahasiswa program studi PAI dan PGMI yang berdedikasi membangun iklim organisasi yang sehat, inklusif, dan progresif.'}
          </p>
        </div>

        {/* Structure Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STRUCTURE_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0c1b69] text-[#fed100] flex items-center justify-center font-bold text-lg shrink-0 shadow-sm border border-blue-900">
                {member.nama.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-[#e52421] uppercase tracking-wider block truncate">
                  {member.jabatan}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5 truncate">
                  {member.nama}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                  <GraduationCap className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">{member.prodi}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Biro & Badan Semi Otonom Description */}
        <div className="mt-12 p-6 rounded-2xl bg-blue-50/50 border border-blue-200/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0c1b69] text-[#fed100] flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Korps PMII Putri (KOPRI) Rayon Tarbiyah</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Wadah independen pengkaderan dan pemberdayaan kader perempuan dalam kesetaraan gender berbasis nilai Islam rahmatan lil 'alamin.
              </p>
            </div>
          </div>
          <div className="text-xs font-semibold text-[#0c1b69] whitespace-nowrap px-4 py-2 bg-white rounded-lg border border-blue-200 shadow-xs">
            Aktif 7 Divisi Kajian
          </div>
        </div>

      </div>
    </section>
  );
};
