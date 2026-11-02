import { 
  MemberRegistration, 
  GalleryItem, 
  AgendaItem, 
  FAQItem, 
  StructureMember,
  ProfileArticle,
  MovementQuote,
  PhotoHighlight,
  SiteContentConfig,
  CustomFormField
} from '../types';

export const INITIAL_CUSTOM_FIELDS: CustomFormField[] = [
  {
    id: 'field_ukuran_kaos',
    label: 'Ukuran Kaos / PDL MAPABA',
    type: 'select',
    options: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    required: true,
    placeholder: 'Pilih ukuran kaos...'
  },
  {
    id: 'field_instagram',
    label: 'Akun Instagram / Media Sosial',
    type: 'text',
    required: false,
    placeholder: 'Contoh: @username_kamu'
  },
  {
    id: 'field_riwayat_kesehatan',
    label: 'Riwayat Penyakit / Alergi Khusus',
    type: 'text',
    required: false,
    placeholder: 'Isi jika ada, atau tulis Tidak Ada'
  }
];

export const INITIAL_REGISTRATIONS: MemberRegistration[] = [
  {
    id: 'PMII-TAR-2026-001',
    namaLengkap: 'Ahmad Faiz Al-Faruqi',
    nim: '2311010042',
    jurusan: 'Pendidikan Agama Islam (PAI)',
    semester: 3,
    noWhatsapp: '081234567890',
    email: 'faiz.alfaruqi@student.ac.id',
    alamatAsal: 'Jepara, Jawa Tengah',
    domisili: 'Pondok Pesantren Al-Hikmah Tarbiyah',
    minatBakat: ['Kepenulisan Ilmiah', 'Kajian Kitab Kuning', 'Advokasi Mahasiswa'],
    alasanBergabung: 'Ingin memperdalam wawasan Islam moderat Ahlussunnah wal Jamaah dan mengasah nalar kritis sebagai calon pendidik PAI.',
    pengalamanOrganisasi: 'Ketua OSIS MA Maarif Jepara (2022-2023)',
    tanggalDaftar: '2026-10-24 09:15',
    status: 'terverifikasi',
    catatanAdmin: 'Berkas lengkap, siap mengikuti screening MAPABA XXVII.'
  },
  {
    id: 'PMII-TAR-2026-002',
    namaLengkap: 'Siti Nur Azizah',
    nim: '2411020018',
    jurusan: 'Pendidikan Guru Madrasah Ibtidaiyah (PGMI)',
    semester: 1,
    noWhatsapp: '085712345678',
    email: 'azizah.siti@student.ac.id',
    alamatAsal: 'Kudus, Jawa Tengah',
    domisili: 'Kost An-Nisa Gang 4, No. 12',
    minatBakat: ['Desain Grafis & Media', 'Kepenulisan Ilmiah', 'Public Speaking'],
    alasanBergabung: 'Mencari ruang dialektika yang mendukung pengembangan bakat keguruan PGMI dan pemberdayaan perempuan dalam bingkai KOPRI.',
    pengalamanOrganisasi: 'Redaktur Buletin Santri PP Yanbuul Quran (2023-2024)',
    tanggalDaftar: '2026-10-25 14:30',
    status: 'diterima',
    catatanAdmin: 'Lolos screening wawancara, nilai komitmen A.'
  },
  {
    id: 'PMII-TAR-2026-003',
    namaLengkap: 'Muhammad Ilham Pratama',
    nim: '2411030055',
    jurusan: 'Pendidikan Guru Madrasah Ibtidaiyah (PGMI)',
    semester: 1,
    noWhatsapp: '089611223344',
    email: 'ilham.pgmi@student.ac.id',
    alamatAsal: 'Banyumas, Jawa Tengah',
    domisili: 'Wisma Mahasiswa Pelajar Tarbiyah',
    minatBakat: ['Pengabdian Mengajar', 'Seni Musik/Hadroh', 'Manajemen Organisasi'],
    alasanBergabung: 'Tertarik dengan program Tarbiyah Mengajar dan tradisi intelektual PMII yang mengakar pada nilai Aswaja.',
    pengalamanOrganisasi: 'Wakil Ketua IPNU Ranting Sokaraja (2022-2024)',
    tanggalDaftar: '2026-10-26 11:20',
    status: 'menunggu',
    catatanAdmin: 'Menunggu konfirmasi kehadiran screening.'
  },
  {
    id: 'PMII-TAR-2026-004',
    namaLengkap: 'Zulfa Nailul Muna',
    nim: '2411040029',
    jurusan: 'Pendidikan Agama Islam (PAI)',
    semester: 1,
    noWhatsapp: '082133445566',
    email: 'zulfa.muna@student.ac.id',
    alamatAsal: 'Pekalongan, Jawa Tengah',
    domisili: 'Pesantren Mahasiswi Al-Bidayah',
    minatBakat: ['Kepenulisan Kreatif', 'Pengajaran Interaktif', 'Jurnalistik'],
    alasanBergabung: 'Ingin berproses di wadah yang mempertemukan spiritualitas dengan keilmuan pedagogik modern PAI.',
    pengalamanOrganisasi: 'Sie Pendidikan IPPNU Komisariat (2023)',
    tanggalDaftar: '2026-10-27 16:45',
    status: 'menunggu',
    catatanAdmin: 'Menunggu verifikasi KRS dan foto diri.'
  },
  {
    id: 'PMII-TAR-2026-005',
    namaLengkap: 'Rizqi Mahendra Putra',
    nim: '2311050012',
    jurusan: 'Pendidikan Guru Madrasah Ibtidaiyah (PGMI)',
    semester: 3,
    noWhatsapp: '081388990011',
    email: 'rizqi.pgmi@student.ac.id',
    alamatAsal: 'Semarang, Jawa Tengah',
    domisili: 'Jl. Kampus Tarbiyah No. 45',
    minatBakat: ['Advokasi Kebijakan Kampus', 'Debat & Orasi', 'Event Organizer'],
    alasanBergabung: 'Melatih kepemimpinan strategis dan memperjuangkan hak-hak mahasiswa dalam tata kelola pendidikan dasar.',
    pengalamanOrganisasi: 'Staff Himpunan Mahasiswa Jurusan (2024)',
    tanggalDaftar: '2026-10-28 10:05',
    status: 'terverifikasi',
    catatanAdmin: 'Lolos berkas administratif.'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-01',
    judul: 'MAPABA XXVI: Membentuk Kader Mujahid yang Kritis dan Berakhlakul Karimah',
    kategori: 'kaderisasi',
    tanggal: '18 - 20 September 2025',
    lokasi: 'Auditorium Utama Fakultas Tarbiyah',
    deskripsi: 'Masa Penerimaan Anggota Baru (MAPABA) ke-26 diikuti oleh 120 mahasiswa baru Fakultas Tarbiyah (PAI & PGMI) dengan materi NDP, Aswaja, Ke-PMII-an, dan Paradigma Kritis Transformatif.',
    imageUrl: '/src/assets/images/pmii_mapaba_activity_1793298963836.jpg',
    penanggungJawab: 'Biro Kaderisasi Rayon Tarbiyah'
  },
  {
    id: 'gal-02',
    judul: 'Diskusi Reboan: Dekonstruksi Paradigma Pendidikan Islam Abad 21',
    kategori: 'intelektual',
    tanggal: '14 Oktober 2026',
    lokasi: 'Perpustakaan & Pojok Literasi Rayon',
    deskripsi: 'Kajian dialektis mingguan membedah gagasan Paulo Freire dan K.H. Abdurrahman Wahid tentang pendidikan yang membebaskan dan memanusiakan manusia bagi calon guru PAI & PGMI.',
    imageUrl: '/src/assets/images/pmii_discussion_study_1793298965207.jpg',
    penanggungJawab: 'Biro Keilmuan & Literasi'
  },
  {
    id: 'gal-03',
    judul: 'Tarbiyah Mengajar: Safari Literasi & Bina Karakter Siswa Madrasah Desa',
    kategori: 'sosial',
    tanggal: '05 Oktober 2026',
    lokasi: 'Madrasah Ibtidaiyah Desa Binaan',
    deskripsi: 'Aksi nyata pengabdian kader PMII Rayon Tarbiyah mengajar metode membaca kreatif, sains menyenangkan, dan penanaman nilai cinta tanah air kepada siswa madrasah.',
    imageUrl: '/src/assets/images/pmii_community_service_1793298964739.jpg',
    penanggungJawab: 'Biro Pengabdian Masyarakat & KOPRI'
  },
  {
    id: 'gal-04',
    judul: 'Halaqah Kebangsaan & Istighosah Mahasiswa Menyambut Semester Baru',
    kategori: 'keagamaan',
    tanggal: '28 September 2026',
    lokasi: 'Masjid Kampus Pusat Tarbiyah',
    deskripsi: 'Doa bersama untuk kemaslahatan bangsa, peneguhan komitmen Ahlussunnah wal Jamaah An-Nahdliyyah, serta muhasabah perjalanan pergerakan kader.',
    imageUrl: '/src/assets/images/pmii_hero_students_1793298963549.jpg',
    penanggungJawab: 'Biro Keagamaan & Dakwah'
  }
];

export const INITIAL_AGENDA: AgendaItem[] = [
  {
    id: 'ag-01',
    judul: 'MAPABA XXVII (Masa Penerimaan Anggota Baru)',
    tanggal: '15 - 17 November 2026',
    waktu: '07.30 WIB - Selesai',
    tempat: 'Gedung Serbaguna Kampus Tarbiyah',
    kategori: 'Kaderisasi Utama',
    deskripsi: 'Gerbang utama menjadi bagian dari keluarga besar PMII Rayon Tarbiyah. Terbuka untuk seluruh mahasiswa PAI dan PGMI angkatan 2025 & 2026.',
    status: 'Akan Datang'
  },
  {
    id: 'ag-02',
    judul: 'Screening & Wawancara Calon Anggota Baru Gelombang I',
    tanggal: '08 - 10 November 2026',
    waktu: '13.00 - 17.00 WIB',
    tempat: 'Sekretariat PMII Rayon Tarbiyah',
    kategori: 'Verifikasi',
    deskripsi: 'Penjajakan minat bakat, verifikasi administratif, dan pemahaman komitmen kaderisasi sebelum pelaksanaan forum MAPABA.',
    status: 'Akan Datang'
  },
  {
    id: 'ag-03',
    judul: 'Sekolah Jurnalistik & Desain Advokasi Tarbiyah',
    tanggal: '22 November 2026',
    waktu: '09.00 - 15.30 WIB',
    tempat: 'Ruang Seminar Fakultas Tarbiyah Lt. 2',
    kategori: 'Pelatihan Skill',
    deskripsi: 'Peningkatan kapasitas kader dalam literasi media, penulisan opini kritis di koran nasional, dan produksi konten edukatif.',
    status: 'Akan Datang'
  }
];

export const STRUCTURE_MEMBERS: StructureMember[] = [
  {
    nama: 'M. Wildan Al-Mubarok',
    jabatan: 'Ketua Mandataris Rayon',
    prodi: 'Pendidikan Agama Islam (PAI) 2023',
  },
  {
    nama: 'Khoirul Anam',
    jabatan: 'Sekretaris Rayon',
    prodi: 'Pendidikan Agama Islam (PAI) 2023',
  },
  {
    nama: 'Nabila Firdausy',
    jabatan: 'Bendahara Rayon',
    prodi: 'Pendidikan Guru Madrasah Ibtidaiyah (PGMI) 2023',
  },
  {
    nama: 'Fahmi Abdillah',
    jabatan: 'Ketua Biro Kaderisasi',
    prodi: 'Pendidikan Agama Islam (PAI) 2023',
  },
  {
    nama: 'Lailatul Maghfirah',
    jabatan: 'Ketua KOPRI Rayon Tarbiyah',
    prodi: 'Pendidikan Guru Madrasah Ibtidaiyah (PGMI) 2023',
  },
  {
    nama: 'Dimas Wahyu Utomo',
    jabatan: 'Ketua Biro Media & Syiar',
    prodi: 'Pendidikan Guru Madrasah Ibtidaiyah (PGMI) 2024',
  }
];

export const JURUSAN_TARBIYAH = [
  'Pendidikan Agama Islam (PAI)',
  'Pendidikan Guru Madrasah Ibtidaiyah (PGMI)'
];

export const MINAT_BAKAT_OPTIONS = [
  'Kajian Intelektual & Diskusi Kritis',
  'Kepenulisan Ilmiah & Jurnalistik',
  'Desain Grafis & Multimedia',
  'Advokasi Kebijakan Mahasiswa',
  'Pengajaran & Tarbiyah Mengajar',
  'Seni Musik / Hadroh & Sholawat',
  'Olahraga & E-Sport',
  'Public Speaking & Debat'
];

export const FAQS: FAQItem[] = [
  {
    pertanyaan: 'Apa itu PMII Rayon Tarbiyah?',
    jawaban: 'PMII Rayon Tarbiyah adalah wadah pergerakan dan kaderisasi mahasiswa Islam di lingkup Fakultas Tarbiyah. Kami berfokus mencetak calon pendidik PAI dan PGMI yang kritis, transformatif, berwawasan luas, dan berpegang teguh pada nilai Ahlussunnah wal Jamaah An-Nahdliyyah.'
  },
  {
    pertanyaan: 'Siapa saja yang bisa mendaftar menjadi anggota baru?',
    jawaban: 'Terbuka untuk mahasiswa aktif program studi Pendidikan Agama Islam (PAI) dan Pendidikan Guru Madrasah Ibtidaiyah (PGMI) di Fakultas Tarbiyah (baik semester 1 maupun semester 3) yang memiliki komitmen untuk berproses belajar bersama.'
  },
  {
    pertanyaan: 'Apa itu MAPABA dan apa tujuannya?',
    jawaban: 'MAPABA (Masa Penerimaan Anggota Baru) adalah gerbang kaderisasi formal tahap pertama di PMII. Di sini sahabat-sahabati akan dikenalkan dengan ideologi Ahlussunnah wal Jamaah, Nilai Dasar Pergerakan (NDP), nalar kritis, kepemimpinan, dan jejaring kekeluargaan yang solid.'
  },
  {
    pertanyaan: 'Apakah ada pungutan biaya pendaftaran?',
    jawaban: 'Pendaftaran daring tidak dipungut biaya (gratis). Untuk kontribusi konsumsi, modul materi kaderisasi, sertifikat resmi, dan atribut MAPABA akan diinformasikan secara transparan oleh panitia saat tahap screening.'
  },
  {
    pertanyaan: 'Bagaimana cara memverifikasi atau mengecek status pendaftaran saya?',
    jawaban: 'Setelah mengisi formulir, Anda akan mendapatkan Nomor Registrasi unik (misal: PMII-TAR-2026-001). Anda dapat langsung menggunakan fitur "Cek Status Pendaftaran" di website ini dengan memasukkan NIM atau Nomor Registrasi Anda.'
  }
];

export const DEFAULT_SITE_CONTENT: SiteContentConfig = {
  brandName: 'PMII Rayon Tarbiyah',
  brandTagline: 'Dzikir · Fikir · Amal Sholeh',
  facultyName: 'Fakultas Tarbiyah',

  heroKicker: 'PMII Rayon Tarbiyah · Fakultas Tarbiyah · MAPABA XXVII',
  heroTitle: 'Membentuk Pendidik Berkarakter, Kritis Transformatif & Berhaluan Aswaja',
  heroDescription: 'Kawah candradimuka mahasiswa Fakultas Tarbiyah (PAI & PGMI) dalam mengasah intelektual, kepemimpinan pedagogis, dan spiritualitas Islam Nusantara berlandaskan semboyan “Dzikir, Fikir, dan Amal Sholeh”.',
  heroPhotoQuote: '"Tangan Terkepal dan Maju ke Muka, Mundur Satu Langkah Adalah Bentuk Penghianatan."',
  heroBadge1: 'Pendaftaran Online 100% Gratis',
  heroBadge2: 'Sertifikat Kaderisasi Resmi',
  heroBadge3: 'Bimbingan Akademik & Karya Tulis',

  heroStat1Number: '1960',
  heroStat1Label: 'Sejarah Berdiri',
  heroStat1Desc: 'PMII berdiri mengawal Islam Nusantara & NKRI',

  heroStat2Number: '2 Prodi',
  heroStat2Label: 'Program Studi Unggulan',
  heroStat2Desc: 'Pendidikan Agama Islam (PAI) & PGMI',

  heroStat3Number: '450+',
  heroStat3Label: 'Kader & Alumni',
  heroStat3Desc: 'Jejaring guru, dosen, peneliti, dan birokrat',

  heroStat4Number: '27 Kali',
  heroStat4Label: 'Angkatan Kaderisasi',
  heroStat4Desc: 'Tradisi kaderisasi berkelanjutan & konsisten',

  aboutKicker: 'Profil & Landasan Gerak · Ahlussunnah wal Jama\'ah An-Nahdliyyah',
  aboutTitle: 'Mengenal Lebih Dekat PMII Rayon Tarbiyah',
  aboutDescription: 'Sebagai bagian integral dari keluarga besar Pergerakan Mahasiswa Islam Indonesia, Rayon Tarbiyah hadir secara spesifik menjawab kebutuhan mahasiswa calon pendidik agar menguasai teori pedagogis di ruang kuliah, memiliki sensitivitas sosial, nalar kritis transformatif, dan akhlakul karimah.',

  ndp1Title: 'Tauhid',
  ndp1Desc: 'Pondasi spiritualitas tertinggi yang membebaskan manusia dari penghambaan kepada materi, kekuasaan, dan kezaliman struktural.',

  ndp2Title: 'Hablum Minallah',
  ndp2Desc: 'Memelihara ketaatan ibadah, dzikir, serta keikhlasan batin sebagai energi moral dalam setiap hembusan nafas perjuangan organisasi.',

  ndp3Title: 'Hablum Minannas',
  ndp3Desc: 'Menjunjung tinggi keadilan sosial, kesetaraan martabat, persaudaraan lintas kultural, dan pembelaan kaum mustadh\'afin.',

  ndp4Title: 'Hablum Minal Alam',
  ndp4Desc: 'Menjaga kelestarian ekologi dan keharmonisan lingkungan hidup sebagai khalifah fil ardh yang bertanggung jawab bagi masa depan generasi.',

  visiTitle: '"Mewujudkan Kader Tarbiyah yang Berakar pada Nilai Aswaja, Unggul Pedagogis, dan Berintegritas Moral."',
  visiDescription: 'Mempersiapkan kader calon guru dan akademisi Islam yang cakap menjawab tantangan disrupsi teknologi pendidikan tanpa kehilangan esensi adab santri.',

  misi1: 'Kaderisasi Multi-Disiplin Berkelanjutan: Menyelenggarakan MAPABA berkualitas, follow-up berkala, dan sekolah pemikiran pendidikan Islam kontemporer.',
  misi2: 'Penguatan Kapasitas Literasi & Karya Tulis: Memfasilitasi kader menerbitkan artikel ilmiah, jurnal pedagogik, dan opini kritis di media massa nasional.',
  misi3: 'Program Tarbiyah Mengajar & Bina Desa: Menerjunkan kader langsung mendampingi madrasah pelosok melalui kurikulum kreatif dan penguatan karakter anak bangsa.',
  misi4: 'Advokasi Hak & Fasilitas Mahasiswa: Mengawal transparansi tata kelola kampus, kebebasan berekspresi, dan kebijakan pembiayaan kuliah yang berkeadilan.',

  structureTitle: 'Struktur Kepengurusan Rayon Tarbiyah',
  structureSubtitle: 'Digerakkan oleh kader-kader mahasiswa program studi PAI dan PGMI yang berdedikasi membangun iklim organisasi yang sehat, inklusif, dan progresif.',
  kopriNote: 'Wadah independen pengkaderan dan pemberdayaan kader perempuan dalam kesetaraan gender berbasis nilai Islam rahmatan lil \'alamin.',

  regTitle: 'Pendaftaran Calon Anggota Baru',
  regSubtitle: 'Bergabunglah dalam barisan pergerakan mahasiswa Fakultas Tarbiyah. Terbuka khusus bagi mahasiswa program studi PAI dan PGMI.',

  secretariatAddress: 'Gedung Pusat Kegiatan Mahasiswa (PKM) Fakultas Tarbiyah, Kampus Tarbiyah',
  contactPhone: '0812-3456-7890 (Biro Kaderisasi)',
  contactEmail: 'rayon.tarbiyah@pmii.or.id',
  motto: '“Dzikir, Fikir, Amal Sholeh”'
};

export const PROFILE_ARTICLES: ProfileArticle[] = [
  {
    id: 'art-01',
    judul: 'Manifesto Intelektual Calon Pendidik: Meneguhkan Nalar Aswaja di Tengah Disrupsi Kecerdasan Buatan',
    penulis: 'M. Wildan Al-Mubarok',
    jabatanPenulis: 'Ketua Mandataris PMII Rayon Tarbiyah',
    tanggal: '26 Oktober 2026',
    kategori: 'Opini & Pemikiran',
    estimasiBaca: '5 menit baca',
    ringkasan: 'Bagaimana mahasiswa calon guru mengintegrasikan kecerdasan buatan tanpa kehilangan substansi adab, empati kemanusiaan, dan spiritualitas Islam Nusantara.',
    isiLengkap: `Era disrupsi teknologi dan lompatan kecerdasan buatan (artificial intelligence) tidak dapat kita hindari di ruang-ruang kelas madrasah dan sekolah masa depan. Namun, sebagai kader PMII di Fakultas Tarbiyah, kita menyadari satu hal fundamental: teknologi mampu memproses miliaran data dalam sekejap, tetapi teknologi tidak pernah mampu mengajarkan ketulusan, keadilan sosial, dan transmisi ruhani (sanad keilmuan).

Pendidikan Islam dalam kacamata Ahlussunnah wal Jamaah An-Nahdliyyah memposisikan pendidik bukan semata-mata 'transferor of knowledge', melainkan 'murabbi' dan 'muaddib' yang membimbing akhlak, kepekaan nurani, dan membebaskan nalar kritis murid dari kejumudan berpikir.

Melalui Nilai Dasar Pergerakan (NDP), kader PMII Rayon Tarbiyah dipersiapkan untuk menjadi arsitek peradaban pendidikan yang tangguh secara digital namun kokoh berpijak pada tradisi luhur pesantren. Ke depan, madrasah binaan kita harus menjadi mercusuar perlawanan terhadap dehumanisasi pendidikan.`
  },
  {
    id: 'art-02',
    judul: 'Pedagogi Kritis Paulo Freire dan Relevansinya bagi Calon Guru Madrasah Indonesia',
    penulis: 'Fahmi Abdillah',
    jabatanPenulis: 'Ketua Biro Keilmuan & Riset Pendidikan',
    tanggal: '19 Oktober 2026',
    kategori: 'Kajian Pedagogik',
    estimasiBaca: '4 menit baca',
    ringkasan: 'Menolak konsep pendidikan gaya bank (banking concept of education) demi melahirkan generasi pembelajar yang berani mempertanyakan ketidakadilan sosial.',
    isiLengkap: `Gagasan Paulo Freire tentang pendidikan yang membebaskan memiliki keselarasan luar biasa dengan spirit Kritis Transformatif PMII. Seringkali madrasah dan sekolah kita terjebak dalam model 'pendidikan gaya bank', di mana guru menjadi penyimpan tunggal kebenaran dan murid diposisikan sebagai wadah pasif yang hanya menerima dikte.

PMII Rayon Tarbiyah menolak cara pandang demikian. Di ruang diskusi kaderisasi, kami melatih calon pendidik untuk mampu merancang dialog kelas yang egaliter, memantik pertanyaan filosofis, dan menghubungkan pelajaran fiqih, tafsir, sains, maupun bahasa dengan realitas kemiskinan dan ketimpangan di sekitar kita.

Guru PMII bukan guru yang meninabobokan peserta didik, melainkan suluh yang membakar rasa ingin tahu dan keberanian memperjuangkan keadilan.`
  },
  {
    id: 'art-03',
    judul: 'Kiprah Mahasiswi Tarbiyah: KOPRI dan Ruang Kepemimpinan Pendidikan yang Inklusif',
    penulis: 'Lailatul Maghfirah',
    jabatanPenulis: 'Ketua KOPRI Rayon Tarbiyah',
    tanggal: '12 Oktober 2026',
    kategori: 'Gender & Pergerakan',
    estimasiBaca: '4 menit baca',
    ringkasan: 'Mendobrak stigma domestifikasi perempuan pendidik menuju kepemimpinan manajerial madrasah dan advokasi perlindungan anak.',
    isiLengkap: `Sebagai fakultas dengan populasi mahasiswi yang signifikan, Fakultas Tarbiyah adalah laboratorium terbaik bagi penguatan kapasitas perempuan. Melalui Korps PMII Putri (KOPRI) Rayon Tarbiyah, sahabati tidak hanya diajarkan mengajar anak usia dini atau mendidik siswa dasar, tetapi dilatih memimpin lembaga pendidikan, merancang kebijakan kurikulum, dan menjadi garda terdepan advokasi kekerasan berbasis gender di lingkungan kampus.

KOPRI menegaskan bahwa perempuan dalam bingkai Islam adalah subjek sejarah yang utuh, memiliki hak intelektual dan spiritual yang setara untuk memimpin perubahan.`
  }
];

export const MOVEMENT_QUOTES: MovementQuote[] = [
  {
    id: 'quote-1',
    kutipan: 'Kebenaran tidak bisa dimusnahkan hanya karena orang tidak menyukainya. Teruslah menulis, membaca, dan berpihak kepada mereka yang disingkirkan.',
    tokoh: 'Mahbub Djunaidi',
    peran: 'Pendekar Pena & Ketua Umum Pertama PB PMII (1960-1967)',
    sumber: 'Kompilasi Esai Pergerakan Kolom Mahbub Djunaidi'
  },
  {
    id: 'quote-2',
    kutipan: 'Pendidikan bukan sekadar transfer materi hafalan, melainkan proses memanusiakan manusia dan menumbuhkan kepekaan nurani terhadap ketidakadilan di sekitarnya.',
    tokoh: 'K.H. Abdurrahman Wahid (Gus Dur)',
    peran: 'Presiden RI ke-4 & Tokoh Bangsa Nahdlatul Ulama',
    sumber: 'Refleksi Pendidikan Demokrasi dan Toleransi'
  },
  {
    id: 'quote-3',
    kutipan: 'Bukanlah ilmu itu apa yang sekadar dihafal dan dibanggakan di lisan, melainkan apa yang memberikan manfaat dan menjelma menjadi akhlakul karimah serta budi pekerti luhur.',
    tokoh: 'Hadratussyaikh K.H. Hasyim Asy\'ari',
    peran: 'Pendiri Nahdlatul Ulama & Mahaguru Pendidikan Islam',
    sumber: 'Kitab Adabul \'Alim wal Muta\'allim'
  },
  {
    id: 'quote-4',
    kutipan: 'Dzikir menentramkan jiwa spiritual, Fikir mempertajam nalar kritis ilmiah, dan Amal Sholeh membuktikan pengabdian nyata kita kepada semesta dan kemanusiaan.',
    tokoh: 'PMII Rayon Tarbiyah',
    peran: 'Semboyan Luhur Pergerakan Kader Pendidik',
    sumber: 'Trilogi Pergerakan: Dzikir, Fikir, Amal Sholeh'
  }
];

export const PHOTO_HIGHLIGHTS: PhotoHighlight[] = [
  {
    id: 'hl-1',
    judul: 'Bedah Buku Pemikiran Pendidikan Islam & Launching Jurnal Kader Rayon',
    tanggal: '24 Oktober 2026',
    lokasi: 'Auditorium Tarbiyah Lt. 3',
    deskripsi: 'Peluncuran buletin riset pendidikan edisi perdana yang memuat 12 artikel ilmiah karya mahasiswa baru dan alumni PMII.',
    imageUrl: '/src/assets/images/pmii_discussion_study_1793298965207.jpg'
  },
  {
    id: 'hl-2',
    judul: 'Aksi Volunteer Tarbiyah Mengajar: Donasi 500 Buku ke Madrasah Pelosok',
    tanggal: '15 Oktober 2026',
    lokasi: 'MI Miftahul Huda, Desa Binaan Rayon',
    deskripsi: 'Penyaluran rak buku literasi bacaan anak dan pelatihan metode bercerita kreatif bersama para guru honorer madrasah.',
    imageUrl: '/src/assets/images/pmii_community_service_1793298964739.jpg'
  },
  {
    id: 'hl-3',
    judul: 'Stadium Generale MAPABA XXVII: Menyiapkan Generasi Pendidik Abad 21',
    tanggal: '08 Oktober 2026',
    lokasi: 'Gedung Kesenian Kampus',
    deskripsi: 'Pengarahan perdana kepada 150 calon peserta pendaftar MAPABA mengenai roadmap kaderisasi dan etika berorganisasi.',
    imageUrl: '/src/assets/images/pmii_mapaba_activity_1793298963836.jpg'
  }
];
