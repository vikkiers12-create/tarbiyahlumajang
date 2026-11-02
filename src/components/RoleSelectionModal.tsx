import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, X, AlertCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Reset input and error state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPinInput('');
      setPinError(false);
      setShowPassword(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const val = pinInput.trim().toLowerCase();
    // Accept valid admin credentials
    if (val === 'admin1960' || val === 'pmii1960' || val === '1960' || val === 'admin' || val === 'tarbiyah') {
      setPinError(false);
      onSelectRole('admin');
      onClose();
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-title"
      >
        {/* Top Decorative Header */}
        <div className="bg-[#0c1b69] px-6 py-5 text-white relative border-b border-blue-900/50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/SAVE_20240918_131449-removebg-preview_b7c4bfb0.png"
              alt="Logo Resmi PMII Rayon Tarbiyah"
              className="w-11 h-11 object-contain drop-shadow-md shrink-0"
            />
            <div className="flex flex-col text-left">
              <span id="admin-login-title" className="font-extrabold text-base leading-tight tracking-tight text-white">
                Login Pengurus / Admin
              </span>
              <span className="text-[10px] font-bold text-[#fed100] tracking-wider uppercase mt-0.5">
                PMII Rayon Tarbiyah
              </span>
              <span className="text-[10px] text-blue-200">
                Dzikir · Fikir · Amal Sholeh
              </span>
            </div>
          </div>
        </div>

        {/* Content Body - Direct Password Input */}
        <div className="p-6">
          <div className="flex items-start gap-3.5 mb-5 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
            <div className="w-8 h-8 rounded-lg bg-[#0c1b69] text-white flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-[#fed100]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                Otorisasi Akses Pengurus
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                Silakan masukkan kata sandi pengurus untuk mengelola pendaftar, upload foto kegiatan, dan mengubah informasi portal.
              </p>
            </div>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label 
                htmlFor="admin-password-input"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Kata Sandi Admin
              </label>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan kata sandi..."
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError(false);
                  }}
                  autoComplete="current-password"
                  autoFocus
                  className={`w-full pl-10 pr-10 py-2.5 text-sm bg-white dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-colors ${
                    pinError 
                      ? 'border-red-500 focus:ring-2 focus:ring-red-400/30' 
                      : 'border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-[#0c1b69] dark:focus:ring-blue-500 focus:border-transparent'
                  }`}
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md focus:outline-none transition-colors"
                  title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {pinError && (
                <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 mt-2 animate-fadeIn">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Kata sandi tidak sesuai. Silakan coba kembali.</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#0c1b69] hover:bg-[#09174f] text-white text-xs font-bold rounded-xl transition-colors shrink-0 shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Masuk Admin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 dark:bg-slate-950 px-6 py-3 border-t border-slate-200 dark:border-slate-800 text-center text-[11px] text-slate-500 dark:text-slate-400">
          Pergerakan Mahasiswa Islam Indonesia · Rayon Tarbiyah
        </div>
      </div>
    </div>
  );
};
