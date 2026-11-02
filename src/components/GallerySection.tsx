import React, { useState } from 'react';
import { GalleryItem, GalleryCategory, UserRole } from '../types';
import { Calendar, MapPin, User, X, Search, ZoomIn, Edit3, Lock, Upload, ShieldCheck } from 'lucide-react';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
  currentRole?: UserRole;
  onUpdateGalleryItem?: (item: GalleryItem) => void;
  onDeleteGalleryItem?: (id: string) => void;
  onOpenAdminModal?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ 
  galleryItems,
  currentRole = 'guest',
  onUpdateGalleryItem,
  onDeleteGalleryItem,
  onOpenAdminModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state for Admin inside GallerySection
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<GalleryCategory>('kaderisasi');
  const [editDate, setEditDate] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editImageSource, setEditImageSource] = useState<'file' | 'preset' | 'url'>('file');

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.kategori === selectedCategory;
    const matchesSearch = item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.lokasi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStartEdit = (item: GalleryItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentRole !== 'admin') {
      if (onOpenAdminModal) onOpenAdminModal();
      return;
    }
    setEditingItem(item);
    setEditTitle(item.judul);
    setEditCategory(item.kategori);
    setEditDate(item.tanggal);
    setEditLocation(item.lokasi);
    setEditDesc(item.deskripsi);
    setEditImage(item.imageUrl);
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Format file harus berupa gambar (JPG, PNG, WebP).');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      alert('Ukuran file foto maksimal 4MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target?.result as string;
      if (res) setEditImage(res);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !onUpdateGalleryItem) return;
    const updated: GalleryItem = {
      ...editingItem,
      judul: editTitle.trim(),
      kategori: editCategory,
      tanggal: editDate.trim(),
      lokasi: editLocation.trim() || 'Gedung Tarbiyah',
      deskripsi: editDesc.trim(),
      imageUrl: editImage || editingItem.imageUrl
    };
    onUpdateGalleryItem(updated);
    if (selectedItem && selectedItem.id === editingItem.id) {
      setSelectedItem(updated);
    }
    setEditingItem(null);
  };

  return (
    <section id="galeri" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span className="text-[#0c1b69]">Dokumentasi & Arsip</span>
              <span aria-hidden="true">·</span>
              <span>Jejak Langkah Perjuangan</span>
              {currentRole === 'admin' ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-600 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Mode Admin: Akses Edit Aktif
                  </span>
                </>
              ) : (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-400 font-normal flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Edit Khusus Admin
                  </span>
                </>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Galeri Kegiatan PMII Rayon Tarbiyah
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-xl">
              Potret dinamika keilmuan, kepemimpinan, dan bakti sosial kader Tarbiyah. Foto dan arsip dokumentasi resmi ini dikelola serta diverifikasi langsung oleh Admin Pengurus.
            </p>
          </div>

          {/* Search bar inside header area */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari dokumentasi kegiatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0c1b69]"
            />
          </div>
        </div>

        {/* Filter Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { id: 'all', label: 'Semua Kegiatan' },
            { id: 'kaderisasi', label: 'Kaderisasi & MAPABA' },
            { id: 'intelektual', label: 'Kajian & Diskusi' },
            { id: 'sosial', label: 'Tarbiyah Mengajar / Sosial' },
            { id: 'keagamaan', label: 'Keagamaan & Sholawat' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all shrink-0 ${
                selectedCategory === tab.id
                  ? 'bg-[#0c1b69] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-sm text-slate-500">Tidak ada dokumentasi kegiatan yang sesuai dengan pencarian Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative"
              >
                <div>
                  {/* Image container with 4:3 aspect ratio */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-slate-900 p-2.5 rounded-full shadow-lg">
                        <ZoomIn className="w-5 h-5" />
                      </span>
                    </div>

                    {/* Admin Edit Quick Action Badge */}
                    {currentRole === 'admin' && (
                      <button
                        onClick={(e) => handleStartEdit(item, e)}
                        className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-white/95 hover:bg-white text-[#0c1b69] text-[11px] font-bold rounded-lg shadow-md border border-slate-200 flex items-center gap-1 transition-transform hover:scale-105"
                        title="Edit Foto & Keterangan (Hanya Admin)"
                      >
                        <Edit3 className="w-3 h-3 text-[#0c1b69]" />
                        <span>Edit Foto</span>
                      </button>
                    )}
                  </div>

                  {/* Content area */}
                  <div className="p-5">
                    {/* Unboxed metadata line with typographic separator */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="capitalize text-[#0c1b69] font-medium">{item.kategori}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{item.tanggal}</span>
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base group-hover:text-[#0c1b69] transition-colors line-clamp-2">
                      {item.judul}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 truncate max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{item.lokasi}</span>
                  </span>
                  
                  {currentRole === 'admin' ? (
                    <button
                      onClick={(e) => handleStartEdit(item, e)}
                      className="text-[#0c1b69] hover:text-blue-900 font-bold inline-flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit (Admin)</span>
                    </button>
                  ) : (
                    <span className="text-[#0c1b69] font-semibold group-hover:translate-x-1 transition-transform">
                      Lihat Liputan →
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Security Policy Footer Note in Gallery */}
        <div className="mt-10 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Seluruh foto hasil kegiatan PMII Rayon Tarbiyah diproteksi dan <strong>hanya dapat diubah atau diunggah oleh akun Admin/Pengurus</strong>.
            </span>
          </div>
          {currentRole !== 'admin' && onOpenAdminModal && (
            <button
              onClick={onOpenAdminModal}
              className="text-[#0c1b69] hover:underline font-semibold shrink-0"
            >
              Masuk Admin untuk Kelola Foto →
            </button>
          )}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="relative aspect-[16/9] w-full bg-slate-950 shrink-0">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.judul}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Modal Details Scrollable */}
              <div className="p-6 md:p-8 overflow-y-auto">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="text-[#0c1b69] font-bold capitalize">Kategori: {selectedItem.kategori}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{selectedItem.tanggal}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{selectedItem.lokasi}</span>
                    </span>
                  </div>

                  {currentRole === 'admin' && (
                    <button
                      onClick={() => handleStartEdit(selectedItem)}
                      className="px-3 py-1.5 bg-[#0c1b69] text-white font-semibold text-xs rounded-lg hover:bg-blue-900 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Foto Ini (Admin)</span>
                    </button>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {selectedItem.judul}
                </h3>

                <p className="mt-4 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedItem.deskripsi}
                </p>

                {selectedItem.penanggungJawab && (
                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#0c1b69]" />
                      <span>Dokumentasi Resmi oleh: <strong className="text-slate-900 font-semibold">{selectedItem.penanggungJawab}</strong></span>
                    </div>
                    <span className="text-[11px] text-slate-400 italic">Terverifikasi Pengurus</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal Edit Foto Kegiatan (Khusus Admin) */}
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#0c1b69]" />
                  <h3 className="font-bold text-slate-900 text-base">Edit Foto Hasil Kegiatan (Admin)</h3>
                </div>
                <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4 p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-950 text-xs flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#0c1b69] shrink-0" />
                <span>
                  <strong>Akses Khusus Admin:</strong> Foto ini hanya dapat diedit oleh Pengurus terotentikasi.
                </span>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Judul Kegiatan *</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Kategori *</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value as GalleryCategory)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                    >
                      <option value="kaderisasi">Kaderisasi & MAPABA</option>
                      <option value="intelektual">Kajian & Diskusi</option>
                      <option value="sosial">Tarbiyah Mengajar / Sosial</option>
                      <option value="keagamaan">Keagamaan & Sholawat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Tanggal *</label>
                    <input
                      type="text"
                      required
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lokasi</label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Deskripsi Kegiatan</label>
                  <textarea
                    rows={3}
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                  />
                </div>

                {/* Edit Photo */}
                <div className="pt-1">
                  <label className="block font-semibold text-slate-800 mb-1.5 flex items-center justify-between">
                    <span>Ganti Foto Kegiatan</span>
                    <span className="text-[10px] text-amber-700 font-medium">Hanya Admin</span>
                  </label>

                  <div className="flex gap-1.5 mb-2.5 bg-slate-100 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setEditImageSource('file')}
                      className={`flex-1 py-1 text-center font-medium rounded-md transition-colors ${
                        editImageSource === 'file' ? 'bg-white shadow-xs text-[#0c1b69] font-bold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      📁 Upload File Baru
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditImageSource('preset')}
                      className={`flex-1 py-1 text-center font-medium rounded-md transition-colors ${
                        editImageSource === 'preset' ? 'bg-white shadow-xs text-[#0c1b69] font-bold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      🖼️ Template
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditImageSource('url')}
                      className={`flex-1 py-1 text-center font-medium rounded-md transition-colors ${
                        editImageSource === 'url' ? 'bg-white shadow-xs text-[#0c1b69] font-bold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      🔗 URL
                    </button>
                  </div>

                  {editImageSource === 'file' && (
                    <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-[#0c1b69] rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50/40 transition-colors">
                      <Upload className="w-6 h-6 text-[#0c1b69] mb-1.5" />
                      <span className="font-semibold text-slate-800 text-xs">Pilih File Foto Baru dari Komputer/HP</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">JPG, PNG, atau WebP (Maks 4MB)</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                      />
                    </label>
                  )}

                  {editImageSource === 'preset' && (
                    <select
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                    >
                      <option value="/src/assets/images/pmii_discussion_study_1793298965207.jpg">Diskusi Perpustakaan (Kajian Akademik)</option>
                      <option value="/src/assets/images/pmii_mapaba_activity_1793298963836.jpg">Auditorium Kaderisasi (MAPABA Tarbiyah)</option>
                      <option value="/src/assets/images/pmii_community_service_1793298964739.jpg">Tarbiyah Mengajar Siswa (Bakti Sosial)</option>
                      <option value="/src/assets/images/pmii_hero_students_1793298963549.jpg">Kader Halaman Masjid (Keagamaan)</option>
                    </select>
                  )}

                  {editImageSource === 'url' && (
                    <input
                      type="url"
                      placeholder="https://example.com/foto-kegiatan.jpg"
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0c1b69]"
                    />
                  )}

                  {editImage && (
                    <div className="mt-2.5 p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3">
                      <img
                        src={editImage}
                        alt="Preview"
                        className="w-16 h-12 object-cover rounded border border-slate-300 shrink-0 bg-white"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold text-slate-800 truncate">Foto Terpilih</p>
                        <p className="text-[10px] text-slate-500">Akan diperbarui setelah menekan tombol simpan</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0c1b69] text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors shadow-xs"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
