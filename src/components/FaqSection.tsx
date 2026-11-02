import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <span className="text-[#0c1b69]">Tanya Jawab</span>
            <span aria-hidden="true">·</span>
            <span>Informasi Calon Anggota</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="mt-2 text-slate-600 text-sm max-w-xl mx-auto">
            Segala hal yang perlu sahabat-sahabati ketahui mengenai pendaftaran, MAPABA, dan aktivitas PMII Rayon Tarbiyah.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 text-sm sm:text-base flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#0c1b69] text-xs font-bold flex items-center justify-center shrink-0">
                    Q
                  </span>
                  <span>{faq.pertanyaan}</span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                    openIdx === idx ? 'rotate-180 text-[#0c1b69]' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-6 py-4 bg-white text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed">
                  {faq.jawaban}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
