import React, { useState } from 'react';
import { 
  Compass, 
  Target, 
  BookOpen, 
  Quote, 
  Image as ImageIcon, 
  Calendar, 
  User, 
  Clock, 
  Copy, 
  Check, 
  X, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PROFILE_ARTICLES, MOVEMENT_QUOTES, PHOTO_HIGHLIGHTS, DEFAULT_SITE_CONTENT } from '../data/mockData';
import { ProfileArticle, MovementQuote, SiteContentConfig } from '../types';

interface AboutSectionProps {
  movementQuotes?: MovementQuote[];
  content?: SiteContentConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  movementQuotes = MOVEMENT_QUOTES,
  content = DEFAULT_SITE_CONTENT
}) => {
  // Tab for latest information inside profile
  const [activeInfoTab, setActiveInfoTab] = useState<'artikel' | 'quotes' | 'foto'>('artikel');
  const [selectedArticle, setSelectedArticle] = useState<ProfileArticle | null>(null);
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);

  const handleCopyQuote = (quoteText: string, author: string, id: string) => {
    navigator.clipboard.writeText(`"${quoteText}" — ${author}`);
    setCopiedQuoteId(id);
    setTimeout(() => setCopiedQuoteId(null), 2000);
  };

  return (
    <section id="profil" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Official Logo */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              <span className="text-[#0c1b69] dark:text-blue-400 font-bold">Profil & Landasan Gerak</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#e52421] dark:text-red-400 font-bold">{content.facultyName || 'Fakultas Tarbiyah'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {content.aboutTitle || 'Mengenal Lebih Dekat PMII Rayon Tarbiyah'}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {content.aboutDescription || 'Sebagai bagian integral dari keluarga besar Pergerakan Mahasiswa Islam Indonesia, Rayon Tarbiyah hadir secara spesifik menjawab kebutuhan mahasiswa calon pendidik agar menguasai teori pedagogis di ruang kuliah, memiliki sensitivitas sosial, nalar kritis transformatif, dan akhlakul karimah.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <img
              src="/assets/aistudio/SAVE_20240918_131449-removebg-preview_b7c4bfb0.png"
              alt="Lambang PMII Rayon Tarbiyah"
              className="w-24 h-24 object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* 4 Pilar Nilai Dasar Pergerakan (NDP) Grid */}
        <div className="mb-16">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#0c1b69]" />
            <span>4 Pilar Nilai Dasar Pergerakan (NDP)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0c1b69] flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">{content.ndp1Title || 'Tauhid'}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {content.ndp1Desc || 'Pondasi spiritualitas tertinggi yang membebaskan manusia dari penghambaan kepada materi, kekuasaan, dan kezaliman struktural.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e52421] flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">{content.ndp2Title || 'Hablum Minallah'}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {content.ndp2Desc || 'Memelihara ketaatan ibadah, dzikir, serta keikhlasan batin sebagai energi moral dalam setiap hembusan nafas perjuangan organisasi.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0c1b69] flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">{content.ndp3Title || 'Hablum Minannas'}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {content.ndp3Desc || 'Menjunjung tinggi keadilan sosial, kesetaraan martabat, persaudaraan lintas kultural, dan pembelaan kaum mustadh\'afin.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
                04
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">{content.ndp4Title || 'Hablum Minal Alam'}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {content.ndp4Desc || 'Menjaga kelestarian ekologi dan keharmonisan lingkungan hidup sebagai khalifah fil ardh yang bertanggung jawab bagi masa depan generasi.'}
              </p>
            </div>
          </div>
        </div>

        {/* Visi & Misi Box Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          <div className="lg:col-span-5 p-8 rounded-2xl bg-[#0c1b69] text-white flex flex-col justify-between shadow-md relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
              <img
                src="/assets/aistudio/SAVE_20240918_131449-removebg-preview_b7c4bfb0.png"
                alt="Logo Stamp"
                className="w-56 h-56"
              />
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black mb-5 shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest">
                Visi Kepengurusan
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mt-2 leading-snug">
                {content.visiTitle || '"Mewujudkan Kader Tarbiyah yang Berakar pada Nilai Aswaja, Unggul Pedagogis, dan Berintegritas Moral."'}
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-blue-100 leading-relaxed">
                {content.visiDescription || 'Mempersiapkan kader calon guru dan akademisi Islam yang cakap menjawab tantangan disrupsi teknologi pendidikan tanpa kehilangan esensi adab santri.'}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-blue-400/30 flex items-center justify-between text-xs text-blue-200">
              <span>Tri Khidmah PMII:</span>
              <span className="font-semibold text-white">Taqwa · Intelektual · Profesional</span>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-[#e52421] uppercase tracking-wider">
                Misi Strategis Rayon
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-6">
                Langkah Nyata Pengembangan Kader Tarbiyah
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0c1b69] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900">Kaderisasi Berkelanjutan</h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {content.misi1 || 'Menyelenggarakan MAPABA berkualitas, follow-up berkala, dan sekolah pemikiran pendidikan Islam kontemporer.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0c1b69] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900">Literasi & Riset Pendidikan</h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {content.misi2 || 'Memfasilitasi kader menerbitkan artikel ilmiah, jurnal pedagogik, dan opini kritis di media massa nasional.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0c1b69] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900">Pengabdian Mengajar & Bina Desa</h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {content.misi3 || 'Menerjunkan kader langsung mendampingi madrasah pelosok melalui kurikulum kreatif dan penguatan karakter anak bangsa.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0c1b69] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900">Advokasi Mahasiswa Tarbiyah</h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {content.misi4 || 'Mengawal transparansi tata kelola kampus, kebebasan berekspresi, dan kebijakan pembiayaan kuliah yang berkeadilan.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Tri Komitmen:</span>
              <span>Kejujuran · Kebenaran · Keadilan</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NEW SUB-SECTION: INFORMASI TERBARU (ARTIKEL, QUOTES, DAN FOTO SOROTAN)   */}
        {/* ========================================================================= */}
        <div className="mt-8 pt-12 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <span className="text-[#e52421] font-bold">Wacana & Informasi Terbaru</span>
                <span aria-hidden="true">·</span>
                <span>Suara Gerakan Intelektual</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Kabar Terkini, Artikel Pemikiran & Kutipan Tokoh
              </h3>
              <p className="mt-2 text-slate-600 text-sm max-w-2xl">
                Ruang literasi dan dialektika kader PMII Rayon Tarbiyah menyajikan artikel opini terhangat, petuah inspiratif pendiri pergerakan, serta sorotan dokumentasi kegiatan terkini.
              </p>
            </div>

            {/* Segmented Filter Controls */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl shrink-0 border border-slate-300/60">
              <button
                onClick={() => setActiveInfoTab('artikel')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeInfoTab === 'artikel'
                    ? 'bg-white text-[#0c1b69] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Artikel & Opini ({PROFILE_ARTICLES.length})</span>
              </button>

              <button
                onClick={() => setActiveInfoTab('quotes')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeInfoTab === 'quotes'
                    ? 'bg-white text-[#0c1b69] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Quote className="w-3.5 h-3.5" />
                <span>Quotes Tokoh ({movementQuotes.length})</span>
              </button>

              <button
                onClick={() => setActiveInfoTab('foto')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeInfoTab === 'foto'
                    ? 'bg-white text-[#0c1b69] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Foto Sorotan ({PHOTO_HIGHLIGHTS.length})</span>
              </button>
            </div>
          </div>

          {/* TAB 1: ARTIKEL & OPINI KADER */}
          {activeInfoTab === 'artikel' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              {PROFILE_ARTICLES.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-blue-300"
                >
                  <div>
                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                      <span className="font-semibold text-[#e52421]">{article.kategori}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.estimasiBaca}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0c1b69] transition-colors leading-snug line-clamp-2">
                      {article.judul}
                    </h4>

                    <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {article.ringkasan}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-800 block truncate max-w-[170px]">
                        {article.penulis}
                      </span>
                      <span className="text-[11px] text-slate-400 block">
                        {article.tanggal}
                      </span>
                    </div>
                    <span className="text-[#0c1b69] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Baca</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: QUOTES TOKOH & PERGERAKAN */}
          {activeInfoTab === 'quotes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {movementQuotes.map((q) => (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-slate-400 mb-4">
                      <Quote className="w-8 h-8 text-[#0c1b69]/20" />
                      <button
                        onClick={() => handleCopyQuote(q.kutipan, q.tokoh, q.id)}
                        className="px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-[#0c1b69] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors inline-flex items-center gap-1"
                        title="Salin kutipan"
                      >
                        {copiedQuoteId === q.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Salin Kutipan</span>
                          </>
                        )}
                      </button>
                    </div>

                    <blockquote className="text-sm sm:text-base font-serif-display text-slate-800 italic leading-relaxed">
                      "{q.kutipan}"
                    </blockquote>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {q.tokoh}
                      </h5>
                      <p className="text-[11px] text-[#e52421] font-medium">
                        {q.peran}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400 italic max-w-[140px] text-right truncate">
                      {q.sumber}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: FOTO SOROTAN TERBARU */}
          {activeInfoTab === 'foto' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              {PHOTO_HIGHLIGHTS.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <img
                        src={photo.imageUrl}
                        alt={photo.judul}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#e52421]" />
                          <span>{photo.tanggal}</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{photo.lokasi}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-2">
                        {photo.judul}
                      </h4>
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {photo.deskripsi}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODAL: BACA ARTIKEL LENGKAP */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
              <div className="bg-[#0c1b69] px-6 py-5 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-300 font-semibold block">{selectedArticle.kategori} · {selectedArticle.estimasiBaca}</span>
                  <h3 className="text-base sm:text-lg font-bold leading-snug mt-0.5">{selectedArticle.judul}</h3>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100 text-xs text-slate-500">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0c1b69] flex items-center justify-center font-bold text-sm">
                    {selectedArticle.penulis.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">{selectedArticle.penulis}</span>
                    <span className="text-[11px] text-[#e52421]">{selectedArticle.jabatanPenulis} · {selectedArticle.tanggal}</span>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
                  {selectedArticle.isiLengkap}
                </div>

                <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span className="italic">Diterbitkan oleh Biro Keilmuan & Literasi PMII Rayon Tarbiyah</span>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold"
                  >
                    Tutup Bacaan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
