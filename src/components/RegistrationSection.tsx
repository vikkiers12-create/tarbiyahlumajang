import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Printer, 
  Download,
  Share2, 
  GraduationCap, 
  QrCode, 
  FileText,
  MessageSquare,
  ArrowRight,
  X,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { MemberRegistration, RegistrationStatus, CustomFormField } from '../types';
import { JURUSAN_TARBIYAH, MINAT_BAKAT_OPTIONS } from '../data/mockData';
import { downloadRegistrationPDF } from '../utils/pdfGenerator';

interface RegistrationSectionProps {
  registrations: MemberRegistration[];
  customFields?: CustomFormField[];
  onAddRegistration: (reg: MemberRegistration) => void;
  statusSectionRef?: React.RefObject<HTMLDivElement | null>;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  registrations,
  customFields = [],
  onAddRegistration,
  statusSectionRef
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'status'>('form');

  // Form State
  const [namaLengkap, setNamaLengkap] = useState('');
  const [nim, setNim] = useState('');
  const [jurusan, setJurusan] = useState(JURUSAN_TARBIYAH[0]);
  const [semester, setSemester] = useState<number>(1);
  const [noWhatsapp, setNoWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [alamatAsal, setAlamatAsal] = useState('');
  const [domisili, setDomisili] = useState('');
  const [minatBakat, setMinatBakat] = useState<string[]>([]);
  const [alasanBergabung, setAlasanBergabung] = useState('');
  const [pengalamanOrganisasi, setPengalamanOrganisasi] = useState('');
  const [customFieldValues, setCustomFieldValues] = useState<Record<string, string>>({});
  
  const [formError, setFormError] = useState('');
  const [submittedCard, setSubmittedCard] = useState<MemberRegistration | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Status Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<MemberRegistration | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const toggleMinatBakat = (item: string) => {
    if (minatBakat.includes(item)) {
      setMinatBakat(minatBakat.filter(i => i !== item));
    } else {
      setMinatBakat([...minatBakat, item]);
    }
  };

  const handleCustomFieldChange = (fieldId: string, value: string) => {
    setCustomFieldValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!namaLengkap.trim() || !nim.trim() || !noWhatsapp.trim() || !alamatAsal.trim() || !alasanBergabung.trim()) {
      setFormError('Mohon lengkapi semua kolom yang bertanda bintang (*)');
      return;
    }

    // Validate required custom fields
    for (const field of customFields) {
      if (field.required && !customFieldValues[field.id]?.trim()) {
        setFormError(`Mohon lengkapi kolom wajib "${field.label}"`);
        return;
      }
    }

    // Check duplicate NIM
    const existing = registrations.find(r => r.nim.trim().toLowerCase() === nim.trim().toLowerCase());
    if (existing) {
      setFormError(`NIM ${nim} sudah terdaftar sebelumnya dengan ID ${existing.id}. Silakan periksa status di tab "Cek Status Berkas".`);
      return;
    }

    const newId = `PMII-TAR-2026-${String(registrations.length + 1).padStart(3, '0')}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newRegistration: MemberRegistration = {
      id: newId,
      namaLengkap: namaLengkap.trim(),
      nim: nim.trim(),
      jurusan,
      semester,
      noWhatsapp: noWhatsapp.trim(),
      email: email.trim() || `${nim.trim()}@student.tarbiyah.ac.id`,
      alamatAsal: alamatAsal.trim(),
      domisili: domisili.trim() || alamatAsal.trim(),
      minatBakat: minatBakat.length > 0 ? minatBakat : ['Kajian Intelektual & Diskusi Kritis'],
      alasanBergabung: alasanBergabung.trim(),
      pengalamanOrganisasi: pengalamanOrganisasi.trim() || 'Anggota Mahasiswa Baru',
      tanggalDaftar: formattedDate,
      status: 'menunggu',
      catatanAdmin: 'Pendaftaran baru diterima sistem. Menunggu pemeriksaan berkas oleh Biro Kaderisasi.',
      customFields: customFieldValues
    };

    onAddRegistration(newRegistration);
    setSubmittedCard(newRegistration);
    setIsPdfModalOpen(true);

    // Reset Form
    setNamaLengkap('');
    setNim('');
    setNoWhatsapp('');
    setEmail('');
    setAlamatAsal('');
    setDomisili('');
    setMinatBakat([]);
    setAlasanBergabung('');
    setPengalamanOrganisasi('');
    setCustomFieldValues({});
  };

  const handleSearchStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    const found = registrations.find(
      r => r.nim.toLowerCase() === query || r.id.toLowerCase() === query || r.noWhatsapp.includes(query)
    );

    setSearchResult(found || null);
    setSearchPerformed(true);
  };

  const getStatusBadge = (status: RegistrationStatus) => {
    switch (status) {
      case 'menunggu':
        return {
          label: 'Menunggu Verifikasi',
          color: 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
          icon: Clock
        };
      case 'terverifikasi':
        return {
          label: 'Terverifikasi (Siap Screening)',
          color: 'bg-blue-100 dark:bg-blue-950/50 text-[#0c1b69] dark:text-blue-300 border-blue-200 dark:border-blue-800',
          icon: CheckCircle2
        };
      case 'diterima':
        return {
          label: 'Diterima - Peserta MAPABA',
          color: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
          icon: CheckCircle
        };
      case 'ditolak':
        return {
          label: 'Perlu Perbaikan Berkas',
          color: 'bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800',
          icon: AlertCircle
        };
    }
  };

  return (
    <section 
      id="pendaftaran" 
      ref={statusSectionRef as any} 
      className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            <span className="text-[#0c1b69] dark:text-blue-400 font-bold">Kaderisasi Formal Tahap I</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">MAPABA XXVII</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pendaftaran Calon Anggota Baru
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Bergabunglah dalam barisan pergerakan mahasiswa Tarbiyah. Isi formulir pendaftaran daring di bawah ini atau periksa status berkas Anda secara transparan.
          </p>

          {/* Tab Switcher */}
          <div className="mt-8 inline-flex p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl border border-slate-300/60 dark:border-slate-700 shadow-xs">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-white dark:bg-slate-700 text-[#0c1b69] dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                <span>Formulir Pendaftaran</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'status'
                  ? 'bg-white dark:bg-slate-700 text-[#0c1b69] dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span>Cek Status Berkas</span>
              </span>
            </button>
          </div>
        </div>

        {/* Content based on Active Tab */}
        {activeTab === 'form' ? (
          <div>
            {submittedCard && (
              <div className="max-w-3xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                      Pendaftaran Terkirim: {submittedCard.namaLengkap} ({submittedCard.id})
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      Hasil formulir bukti registrasi siap dicetak atau disimpan dalam bentuk PDF.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => setIsPdfModalOpen(true)}
                    className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Lihat / Cetak PDF</span>
                  </button>
                  <button
                    onClick={() => downloadRegistrationPDF(submittedCard, customFields)}
                    className="flex-1 sm:flex-initial px-4 py-2 bg-[#0c1b69] hover:bg-[#09174f] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </button>
                </div>
              </div>
            )}

            {/* Registration Form Card */}
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg transition-colors">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {formError && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Section 1: Identitas Pribadi */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#0c1b69] text-white flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <span>Identitas Diri & Kemahasiswaan</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                        Nama Lengkap Sesuai KTM <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Muhammad Ali Hasan"
                        value={namaLengkap}
                        onChange={(e) => setNamaLengkap(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                        NIM (Nomor Induk Mahasiswa) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: 2411010099"
                        value={nim}
                        onChange={(e) => setNim(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                        Program Studi Tarbiyah <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={jurusan}
                        onChange={(e) => setJurusan(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 transition-colors"
                      >
                        {JURUSAN_TARBIYAH.map((j) => (
                          <option key={j} value={j} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                            {j}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                        Semester Saat Ini <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={semester}
                        onChange={(e) => setSemester(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 transition-colors"
                      >
                        <option value={1} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Semester 1 (Maba)</option>
                        <option value={3} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Semester 3</option>
                        <option value={5} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Semester 5</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                        Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={noWhatsapp}
                        onChange={(e) => setNoWhatsapp(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                        Email Mahasiswa / Pribadi
                      </label>
                      <input
                        type="email"
                        placeholder="Contoh: nama@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Domisili & Asal */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#0c1b69] text-white flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <span>Alamat Asal & Domisili Kampus</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                        Kota / Kabupaten Asal <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Pati, Jawa Tengah"
                        value={alamatAsal}
                        onChange={(e) => setAlamatAsal(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                        Domisili Sekarang (Kost / Pesantren / Rumah)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: PP Al-Falah Tarbiyah"
                        value={domisili}
                        onChange={(e) => setDomisili(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Minat Bakat & Motivasi */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#0c1b69] text-white flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <span>Minat, Bakat & Motivasi Berorganisasi</span>
                  </h3>

                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      Pilih Minat & Pengembangan Diri yang Ingin Ditekunkan:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {MINAT_BAKAT_OPTIONS.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-2 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            minatBakat.includes(item)
                              ? 'border-[#0c1b69] dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 font-semibold text-[#0c1b69] dark:text-blue-300'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={minatBakat.includes(item)}
                            onChange={() => toggleMinatBakat(item)}
                            className="rounded text-[#0c1b69] focus:ring-[#0c1b69]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                        Alasan / Motivasi Ingin Bergabung PMII Rayon Tarbiyah <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Ceritakan motivasi sahabat-sahabati bergabung..."
                        value={alasanBergabung}
                        onChange={(e) => setAlasanBergabung(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                        Pengalaman Organisasi Sebelumnya (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Pengurus OSIS SMA, IPNU/IPPNU, Pramuka, Rohis"
                        value={pengalamanOrganisasi}
                        onChange={(e) => setPengalamanOrganisasi(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Dynamic Custom Fields added by Admin */}
                {customFields && customFields.length > 0 && (
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[#0c1b69] text-white flex items-center justify-center text-xs font-bold">
                        4
                      </span>
                      <span>Informasi Tambahan / Kolom Khusus</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {customFields.map((field) => (
                        <div key={field.id} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                          <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>

                          {field.type === 'select' ? (
                            <select
                              required={field.required}
                              value={customFieldValues[field.id] || ''}
                              onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
                              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 transition-colors"
                            >
                              <option value="" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                                {field.placeholder || `Pilih ${field.label}...`}
                              </option>
                              {field.options?.map((opt) => (
                                <option key={opt} value={opt} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : field.type === 'textarea' ? (
                            <textarea
                              required={field.required}
                              rows={2}
                              placeholder={field.placeholder || `Ketikkan ${field.label}...`}
                              value={customFieldValues[field.id] || ''}
                              onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
                              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 transition-colors"
                            />
                          ) : (
                            <input
                              type={field.type === 'number' ? 'number' : 'text'}
                              required={field.required}
                              placeholder={field.placeholder || `Ketikkan ${field.label}...`}
                              value={customFieldValues[field.id] || ''}
                              onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
                              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 transition-colors"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submission Notice & Button */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Dengan mengirim formulir, saya bersedia mengikuti rangkaian MAPABA XXVII sesuai arahan rayon.
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#0c1b69] hover:bg-[#09174f] text-white font-semibold text-sm rounded-xl shadow-md transition-all shrink-0 inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Kirim Pendaftaran</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Check Registration Status Tab */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-lg transition-colors">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Cek Status Pendaftaran Calon Kader</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
                Masukkan NIM atau Nomor Registrasi (contoh: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-[#0c1b69] dark:text-blue-300 font-mono">2311010042</code> atau <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-[#0c1b69] dark:text-blue-300 font-mono">PMII-TAR-2026-001</code>) untuk mengecek status verifikasi berkas.
              </p>

              <form onSubmit={handleSearchStatus} className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Ketik NIM atau No. Registrasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#0c1b69] hover:bg-[#09174f] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shrink-0 inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Search className="w-4 h-4" />
                  <span>Cek Status</span>
                </button>
              </form>

              {searchPerformed && (
                <div>
                  {searchResult ? (
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      {/* Status Header */}
                      <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
                        <div>
                          <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">Nomor Registrasi: {searchResult.id}</span>
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{searchResult.namaLengkap}</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300">{searchResult.jurusan} · NIM: {searchResult.nim}</p>
                        </div>
                        {(() => {
                          const badge = getStatusBadge(searchResult.status);
                          const IconComp = badge.icon;
                          return (
                            <div className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${badge.color}`}>
                              <IconComp className="w-3.5 h-3.5" />
                              <span>{badge.label}</span>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Admin Note / Status description */}
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 mb-4">
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                          Catatan dari Pengurus / Biro Kaderisasi:
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                          "{searchResult.catatanAdmin || 'Berkas telah diterima dan dalam proses penjadwalan screening oleh tim panitia MAPABA XXVII.'}"
                        </p>
                      </div>

                      {/* Action to download / print PDF of existing record */}
                      <div className="flex items-center justify-between gap-3 pt-2 pb-4 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-xs text-slate-600 dark:text-slate-400">Lembar Bukti Pendaftaran:</span>
                        <button
                          onClick={() => downloadRegistrationPDF(searchResult, customFields)}
                          className="px-3 py-1.5 bg-[#0c1b69] hover:bg-[#09174f] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Unduh PDF Bukti</span>
                        </button>
                      </div>

                      {/* Timeline steps */}
                      <div className="pt-3">
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mb-3">Tahapan Kaderisasi:</span>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium">
                            ✓ Pendaftaran Daring
                          </div>
                          <div className={`p-2 rounded-lg font-medium border ${
                            searchResult.status === 'terverifikasi' || searchResult.status === 'diterima'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                          }`}>
                            Screening Berkas
                          </div>
                          <div className={`p-2 rounded-lg font-medium border ${
                            searchResult.status === 'diterima'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                          }`}>
                            Forum MAPABA
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                        <span>Waktu Mendaftar: {searchResult.tanggalDaftar}</span>
                        <a
                          href="https://wa.me/6281234567890"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0c1b69] dark:text-blue-400 hover:underline font-medium"
                        >
                          Hubungi Narahubung Panitia →
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                      <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">Data Tidak Ditemukan</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        Tidak ada pendaftar dengan NIM atau No. Registrasi "{searchQuery}". Pastikan nomor yang dimasukkan sudah benar atau daftarkan diri Anda di tab Formulir.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* POPUP MODAL HASIL FORM & DOKUMEN PDF (Dapat dicetak & disimpan) */}
      {isPdfModalOpen && submittedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div 
            className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-300 dark:border-slate-700 my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="bg-[#0c1b69] text-white p-4 sm:p-5 flex items-center justify-between gap-3 border-b border-blue-900">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/SAVE_20240918_131449-removebg-preview_b7c4bfb0.png"
                  alt="PMII"
                  className="w-10 h-10 object-contain drop-shadow"
                />
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg leading-tight text-white flex items-center gap-2">
                    <span>Hasil Formulir & Bukti PDF Registrasi</span>
                    <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-full uppercase">
                      Sah
                    </span>
                  </h3>
                  <p className="text-xs text-blue-200 mt-0.5">
                    PMII Rayon Tarbiyah · MAPABA XXVII
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsPdfModalOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                title="Tutup (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Action Bar (Download & Print Options) */}
            <div className="p-3 sm:p-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Dokumen PDF bukti registrasi siap dicetak atau disimpan.</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => downloadRegistrationPDF(submittedCard, customFields)}
                  className="px-4 py-2 bg-[#0c1b69] hover:bg-[#09174f] text-white text-xs font-bold rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                  title="Simpan file PDF resmi ke perangkat"
                >
                  <Download className="w-4 h-4 text-[#fed100]" />
                  <span>Unduh File PDF</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-xs font-bold rounded-xl transition-all border border-slate-300 dark:border-slate-600 inline-flex items-center gap-1.5 cursor-pointer"
                  title="Cetak langsung menggunakan printer atau Simpan sebagai PDF dari browser"
                >
                  <Printer className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Cetak (Print)</span>
                </button>

                <a
                  href={`https://wa.me/6281234567890?text=Halo%20Pengurus%20PMII%20Rayon%20Tarbiyah,%20saya%20sudah%20mendaftar%20MAPABA%20XXVII%20dengan%20Nomor%20Registrasi%20${submittedCard.id}%20atas%20nama%20${encodeURIComponent(submittedCard.namaLengkap)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Kirim ke WhatsApp Panitia</span>
                </a>
              </div>
            </div>

            {/* Document Printable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50 dark:bg-slate-950/50">
              <div className="printable-receipt bg-white text-slate-900 border-2 border-slate-300 rounded-2xl p-5 sm:p-8 shadow-sm">
                
                {/* Official Letterhead (Kop Dokumen) */}
                <div className="border-b-2 border-slate-900 pb-4 mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/aistudio/SAVE_20240918_131449-removebg-preview_b7c4bfb0.png"
                      alt="Logo Resmi PMII"
                      className="w-14 h-14 object-contain shrink-0"
                    />
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base tracking-tight text-[#0c1b69] uppercase leading-tight">
                        Pengurus Rayon Pergerakan Mahasiswa Islam Indonesia (PMII)
                      </h4>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-800 uppercase mt-0.5">
                        Rayon Tarbiyah · Masa Penerimaan Anggota Baru (MAPABA XXVII)
                      </h5>
                      <p className="text-[11px] text-slate-600 mt-0.5 italic">
                        Semboyan: “Dzikir, Fikir, Amal Sholeh” · Fakultas Tarbiyah
                      </p>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Tanda Bukti</span>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      TERVERIFIKASI
                    </span>
                  </div>
                </div>

                {/* Document Title Banner */}
                <div className="bg-[#0c1b69] text-white p-3 rounded-xl mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                      LEMBAR BUKTI REGISTRASI RESMI
                    </span>
                    <h5 className="font-bold text-sm sm:text-base text-white">
                      Biodata Peserta Calon Anggota Baru
                    </h5>
                  </div>
                  <div className="text-left sm:text-right font-mono">
                    <span className="text-[10px] text-blue-200 block">No. Registrasi:</span>
                    <span className="text-xs sm:text-sm font-black text-[#fed100] tracking-wider">
                      {submittedCard.id}
                    </span>
                  </div>
                </div>

                {/* Structured Form Details */}
                <div className="space-y-4 text-xs">
                  
                  {/* Bagian A */}
                  <div>
                    <h6 className="font-bold text-[#0c1b69] border-b border-slate-200 pb-1 mb-2.5 uppercase tracking-wide">
                      A. Data Diri & Status Kemahasiswaan
                    </h6>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Nama Lengkap Mahasiswa:</span>
                        <strong className="text-slate-900 text-sm">{submittedCard.namaLengkap}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Nomor Induk Mahasiswa (NIM):</span>
                        <strong className="text-slate-900 text-sm font-mono">{submittedCard.nim}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Program Studi:</span>
                        <strong className="text-slate-900">{submittedCard.jurusan}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Semester Saat Ini:</span>
                        <strong className="text-slate-900">Semester {submittedCard.semester}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Nomor WhatsApp:</span>
                        <strong className="text-slate-900 font-mono">{submittedCard.noWhatsapp}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Alamat Email:</span>
                        <strong className="text-slate-900">{submittedCard.email}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Asal Daerah / Kota:</span>
                        <strong className="text-slate-900">{submittedCard.alamatAsal}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Domisili Kampus:</span>
                        <strong className="text-slate-900">{submittedCard.domisili}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Bagian B */}
                  <div>
                    <h6 className="font-bold text-[#0c1b69] border-b border-slate-200 pb-1 mb-2.5 uppercase tracking-wide">
                      B. Minat, Motivasi & Pengalaman
                    </h6>
                    <div className="space-y-2">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Minat & Bidang Bakat yang Dipilih:</span>
                        <p className="font-semibold text-slate-800">
                          {submittedCard.minatBakat.join(', ')}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Motivasi Bergabung PMII:</span>
                        <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 italic">
                          "{submittedCard.alasanBergabung}"
                        </p>
                      </div>
                      {submittedCard.pengalamanOrganisasi && (
                        <div>
                          <span className="text-slate-500 block text-[11px]">Pengalaman Organisasi Sebelumnya:</span>
                          <p className="text-slate-800 font-medium">
                            {submittedCard.pengalamanOrganisasi}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bagian C: Kolom Tambahan / Custom Fields */}
                  {customFields && customFields.length > 0 && submittedCard.customFields && (
                    <div>
                      <h6 className="font-bold text-[#0c1b69] border-b border-slate-200 pb-1 mb-2.5 uppercase tracking-wide">
                        C. Informasi Tambahan / Kolom Khusus
                      </h6>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                        {customFields.map((field) => (
                          <div key={field.id}>
                            <span className="text-slate-500 block text-[11px]">{field.label}:</span>
                            <strong className="text-slate-900">
                              {submittedCard.customFields?.[field.id] || '-'}
                            </strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Document Footer & Signatures */}
                  <div className="pt-4 border-t-2 border-slate-200 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <div className="space-y-1 text-[11px] text-slate-600">
                      <p>Waktu Pendaftaran: <strong>{submittedCard.tanggalDaftar}</strong></p>
                      <p>Status: <strong className="text-emerald-700 font-semibold">Tersimpan di Database Resmi Rayon</strong></p>
                      <p className="italic text-slate-400">Harap bawa atau simpan lembar PDF ini saat verifikasi screening berkas fisik.</p>
                    </div>

                    <div className="text-center sm:text-right text-[11px]">
                      <p className="font-bold text-slate-800">Panitia Pelaksana MAPABA XXVII</p>
                      <p className="text-slate-500">Biro Kaderisasi PMII Rayon Tarbiyah</p>
                      <div className="my-2 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-[#0c1b69] font-bold rounded-lg text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>SISTEM TERVERIFIKASI OTOMATIS</span>
                      </div>
                      <p className="text-[10px] text-slate-400">Dzikir, Fikir, Amal Sholeh</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Dokumen resmi PMII Rayon Tarbiyah
              </span>
              <button
                onClick={() => setIsPdfModalOpen(false)}
                className="px-5 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
