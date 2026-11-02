export type UserRole = 'guest' | 'admin';

export type RegistrationStatus = 'menunggu' | 'terverifikasi' | 'diterima' | 'ditolak';

export interface MemberRegistration {
  id: string; // e.g. PMII-TAR-2026-001
  namaLengkap: string;
  nim: string;
  jurusan: string;
  semester: number;
  noWhatsapp: string;
  email: string;
  alamatAsal: string;
  domisili: string;
  minatBakat: string[];
  alasanBergabung: string;
  pengalamanOrganisasi?: string;
  fotoUrl?: string;
  tanggalDaftar: string;
  status: RegistrationStatus;
  catatanAdmin?: string;
  customFields?: Record<string, string>;
}

export interface CustomFormField {
  id: string; // e.g. "field_ukuran_kaos"
  label: string; // e.g. "Ukuran Kaos", "Akun Instagram", "Golongan Darah"
  type: 'text' | 'number' | 'select' | 'textarea';
  options?: string[]; // for select dropdown
  required: boolean;
  placeholder?: string;
}

export type GalleryCategory = 'kaderisasi' | 'intelektual' | 'sosial' | 'keagamaan';

export interface GalleryItem {
  id: string;
  judul: string;
  kategori: GalleryCategory;
  tanggal: string;
  lokasi: string;
  deskripsi: string;
  imageUrl: string;
  penanggungJawab?: string;
}

export interface AgendaItem {
  id: string;
  judul: string;
  tanggal: string;
  waktu: string;
  tempat: string;
  kategori: string;
  deskripsi: string;
  status: 'Akan Datang' | 'Sedang Berlangsung' | 'Selesai';
}

export interface FAQItem {
  pertanyaan: string;
  jawaban: string;
}

export interface StructureMember {
  nama: string;
  jabatan: string;
  prodi: string;
  foto?: string;
}

export interface ProfileArticle {
  id: string;
  judul: string;
  penulis: string;
  jabatanPenulis: string;
  tanggal: string;
  kategori: string;
  ringkasan: string;
  isiLengkap: string;
  estimasiBaca: string;
}

export interface MovementQuote {
  id: string;
  kutipan: string;
  tokoh: string;
  peran: string;
  sumber: string;
}

export interface PhotoHighlight {
  id: string;
  judul: string;
  tanggal: string;
  lokasi: string;
  deskripsi: string;
  imageUrl: string;
}

export interface SiteContentConfig {
  // Brand & Kicker
  brandName: string;
  brandTagline: string;
  facultyName: string; // "Fakultas Tarbiyah"

  // Hero Section
  heroKicker: string;
  heroTitle: string;
  heroDescription: string;
  heroPhotoQuote: string;
  heroBadge1: string;
  heroBadge2: string;
  heroBadge3: string;
  heroStat1Number: string;
  heroStat1Label: string;
  heroStat1Desc: string;
  heroStat2Number: string;
  heroStat2Label: string;
  heroStat2Desc: string;
  heroStat3Number: string;
  heroStat3Label: string;
  heroStat3Desc: string;
  heroStat4Number: string;
  heroStat4Label: string;
  heroStat4Desc: string;

  // Profil & NDP
  aboutKicker: string;
  aboutTitle: string;
  aboutDescription: string;
  ndp1Title: string;
  ndp1Desc: string;
  ndp2Title: string;
  ndp2Desc: string;
  ndp3Title: string;
  ndp3Desc: string;
  ndp4Title: string;
  ndp4Desc: string;
  visiTitle: string;
  visiDescription: string;
  misi1: string;
  misi2: string;
  misi3: string;
  misi4: string;

  // Struktur & Organisasi
  structureTitle: string;
  structureSubtitle: string;
  kopriNote: string;

  // Pendaftaran
  regTitle: string;
  regSubtitle: string;

  // Kontak & Sekretariat
  secretariatAddress: string;
  contactPhone: string;
  contactEmail: string;
  motto: string;
}
