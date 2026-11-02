import React, { useState } from 'react';
import { 
  MemberRegistration, 
  GalleryItem, 
  AgendaItem, 
  RegistrationStatus, 
  GalleryCategory,
  MovementQuote,
  CustomFormField,
  SiteContentConfig
} from '../types';
import { 
  Users, 
  Image as ImageIcon, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Download, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  ArrowLeft, 
  MessageSquare, 
  Filter,
  Save,
  X,
  Quote,
  Upload,
  Lock,
  Printer,
  Sparkles,
  Columns
} from 'lucide-react';
import { JURUSAN_TARBIYAH, MINAT_BAKAT_OPTIONS, DEFAULT_SITE_CONTENT } from '../data/mockData';
import { downloadRegistrationPDF } from '../utils/pdfGenerator';

interface AdminDashboardProps {
  registrations: MemberRegistration[];
  galleryItems: GalleryItem[];
  agendas: AgendaItem[];
  movementQuotes: MovementQuote[];
  siteContent?: SiteContentConfig;
  customFormFields?: CustomFormField[];
  onAddCustomField?: (field: CustomFormField) => void;
  onDeleteCustomField?: (fieldId: string) => void;
  onUpdateSiteContent?: (newContent: SiteContentConfig) => void;
  onResetSiteContent?: () => void;
  onUpdateRegistrationStatus: (id: string, status: RegistrationStatus, notes?: string) => void;
  onDeleteRegistration: (id: string) => void;
  onAddRegistration: (reg: MemberRegistration) => void;
  onAddGalleryItem: (item: GalleryItem) => void;
  onUpdateGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
  onAddAgendaItem: (item: AgendaItem) => void;
  onDeleteAgendaItem: (id: string) => void;
  onAddQuote: (quote: MovementQuote) => void;
  onDeleteQuote: (id: string) => void;
  onSwitchToGuest: () => void;
  onOpenSidebar?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  registrations,
  galleryItems,
  agendas,
  movementQuotes,
  siteContent = DEFAULT_SITE_CONTENT,
  customFormFields = [],
  onAddCustomField,
  onDeleteCustomField,
  onUpdateSiteContent,
  onResetSiteContent,
  onUpdateRegistrationStatus,
  onDeleteRegistration,
  onAddRegistration,
  onAddGalleryItem,
  onUpdateGalleryItem,
  onDeleteGalleryItem,
  onAddAgendaItem,
  onDeleteAgendaItem,
  onAddQuote,
  onDeleteQuote,
  onSwitchToGuest,
  onOpenSidebar
}) => {
  const [activeTab, setActiveTab] = useState<'pendaftar' | 'galeri' | 'agenda' | 'quotes' | 'content'>('pendaftar');

  // Custom Columns Modal State
  const [showCustomColumnsModal, setShowCustomColumnsModal] = useState(false);
  const [newColLabel, setNewColLabel] = useState('');
  const [newColType, setNewColType] = useState<'text' | 'number' | 'select' | 'textarea'>('text');
  const [newColRequired, setNewColRequired] = useState(false);
  const [newColOptions, setNewColOptions] = useState('');
  const [newColPlaceholder, setNewColPlaceholder] = useState('');

  // Site Content State for Admin Editor
  const [editableContent, setEditableContent] = useState<SiteContentConfig>(siteContent);
  const [contentSaveSuccess, setContentSaveSuccess] = useState(false);
  const [contentCategoryTab, setContentCategoryTab] = useState<'hero' | 'profil' | 'struktur' | 'kontak'>('hero');

  // Keep in sync when siteContent changes externally
  React.useEffect(() => {
    setEditableContent(siteContent);
  }, [siteContent]);

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateSiteContent) {
      onUpdateSiteContent(editableContent);
      setContentSaveSuccess(true);
      setTimeout(() => setContentSaveSuccess(false), 3500);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh teks ke pengaturan bawaan (default)?')) {
      setEditableContent(DEFAULT_SITE_CONTENT);
      if (onResetSiteContent) {
        onResetSiteContent();
      }
      setContentSaveSuccess(true);
      setTimeout(() => setContentSaveSuccess(false), 3500);
    }
  };

  // Pendaftar Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<MemberRegistration | null>(null);
  const [editNotesId, setEditNotesId] = useState<string | null>(null);
  const [candidateNotes, setCandidateNotes] = useState('');

  // Add Manual Registration Modal
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberNim, setNewMemberNim] = useState('');
  const [newMemberProdi, setNewMemberProdi] = useState(JURUSAN_TARBIYAH[0]);
  const [newMemberWa, setNewMemberWa] = useState('');
  const [newMemberAlamat, setNewMemberAlamat] = useState('');

  // Gallery Creation & Upload State
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [newGalTitle, setNewGalTitle] = useState('');
  const [newGalCategory, setNewGalCategory] = useState<GalleryCategory>('kaderisasi');
  const [newGalDate, setNewGalDate] = useState('');
  const [newGalLocation, setNewGalLocation] = useState('');
  const [newGalDesc, setNewGalDesc] = useState('');
  const [newGalImage, setNewGalImage] = useState('/src/assets/images/pmii_discussion_study_1793298965207.jpg');
  const [imageUploadSource, setImageUploadSource] = useState<'file' | 'preset' | 'url'>('file');

  // Gallery Edit State (Admin Only)
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [editGalTitle, setEditGalTitle] = useState('');
  const [editGalCategory, setEditGalCategory] = useState<GalleryCategory>('kaderisasi');
  const [editGalDate, setEditGalDate] = useState('');
  const [editGalLocation, setEditGalLocation] = useState('');
  const [editGalDesc, setEditGalDesc] = useState('');
  const [editGalImage, setEditGalImage] = useState('');
  const [editGalPenanggungJawab, setEditGalPenanggungJawab] = useState('');
  const [editImageUploadSource, setEditImageUploadSource] = useState<'file' | 'preset' | 'url'>('file');

  // Add Agenda Modal
  const [showAddAgendaModal, setShowAddAgendaModal] = useState(false);
  const [newAgTitle, setNewAgTitle] = useState('');
  const [newAgDate, setNewAgDate] = useState('');
  const [newAgTime, setNewAgTime] = useState('');
  const [newAgPlace, setNewAgPlace] = useState('');
  const [newAgCategory, setNewAgCategory] = useState('Kaderisasi');
  const [newAgDesc, setNewAgDesc] = useState('');

  // Add Quote Modal
  const [showAddQuoteModal, setShowAddQuoteModal] = useState(false);
  const [newQuoteText, setNewQuoteText] = useState('');
  const [newQuoteAuthor, setNewQuoteAuthor] = useState('');
  const [newQuoteRole, setNewQuoteRole] = useState('');
  const [newQuoteSource, setNewQuoteSource] = useState('');

  // Stats calculation
  const totalCount = registrations.length;
  const pendingCount = registrations.filter(r => r.status === 'menunggu').length;
  const verifiedCount = registrations.filter(r => r.status === 'terverifikasi').length;
  const acceptedCount = registrations.filter(r => r.status === 'diterima').length;

  // Filtered registrations
  const filteredRegistrations = registrations.filter(item => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch = item.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.nim.includes(searchQuery) ||
                          item.jurusan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Handle Create Custom Column
  const handleCreateCustomColumn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColLabel.trim()) return;

    const id = `field_${Date.now()}`;
    const optionsArray = newColType === 'select' 
      ? newColOptions.split(',').map(s => s.trim()).filter(Boolean)
      : undefined;

    const newField: CustomFormField = {
      id,
      label: newColLabel.trim(),
      type: newColType,
      required: newColRequired,
      placeholder: newColPlaceholder.trim() || undefined,
      options: optionsArray
    };

    if (onAddCustomField) {
      onAddCustomField(newField);
    }

    setNewColLabel('');
    setNewColType('text');
    setNewColRequired(false);
    setNewColOptions('');
    setNewColPlaceholder('');
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'ID Registrasi',
      'Nama Lengkap',
      'NIM',
      'Jurusan',
      'Semester',
      'No WhatsApp',
      'Email',
      'Asal Daerah',
      'Domisili',
      'Minat Bakat',
      'Alasan Bergabung',
      'Pengalaman Organisasi',
      'Tanggal Daftar',
      'Status',
      'Catatan Admin',
      ...customFormFields.map(f => f.label)
    ];

    const rows = registrations.map(r => [
      `"${r.id}"`,
      `"${r.namaLengkap.replace(/"/g, '""')}"`,
      `"${r.nim}"`,
      `"${r.jurusan}"`,
      r.semester,
      `"${r.noWhatsapp}"`,
      `"${r.email}"`,
      `"${r.alamatAsal.replace(/"/g, '""')}"`,
      `"${r.domisili.replace(/"/g, '""')}"`,
      `"${r.minatBakat.join(', ').replace(/"/g, '""')}"`,
      `"${r.alasanBergabung.replace(/"/g, '""')}"`,
      `"${(r.pengalamanOrganisasi || '').replace(/"/g, '""')}"`,
      `"${r.tanggalDaftar}"`,
      `"${r.status}"`,
      `"${(r.catatanAdmin || '').replace(/"/g, '""')}"`,
      ...customFormFields.map(f => `"${(r.customFields?.[f.id] || '').replace(/"/g, '""')}"`)
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `PMII_Rayon_Tarbiyah_Pendaftar_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveNotes = (id: string) => {
    const reg = registrations.find(r => r.id === id);
    if (reg) {
      onUpdateRegistrationStatus(id, reg.status, candidateNotes);
    }
    setEditNotesId(null);
  };

  const handleCreateManualMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberNim.trim() || !newMemberWa.trim()) return;

    const newId = `PMII-TAR-2026-${String(registrations.length + 1).padStart(3, '0')}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    onAddRegistration({
      id: newId,
      namaLengkap: newMemberName.trim(),
      nim: newMemberNim.trim(),
      jurusan: newMemberProdi,
      semester: 1,
      noWhatsapp: newMemberWa.trim(),
      email: `${newMemberNim.trim()}@student.tarbiyah.ac.id`,
      alamatAsal: newMemberAlamat.trim() || 'Kampus Tarbiyah',
      domisili: 'Asrama / Kost Mahasiswa',
      minatBakat: ['Kajian Intelektual & Diskusi Kritis'],
      alasanBergabung: 'Pendaftaran mandiri di sekretariat rayon.',
      tanggalDaftar: formattedDate,
      status: 'terverifikasi',
      catatanAdmin: 'Pendaftaran offline diverifikasi panitia.'
    });

    setShowAddMemberModal(false);
    setNewMemberName('');
    setNewMemberNim('');
    setNewMemberWa('');
    setNewMemberAlamat('');
  };

  // Handle Photo File Upload with FileReader (Data URL)
  const handleImageFileUpload = (file: File, isEditMode: boolean = false) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Format berkas tidak valid. Harap pilih file gambar (JPG, PNG, WebP).');
      return;
    }
    // Limit to 4MB for safe browser memory & storage
    if (file.size > 4 * 1024 * 1024) {
      alert('Ukuran file foto terlalu besar. Maksimal 4 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        if (isEditMode) {
          setEditGalImage(base64);
        } else {
          setNewGalImage(base64);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalTitle.trim() || !newGalDate.trim()) return;

    onAddGalleryItem({
      id: `gal-${Date.now()}`,
      judul: newGalTitle.trim(),
      kategori: newGalCategory,
      tanggal: newGalDate.trim(),
      lokasi: newGalLocation.trim() || 'Gedung Tarbiyah',
      deskripsi: newGalDesc.trim() || 'Dokumentasi kegiatan resmi PMII Rayon Tarbiyah.',
      imageUrl: newGalImage || '/src/assets/images/pmii_discussion_study_1793298965207.jpg',
      penanggungJawab: 'Biro Media & Kaderisasi'
    });

    setShowAddGalleryModal(false);
    setNewGalTitle('');
    setNewGalDate('');
    setNewGalLocation('');
    setNewGalDesc('');
    setNewGalImage('/src/assets/images/pmii_discussion_study_1793298965207.jpg');
    setImageUploadSource('file');
  };

  // Start Editing Gallery Item (Admin Exclusive)
  const handleStartEditGallery = (item: GalleryItem) => {
    setEditingGalleryItem(item);
    setEditGalTitle(item.judul);
    setEditGalCategory(item.kategori);
    setEditGalDate(item.tanggal);
    setEditGalLocation(item.lokasi);
    setEditGalDesc(item.deskripsi);
    setEditGalImage(item.imageUrl);
    setEditGalPenanggungJawab(item.penanggungJawab || 'Biro Media & Kaderisasi');
    setEditImageUploadSource('file');
  };

  // Save Edited Gallery Item (Admin Exclusive)
  const handleSaveEditGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGalleryItem || !editGalTitle.trim() || !editGalDate.trim()) return;

    onUpdateGalleryItem({
      ...editingGalleryItem,
      judul: editGalTitle.trim(),
      kategori: editGalCategory,
      tanggal: editGalDate.trim(),
      lokasi: editGalLocation.trim() || 'Gedung Tarbiyah',
      deskripsi: editGalDesc.trim() || 'Dokumentasi kegiatan resmi PMII Rayon Tarbiyah.',
      imageUrl: editGalImage || editingGalleryItem.imageUrl,
      penanggungJawab: editGalPenanggungJawab.trim() || 'Biro Media & Kaderisasi'
    });

    setEditingGalleryItem(null);
  };

  const handleCreateAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgTitle.trim() || !newAgDate.trim()) return;

    onAddAgendaItem({
      id: `ag-${Date.now()}`,
      judul: newAgTitle.trim(),
      tanggal: newAgDate.trim(),
      waktu: newAgTime.trim() || '08.00 WIB - Selesai',
      tempat: newAgPlace.trim() || 'Sekretariat PMII Rayon Tarbiyah',
      kategori: newAgCategory,
      deskripsi: newAgDesc.trim() || 'Agenda resmi rayon.',
      status: 'Akan Datang'
    });

    setShowAddAgendaModal(false);
    setNewAgTitle('');
    setNewAgDate('');
    setNewAgTime('');
    setNewAgPlace('');
    setNewAgDesc('');
  };

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuoteText.trim() || !newQuoteAuthor.trim()) return;

    onAddQuote({
      id: `quote-${Date.now()}`,
      kutipan: newQuoteText.trim(),
      tokoh: newQuoteAuthor.trim(),
      peran: newQuoteRole.trim() || 'Tokoh Pergerakan',
      sumber: newQuoteSource.trim() || 'Pesan Moral & Refleksi'
    });

    setShowAddQuoteModal(false);
    setNewQuoteText('');
    setNewQuoteAuthor('');
    setNewQuoteRole('');
    setNewQuoteSource('');
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-100/90 pb-20">
      {/* Admin Top Navigation Bar */}
      <div className="bg-[#0c1b69] text-white border-b border-blue-950 sticky top-0 z-30 shadow-md w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:h-16 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/assets/aistudio/SAVE_20240918_131449-removebg-preview_b7c4bfb0.png"
                alt="Logo PMII Rayon Tarbiyah"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-sm shrink-0"
              />
              <div className="min-w-0">
                <h1 className="text-sm sm:text-base font-bold tracking-tight truncate">Panel Pengurus & Administrasi</h1>
                <p className="text-[10px] sm:text-[11px] text-blue-200 truncate">PMII Rayon Tarbiyah · MAPABA XXVII</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-end sm:self-auto flex-wrap">
              {/* Fitur Bergambar Edit Web - Berdampingan dengan tombol Lihat Tampilan Tamu */}
              <button
                onClick={() => setActiveTab(activeTab === 'content' ? 'pendaftar' : 'content')}
                className={`px-3 py-1.5 sm:px-3.5 text-xs font-semibold rounded-lg transition-all inline-flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer border ${
                  activeTab === 'content'
                    ? 'bg-[#fed100] text-[#0c1b69] border-[#fed100] font-bold shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
                title="Edit Teks & Konten Web (Beranda, Profil, Visi Misi, UI)"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{activeTab === 'content' ? 'Tutup Edit Web' : 'Edit Web'}</span>
              </button>

              <button
                onClick={onSwitchToGuest}
                className="px-3 py-1.5 sm:px-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 sm:gap-2 border border-white/20 shrink-0 cursor-pointer"
                title="Kembali ke tampilan Beranda Tamu / Publik"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Lihat Tampilan Tamu</span>
              </button>

              {onOpenSidebar && (
                <button
                  onClick={onOpenSidebar}
                  className="p-2 sm:px-2.5 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20 flex items-center justify-center cursor-pointer group"
                  title="Menu & Sidebar (Navigasi, Artikel, Quotes, Sorotan, Setting)"
                  aria-label="Buka Menu & Sidebar"
                >
                  <div className="flex flex-col gap-1 w-5 justify-center items-center py-0.5">
                    <span className="w-5 h-0.5 bg-white rounded-full group-hover:bg-[#fed100] transition-colors" />
                    <span className="w-5 h-0.5 bg-white rounded-full group-hover:bg-[#fed100] transition-colors" />
                    <span className="w-5 h-0.5 bg-white rounded-full group-hover:bg-[#fed100] transition-colors" />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 w-full max-w-full">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs min-w-0">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 mb-1">
              <span className="truncate">Total Pendaftar</span>
              <Users className="w-4 h-4 text-[#0c1b69] shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono tabular-nums">{totalCount}</div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 truncate">Calon kader terdaftar</p>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs min-w-0">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-amber-700 mb-1">
              <span className="truncate">Perlu Verifikasi</span>
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 font-mono tabular-nums">{pendingCount}</div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 truncate">Menunggu screening</p>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs min-w-0">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-blue-700 mb-1">
              <span className="truncate">Siap Screening</span>
              <CheckCircle2 className="w-4 h-4 text-[#0c1b69] shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#0c1b69] font-mono tabular-nums">{verifiedCount}</div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 truncate">Berkas administratif lolos</p>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs min-w-0">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-emerald-700 mb-1">
              <span className="truncate">Lolos MAPABA</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono tabular-nums">{acceptedCount}</div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 truncate">Peserta resmi kaderisasi</p>
          </div>
        </div>

        {/* Tab Navigation - Horizontal Scrollable on Mobile without breaking page width */}
        <div className="w-full max-w-full overflow-x-auto pb-2 mb-6 border-b border-slate-300">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => setActiveTab('pendaftar')}
              className={`px-3.5 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                activeTab === 'pendaftar'
                  ? 'bg-[#0c1b69] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span>Kelola Calon Anggota ({registrations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('galeri')}
              className={`px-3.5 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                activeTab === 'galeri'
                  ? 'bg-[#0c1b69] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 shrink-0" />
              <span>Kelola Galeri Kegiatan ({galleryItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('agenda')}
              className={`px-3.5 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                activeTab === 'agenda'
                  ? 'bg-[#0c1b69] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>Kelola Agenda ({agendas.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-3.5 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                activeTab === 'quotes'
                  ? 'bg-[#0c1b69] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Quote className="w-3.5 h-3.5 shrink-0" />
              <span>Quotes Tokoh ({movementQuotes.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: PENDAFTAR MANAGEMENT */}
        {activeTab === 'pendaftar' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden w-full">
            {/* Action Bar */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari nama, NIM, jurusan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0c1b69]"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0c1b69] w-full sm:w-auto"
                >
                  <option value="all">Semua Status</option>
                  <option value="menunggu">Menunggu Verifikasi</option>
                  <option value="terverifikasi">Terverifikasi (Siap Screening)</option>
                  <option value="diterima">Diterima MAPABA</option>
                  <option value="ditolak">Perlu Perbaikan</option>
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start sm:justify-end">
                <button
                  onClick={() => setShowCustomColumnsModal(true)}
                  className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#0c1b69] text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 border border-blue-200 cursor-pointer shadow-2xs"
                  title="Tambah dan kelola kolom formulir pendaftaran baru"
                >
                  <Columns className="w-3.5 h-3.5 text-[#0c1b69]" />
                  <span>Kelola Kolom Baru ({customFormFields.length})</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 border border-slate-300 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Ekspor CSV</span>
                </button>

                <button
                  onClick={() => setShowAddMemberModal(true)}
                  className="px-3.5 py-2 bg-[#0c1b69] hover:bg-blue-900 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Input Pendaftar Offline</span>
                </button>
              </div>
            </div>

            {/* Registrations Table */}
            <div className="overflow-x-auto w-full">
              <table className="min-w-[680px] w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">No. Registrasi & Calon</th>
                    <th className="py-3 px-4">NIM & Prodi</th>
                    <th className="py-3 px-4">Kontak (WhatsApp)</th>
                    {customFormFields.map((f) => (
                      <th key={f.id} className="py-3 px-4 whitespace-nowrap text-[#0c1b69] font-bold">
                        {f.label}
                      </th>
                    ))}
                    <th className="py-3 px-4">Status Verifikasi</th>
                    <th className="py-3 px-4">Catatan Pengurus</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={6 + customFormFields.length} className="text-center py-10 text-slate-500">
                        Tidak ada pendaftar yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((candidate) => (
                      <tr key={candidate.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-mono text-[11px] text-[#0c1b69] font-bold block">
                            {candidate.id}
                          </span>
                          <span className="font-bold text-slate-900 text-sm block">
                            {candidate.namaLengkap}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Daftar: {candidate.tanggalDaftar}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-mono font-medium text-slate-700 block">
                            {candidate.nim}
                          </span>
                          <span className="text-slate-600 block">
                            {candidate.jurusan}
                          </span>
                          <span className="text-slate-400 text-[11px]">
                            Semester {candidate.semester}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <a
                            href={`https://wa.me/${candidate.noWhatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:text-emerald-800 font-medium font-mono flex items-center gap-1"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>{candidate.noWhatsapp}</span>
                          </a>
                          <span className="text-slate-400 text-[11px] block truncate max-w-[140px]">
                            {candidate.email}
                          </span>
                        </td>

                        {/* Custom Columns Cells */}
                        {customFormFields.map((f) => (
                          <td key={f.id} className="py-3 px-4 text-slate-700 whitespace-nowrap text-xs">
                            {candidate.customFields?.[f.id] ? (
                              <span className="font-medium text-slate-900 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                                {candidate.customFields[f.id]}
                              </span>
                            ) : (
                              <span className="text-slate-400 italic">-</span>
                            )}
                          </td>
                        ))}

                        <td className="py-3 px-4">
                          <select
                            value={candidate.status}
                            onChange={(e) => onUpdateRegistrationStatus(candidate.id, e.target.value as RegistrationStatus)}
                            className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
                              candidate.status === 'diterima'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : candidate.status === 'terverifikasi'
                                ? 'bg-blue-50 text-[#0c1b69] border-blue-300'
                                : candidate.status === 'ditolak'
                                ? 'bg-red-50 text-red-800 border-red-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="menunggu">Menunggu</option>
                            <option value="terverifikasi">Terverifikasi</option>
                            <option value="diterima">Diterima</option>
                            <option value="ditolak">Perlu Perbaikan</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 max-w-xs">
                          {editNotesId === candidate.id ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="text"
                                value={candidateNotes}
                                onChange={(e) => setCandidateNotes(e.target.value)}
                                className="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0c1b69] w-full"
                              />
                              <button
                                onClick={() => handleSaveNotes(candidate.id)}
                                className="p-1 bg-[#0c1b69] text-white rounded hover:bg-blue-900"
                                title="Simpan Catatan"
                              >
                                <Save className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setEditNotesId(candidate.id);
                                setCandidateNotes(candidate.catatanAdmin || '');
                              }}
                              className="cursor-pointer group flex items-start gap-1"
                              title="Klik untuk ubah catatan"
                            >
                              <span className="text-slate-600 line-clamp-2 text-[11px] italic">
                                {candidate.catatanAdmin || 'Belum ada catatan... (klik untuk isi)'}
                              </span>
                              <Edit3 className="w-3 h-3 text-slate-400 group-hover:text-[#0c1b69] shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => downloadRegistrationPDF(candidate, customFormFields)}
                            className="p-1.5 text-slate-600 hover:text-[#0c1b69] hover:bg-blue-50 rounded-lg transition-colors mr-1 cursor-pointer"
                            title="Unduh & Cetak Surat Bukti PDF"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setSelectedCandidate(candidate)}
                            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors mr-1 cursor-pointer"
                          >
                            Detail
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus data pendaftar ${candidate.namaLengkap}?`)) {
                                onDeleteRegistration(candidate.id);
                              }
                            }}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: GALERI MANAGEMENT */}
        {activeTab === 'galeri' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-slate-900">Dokumentasi & Galeri Rayon</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 inline-flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    <span>Akses Edit: Khusus Admin</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Unggah foto hasil kegiatan, perbarui liputan, dan kelola arsip dokumentasi resmi yang tampil di halaman beranda.
                </p>
              </div>
              <button
                onClick={() => {
                  setNewGalImage('/src/assets/images/pmii_discussion_study_1793298965207.jpg');
                  setShowAddGalleryModal(true);
                }}
                className="px-4 py-2.5 bg-[#0c1b69] hover:bg-blue-900 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs shrink-0"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Foto Kegiatan Baru</span>
              </button>
            </div>

            {/* Admin Policy Notice */}
            <div className="mb-6 p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-950 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#0c1b69] text-white flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <p className="leading-relaxed">
                  <strong>Keamanan Konten:</strong> Foto dokumentasi hasil kegiatan dan deskripsi liputan ini hanya dapat diunggah, diedit, dan dihapus oleh akun Pengurus (Admin). Tamu hanya memiliki akses lihat di portal.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map(item => (
                <div key={item.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="relative aspect-[16/9] bg-slate-200">
                      <img src={item.imageUrl} alt={item.judul} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] capitalize font-medium">
                        {item.kategori}
                      </span>
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#0c1b69]/85 text-amber-300 text-[10px] font-semibold flex items-center gap-1 backdrop-blur-xs">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Admin</span>
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.judul}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{item.tanggal} · {item.lokasi}</p>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">{item.deskripsi}</p>
                      {item.penanggungJawab && (
                        <p className="text-[10px] text-slate-400 mt-2 italic">PJ: {item.penanggungJawab}</p>
                      )}
                    </div>
                  </div>
                  <div className="p-4 pt-3 border-t border-slate-200 flex items-center justify-between bg-white">
                    <button
                      onClick={() => handleStartEditGallery(item)}
                      className="text-xs text-[#0c1b69] hover:text-blue-900 font-semibold inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
                      title="Edit Foto & Data Dokumentasi Kegiatan"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Foto Kegiatan</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus dokumentasi "${item.judul}"? Tindakan ini tidak dapat dibatalkan.`)) {
                          onDeleteGalleryItem(item.id);
                        }
                      }}
                      className="text-xs text-red-600 hover:text-red-800 font-medium inline-flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                      title="Hapus foto kegiatan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AGENDA MANAGEMENT */}
        {activeTab === 'agenda' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Agenda & Pengumuman Rayon</h3>
                <p className="text-xs text-slate-500">Kelola jadwal kegiatan yang akan datang untuk diketahui kader</p>
              </div>
              <button
                onClick={() => setShowAddAgendaModal(true)}
                className="px-4 py-2 bg-[#0c1b69] hover:bg-blue-900 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Agenda Baru</span>
              </button>
            </div>

            <div className="space-y-4">
              {agendas.map(ag => (
                <div key={ag.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-[#0c1b69]">{ag.kategori}</span>
                      <span>·</span>
                      <span>{ag.tanggal} ({ag.waktu})</span>
                      <span>·</span>
                      <span>{ag.tempat}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{ag.judul}</h4>
                    <p className="text-xs text-slate-600 mt-1">{ag.deskripsi}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Hapus agenda "${ag.judul}"?`)) {
                        onDeleteAgendaItem(ag.id);
                      }
                    }}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: QUOTES MANAGEMENT */}
        {activeTab === 'quotes' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Kutipan Inspiratif & Quotes Pergerakan</h3>
                <p className="text-xs text-slate-500">Kelola petuah tokoh bangsa, amanat pendiri PMII, dan wacana reflektif yang tampil di profil rayon</p>
              </div>
              <button
                onClick={() => setShowAddQuoteModal(true)}
                className="px-4 py-2 bg-[#0c1b69] hover:bg-[#09174f] text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Posting Quote Baru</span>
              </button>
            </div>

            {movementQuotes.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                Belum ada quotes yang diposting. Klik tombol "Posting Quote Baru" untuk menambahkan.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {movementQuotes.map(q => (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-200 transition-all flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <Quote className="w-5 h-5 text-[#0c1b69]/40" />
                        <span className="text-[10px] bg-slate-200/80 px-2 py-0.5 rounded text-slate-600 font-mono">
                          ID: {q.id}
                        </span>
                      </div>
                      <blockquote className="text-xs sm:text-sm font-serif-display text-slate-800 italic leading-relaxed mb-4">
                        "{q.kutipan}"
                      </blockquote>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-slate-900 text-xs">{q.tokoh}</h5>
                        <p className="text-[11px] text-[#e52421] font-medium">{q.peran}</p>
                        <span className="text-[10px] text-slate-400 italic block mt-0.5">{q.sumber}</span>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus kutipan dari ${q.tokoh}?`)) {
                            onDeleteQuote(q.id);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        title="Hapus Quote"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: EDIT TEKS BERANDA & UI (CMS PENGURUS) */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
            {/* Header with Save Notification & Actions */}
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0c1b69] text-white flex items-center justify-center">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Manajemen & Edit Teks Beranda (CMS Rayon)</h2>
                    <p className="text-xs text-slate-500">
                      Ubah seluruh teks headline, deskripsi, profil, visi misi, statistik 2 prodi (PAI & PGMI), dan kontak. Perubahan langsung aktif di website tamu.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveTab('pendaftar')}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Dashboard</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-red-700 bg-white hover:bg-red-50 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                >
                  Reset ke Teks Bawaan
                </button>
                <button
                  type="button"
                  onClick={handleSaveContent}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0c1b69] hover:bg-[#09174f] rounded-lg shadow-sm transition-all inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan Teks</span>
                </button>
              </div>
            </div>

            {/* Success Toast Banner */}
            {contentSaveSuccess && (
              <div className="p-4 bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Perubahan teks berhasil disimpan ke sistem! Tampilan Beranda dan antarmuka publik telah diperbarui secara langsung.
                </span>
              </div>
            )}

            {/* Category Switcher Tabs */}
            <div className="w-full max-w-full overflow-x-auto border-b border-slate-200 px-4 sm:px-6 pt-4 bg-white">
              <div className="flex items-center gap-2 min-w-max pb-1">
                <button
                  type="button"
                  onClick={() => setContentCategoryTab('hero')}
                  className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                    contentCategoryTab === 'hero'
                      ? 'border-[#0c1b69] text-[#0c1b69]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  1. Beranda & Hero Section
                </button>
                <button
                  type="button"
                  onClick={() => setContentCategoryTab('profil')}
                  className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                    contentCategoryTab === 'profil'
                      ? 'border-[#0c1b69] text-[#0c1b69]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  2. Profil, NDP & Visi Misi
                </button>
                <button
                  type="button"
                  onClick={() => setContentCategoryTab('struktur')}
                  className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                    contentCategoryTab === 'struktur'
                      ? 'border-[#0c1b69] text-[#0c1b69]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  3. Struktur & Pendaftaran
                </button>
                <button
                  type="button"
                  onClick={() => setContentCategoryTab('kontak')}
                  className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                    contentCategoryTab === 'kontak'
                      ? 'border-[#0c1b69] text-[#0c1b69]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  4. Fakultas, Kontak & Footer
                </button>
              </div>
            </div>

            {/* CMS Form Body */}
            <form onSubmit={handleSaveContent} className="p-6 sm:p-8 space-y-6 text-xs">
              
              {/* SUBSECTION 1: HERO & BERANDA */}
              {contentCategoryTab === 'hero' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">Pengaturan Teks Hero Banner & Headline Utama</h3>
                    <p className="text-slate-500 text-[11px]">Teks yang muncul pertama kali saat pengunjung membuka Beranda.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Label Kicker Atas (Badge Kecil)
                      </label>
                      <input
                        type="text"
                        value={editableContent.heroKicker}
                        onChange={(e) => setEditableContent({ ...editableContent, heroKicker: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0c1b69]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Nama Fakultas Resmi
                      </label>
                      <input
                        type="text"
                        value={editableContent.facultyName}
                        onChange={(e) => setEditableContent({ ...editableContent, facultyName: e.target.value })}
                        placeholder="Fakultas Tarbiyah"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0c1b69]"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">Khusus Fakultas Tarbiyah.</span>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Judul Headline Beranda Utama (H1)
                      </label>
                      <input
                        type="text"
                        value={editableContent.heroTitle}
                        onChange={(e) => setEditableContent({ ...editableContent, heroTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0c1b69] font-bold text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Deskripsi / Paragraf Pengantar Hero
                      </label>
                      <textarea
                        rows={3}
                        value={editableContent.heroDescription}
                        onChange={(e) => setEditableContent({ ...editableContent, heroDescription: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0c1b69] leading-relaxed"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Kutipan pada Foto Utama Hero
                      </label>
                      <input
                        type="text"
                        value={editableContent.heroPhotoQuote}
                        onChange={(e) => setEditableContent({ ...editableContent, heroPhotoQuote: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0c1b69] italic font-serif-display"
                      />
                    </div>
                  </div>

                  {/* 3 Trust Badges */}
                  <div className="border-t border-slate-100 pt-5">
                    <h4 className="text-xs font-bold text-slate-800 mb-3">3 Penanda Keunggulan (Trust Markers)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Badge 1</label>
                        <input
                          type="text"
                          value={editableContent.heroBadge1}
                          onChange={(e) => setEditableContent({ ...editableContent, heroBadge1: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0c1b69]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Badge 2</label>
                        <input
                          type="text"
                          value={editableContent.heroBadge2}
                          onChange={(e) => setEditableContent({ ...editableContent, heroBadge2: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0c1b69]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Badge 3</label>
                        <input
                          type="text"
                          value={editableContent.heroBadge3}
                          onChange={(e) => setEditableContent({ ...editableContent, heroBadge3: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0c1b69]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4 Stats Counters */}
                  <div className="border-t border-slate-100 pt-5">
                    <h4 className="text-xs font-bold text-slate-800 mb-1">4 Statistik Angka Utama (KPI Strip)</h4>
                    <p className="text-[11px] text-slate-500 mb-3">Termasuk angka dan keterangan 2 Program Studi (PAI & PGMI).</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Stat 1 */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Statistik 1 (Sejarah)</span>
                        <input
                          type="text"
                          placeholder="Angka"
                          value={editableContent.heroStat1Number}
                          onChange={(e) => setEditableContent({ ...editableContent, heroStat1Number: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-bold mb-2"
                        />
                        <input
                          type="text"
                          placeholder="Label"
                          value={editableContent.heroStat1Label}
                          onChange={(e) => setEditableContent({ ...editableContent, heroStat1Label: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs mb-2"
                        />
                        <input
                          type="text"
                          placeholder="Keterangan singkat"
                          value={editableContent.heroStat1Desc}
                          onChange={(e) => setEditableContent({ ...editableContent, heroStat1Desc: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>

                      {/* Stat 2 - Prodi Tarbiyah */}
                      <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200">
                        <span className="text-[10px] uppercase font-bold text-[#0c1b69] block mb-2">Statistik 2 (Prodi Tarbiyah)</span>
                        <input
                          type="text"
                          placeholder="2 Prodi"
                          value={editableContent.heroStat2Number}
                          onChange={(e) => setEditableContent({ ...editableContent, heroStat2Number: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-blue-300 rounded-lg font-bold mb-2 text-[#0c1b69]"
                        />
                        <input
                          type="text"
                          placeholder="Program Studi Unggulan"
                          value={editableContent.heroStat2Label}
                          onChange={(e) => setEditableContent({ ...editableContent, heroStat2Label: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-blue-300 rounded-lg text-xs mb-2"
                        />
                        <input
                          type="text"
                          placeholder="Pendidikan Agama Islam (PAI) & PGMI"
                          value={editableContent.heroStat2Desc}
                          onChange={(e) => setEditableContent({ ...editableContent, heroStat2Desc: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-blue-300 rounded-lg text-xs font-medium"
                        />
                      </div>

                      {/* Stat 3 */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Statistik 3 (Alumni)</span>
                        <input
                          type="text"
                          placeholder="450+"
                          value={editableContent.heroStat3Number}
                          onChange={(e) => setEditableContent({ ...editableContent, heroStat3Number: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-bold mb-2"
                        />
                        <input
                          type="text"
                          placeholder="Kader & Alumni"
                          value={editableContent.heroStat3Label}
                          onChange={(e) => setEditableContent({ ...editableContent, heroStat3Label: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs mb-2"
                        />
                        <input
                          type="text"
                          placeholder="Keterangan singkat"
                          value={editableContent.heroStat3Desc}
                          onChange={(e) => setEditableContent({ ...editableContent, heroStat3Desc: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>

                      {/* Stat 4 */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Statistik 4 (Kaderisasi)</span>
                        <input
                          type="text"
                          placeholder="27 Kali"
                          value={editableContent.heroStat4Number}
                          onChange={(e) => setEditableContent({ ...editableContent, heroStat4Number: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-bold mb-2"
                        />
                        <input
                          type="text"
                          placeholder="Angkatan Kaderisasi"
                          value={editableContent.heroStat4Label}
                          onChange={(e) => setEditableContent({ ...editableContent, heroStat4Label: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs mb-2"
                        />
                        <input
                          type="text"
                          placeholder="Keterangan singkat"
                          value={editableContent.heroStat4Desc}
                          onChange={(e) => setEditableContent({ ...editableContent, heroStat4Desc: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBSECTION 2: PROFIL, NDP & VISI MISI */}
              {contentCategoryTab === 'profil' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">Pengaturan Profil, 4 Pilar NDP & Visi Misi Rayon</h3>
                    <p className="text-slate-500 text-[11px]">Landasan filosofis dan komitmen pergerakan mahasiswa calon guru PAI & PGMI.</p>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Judul Bagian Profil</label>
                    <input
                      type="text"
                      value={editableContent.aboutTitle}
                      onChange={(e) => setEditableContent({ ...editableContent, aboutTitle: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0c1b69] font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Deskripsi Narasi Profil Rayon</label>
                    <textarea
                      rows={3}
                      value={editableContent.aboutDescription}
                      onChange={(e) => setEditableContent({ ...editableContent, aboutDescription: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0c1b69] leading-relaxed"
                    />
                  </div>

                  {/* 4 Pilar NDP */}
                  <div className="border-t border-slate-100 pt-5">
                    <h4 className="text-xs font-bold text-slate-800 mb-3">4 Pilar Nilai Dasar Pergerakan (NDP)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <label className="block font-bold text-[#0c1b69] mb-1">01. Tauhid</label>
                        <input
                          type="text"
                          value={editableContent.ndp1Title}
                          onChange={(e) => setEditableContent({ ...editableContent, ndp1Title: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-bold mb-2"
                        />
                        <textarea
                          rows={2}
                          value={editableContent.ndp1Desc}
                          onChange={(e) => setEditableContent({ ...editableContent, ndp1Desc: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <label className="block font-bold text-[#e52421] mb-1">02. Hablum Minallah</label>
                        <input
                          type="text"
                          value={editableContent.ndp2Title}
                          onChange={(e) => setEditableContent({ ...editableContent, ndp2Title: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-bold mb-2"
                        />
                        <textarea
                          rows={2}
                          value={editableContent.ndp2Desc}
                          onChange={(e) => setEditableContent({ ...editableContent, ndp2Desc: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <label className="block font-bold text-[#0c1b69] mb-1">03. Hablum Minannas</label>
                        <input
                          type="text"
                          value={editableContent.ndp3Title}
                          onChange={(e) => setEditableContent({ ...editableContent, ndp3Title: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-bold mb-2"
                        />
                        <textarea
                          rows={2}
                          value={editableContent.ndp3Desc}
                          onChange={(e) => setEditableContent({ ...editableContent, ndp3Desc: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <label className="block font-bold text-emerald-700 mb-1">04. Hablum Minal Alam</label>
                        <input
                          type="text"
                          value={editableContent.ndp4Title}
                          onChange={(e) => setEditableContent({ ...editableContent, ndp4Title: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-bold mb-2"
                        />
                        <textarea
                          rows={2}
                          value={editableContent.ndp4Desc}
                          onChange={(e) => setEditableContent({ ...editableContent, ndp4Desc: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Visi & 4 Misi */}
                  <div className="border-t border-slate-100 pt-5 space-y-4">
                    <h4 className="text-xs font-bold text-slate-800">Visi & 4 Misi Strategis Rayon</h4>
                    
                    <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200">
                      <label className="block font-bold text-[#0c1b69] mb-1">Teks Visi Kepengurusan</label>
                      <input
                        type="text"
                        value={editableContent.visiTitle}
                        onChange={(e) => setEditableContent({ ...editableContent, visiTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-blue-300 rounded-lg font-bold mb-2 text-sm"
                      />
                      <textarea
                        rows={2}
                        value={editableContent.visiDescription}
                        onChange={(e) => setEditableContent({ ...editableContent, visiDescription: e.target.value })}
                        className="w-full px-3 py-2 border border-blue-300 rounded-lg text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Misi 1: Kaderisasi</label>
                        <textarea
                          rows={2}
                          value={editableContent.misi1}
                          onChange={(e) => setEditableContent({ ...editableContent, misi1: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Misi 2: Literasi & Riset</label>
                        <textarea
                          rows={2}
                          value={editableContent.misi2}
                          onChange={(e) => setEditableContent({ ...editableContent, misi2: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Misi 3: Tarbiyah Mengajar & Desa</label>
                        <textarea
                          rows={2}
                          value={editableContent.misi3}
                          onChange={(e) => setEditableContent({ ...editableContent, misi3: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Misi 4: Advokasi Mahasiswa</label>
                        <textarea
                          rows={2}
                          value={editableContent.misi4}
                          onChange={(e) => setEditableContent({ ...editableContent, misi4: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBSECTION 3: STRUKTUR & PENDAFTARAN */}
              {contentCategoryTab === 'struktur' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">Pengaturan Teks Struktur Pengurus & Pendaftaran</h3>
                    <p className="text-slate-500 text-[11px]">Teks pengantar untuk bagan kepengurusan PAI & PGMI serta form pendaftaran.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Judul Bagian Struktur</label>
                      <input
                        type="text"
                        value={editableContent.structureTitle}
                        onChange={(e) => setEditableContent({ ...editableContent, structureTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Deskripsi Subjudul Struktur</label>
                      <textarea
                        rows={2}
                        value={editableContent.structureSubtitle}
                        onChange={(e) => setEditableContent({ ...editableContent, structureSubtitle: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Catatan Khusus KOPRI (Korps PMII Putri)</label>
                      <textarea
                        rows={2}
                        value={editableContent.kopriNote}
                        onChange={(e) => setEditableContent({ ...editableContent, kopriNote: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                      <label className="block font-semibold text-slate-700 mb-1">Judul Formulir Pendaftaran</label>
                      <input
                        type="text"
                        value={editableContent.regTitle}
                        onChange={(e) => setEditableContent({ ...editableContent, regTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Subjudul / Arahan Pendaftaran</label>
                      <textarea
                        rows={2}
                        value={editableContent.regSubtitle}
                        onChange={(e) => setEditableContent({ ...editableContent, regSubtitle: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SUBSECTION 4: KONTAK, SEKRETARIAT & FOOTER */}
              {contentCategoryTab === 'kontak' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">Pengaturan Identitas Organisasi, Sekretariat & Kontak Footer</h3>
                    <p className="text-slate-500 text-[11px]">Informasi lokasi sekretariat Fakultas Tarbiyah dan kanal komunikasi resmi.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Nama Organisasi Resmi</label>
                      <input
                        type="text"
                        value={editableContent.brandName}
                        onChange={(e) => setEditableContent({ ...editableContent, brandName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Semboyan Utama PMII</label>
                      <input
                        type="text"
                        value={editableContent.motto}
                        onChange={(e) => setEditableContent({ ...editableContent, motto: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-[#e52421]"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">Alamat Lengkap Sekretariat</label>
                      <input
                        type="text"
                        value={editableContent.secretariatAddress}
                        onChange={(e) => setEditableContent({ ...editableContent, secretariatAddress: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">Contoh: Gedung PKM Fakultas Tarbiyah, Kampus Tarbiyah</span>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Nomor Telepon / Narahubung WhatsApp</label>
                      <input
                        type="text"
                        value={editableContent.contactPhone}
                        onChange={(e) => setEditableContent({ ...editableContent, contactPhone: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Alamat Email Resmi</label>
                      <input
                        type="email"
                        value={editableContent.contactEmail}
                        onChange={(e) => setEditableContent({ ...editableContent, contactEmail: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Submit Bar */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Perubahan akan disimpan dan langsung dapat dilihat oleh publik di tampilan Tamu.
                </span>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl"
                  >
                    Batal / Reset ke Default
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#0c1b69] hover:bg-[#09174f] text-white text-xs font-bold rounded-xl shadow-md transition-all inline-flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Seluruh Perubahan Teks</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        )}

      </div>

      {/* MODAL: CANDIDATE DETAIL */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-[#0c1b69] px-6 py-4 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-300 font-mono">{selectedCandidate.id}</span>
                <h3 className="text-lg font-bold">{selectedCandidate.namaLengkap}</h3>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-white/80 hover:text-white p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block">NIM</span>
                  <span className="font-mono font-semibold text-slate-800 text-sm">{selectedCandidate.nim}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Program Studi & Semester</span>
                  <span className="font-semibold text-slate-800 text-sm">{selectedCandidate.jurusan} (Smstr {selectedCandidate.semester})</span>
                </div>
                <div>
                  <span className="text-slate-400 block">No. WhatsApp</span>
                  <a
                    href={`https://wa.me/${selectedCandidate.noWhatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-semibold text-emerald-700 underline text-sm"
                  >
                    {selectedCandidate.noWhatsapp}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block">Email</span>
                  <span className="font-semibold text-slate-800">{selectedCandidate.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Asal Daerah</span>
                  <span className="font-semibold text-slate-800">{selectedCandidate.alamatAsal}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Domisili Kampus</span>
                  <span className="font-semibold text-slate-800">{selectedCandidate.domisili}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Minat & Bakat:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.minatBakat.map(m => (
                    <span key={m} className="px-2.5 py-1 bg-blue-50 text-[#0c1b69] rounded-lg font-medium border border-blue-200">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Alasan Bergabung PMII:</span>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700 leading-relaxed italic">
                  "{selectedCandidate.alasanBergabung}"
                </p>
              </div>

              {selectedCandidate.pengalamanOrganisasi && (
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Pengalaman Organisasi:</span>
                  <p className="text-slate-700">{selectedCandidate.pengalamanOrganisasi}</p>
                </div>
              )}

              {/* Custom Fields in Candidate Detail */}
              {customFormFields && customFormFields.length > 0 && selectedCandidate.customFields && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900 block mb-2">Kolom Tambahan Khusus:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-blue-50/50 p-3 rounded-xl border border-blue-200">
                    {customFormFields.map(f => (
                      <div key={f.id}>
                        <span className="text-slate-500 block text-[11px]">{f.label}:</span>
                        <strong className="text-slate-900">{selectedCandidate.customFields?.[f.id] || '-'}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PDF Action in Candidate Detail */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-600 font-medium">Dokumen Surat Bukti Registrasi Resmi:</span>
                <button
                  type="button"
                  onClick={() => downloadRegistrationPDF(selectedCandidate, customFormFields)}
                  className="px-3.5 py-1.5 bg-[#0c1b69] hover:bg-[#09174f] text-white rounded-lg font-bold text-xs inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#fed100]" />
                  <span>Cetak / Unduh PDF</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-900 block mb-2">Ubah Status Calon:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      onUpdateRegistrationStatus(selectedCandidate.id, 'terverifikasi', 'Berkas lolos verifikasi online.');
                      setSelectedCandidate(null);
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold cursor-pointer"
                  >
                    Setujui Verifikasi
                  </button>
                  <button
                    onClick={() => {
                      onUpdateRegistrationStatus(selectedCandidate.id, 'diterima', 'Selamat! Diterima mengikuti forum MAPABA XXVII.');
                      setSelectedCandidate(null);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold cursor-pointer"
                  >
                    Terima MAPABA
                  </button>
                  <button
                    onClick={() => {
                      onUpdateRegistrationStatus(selectedCandidate.id, 'ditolak', 'Perlu perbaikan data/KTM.');
                      setSelectedCandidate(null);
                    }}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold cursor-pointer"
                  >
                    Minta Perbaikan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: KELOLA & TAMBAH KOLOM FORMULIR BARU (ADMIN ONLY) */}
      {showCustomColumnsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="bg-[#0c1b69] px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Columns className="w-5 h-5 text-[#fed100]" />
                <div>
                  <h3 className="font-bold text-base text-white">Kelola & Tambah Kolom Formulir Baru</h3>
                  <p className="text-xs text-blue-200">Kolom baru akan otomatis muncul di formulir pendaftar & tabel admin</p>
                </div>
              </div>
              <button
                onClick={() => setShowCustomColumnsModal(false)}
                className="text-white/80 hover:text-white p-1 rounded-full cursor-pointer hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              
              {/* Form Tambah Kolom Baru */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
                <h4 className="font-bold text-slate-900 text-sm mb-1 text-[#0c1b69] flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Buat Kolom / Bidang Baru</span>
                </h4>
                <p className="text-[11px] text-slate-500 mb-3">
                  Tentukan pertanyaan atau data tambahan yang perlu diisi oleh pendaftar MAPABA.
                </p>

                <form onSubmit={handleCreateCustomColumn} className="space-y-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nama / Label Kolom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ukuran Kaos / Baju, Akun IG, Golongan Darah..."
                      value={newColLabel}
                      onChange={(e) => setNewColLabel(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1b69]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Tipe Kolom
                      </label>
                      <select
                        value={newColType}
                        onChange={(e) => setNewColType(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1b69]"
                      >
                        <option value="text">Teks Singkat</option>
                        <option value="number">Angka (Nomor)</option>
                        <option value="select">Pilihan Dropdown</option>
                        <option value="textarea">Catatan Panjang</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Placeholder / Petunjuk
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: @username / S, M..."
                        value={newColPlaceholder}
                        onChange={(e) => setNewColPlaceholder(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1b69]"
                      />
                    </div>
                  </div>

                  {newColType === 'select' && (
                    <div className="animate-fadeIn">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Pilihan Dropdown (Pisahkan dengan koma) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: S, M, L, XL, XXL, XXXL"
                        value={newColOptions}
                        onChange={(e) => setNewColOptions(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1b69]"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="col-required"
                      checked={newColRequired}
                      onChange={(e) => setNewColRequired(e.target.checked)}
                      className="rounded text-[#0c1b69] focus:ring-[#0c1b69]"
                    />
                    <label htmlFor="col-required" className="text-xs text-slate-700 font-medium cursor-pointer">
                      Wajib diisi oleh calon pendaftar (Required)
                    </label>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#0c1b69] hover:bg-[#09174f] text-white font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambahkan Kolom ke Sistem</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Daftar Kolom yang Sudah Ada */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">
                  Daftar Kolom Tambahan Aktif ({customFormFields.length})
                </h4>
                
                {customFormFields.length === 0 ? (
                  <p className="text-slate-400 italic p-4 text-center border border-dashed border-slate-200 rounded-xl">
                    Belum ada kolom khusus tambahan. Silakan tambahkan kolom di atas.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {customFormFields.map((f, idx) => (
                      <div 
                        key={f.id} 
                        className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-xs">{idx + 1}. {f.label}</span>
                            {f.required ? (
                              <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">Wajib</span>
                            ) : (
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">Opsional</span>
                            )}
                            <span className="text-[10px] bg-blue-100 text-[#0c1b69] px-1.5 py-0.5 rounded uppercase font-semibold">
                              {f.type}
                            </span>
                          </div>
                          {f.options && (
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Pilihan: {f.options.join(', ')}
                            </p>
                          )}
                        </div>

                        {onDeleteCustomField && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Hapus kolom "${f.label}" dari formulir pendaftaran?`)) {
                                onDeleteCustomField(f.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Hapus kolom ini"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowCustomColumnsModal(false)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INPUT OFFLINE REGISTRANT */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-base">Input Pendaftar Offline</h3>
              <button onClick={() => setShowAddMemberModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualMember} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Nama calon kader..."
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">NIM Mahasiswa</label>
                <input
                  type="text"
                  required
                  placeholder="NIM..."
                  value={newMemberNim}
                  onChange={(e) => setNewMemberNim(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Program Studi</label>
                <select
                  value={newMemberProdi}
                  onChange={(e) => setNewMemberProdi(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                >
                  {JURUSAN_TARBIYAH.map(j => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">No. WhatsApp</label>
                <input
                  type="text"
                  required
                  placeholder="08..."
                  value={newMemberWa}
                  onChange={(e) => setNewMemberWa(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Asal Daerah</label>
                <input
                  type="text"
                  placeholder="Kota / Kab..."
                  value={newMemberAlamat}
                  onChange={(e) => setNewMemberAlamat(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0c1b69] text-white font-semibold rounded-lg hover:bg-blue-900"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD GALLERY ITEM */}
      {showAddGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#0c1b69]" />
                <h3 className="font-bold text-slate-900 text-base">Upload Foto Hasil Kegiatan Baru</h3>
              </div>
              <button onClick={() => setShowAddGalleryModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Admin Policy Notice */}
            <div className="mb-4 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Akses Terbatas:</strong> Hanya Pengurus/Admin yang memiliki wewenang mengunggah dokumentasi kegiatan rayon ini.
              </span>
            </div>

            <form onSubmit={handleCreateGallery} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Kegiatan *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Diskusi Buku Pendidikan Kritis & Dekonstruksi Pedagogi"
                  value={newGalTitle}
                  onChange={(e) => setNewGalTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori Kegiatan *</label>
                  <select
                    value={newGalCategory}
                    onChange={(e) => setNewGalCategory(e.target.value as GalleryCategory)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  >
                    <option value="kaderisasi">Kaderisasi & MAPABA</option>
                    <option value="intelektual">Kajian & Diskusi</option>
                    <option value="sosial">Tarbiyah Mengajar / Sosial</option>
                    <option value="keagamaan">Keagamaan & Sholawat</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tanggal Pelaksanaan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 15 November 2026"
                    value={newGalDate}
                    onChange={(e) => setNewGalDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lokasi Kegiatan</label>
                  <input
                    type="text"
                    placeholder="Gedung Tarbiyah / Kampus..."
                    value={newGalLocation}
                    onChange={(e) => setNewGalLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Penanggung Jawab (PJ)</label>
                  <input
                    type="text"
                    placeholder="Biro Media & Kaderisasi"
                    defaultValue="Biro Media & Kaderisasi"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi & Liputan Singkat</label>
                <textarea
                  rows={2}
                  placeholder="Ceritakan gambaran singkat dan hasil dari kegiatan ini..."
                  value={newGalDesc}
                  onChange={(e) => setNewGalDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                />
              </div>

              {/* Upload Foto Hasil Kegiatan Section */}
              <div className="pt-1">
                <label className="block font-semibold text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>Foto Hasil Kegiatan *</span>
                  <span className="text-[10px] text-slate-500 font-normal">Hanya bisa diunggah & diedit oleh Admin</span>
                </label>

                {/* Source switcher tabs */}
                <div className="flex gap-1.5 mb-2.5 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setImageUploadSource('file')}
                    className={`flex-1 py-1 text-center font-medium rounded-md transition-colors ${
                      imageUploadSource === 'file' ? 'bg-white shadow-xs text-[#0c1b69] font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📁 Upload dari Komputer/HP
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUploadSource('preset')}
                    className={`flex-1 py-1 text-center font-medium rounded-md transition-colors ${
                      imageUploadSource === 'preset' ? 'bg-white shadow-xs text-[#0c1b69] font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🖼️ Template Arsip
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUploadSource('url')}
                    className={`flex-1 py-1 text-center font-medium rounded-md transition-colors ${
                      imageUploadSource === 'url' ? 'bg-white shadow-xs text-[#0c1b69] font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🔗 URL Gambar
                  </button>
                </div>

                {/* Option 1: File Upload */}
                {imageUploadSource === 'file' && (
                  <div className="space-y-2">
                    <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-[#0c1b69] rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50/40 transition-colors">
                      <Upload className="w-6 h-6 text-[#0c1b69] mb-1.5" />
                      <span className="font-semibold text-slate-800 text-xs">Pilih Foto Kegiatan dari Galeri / Kamera</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">Mendukung format JPG, PNG, atau WebP (Maks 4MB)</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageFileUpload(file, false);
                        }}
                      />
                    </label>
                  </div>
                )}

                {/* Option 2: Template Preset */}
                {imageUploadSource === 'preset' && (
                  <div>
                    <select
                      value={newGalImage}
                      onChange={(e) => setNewGalImage(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                    >
                      <option value="/src/assets/images/pmii_discussion_study_1793298965207.jpg">Diskusi Perpustakaan (Kajian Akademik)</option>
                      <option value="/src/assets/images/pmii_mapaba_activity_1793298963836.jpg">Auditorium Kaderisasi (MAPABA Tarbiyah)</option>
                      <option value="/src/assets/images/pmii_community_service_1793298964739.jpg">Tarbiyah Mengajar Siswa (Bakti Sosial)</option>
                      <option value="/src/assets/images/pmii_hero_students_1793298963549.jpg">Kader Halaman Masjid (Keagamaan)</option>
                    </select>
                  </div>
                )}

                {/* Option 3: URL */}
                {imageUploadSource === 'url' && (
                  <div>
                    <input
                      type="url"
                      placeholder="https://example.com/foto-kegiatan.jpg"
                      value={newGalImage}
                      onChange={(e) => setNewGalImage(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                    />
                  </div>
                )}

                {/* Live Preview */}
                {newGalImage && (
                  <div className="mt-2.5 p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3">
                    <img
                      src={newGalImage}
                      alt="Pratinjau Foto Kegiatan"
                      className="w-16 h-12 object-cover rounded border border-slate-300 shrink-0 bg-white"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-800 truncate">Pratinjau Foto Siap Diunggah</p>
                      <p className="text-[10px] text-emerald-600 font-medium">✓ Foto terpasang dan siap diterbitkan ke galeri publik</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddGalleryModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0c1b69] text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors shadow-xs"
                >
                  Terbitkan Foto Kegiatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT GALLERY ITEM (ADMIN ONLY) */}
      {editingGalleryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#0c1b69]" />
                <h3 className="font-bold text-slate-900 text-base">Edit Foto Hasil Kegiatan</h3>
              </div>
              <button onClick={() => setEditingGalleryItem(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Admin Policy Notice */}
            <div className="mb-4 p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-950 text-xs flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#0c1b69] shrink-0" />
              <span>
                <strong>Akses Khusus Admin:</strong> Anda sedang memperbarui arsip dokumentasi resmi. Perubahan akan langsung tercermin pada galeri publik.
              </span>
            </div>

            <form onSubmit={handleSaveEditGallery} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Kegiatan *</label>
                <input
                  type="text"
                  required
                  value={editGalTitle}
                  onChange={(e) => setEditGalTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori *</label>
                  <select
                    value={editGalCategory}
                    onChange={(e) => setEditGalCategory(e.target.value as GalleryCategory)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  >
                    <option value="kaderisasi">Kaderisasi & MAPABA</option>
                    <option value="intelektual">Kajian & Diskusi</option>
                    <option value="sosial">Tarbiyah Mengajar / Sosial</option>
                    <option value="keagamaan">Keagamaan & Sholawat</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tanggal Pelaksanaan *</label>
                  <input
                    type="text"
                    required
                    value={editGalDate}
                    onChange={(e) => setEditGalDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lokasi</label>
                  <input
                    type="text"
                    value={editGalLocation}
                    onChange={(e) => setEditGalLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Penanggung Jawab (PJ)</label>
                  <input
                    type="text"
                    value={editGalPenanggungJawab}
                    onChange={(e) => setEditGalPenanggungJawab(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi & Liputan</label>
                <textarea
                  rows={3}
                  value={editGalDesc}
                  onChange={(e) => setEditGalDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                />
              </div>

              {/* Edit / Ganti Foto Kegiatan */}
              <div className="pt-1">
                <label className="block font-semibold text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>Ganti Foto Dokumentasi</span>
                  <span className="text-[10px] text-amber-700 font-medium">Hanya Admin yang dapat mengedit foto</span>
                </label>

                {/* Source switcher tabs */}
                <div className="flex gap-1.5 mb-2.5 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setEditImageUploadSource('file')}
                    className={`flex-1 py-1 text-center font-medium rounded-md transition-colors ${
                      editImageUploadSource === 'file' ? 'bg-white shadow-xs text-[#0c1b69] font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📁 Upload File Baru
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditImageUploadSource('preset')}
                    className={`flex-1 py-1 text-center font-medium rounded-md transition-colors ${
                      editImageUploadSource === 'preset' ? 'bg-white shadow-xs text-[#0c1b69] font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🖼️ Template Arsip
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditImageUploadSource('url')}
                    className={`flex-1 py-1 text-center font-medium rounded-md transition-colors ${
                      editImageUploadSource === 'url' ? 'bg-white shadow-xs text-[#0c1b69] font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🔗 URL Gambar
                  </button>
                </div>

                {/* Option 1: File Upload */}
                {editImageUploadSource === 'file' && (
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-[#0c1b69] rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50/40 transition-colors">
                    <Upload className="w-6 h-6 text-[#0c1b69] mb-1.5" />
                    <span className="font-semibold text-slate-800 text-xs">Pilih Berkas Foto Baru</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">Klik untuk mengunggah pengganti foto kegiatan ini (Maks 4MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageFileUpload(file, true);
                      }}
                    />
                  </label>
                )}

                {/* Option 2: Template Preset */}
                {editImageUploadSource === 'preset' && (
                  <div>
                    <select
                      value={editGalImage}
                      onChange={(e) => setEditGalImage(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                    >
                      <option value="/src/assets/images/pmii_discussion_study_1793298965207.jpg">Diskusi Perpustakaan (Kajian Akademik)</option>
                      <option value="/src/assets/images/pmii_mapaba_activity_1793298963836.jpg">Auditorium Kaderisasi (MAPABA Tarbiyah)</option>
                      <option value="/src/assets/images/pmii_community_service_1793298964739.jpg">Tarbiyah Mengajar Siswa (Bakti Sosial)</option>
                      <option value="/src/assets/images/pmii_hero_students_1793298963549.jpg">Kader Halaman Masjid (Keagamaan)</option>
                    </select>
                  </div>
                )}

                {/* Option 3: URL */}
                {editImageUploadSource === 'url' && (
                  <div>
                    <input
                      type="url"
                      placeholder="https://example.com/foto-kegiatan.jpg"
                      value={editGalImage}
                      onChange={(e) => setEditGalImage(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                    />
                  </div>
                )}

                {/* Current / Preview Image */}
                {editGalImage && (
                  <div className="mt-2.5 p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3">
                    <img
                      src={editGalImage}
                      alt="Pratinjau Foto"
                      className="w-16 h-12 object-cover rounded border border-slate-300 shrink-0 bg-white"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-800 truncate">Foto Terpasang Saat Ini</p>
                      <p className="text-[10px] text-slate-500">Foto ini akan diperbarui setelah Anda menekan tombol simpan</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingGalleryItem(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0c1b69] text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors shadow-xs"
                >
                  Simpan Perubahan Foto & Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD AGENDA ITEM */}
      {showAddAgendaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-base">Tambah Agenda Rayon</h3>
              <button onClick={() => setShowAddAgendaModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAgenda} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Agenda</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: MAPABA Susulan..."
                  value={newAgTitle}
                  onChange={(e) => setNewAgTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tanggal</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 28 Nov 2026"
                    value={newAgDate}
                    onChange={(e) => setNewAgDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Waktu</label>
                  <input
                    type="text"
                    placeholder="08.00 - Selesai"
                    value={newAgTime}
                    onChange={(e) => setNewAgTime(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tempat</label>
                <input
                  type="text"
                  placeholder="Gedung Serbaguna..."
                  value={newAgPlace}
                  onChange={(e) => setNewAgPlace(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  placeholder="Keterangan agenda..."
                  value={newAgDesc}
                  onChange={(e) => setNewAgDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddAgendaModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0c1b69] text-white font-semibold rounded-lg hover:bg-blue-900"
                >
                  Simpan Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: POST NEW QUOTE */}
      {showAddQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0c1b69] flex items-center justify-center">
                  <Quote className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Posting Quote Pergerakan Baru</h3>
                  <p className="text-[11px] text-slate-500">Kutipan akan langsung tampil di rubrik Profil Landing Page</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddQuoteModal(false)} 
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuote} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Isi Kutipan / Kata Mutiara <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ketikkan kutipan atau amanat perjuangan..."
                  value={newQuoteText}
                  onChange={(e) => setNewQuoteText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69] font-serif-display text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nama Tokoh / Penulis Kutipan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Mahbub Djunaidi / K.H. Abdurrahman Wahid / Sahabat Pengurus"
                  value={newQuoteAuthor}
                  onChange={(e) => setNewQuoteAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Peran / Jabatan Tokoh</label>
                  <input
                    type="text"
                    placeholder="Contoh: Pendekar Pena & Ketum PB PMII I"
                    value={newQuoteRole}
                    onChange={(e) => setNewQuoteRole(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sumber Rujukan / Konteks</label>
                  <input
                    type="text"
                    placeholder="Contoh: Kompilasi Esai Pergerakan"
                    value={newQuoteSource}
                    onChange={(e) => setNewQuoteSource(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  />
                </div>
              </div>

              {/* Live Preview Card */}
              {newQuoteText && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">Pratinjau Tampilan:</span>
                  <blockquote className="font-serif-display italic text-slate-800 text-xs sm:text-sm leading-relaxed mb-2">
                    "{newQuoteText}"
                  </blockquote>
                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200">
                    <span className="font-bold text-slate-900">{newQuoteAuthor || 'Nama Tokoh'}</span>
                    <span className="text-[#e52421] font-medium">{newQuoteRole || 'Peran Tokoh'}</span>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddQuoteModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0c1b69] hover:bg-[#09174f] text-white font-semibold rounded-lg shadow-sm transition-colors"
                >
                  Terbitkan Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
