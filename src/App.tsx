import React, { useState, useEffect, useRef } from 'react';
import { UserRole, MemberRegistration, GalleryItem, AgendaItem, RegistrationStatus, MovementQuote, SiteContentConfig, CustomFormField } from './types';
import { 
  INITIAL_REGISTRATIONS, 
  INITIAL_GALLERY, 
  INITIAL_AGENDA,
  MOVEMENT_QUOTES,
  DEFAULT_SITE_CONTENT,
  INITIAL_CUSTOM_FIELDS
} from './data/mockData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { StructureSection } from './components/StructureSection';
import { RegistrationSection } from './components/RegistrationSection';
import { GallerySection } from './components/GallerySection';
import { AgendaSection } from './components/AgendaSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { RoleSelectionModal } from './components/RoleSelectionModal';
import { SidebarDrawer } from './components/SidebarDrawer';
import { ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';

export default function App() {
  // State for user role
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('pmii_tarbiyah_role');
    return (saved as UserRole) || 'guest';
  });

  // Modal for admin password authentication
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);

  // Site Content (CMS / Editable texts across UI and Beranda)
  const [siteContent, setSiteContent] = useState<SiteContentConfig>(() => {
    try {
      const saved = localStorage.getItem('pmii_site_content');
      return saved ? JSON.parse(saved) : DEFAULT_SITE_CONTENT;
    } catch {
      return DEFAULT_SITE_CONTENT;
    }
  });

  // Registrations state
  const [registrations, setRegistrations] = useState<MemberRegistration[]>(() => {
    try {
      const saved = localStorage.getItem('pmii_registrations');
      return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  // Gallery items state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('pmii_gallery');
      return saved ? JSON.parse(saved) : INITIAL_GALLERY;
    } catch {
      return INITIAL_GALLERY;
    }
  });

  // Agenda items state
  const [agendas, setAgendas] = useState<AgendaItem[]>(() => {
    try {
      const saved = localStorage.getItem('pmii_agendas');
      return saved ? JSON.parse(saved) : INITIAL_AGENDA;
    } catch {
      return INITIAL_AGENDA;
    }
  });

  // Movement quotes state
  const [movementQuotes, setMovementQuotes] = useState<MovementQuote[]>(() => {
    try {
      const saved = localStorage.getItem('pmii_quotes');
      return saved ? JSON.parse(saved) : MOVEMENT_QUOTES;
    } catch {
      return MOVEMENT_QUOTES;
    }
  });

  // Custom Form Fields state (Admin can add new columns/fields)
  const [customFormFields, setCustomFormFields] = useState<CustomFormField[]>(() => {
    try {
      const saved = localStorage.getItem('pmii_custom_form_fields');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOM_FIELDS;
    } catch {
      return INITIAL_CUSTOM_FIELDS;
    }
  });

  const handleAddCustomField = (newField: CustomFormField) => {
    const updated = [...customFormFields, newField];
    setCustomFormFields(updated);
    localStorage.setItem('pmii_custom_form_fields', JSON.stringify(updated));
  };

  const handleDeleteCustomField = (fieldId: string) => {
    const updated = customFormFields.filter(f => f.id !== fieldId);
    setCustomFormFields(updated);
    localStorage.setItem('pmii_custom_form_fields', JSON.stringify(updated));
  };

  // Dark Mode state with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('pmii_dark_mode');
    if (saved !== null) return saved === 'true';
    return false;
  });

  // Sidebar Drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarDefaultTab, setSidebarDefaultTab] = useState<'menu' | 'artikel' | 'quotes' | 'sorotan' | 'setting'>('menu');

  // Apply dark mode class to document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('pmii_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleOpenSidebar = (tab: 'menu' | 'artikel' | 'quotes' | 'sorotan' | 'setting' = 'menu') => {
    setSidebarDefaultTab(tab);
    setIsSidebarOpen(true);
  };

  // References for scrolling
  const registrationRef = useRef<HTMLDivElement>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('pmii_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('pmii_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('pmii_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('pmii_agendas', JSON.stringify(agendas));
  }, [agendas]);

  useEffect(() => {
    localStorage.setItem('pmii_quotes', JSON.stringify(movementQuotes));
  }, [movementQuotes]);

  const handleSelectRole = (role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem('pmii_tarbiyah_role', role);
    localStorage.setItem('pmii_tarbiyah_role_welcomed', 'true');
  };

  const handleUpdateSiteContent = (newContent: SiteContentConfig) => {
    setSiteContent(newContent);
  };

  const handleResetSiteContent = () => {
    setSiteContent(DEFAULT_SITE_CONTENT);
  };

  // Handlers for Registrations
  const handleAddRegistration = (reg: MemberRegistration) => {
    setRegistrations(prev => [reg, ...prev]);
  };

  const handleUpdateRegistrationStatus = (id: string, status: RegistrationStatus, notes?: string) => {
    setRegistrations(prev =>
      prev.map(r => (r.id === id ? { ...r, status, catatanAdmin: notes !== undefined ? notes : r.catatanAdmin } : r))
    );
  };

  const handleDeleteRegistration = (id: string) => {
    setRegistrations(prev => prev.filter(r => r.id !== id));
  };

  // Handlers for Gallery
  const handleAddGalleryItem = (item: GalleryItem) => {
    setGalleryItems(prev => [item, ...prev]);
  };

  const handleUpdateGalleryItem = (updatedItem: GalleryItem) => {
    setGalleryItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
  };

  // Handlers for Agenda
  const handleAddAgendaItem = (item: AgendaItem) => {
    setAgendas(prev => [item, ...prev]);
  };

  const handleDeleteAgendaItem = (id: string) => {
    setAgendas(prev => prev.filter(item => item.id !== id));
  };

  // Handlers for Quotes
  const handleAddQuote = (quote: MovementQuote) => {
    setMovementQuotes(prev => [quote, ...prev]);
  };

  const handleDeleteQuote = (id: string) => {
    setMovementQuotes(prev => prev.filter(q => q.id !== id));
  };

  // Smooth scroll
  const scrollToRegister = () => {
    const el = document.getElementById('pendaftaran');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStatus = () => {
    const el = document.getElementById('pendaftaran');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-[#0c1b69] selection:text-white">
      {/* Role Selection Modal */}
      <RoleSelectionModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
      />

      {/* Sidebar Drawer (Top Right Hamburger Drawer: Artikel, Quotes, Foto Sorotan, Setting: Mode Gelap & Login Admin) */}
      <SidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentRole={currentRole}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onSwitchToGuest={() => handleSelectRole('guest')}
        onSwitchToAdmin={() => handleSelectRole('admin')}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        quotes={movementQuotes}
        galleryItems={galleryItems}
        defaultTab={sidebarDefaultTab}
      />

      {/* Render view based on role */}
      {currentRole === 'admin' ? (
        <AdminDashboard
          registrations={registrations}
          galleryItems={galleryItems}
          agendas={agendas}
          movementQuotes={movementQuotes}
          siteContent={siteContent}
          onUpdateSiteContent={handleUpdateSiteContent}
          onResetSiteContent={handleResetSiteContent}
          onUpdateRegistrationStatus={handleUpdateRegistrationStatus}
          onDeleteRegistration={handleDeleteRegistration}
          onAddRegistration={handleAddRegistration}
          onAddGalleryItem={handleAddGalleryItem}
          onUpdateGalleryItem={handleUpdateGalleryItem}
          onDeleteGalleryItem={handleDeleteGalleryItem}
          onAddAgendaItem={handleAddAgendaItem}
          onDeleteAgendaItem={handleDeleteAgendaItem}
          onAddQuote={handleAddQuote}
          onDeleteQuote={handleDeleteQuote}
          customFormFields={customFormFields}
          onAddCustomField={handleAddCustomField}
          onDeleteCustomField={handleDeleteCustomField}
          onSwitchToGuest={() => handleSelectRole('guest')}
          onOpenSidebar={() => handleOpenSidebar('setting')}
        />
      ) : (
        <>
          {/* Header with Top-Right Garis Sidebar */}
          <Header
            currentRole={currentRole}
            onOpenRoleModal={() => setIsRoleModalOpen(true)}
            onSwitchToAdmin={() => handleSelectRole('admin')}
            onSwitchToGuest={() => handleSelectRole('guest')}
            onOpenSidebar={() => handleOpenSidebar('menu')}
          />

          {/* Main Content */}
          <main className="flex-1">
            <Hero
              content={siteContent}
              onScrollToRegister={scrollToRegister}
              onScrollToStatus={scrollToStatus}
            />

            <AboutSection 
              movementQuotes={movementQuotes} 
              content={siteContent}
            />

            <StructureSection content={siteContent} />

            <RegistrationSection
              registrations={registrations}
              customFields={customFormFields}
              onAddRegistration={handleAddRegistration}
              statusSectionRef={registrationRef}
            />

            <GallerySection 
              galleryItems={galleryItems} 
              currentRole={currentRole}
              onUpdateGalleryItem={handleUpdateGalleryItem}
              onDeleteGalleryItem={handleDeleteGalleryItem}
              onOpenAdminModal={() => setIsRoleModalOpen(true)}
            />

            <AgendaSection
              agendas={agendas}
              onScrollToRegister={scrollToRegister}
            />

            <FaqSection />
          </main>

          {/* Footer */}
          <Footer
            currentRole={currentRole}
            onOpenRoleModal={() => setIsRoleModalOpen(true)}
            content={siteContent}
          />
        </>
      )}

      {/* Admin Floating Status Pill (only visible when in Admin mode) */}
      {currentRole === 'admin' && (
        <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 animate-fadeIn">
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-900/95 text-white text-xs font-semibold rounded-full shadow-2xl border border-amber-500/50 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Mode: <strong className="text-amber-300">Pengurus (Admin)</strong></span>
            <button
              onClick={() => handleSelectRole('guest')}
              className="ml-1 text-[11px] bg-red-600 hover:bg-red-700 text-white px-2.5 py-0.5 rounded-full font-bold transition-colors cursor-pointer"
              title="Keluar dari mode admin"
            >
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
