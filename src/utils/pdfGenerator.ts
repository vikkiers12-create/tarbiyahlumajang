import jsPDF from 'jspdf';
import { MemberRegistration, CustomFormField } from '../types';

/**
 * Generates and downloads a clean, official PDF receipt for candidate registration.
 */
export function downloadRegistrationPDF(
  reg: MemberRegistration, 
  customFieldsDefs: CustomFormField[] = []
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Background
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, 210, 297, 'F');

  // Decorative Top Header
  doc.setFillColor(12, 27, 105); // #0c1b69
  doc.rect(0, 0, 210, 36, 'F');

  // Top Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text('PERGERAKAN MAHASISWA ISLAM INDONESIA', 105, 12, { align: 'center' });
  
  doc.setFontSize(13);
  doc.setTextColor(254, 209, 0); // #fed100
  doc.text('RAYON TARBIYAH · MAPABA XXVII', 105, 18, { align: 'center' });
  
  doc.setFontSize(8.5);
  doc.setTextColor(220, 230, 255);
  doc.setFont('helvetica', 'normal');
  doc.text('Semboyan: Dzikir, Fikir, Amal Sholeh · Fakultas Tarbiyah', 105, 24, { align: 'center' });
  doc.text('LEMBAR BUKTI PENDAFTARAN & BIODATA CALON ANGGOTA', 105, 30, { align: 'center' });

  // Main Card Container
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(15, 42, 180, 238, 3, 3, 'FD');

  // Registration ID Ribbon
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(22, 47, 166, 14, 2, 2, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(12, 27, 105);
  doc.text(`NOMOR REGISTRASI: ${reg.id}`, 26, 56);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`WAKTU DAFTAR: ${reg.tanggalDaftar}`, 182, 56, { align: 'right' });

  let y = 70;
  const addRow = (label: string, value: string) => {
    // Check if y exceeds safe printable boundary
    if (y > 235) return;
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(9);
    doc.text(label, 25, y);
    doc.text(':', 72, y);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    const splitText = doc.splitTextToSize(value || '-', 108);
    doc.text(splitText, 76, y);
    y += Math.max(6, splitText.length * 4.5 + 2);
  };

  // Section A: Data Pribadi
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(12, 27, 105);
  doc.text('A. IDENTITAS DIRI & KEMAHASISWAAN', 25, 66);
  doc.setDrawColor(12, 27, 105);
  doc.line(25, 67.5, 185, 67.5);

  addRow('Nama Lengkap', reg.namaLengkap);
  addRow('NIM', reg.nim);
  addRow('Program Studi', `${reg.jurusan} (Semester ${reg.semester})`);
  addRow('No. WhatsApp', reg.noWhatsapp);
  addRow('Email Mahasiswa', reg.email);
  addRow('Alamat Asal', reg.alamatAsal);
  addRow('Domisili Kampus', reg.domisili);

  // Section B: Minat & Motivasi
  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(12, 27, 105);
  doc.text('B. MINAT, MOTIVASI & PENGALAMAN', 25, y);
  doc.line(25, y + 1.5, 185, y + 1.5);
  y += 6;

  addRow('Minat & Bakat', reg.minatBakat.join(', '));
  addRow('Alasan Bergabung', reg.alasanBergabung);
  if (reg.pengalamanOrganisasi) {
    addRow('Pengalaman Organisasi', reg.pengalamanOrganisasi);
  }

  // Section C: Custom Fields / Kolom Baru Tambahan
  if (customFieldsDefs && customFieldsDefs.length > 0) {
    y += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(12, 27, 105);
    doc.text('C. INFORMASI TAMBAHAN / KOLOM KHUSUS', 25, y);
    doc.line(25, y + 1.5, 185, y + 1.5);
    y += 6;

    customFieldsDefs.forEach(field => {
      const val = reg.customFields?.[field.id] || '-';
      addRow(field.label, val);
    });
  }

  // Footer validation & stamp
  const sigY = 242;
  doc.setDrawColor(226, 232, 240);
  doc.line(25, sigY - 4, 185, sigY - 4);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(12, 27, 105);
  doc.text('CATATAN PANITIA:', 25, sigY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('1. Lembar bukti pendaftaran resmi ini sah dikeluarkan oleh sistem rayon.', 25, sigY + 4);
  doc.text('2. Harap simpan dokumen PDF ini atau tunjukkan saat screening berkas fisik.', 25, sigY + 8);
  doc.text('3. Untuk konfirmasi & info grup peserta, hubungi narahubung panitia rayon.', 25, sigY + 12);

  // Panitia signature box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Biro Kaderisasi Rayon Tarbiyah', 140, sigY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Panitia Pelaksana MAPABA XXVII', 140, sigY + 4);
  
  doc.setTextColor(16, 185, 129); // green
  doc.setFont('helvetica', 'bold');
  doc.text('✓ RESMI TERVERIFIKASI', 140, sigY + 15);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Tangan Terkepal & Maju ke Muka', 140, sigY + 20);

  // Trigger browser download
  const safeNim = reg.nim.replace(/[^a-zA-Z0-9]/g, '_');
  const safeId = reg.id.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Bukti_Pendaftaran_PMII_MAPABA_${safeNim}_${safeId}.pdf`);
}
