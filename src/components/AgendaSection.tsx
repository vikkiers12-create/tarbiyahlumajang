import React from 'react';
import { AgendaItem } from '../types';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';

interface AgendaSectionProps {
  agendas: AgendaItem[];
  onScrollToRegister: () => void;
}

export const AgendaSection: React.FC<AgendaSectionProps> = ({ agendas, onScrollToRegister }) => {
  return (
    <section id="agenda" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <span className="text-[#0c1b69]">Jadwal & Pengumuman</span>
            <span aria-hidden="true">·</span>
            <span>Masa Khidmat Berjalan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Agenda Kegiatan Mendatang
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Catat tanggal dan ikuti berbagai forum ilmiah, kaderisasi formal, serta pelatihan skill yang diselenggarakan rayon.
          </p>
        </div>

        {/* Agenda Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agendas.map(agenda => (
            <div
              key={agenda.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-[#0c1b69]">{agenda.kategori}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0c1b69] font-medium text-[11px] border border-blue-200">
                    {agenda.status}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-3 leading-snug">
                  {agenda.judul}
                </h3>

                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  {agenda.deskripsi}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-700">{agenda.tanggal}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{agenda.waktu}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{agenda.tempat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action card */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#0c1b69] to-[#09174f] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-blue-900">
          <div>
            <h4 className="text-lg sm:text-xl font-bold">Siap Mengambil Bagian dalam Gerakan?</h4>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
              Daftarkan diri Anda sekarang untuk menjadi calon anggota PMII Rayon Tarbiyah angkatan XXVII dan bangun masa depan pendidikan Indonesia.
            </p>
          </div>
          <button
            onClick={onScrollToRegister}
            className="px-6 py-3 bg-[#fed100] hover:bg-yellow-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors shrink-0 shadow-md"
          >
            Daftar Sekarang
          </button>
        </div>

      </div>
    </section>
  );
};
