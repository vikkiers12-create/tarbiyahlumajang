import React from 'react';
import { ArrowRight, Search, CheckCircle2, Award, BookOpen, Users, Compass } from 'lucide-react';
import { SiteContentConfig } from '../types';
import { DEFAULT_SITE_CONTENT } from '../data/mockData';

interface HeroProps {
  content?: SiteContentConfig;
  onScrollToRegister: () => void;
  onScrollToStatus: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  content = DEFAULT_SITE_CONTENT,
  onScrollToRegister, 
  onScrollToStatus 
}) => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Background subtle graphic accent */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-50 dark:bg-blue-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-amber-50 dark:bg-amber-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-18 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] [text-wrap:balance]">
              {content.heroTitle || 'Membentuk Pendidik Berkarakter, Kritis Transformatif & Berhaluan Aswaja'}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {content.heroDescription || 'Kawah candradimuka mahasiswa Fakultas Tarbiyah (PAI & PGMI) dalam mengasah intelektual, kepemimpinan pedagogis, dan spiritualitas Islam Nusantara berlandaskan semboyan “Dzikir, Fikir, dan Amal Sholeh”.'}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onScrollToRegister}
                className="px-6 py-3.5 bg-[#0c1b69] hover:bg-[#09174f] text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 shrink-0 border border-[#0c1b69]"
              >
                <span>Daftar Anggota Baru (MAPABA)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onScrollToStatus}
                className="px-5 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl transition-colors inline-flex items-center gap-2 shrink-0 border border-slate-200 dark:border-slate-700"
              >
                <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Cek Status Pendaftaran</span>
              </button>
            </div>

            {/* Micro Trust Markers */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{content.heroBadge1 || 'Pendaftaran Online 100% Gratis'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{content.heroBadge2 || 'Sertifikat Kaderisasi Resmi'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{content.heroBadge3 || 'Bimbingan Akademik & Karya Tulis'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl bg-slate-100 dark:bg-slate-800 aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px]">
              <img
                src="/src/assets/images/pmii_hero_students_1793298963549.jpg"
                alt="Kader PMII Rayon Tarbiyah berkumpul di kampus"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-1">
                  <span>Masa Penerimaan Anggota Baru (MAPABA)</span>
                  <span>·</span>
                  <span>Angkatan XXVII</span>
                </div>
                <p className="text-sm font-medium text-slate-100 leading-snug">
                  {content.heroPhotoQuote || '"Tangan Terkepal dan Maju ke Muka, Mundur Satu Langkah Adalah Bentuk Penghianatan."'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Strip placed in full-width row below hero split */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{content.heroStat1Label || 'Sejarah Berdiri'}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0c1b69] dark:text-blue-400 tabular-nums font-mono">
              {content.heroStat1Number || '1960'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{content.heroStat1Desc || 'PMII berdiri mengawal Islam Nusantara & NKRI'}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <BookOpen className="w-4 h-4 text-[#0c1b69] dark:text-blue-400" />
              <span>{content.heroStat2Label || 'Program Studi Unggulan'}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0c1b69] dark:text-blue-400 tabular-nums font-mono">
              {content.heroStat2Number || '2 Prodi'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{content.heroStat2Desc || 'Pendidikan Agama Islam (PAI) & PGMI'}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{content.heroStat3Label || 'Kader & Alumni'}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0c1b69] dark:text-blue-400 tabular-nums font-mono">
              {content.heroStat3Number || '450+'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{content.heroStat3Desc || 'Jejaring guru, dosen, peneliti, dan birokrat'}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{content.heroStat4Label || 'Angkatan Kaderisasi'}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0c1b69] dark:text-blue-400 tabular-nums font-mono">
              {content.heroStat4Number || '27 Kali'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{content.heroStat4Desc || 'Tradisi kaderisasi berkelanjutan & konsisten'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
