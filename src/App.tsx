/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import logo1 from './assets/images/hala_dent_logo_1_1781652549570.jpg';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Search,
  Map,
  Calendar,
  Phone,
  Shield,
  Heart,
  Smile,
  Star,
  MessageCircle,
  Settings,
  Layers,
  Globe,
  FolderOpen,
  Bell,
  FileText,
  CheckCircle,
  Plus,
  Minus,
  Send,
  ArrowLeft,
  ArrowRight,
  User,
  Clock,
  Sparkles,
  PlusCircle,
  Trash2,
  Database,
  Code,
  Check,
  AlertCircle,
  X,
  MapPin,
  MapPinOff,
  UserCheck,
  ThumbsUp,
  Image as ImageIcon,
  Share2,
  HelpCircle,
  Video,
  Lock,
  Megaphone,
  Info,
  ClipboardList,
  LogIn
} from 'lucide-react';

import {
  SEED_CATEGORIES,
  SEED_SUB_CATEGORIES,
  SEED_CLINICS,
  SEED_DENTISTS,
  SEED_SERVICES,
  SEED_OFFERS,
  SEED_MEDIA,
  INITIAL_NOTIFICATIONS,
  SEED_CONTENT_TYPES,
  SEED_CONTENT_TRANSLATIONS
} from './data';

import { Category, SubCategory, Clinic, Dentist, Service, Offer, User as UserType, Favorite, Appointment, Contact, Notification, Media, ContentType, ContentTranslation } from './types';
import { supabase } from './lib/supabase';

export default function App() {
  // Brand Logo selection options (Strictly set to Style 1 per User request)
  const logoOptions = [
    { id: 1, src: logo1, name: 'Premium Teal & Swoosh', desc: 'Minimalist clinical tooth with a stylish premium teal & emerald stroke accent.' }
  ];

  const [selectedLogoId, setSelectedLogoId] = useState<number>(1);

  useEffect(() => {
    localStorage.setItem('hala_dent_selected_logo_id', selectedLogoId.toString());
  }, [selectedLogoId]);

  const activeLogo = logoOptions.find(l => l.id === selectedLogoId) || logoOptions[0];

  // View mode state - Focused preview vs full-stack developer DB terminal
  const [viewMode, setViewMode] = useState<'app' | 'dual'>('app');

  // Device Language State
  const [lang, setLang] = useState<'en' | 'ar' | 'ku'>('en');

  // Active Android Emulator Navigation
  const [activeTab, setActiveTab] = useState<'clinics' | 'doctors' | 'services' | 'chat' | 'more'>('clinics');

  // Authentication session state to support screenshot entry login/splash
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('hala_dent_logged_in') !== 'false';
  });
  const [loginPhone, setLoginPhone] = useState<string>('');

  // Dynamic scale states to fit the applet perfectly inside any browser or iframe visual frames
  const [appScale, setAppScale] = useState<number>(() => {
    const saved = localStorage.getItem('hala_dent_app_scale');
    return saved ? parseFloat(saved) : 0.85;
  });

  useEffect(() => {
    localStorage.setItem('hala_dent_app_scale', appScale.toString());
  }, [appScale]);

  // Active home layout design preset (Obsolesced - Unified layout is now default for supreme consistency)
  const [homeLayout, setHomeLayout] = useState<number>(1);

  // Active theme layout (light/dark)
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('hala_dent_theme') as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('hala_dent_theme', themeMode);
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  // Selected clinic ID for live geographic OSM map Centering
  const [selectedMapClinicId, setSelectedMapClinicId] = useState<number | string>(1);

  // Formula to produce zero key, zero charge free OSM maps centered around active clinic lat-lon
  const getOsmMapUrl = (clinicId: number | string) => {
    // Erbil clinics coordinates:
    // Clinic 1: Gulan Street (36.2062, 44.0089)
    // Clinic 2: Bakhtyari Boulevard (36.1911, 43.9985)
    // Clinic 3: English Village Gate (36.2165, 43.9850)
    let lat = 36.2062;
    let lon = 44.0089;
    if (Number(clinicId) === 2) {
      lat = 36.1911;
      lon = 43.9985;
    } else if (Number(clinicId) === 3) {
      lat = 36.2165;
      lon = 43.9850;
    }
    
    const delta = 0.008;
    const left = lon - delta;
    const bottom = lat - delta;
    const right = lon + delta;
    const top = lat + delta;
    
    return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${lat}%2C${lon}`;
  };

  // Randomized Selection on App Open / Mounting Session
  useEffect(() => {
    try {
      // Pick a random style (1 to 5) every time app opens
      const randomStyle = Math.floor(Math.random() * 5) + 1;
      setHomeLayout(randomStyle);
      console.log(`[Hala Dent Multi-Layout] Startup Randomizer assigned home view layout Style #${randomStyle}`);
    } catch (e) {
      console.warn('Layout randomizer exception ignored:', e);
    }
  }, []);

  // Theme variable class maps to style child views consistently
  const theme = {
    bg: themeMode === 'light' ? 'bg-[#f7faf9]' : 'bg-[#0f1413]',
    card: themeMode === 'light' ? 'bg-white border-slate-200/80' : 'bg-slate-900 border-slate-800 text-white',
    text: themeMode === 'light' ? 'text-[#181c1c]' : 'text-slate-100',
    textSecondary: themeMode === 'light' ? 'text-slate-500' : 'text-slate-400',
    subTitle: themeMode === 'light' ? 'text-slate-600' : 'text-slate-300',
    headerBg: themeMode === 'light' ? 'bg-white/95' : 'bg-slate-900/95 text-white',
    tabBarBg: themeMode === 'light' ? 'bg-white/95 text-slate-700' : 'bg-slate-900/95 text-slate-100',
    inputBg: themeMode === 'light' ? 'bg-slate-100/90' : 'bg-slate-800/80',
    inputText: themeMode === 'light' ? 'text-slate-900' : 'text-white',
    border: themeMode === 'light' ? 'border-slate-100' : 'border-slate-800',
    divider: themeMode === 'light' ? 'border-slate-200/60' : 'border-slate-800',
  };

  // Simulation State backing our 12 Database Tables
  const [appointmentsTable, setAppointmentsTable] = useState<Appointment[]>([
    {
      id: 1,
      user_id: 1,
      clinic_id: 1,
      dentist_id: 1,
      date: '2026-06-15',
      time: '09:30 AM',
      status: 'pending',
      created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 2,
      user_id: 1,
      clinic_id: 2,
      dentist_id: 2,
      date: '2026-06-18',
      time: '11:00 AM',
      status: 'confirmed',
      created_at: new Date(Date.now() - 172800000).toISOString()
    }
  ]);

  const [contactsTable, setContactsTable] = useState<Contact[]>([
    {
      id: 1,
      name: 'Sherwan Ahmed',
      phone: '+964 750 999 1122',
      message: 'Hello, do you provide emergency root canal extraction on Fridays at the Gulan clinic?',
      clinic_id: 1,
      date: new Date().toISOString(),
      status: 'new',
      contact_reason: 'Emergency tooth pain',
      preferred_call_time: 'Afternoon (1 PM - 5 PM)',
      source: 'web_recommender',
      created_at: new Date().toISOString()
    }
  ]);

  const [favoritesTable, setFavoritesTable] = useState<Favorite[]>([
    {
      id: 1,
      user_id: 1,
      dentist_id: 1,
      notes: 'Best orthodontist in Erbil, very polite.',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      user_id: 1,
      clinic_id: 1,
      notes: 'Very clean Gulan branch.',
      created_at: new Date().toISOString()
    }
  ]);

  const [notificationsTable, setNotificationsTable] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  // Read-only tables representing the metadata and directories (Dynamic modifications supported via Inspector)
  const [clinicsTable, setClinicsTable] = useState<Clinic[]>(SEED_CLINICS);
  const [dentistsTable, setDentistsTable] = useState<Dentist[]>(SEED_DENTISTS);
  const [servicesTable, setServicesTable] = useState<Service[]>(SEED_SERVICES);
  const [offersTable, setOffersTable] = useState<Offer[]>(SEED_OFFERS);
  const [categoriesTable, setCategoriesTable] = useState<Category[]>(SEED_CATEGORIES);
  const [subCategoriesTable, setSubCategoriesTable] = useState<SubCategory[]>(SEED_SUB_CATEGORIES);
  const [mediaTable, setMediaTable] = useState<Media[]>(SEED_MEDIA);
  const [contentTypesTable, setContentTypesTable] = useState<ContentType[]>(SEED_CONTENT_TYPES);
  const [contentTranslationsTable, setContentTranslationsTable] = useState<ContentTranslation[]>(SEED_CONTENT_TRANSLATIONS);

  // Live Supabase integration states
  const [supabaseLoading, setSupabaseLoading] = useState<boolean>(false);
  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState<'idle' | 'success' | 'partial' | 'error'>('idle');

  // Supabase Live Data Sync Block
  useEffect(() => {
    async function syncDatabaseWithSupabase() {
      setSupabaseLoading(true);
      try {
        console.log('Initiating synchronization with live Supabase endpoint...');
        
        // 1. Synchronize Clinics matching localization settings
        const { data: rawClinics, error: clinicsErr } = await supabase.from('clinics').select('*');
        if (!clinicsErr && rawClinics && rawClinics.length > 0) {
          const mappedClinics: Clinic[] = rawClinics.map((c: any, index: number) => {
            const localizedName = (lang === 'ar' && c.name_ar) ? c.name_ar : (lang === 'ku' && c.name_ku) ? c.name_ku : c.name;
            const localizedAddress = (lang === 'ar' && c.address_ar) ? c.address_ar : (lang === 'ku' && c.address_ku) ? c.address_ku : c.address;
            const fallbackSeed = SEED_CLINICS[index % SEED_CLINICS.length] || SEED_CLINICS[0];
            return {
              id: c.id,
              name: localizedName,
              description: (lang === 'ar') ? `عيادة أسنان مجهزة بأحدث التقنيات في ${localizedAddress}` : (lang === 'ku') ? `کلینیکی پێشکەوتوو بە نوێترین تەکنەلۆژیا لە ${localizedAddress}` : `Premium state-of-the-art dental clinical care at ${localizedAddress}`,
              address: localizedAddress,
              phone: c.phone_number || fallbackSeed.phone,
              logo: c.image_url || fallbackSeed.logo,
              cover_image: c.image_url || fallbackSeed.cover_image,
              rating: c.rating ? parseFloat(c.rating) : 4.9,
              review_count: c.review_count !== undefined ? c.review_count : 120,
              status_type: c.status_type || 'open',
              tags: c.tags || [],
              created_at: c.created_at || new Date().toISOString()
            };
          });
          setClinicsTable(mappedClinics);
        }

        // 2. Synchronize Dentists/Doctors matching localization settings
        let rawDoctors = null;
        let doctorsErr = null;
        try {
          const docRes = await supabase.from('doctors').select('*');
          rawDoctors = docRes.data;
          doctorsErr = docRes.error;
          if (doctorsErr || !rawDoctors || rawDoctors.length === 0) {
            console.log('doctors table empty or errored, attempting fallback to dentists table...');
            const dentRes = await supabase.from('dentists').select('*');
            if (dentRes.data && dentRes.data.length > 0) {
              rawDoctors = dentRes.data;
              doctorsErr = null;
            }
          }
        } catch (e) {
          console.warn('Exception querying doctors table:', e);
        }

        if (!doctorsErr && rawDoctors && rawDoctors.length > 0) {
          const mappedDentists: Dentist[] = rawDoctors.map((d: any, index: number) => {
            const localizedSpecialty = (lang === 'ar' && d.specialty_ar) ? d.specialty_ar : (lang === 'ku' && d.specialty_ku) ? d.specialty_ku : (d.specialty || d.title);
            const localizedBio = (lang === 'ar' && d.bio_ar) ? d.bio_ar : (lang === 'ku' && d.bio_ku) ? d.bio_ku : d.bio;
            const fallbackSeed = SEED_DENTISTS[index % SEED_DENTISTS.length] || SEED_DENTISTS[0];
            return {
              id: d.id,
              clinic_id: d.clinic_id || fallbackSeed.clinic_id,
              name: d.display_name || d.name || d.full_name || fallbackSeed.name,
              bio: localizedBio || d.bio || fallbackSeed.bio,
              image: d.image_url || d.image || d.photo_url || fallbackSeed.image,
              title: localizedSpecialty || fallbackSeed.title,
              rating: d.rating ? parseFloat(parseFloat(d.rating).toFixed(1)) : (d.rate ? parseFloat(d.rate) : 4.9),
              reviews_count: d.review_count || d.reviews_count || d.reviews || 120,
              years_of_experience: d.years_of_experience || d.experience_years || d.experience || (fallbackSeed.id === 1 ? 12 : fallbackSeed.id === 2 ? 15 : 8),
              certification: d.certification || d.certificate || d.certifications || (fallbackSeed.id === 1 ? "Board Certified" : "Oral Surgery Board"),
              created_at: d.created_at || new Date().toISOString()
            };
          });
          setDentistsTable(mappedDentists);
        }

        // 3. Synchronize Services matching localization settings
        let rawServices = null;
        let servicesErr = null;
        try {
          const srvRes = await supabase.from('services').select('*');
          rawServices = srvRes.data;
          servicesErr = srvRes.error;
          if (servicesErr || !rawServices || rawServices.length === 0) {
            console.log('services table empty or errored, attempting fallback to clinical_services...');
            const altRes = await supabase.from('clinical_services').select('*');
            if (altRes.data && altRes.data.length > 0) {
              rawServices = altRes.data;
              servicesErr = null;
            }
          }
        } catch (e) {
          console.warn('Exception querying services table:', e);
        }

        if (!servicesErr && rawServices && rawServices.length > 0) {
          const mappedServices: Service[] = rawServices.map((s: any, index: number) => {
            const localizedName = (lang === 'ar' && s.name_ar) ? s.name_ar : (lang === 'ku' && s.name_ku) ? s.name_ku : (s.name || s.title);
            const localizedDesc = (lang === 'ar' && s.description_ar) ? s.description_ar : (lang === 'ku' && s.description_ku) ? s.description_ku : (s.description || s.desc);
            const fallbackSeed = SEED_SERVICES[index % SEED_SERVICES.length] || SEED_SERVICES[0];
            const lowerCat = (s.category_name || s.category || '').toLowerCase();
            const categoryId = lowerCat.includes('ortho') ? 2 : lowerCat.includes('implants') ? 3 : lowerCat.includes('cosmetic') || lowerCat.includes('aesthetic') ? 4 : 1;
            return {
              id: s.id,
              name: localizedName,
              description: localizedDesc || fallbackSeed.description,
              price: s.base_price !== undefined ? parseFloat(s.base_price) : s.price !== undefined ? parseFloat(s.price) : fallbackSeed.price,
              duration: s.estimated_duration_minutes || s.duration || s.duration_minutes || fallbackSeed.duration,
              clinic_id: s.clinic_id || 1,
              is_available: s.is_active !== false && s.is_available !== false,
              image: s.image_url || s.image || s.cover_image || fallbackSeed.image,
              category_id: categoryId,
              discount_price: s.discount_price !== undefined ? parseFloat(s.discount_price) : (s.base_price ? Math.round(parseFloat(s.base_price) * 0.7) : undefined),
              warranty_months: s.warranty_months !== undefined ? s.warranty_months : 12,
              requires_consultation: lowerCat.includes('surgery') || lowerCat.includes('implants') || s.requires_consultation === true,
              created_at: s.created_at || new Date().toISOString()
            };
          });
          setServicesTable(mappedServices);
        }

        // 4. Synchronize Offers/Banners
        let rawBanners = null;
        let bannersErr = null;
        try {
          const bannerRes = await supabase.from('banners').select('*');
          rawBanners = bannerRes.data;
          bannersErr = bannerRes.error;
          if (bannersErr || !rawBanners || rawBanners.length === 0) {
            console.log('banners table empty or errored, attempting fallback to offers table...');
            const offerRes = await supabase.from('offers').select('*');
            if (offerRes.data && offerRes.data.length > 0) {
              rawBanners = offerRes.data;
              bannersErr = null;
            }
          }
        } catch (e) {
          console.warn('Exception querying banners/offers table:', e);
        }

        if (!bannersErr && rawBanners && rawBanners.length > 0) {
          const mappedOffers: Offer[] = rawBanners.map((b: any, index: number) => {
            const localizedTitle = (lang === 'ar' && b.title_ar) ? b.title_ar : (lang === 'ku' && b.title_ku) ? b.title_ku : (b.title || b.name);
            const localizedSubtitle = (lang === 'ar' && b.subtitle_ar) ? b.subtitle_ar : (lang === 'ku' && b.subtitle_ku) ? b.subtitle_ku : (b.subtitle || b.description || b.desc);
            const localizedBadge = (lang === 'ar' && b.badge_text_ar) ? b.badge_text_ar : (lang === 'ku' && b.badge_text_ku) ? b.badge_text_ku : (b.badge_text || (b.discount_percent ? `${b.discount_percent}% OFF` : undefined));
            const fallbackSeed = SEED_OFFERS[index % SEED_OFFERS.length] || SEED_OFFERS[0];
            return {
              id: b.id,
              clinic_id: b.clinic_id || 1,
              title: localizedTitle,
              description: localizedSubtitle || fallbackSeed.description,
              discount: localizedBadge || `${b.discount_percent || 30}% OFF` || fallbackSeed.discount,
              expiry_date: b.expiry_date || '2026-09-30',
              image: b.image_url || b.image || fallbackSeed.image,
              created_at: b.created_at || new Date().toISOString()
            };
          });
          setOffersTable(mappedOffers);
        }

        // 5. Synchronize Appointments list
        const { data: rawAppointments, error: appointmentsErr } = await supabase.from('appointments').select('*');
        if (!appointmentsErr && rawAppointments && rawAppointments.length > 0) {
          const mappedAppointments: Appointment[] = rawAppointments.map((ap: any) => {
            const appointmentTime = ap.scheduled_time || ap.time || '09:00';
            const formattedTime = appointmentTime.substring(0, 5) + ' ' + (parseInt(appointmentTime.substring(0, 2), 10) >= 12 ? 'PM' : 'AM');
            return {
              id: ap.id,
              user_id: ap.user_id || ap.patient_id || 1, // linked to current mock user
              clinic_id: ap.clinic_id || 1,
              dentist_id: ap.doctor_id || ap.dentist_id || 1,
              date: ap.scheduled_date || ap.date || '2026-06-20',
              time: formattedTime,
              status: ap.status === 'confirmed' || ap.status === 'completed' ? 'confirmed' : 'pending',
              created_at: ap.created_at || new Date().toISOString()
            };
          });
          setAppointmentsTable(mappedAppointments);
        }

        // 6. Synchronize Content Types (from user's updated database tables)
        const { data: rawContentTypes, error: ctErr } = await supabase.from('content_types').select('*');
        if (!ctErr && rawContentTypes && rawContentTypes.length > 0) {
          setContentTypesTable(rawContentTypes);
        }

        // 7. Synchronize Content Translations
        const { data: rawTranslations, error: transErr } = await supabase.from('content_translations').select('*');
        if (!transErr && rawTranslations && rawTranslations.length > 0) {
          setContentTranslationsTable(rawTranslations);
        }

        setSupabaseSyncStatus('success');
      } catch (err) {
        console.warn('Supabase query partially unresolved, running on localized offline fallback schemas:', err);
        setSupabaseSyncStatus('partial');
      } finally {
        setSupabaseLoading(false);
      }
    }

    syncDatabaseWithSupabase();
  }, [lang]);

  // Active mock user
  const currentUser: UserType = {
    id: 1,
    name: 'Yousif Majeed',
    phone: '+964 750 882 1441',
    city: 'Erbil',
    gender: 'Male',
    birth_date: '1995-10-12',
    preferred_language: lang,
    profile_picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    created_at: new Date().toISOString()
  };

  // Live Schema DB Viewer Active Table
  const [inspectorActiveTable, setInspectorActiveTable] = useState<string>('appointments');
  const [highlightedRowId, setHighlightedRowId] = useState<string | null>(null);

  // Local UI States for search and interaction
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<number | null>(null);
  const [activeDoctorFilter, setActiveDoctorFilter] = useState<string>('');
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Dentist | null>(null);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);
  const [activeDocKey, setActiveDocKey] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({
    date: '2026-06-12',
    time: '10:00 AM',
    notes: ''
  });

  // Contact Form Submission state
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    message: '',
    clinic_id: 1,
    reason: 'General Consultation',
    preferredTime: 'Anytime'
  });
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  // Live Chat Simulator States
  const [chatInquiry, setChatInquiry] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    { sender: 'bot', text: 'Slaw! Welcome to Hala Dent instant assistant. Ask me anything about our clinics, doctors, or laser whitening discounts.', time: '10:15 AM' }
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [grokKeyInput, setGrokKeyInput] = useState(() => localStorage.getItem("grok_api_key") || "");
  const [showGrokSetup, setShowGrokSetup] = useState(() => !localStorage.getItem("grok_api_key"));

  // Flash UI banners
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Translations Map
  const translations = {
    en: {
      title: 'Hala Dent',
      tagline: 'Modern Dental Care',
      searchPlaceholder: 'Search clinics, doctors, or services...',
      emergency: 'Emergency Support 24/7',
      emergencyButton: 'Emergency Line',
      bookAppointment: 'Book Appointment',
      bookSub: 'Schedule your visit in seconds',
      viewRecords: 'View Records',
      clinicLocator: 'Clinic Locator',
      healthTip: 'Health Tip of the Day',
      tipTitle: 'The 2-Minute Rule',
      tipText: "Brushing your teeth for at least two minutes, twice a day, significantly reduces plaque build up and prevents gum disease.",
      learnMore: 'Learn More',
      dismiss: 'Dismiss',
      newsHeader: 'Dental Articles & News',
      viewAll: 'See All',
      connect: 'Connect with Us',
      whatsapp: 'WhatsApp Support',
      clinicsTab: 'Clinics',
      doctorsTab: 'Doctors',
      servicesTab: 'Services',
      chatTab: 'Chat Support',
      moreTab: 'About & Services',
      quickAction: 'Instant Booking',
      nearbyText: '3 Clinics nearby in Erbil',
      findingRoute: 'Finding the optimal route for you',
      topSpecialists: 'Top Specialists',
      ourServices: 'Precision Services',
      bookCTA: 'Don\'t wait for the pain to start.',
      bookCTAsub: 'Schedule a routine precision check-up today and keep your smile shining.',
      promosHeader: 'Promotions & Packages',
      testimonialsHeader: 'Patient Testimonials',
      amenitiesHeader: 'Clinic Amenities',
      doctorsList: 'Our Professional Dentists',
      contactUs: 'Send Contact Inquiry',
      allRights: 'Hala Dent Clinic Advertising Directory'
    },
    ar: {
      title: 'هلا دنت',
      tagline: 'رعاية أسنان عصرية وأكثر دقة',
      searchPlaceholder: 'ابحث عن العيادات، الأطباء، أو الخدمات...',
      emergency: 'طوارئ الأسنان ٢٤/٧',
      emergencyButton: 'خط الطوارئ السريع',
      bookAppointment: 'حجز موعد جديد',
      bookSub: 'جدول زيارتك القادمة في ثوانٍ معدودة',
      viewRecords: 'الملف الطبي',
      clinicLocator: 'مواقع الفروع',
      healthTip: 'نصيحة اليوم الطبية',
      tipTitle: 'قاعدة الدقيقتين',
      tipText: 'تنظيف أسنانك بالفرشاة لمدة دقيقتين على الأقل، مرتين يومياً، يقلل بشكل كبير من تراكم البلاك ويحمي اللثة.',
      learnMore: 'اقرأ المزيد',
      dismiss: 'تجاهل',
      newsHeader: 'مقالات وأخبار طب الأسنان',
      viewAll: 'عرض الكل',
      connect: 'تواصل معنا مباشرة',
      whatsapp: 'دعم الواتساب الفوري',
      clinicsTab: 'الفروع',
      doctorsTab: 'الأطباء',
      servicesTab: 'الخدمات',
      chatTab: 'المحادثة',
      moreTab: 'المزيد',
      quickAction: 'حجز فوري مباشر',
      nearbyText: '٣ عيادات أسنان بالقرب منك في أربيل',
      findingRoute: 'يتم تحديد موقعك لإرشادك لأقرب عيادة',
      topSpecialists: 'كبار الأطباء والأخصائيين',
      ourServices: 'خدماتنا الطبية',
      bookCTA: 'لا تنتظر حتى يبدأ ألم الأسنان.',
      bookCTAsub: 'حدد موعداً للفحص الشامل والدقيق اليوم لتحافظ على جمال وإشراقة ابتسامتك.',
      promosHeader: 'العروض والباقات الخاصة',
      testimonialsHeader: 'آراء وتقييمات مرضانا',
      amenitiesHeader: 'تسهيلات ومزايا العيادات',
      doctorsList: 'أخصائيو طب الأسنان المعتمدين',
      contactUs: 'تواصل معنا أو اطلب اتصالاً',
      allRights: 'هلا دنت - دليل إعلانات عيادات الأسنان المتقدم'
    },
    ku: {
      title: 'هالا دێنت',
      tagline: 'چاودێری ددانی پێشکەوتوو',
      searchPlaceholder: 'بگەڕێ بۆ کلینیکەکان، پزیشکەکان، یان خزمەتگوزارییەکان...',
      emergency: 'چارەسەری فریاگوزاری ٢٤/٧',
      emergencyButton: 'هێڵی فریاگوزاری خێرا',
      bookAppointment: 'بڕینی نۆرەی نوێ',
      bookSub: 'کاتەکەت لە چەند چرکەیەکدا دیاری بکە',
      viewRecords: 'تۆماری پزیشکی ددان',
      clinicLocator: 'دۆزینەوەی کلینیک',
      healthTip: 'ئامۆژگاری تەندروستی ئەمڕۆ',
      tipTitle: 'یاسای ٢-خولەک',
      tipText: 'شوشتنی ددانەکانت بەلایەنی کەمەوە بۆ ماوەی دوو خولەک، دوو جار لە ڕۆژێکدا، بە شێوەیەکی بەرچاو تێکچوونی ددان و هەوکردنی پوک کەمدەکاتەوە.',
      learnMore: 'دەربارە',
      dismiss: 'لادان',
      newsHeader: 'وتار و هەواڵەکانی ددانسازی',
      viewAll: 'بینینی هەموو',
      connect: 'پەیوەندیمان پێوە بکە',
      whatsapp: 'پشتیوانی واتسئاپ',
      clinicsTab: 'کلینیکەکان',
      doctorsTab: 'پزیشکەکان',
      servicesTab: 'خزمەتگوزاری',
      chatTab: 'چات یارمەتی',
      moreTab: 'دەربارەی ئێمە',
      quickAction: 'نۆرەی خێرا',
      nearbyText: '٣ کلینیک لە نزیکتەوەیە لە هەولێر',
      findingRoute: 'دۆزینەوەی باشترین ڕێگا بۆ گەیشتن بە شوێنەکە',
      topSpecialists: 'پزیشکە سەرەکییەکان',
      ourServices: 'خزمەتگوزارییەکانمان',
      bookCTA: 'چاوەڕوان مەبە تا ددانەکانت ئازاریان دەست پێبکات.',
      bookCTAsub: 'ئەمڕۆ نۆرەیەک بۆ پشکنینی ددانت وەربگرە بۆ پاراستنی زەردەخەنەکەت.',
      promosHeader: 'ئۆفەرەکان و پاکێجی تایبەت',
      testimonialsHeader: 'ڕاو بۆچوونی نەخۆشەکانمان',
      amenitiesHeader: 'ئاسانکارییەکانی کلینیکەکە',
      doctorsList: 'پزیشکە لێهاتووەکانی ددان',
      contactUs: 'پەیوەندیمان پێوە بکە',
      allRights: 'هالا دێنت - بەڕێوەبەرایەتی ڕیکلامی کلینیکەکانی دندان'
    }
  };

  // Fail-safe translation proxy wrapper to shield against any missing keys in Kurdish/Arabic dictionary lookups
  const t = new Proxy(translations[lang] || translations['en'], {
    get: (target, prop: string) => {
      return (target as any)[prop] || (translations['en'] as any)[prop] || prop;
    }
  }) as any;

  // Helper trigger to blink data row in Supabase Live Inspector
  const triggerRowHighlight = (table: string, id: number | string) => {
    setInspectorActiveTable(table);
    const key = `${table}-${id}`;
    setHighlightedRowId(key);
    setTimeout(() => {
      setHighlightedRowId(null);
    }, 2500);
  };

  // Appointment Submission Form Handler
  const handleBookAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctorForBooking) return;

    const newAppointmentId = `ap-${Date.now()}`;
    const newAppointment: Appointment = {
      id: newAppointmentId,
      user_id: currentUser.id,
      clinic_id: selectedDoctorForBooking.clinic_id,
      dentist_id: selectedDoctorForBooking.id,
      date: bookingForm.date,
      time: bookingForm.time,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    setAppointmentsTable([newAppointment, ...appointmentsTable]);

    // Send automated notification
    const newNotification: Notification = {
      id: `nt-${Date.now()}`,
      user_id: currentUser.id,
      title: 'Appointment Request Registered',
      message: `Your appointment with ${selectedDoctorForBooking.name} on ${bookingForm.date} at ${bookingForm.time} is pending clinical confirmation.`,
      is_read: false,
      date: new Date().toISOString(),
      type: 'appointment'
    };
    setNotificationsTable([newNotification, ...notificationsTable]);

    // Update clicks metric of category
    const spec = (selectedDoctorForBooking.title || '').toLowerCase();
    const catId = spec.includes('ortho') ? 2 : spec.includes('surgeon') ? 3 : (spec.includes('cosmetic') || spec.includes('aesthetic') || spec.includes('smile')) ? 4 : 1;
    setCategoriesTable(prev => prev.map(c => c.id === catId ? { ...c, total_clicks: c.total_clicks + 1 } : c));

    showToast(`Appointment registered with ${selectedDoctorForBooking.name}! See Database table: appointments`);
    setSelectedDoctorForBooking(null);

    // Dynamic Live Supabase Push Integration
    const isLiveDoctor = typeof selectedDoctorForBooking.id === 'string' && selectedDoctorForBooking.id.includes('-');
    if (isLiveDoctor) {
      (async () => {
        try {
          console.log('Propagating dental booking to Live Supabase schema...');
          // Check for a valid user profile or use pre-populated mock UUID
          const { data: profiles } = await supabase.from('profiles').select('id').limit(1);
          const patientId = (profiles && profiles.length > 0) ? profiles[0].id : 'dde6a4c2-0000-0000-0000-000000000000';
          
          // Formats standard 12-hour time to PostgreSQL 24-hour literal (e.g. "09:30 AM" -> "09:30:00")
          let parsedHour = parseInt(bookingForm.time.split(':')[0], 10);
          const isPM = bookingForm.time.toLowerCase().includes('pm');
          if (isPM && parsedHour < 12) parsedHour += 12;
          if (!isPM && parsedHour === 12) parsedHour = 0;
          const padHour = parsedHour.toString().padStart(2, '0');
          const minutes = bookingForm.time.split(':')[1].replace(/[a-zA-Z\s]/g, '').trim().padStart(2, '0');
          const scheduledTimeHex = `${padHour}:${minutes}:00`;

          const { data, error } = await supabase.from('appointments').insert({
            patient_id: patientId,
            doctor_id: selectedDoctorForBooking.id,
            clinic_id: typeof selectedDoctorForBooking.clinic_id === 'string' ? selectedDoctorForBooking.clinic_id : null,
            scheduled_date: bookingForm.date,
            scheduled_time: scheduledTimeHex,
            status: 'scheduled'
          }).select('*');

          if (error) {
            console.warn('RLS policies prevented insertions on public profiles, using local mock transaction as stable checkout:', error.message);
          } else if (data && data.length > 0) {
            console.log('Saved directly in live Supabase appointments list:', data[0]);
            showToast(`Synchronized successfully with Supabase appointments table!`);
          }
        } catch (fetchErr) {
          console.error('Failed pushing remote appointment record:', fetchErr);
        }
      })();
    }
  };

  // Contact Inquiry Submission Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      showToast('Please insert name and phone number');
      return;
    }

    const newContact: Contact = {
      id: contactsTable.length + 1,
      name: contactForm.name,
      phone: contactForm.phone,
      message: contactForm.message || 'Requested callback for information.',
      clinic_id: contactForm.clinic_id,
      date: new Date().toISOString(),
      status: 'new',
      contact_reason: contactForm.reason,
      preferred_call_time: contactForm.preferredTime,
      source: 'Hala_Dent_Advertiser',
      created_at: new Date().toISOString()
    };

    setContactsTable([newContact, ...contactsTable]);
    setIsContactSubmitted(true);
    showToast('Inquiry filed! Live Supabase table: contacts updated.');
    triggerRowHighlight('contacts', newContact.id);

    setTimeout(() => {
      setIsContactSubmitted(false);
      setContactForm({
        name: '',
        phone: '',
        message: '',
        clinic_id: 1,
        reason: 'General Consultation',
        preferredTime: 'Anytime'
      });
    }, 4000);
  };

  // Live Chat Smart Inquiry Bot Reply Generator
  const handleSendMessage = async (textToSend?: string) => {
    const rawMessage = textToSend || chatInquiry;
    if (!rawMessage.trim()) return;

    const userMsg = { 
      sender: 'user' as const, 
      text: rawMessage, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatInquiry('');
    setIsBotTyping(true);

    let replied = false;
    const clientGrokKey = localStorage.getItem("grok_api_key") || "";

    // 1. Prioritize grok setup if API key is stored in client storage
    if (clientGrokKey) {
      try {
        console.log("Invoking custom Grok Assistant through client-server proxy...");
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: rawMessage,
            history: updatedMessages.slice(-10),
            grokApiKey: clientGrokKey
          })
        });

        if (response.ok) {
          const data = await response.json();
          const botReplyText = data.reply || "Grok: (Received empty response)";
          const botReply = {
            sender: 'bot' as const,
            text: botReplyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setChatMessages((prev) => [...prev, botReply]);
          replied = true;
        } else {
          console.warn("Grok proxy failed with status", response.status);
        }
      } catch (err) {
        console.warn("Direct Grok proxy fetch failed, trying direct browser fetch...", err);
        try {
          const response = await fetch("https://api.x.ai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${clientGrokKey}`
            },
            body: JSON.stringify({
              model: "grok-2-1212",
              messages: [
                { role: "system", content: "You are the Hala Dent AI Assistant reception bot in Erbil, Kurdistan. Be warm and reply in under 3 sentences." },
                ...updatedMessages.slice(-6).map(m => ({
                  role: m.sender === 'user' ? 'user' : 'assistant',
                  content: m.text
                }))
              ],
              temperature: 0.7
            })
          });

          if (response.ok) {
            const data = await response.json();
            const botReplyText = data.choices?.[0]?.message?.content?.trim() || "Grok is active.";
            const botReply = {
              sender: 'bot' as const,
              text: botReplyText,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setChatMessages((prev) => [...prev, botReply]);
            replied = true;
          }
        } catch (clientDirectErr) {
          console.error("Local direct Grok response also failed:", clientDirectErr);
        }
      }
    }

    // 2. Try invoking the Supabase Edge Function "dentist-ai" as backup
    if (!replied) {
      try {
        console.log("Attempting to invoke Supabase edge function 'dentist-ai'...");
        const { data, error } = await supabase.functions.invoke('dentist-ai', {
          body: { message: rawMessage }
        });

        if (!error && data && (data.reply || data.generated_text)) {
          const botReplyText = data.reply || data.generated_text;
          const botReply = {
            sender: 'bot' as const,
            text: botReplyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setChatMessages((prev) => [...prev, botReply]);
          replied = true;
        } else {
          if (error) {
            console.warn("Supabase Edge Function returned error:", error);
          }
        }
      } catch (sbErr) {
        console.warn("Supabase local/remote function not available yet or pending deployment:", sbErr);
      }
    }

    // 3. Fall back to local server proxy '/api/chat' using server-side keys
    if (!replied) {
      try {
        console.log("Using backup server-side AI endpoint...");
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: rawMessage,
            history: updatedMessages.slice(-10)
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botReplyText = data.reply || "I apologize, but I encountered an error. Please try again or call our Erbil office!";

        const botReply = {
          sender: 'bot' as const,
          text: botReplyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages((prev) => [...prev, botReply]);
        replied = true;
      } catch (err) {
        console.error("Failed to connect to dental assistant AI server:", err);
        const fallbackReplyText = "Zor Spas! I received your inquiry, but my live AI response bridge is verifying connection settings right now. You can check our branch details or call us directly at +964 (0) 750 123 4567 for immediate assistance!";
        const botReply = {
          sender: 'bot' as const,
          text: fallbackReplyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages((prev) => [...prev, botReply]);
      }
    }

    setIsBotTyping(false);
  };


  // Toggle favorite trigger for doctors
  const handleToggleFavoriteDoc = (docId: number) => {
    const existing = favoritesTable.find(f => f.dentist_id === docId);
    if (existing) {
      setFavoritesTable(prev => prev.filter(f => f.id !== existing.id));
      showToast('Doctor removed from favorites');
    } else {
      const newFav: Favorite = {
        id: favoritesTable.length + 1,
        user_id: currentUser.id,
        dentist_id: docId,
        notes: 'Top practitioner.',
        created_at: new Date().toISOString()
      };
      setFavoritesTable([newFav, ...favoritesTable]);
      showToast('Doctor added to favorites! Live table updated.');
      triggerRowHighlight('favorites', newFav.id);
    }
  };

  // Simulation admin tool: Confirm a pending appointment row
  const handleAdminApproveAppointment = (appId: number) => {
    setAppointmentsTable(prev =>
      prev.map(a => (a.id === appId ? { ...a, status: 'confirmed' } : a))
    );
    showToast(`Appointment #${appId} clinical status updated to: CONFIRMED`);
    // Push system notification
    const target = appointmentsTable.find(a => a.id === appId);
    const doc = dentistsTable.find(d => d.id === target?.dentist_id);
    const notif: Notification = {
      id: notificationsTable.length + 1,
      user_id: currentUser.id,
      title: 'Appointment Approved!',
      message: `Your booking request with ${doc?.name || 'Practitioner'} has been confirmed by our administrative team. See you soon!`,
      is_read: false,
      date: new Date().toISOString(),
      type: 'appointment_approved'
    };
    setNotificationsTable([notif, ...notificationsTable]);
    triggerRowHighlight('appointments', appId);
  };

  // Clear a row out of database
  const handleDeleteRow = (tableName: string, id: number) => {
    if (tableName === 'appointments') {
      setAppointmentsTable(prev => prev.filter(r => r.id !== id));
    } else if (tableName === 'contacts') {
      setContactsTable(prev => prev.filter(r => r.id !== id));
    } else if (tableName === 'favorites') {
      setFavoritesTable(prev => prev.filter(r => r.id !== id));
    } else if (tableName === 'notifications') {
      setNotificationsTable(prev => prev.filter(r => r.id !== id));
    }
    showToast(`Deleted row #${id} from ${tableName}`);
  };

  // Filters dentists and services
  const filteredDentists = dentistsTable.filter((doc) => {
    const query = searchQuery.toLowerCase();
    const docQuery = doc.name.toLowerCase() + ' ' + doc.title.toLowerCase();
    const matchesSearch = docQuery.includes(query);
    if (activeDoctorFilter === 'Orthodontist') return matchesSearch && doc.title.includes('Orthodontist');
    if (activeDoctorFilter === 'Surgeon') return matchesSearch && (doc.title.includes('Surgeon') || doc.title.includes('Implants'));
    if (activeDoctorFilter === 'General') return matchesSearch && doc.title.includes('General');
    if (activeDoctorFilter === 'Cosmetic') return matchesSearch && doc.title.includes('Cosmetic');
    return matchesSearch;
  });

  const filteredServices = servicesTable.filter((srv) => {
    if (selectedCategoryFilter) {
      return srv.category_id === selectedCategoryFilter;
    }
    return srv.name.toLowerCase().includes(searchQuery.toLowerCase()) || srv.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredClinics = clinicsTable.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [selectedClinicCategory, setSelectedClinicCategory] = useState<string>('Nearby');

  const renderUnifiedHome = () => {
    // filter clinic list
    const filteredByTag = clinicsTable.filter((cl) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = cl.name.toLowerCase().includes(q) || cl.address.toLowerCase().includes(q);
      
      if (!matchesSearch) return false;

      if (!searchQuery.trim()) {
        if (selectedClinicCategory === 'Emergency') {
          return cl.id === 2 || cl.tags?.includes('emergency') || cl.status_type === 'emergency' || cl.name.toLowerCase().includes('emergency');
        }
        if (selectedClinicCategory === 'Orthodontic') {
          return cl.id === 2 || cl.tags?.includes('orthodontic') || cl.name.toLowerCase().includes('orthodontic') || cl.name.toLowerCase().includes('ortho');
        }
      }
      return true;
    });

    return (
      <div className="p-4 space-y-4 font-sans">
        {/* Screen Header Back Area */}
        <div className="flex items-center gap-3 select-none">
          <button 
            onClick={() => showToast('Navigation back triggered')} 
            className="p-1 text-slate-600 hover:bg-slate-100 rounded-full shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-headline font-extrabold text-lg text-slate-900 leading-none">
              {lang === 'en' ? 'Clinic Directory' : lang === 'ar' ? 'دليل العيادات' : 'ڕێبەری کلینیک'}
            </h1>
            <p className="text-[10px] text-slate-500 font-medium mt-1">
              {lang === 'en' ? 'Find the best care near you' : lang === 'ar' ? 'اعثر على أفضل رعاية صحية بالقرب منك' : 'باشترین چاودێری لە نزیکتەوە بدۆزەرەوە'}
            </p>
          </div>
        </div>

        {/* Search capsule */}
        <div className="relative">
          <Search className="absolute top-3.5 left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={lang === 'en' ? 'Search by clinic name or area...' : 'ابحث باسم العيادة أو المنطقة...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100/90 border border-slate-200/50 focus:outline-none focus:ring-2 focus:ring-[#006b5a]/10 rounded-2xl text-xs font-semibold placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 bg-slate-200 text-slate-500 rounded-full p-0.5 animate-fade-in"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Scrollable category pill tags */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar select-none pt-0.5">
          {['Nearby', 'Emergency', 'Orthodontic', 'Cosmetics'].map((tag) => {
            const isActive = selectedClinicCategory === tag;
            return (
              <button
                key={tag}
                onClick={() => {
                  setSelectedClinicCategory(tag);
                  showToast(`Selected Category: ${tag}`);
                }}
                className={`flex-none font-extrabold text-[11px] px-4 py-2 rounded-full border transition-all active-scale ${
                  isActive 
                    ? 'bg-[#006b5a] text-white border-[#006b5a]' 
                    : 'bg-white text-slate-500 border-slate-200/60 hover:bg-slate-50'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Clinics Cards */}
        <div className="space-y-4">
          {filteredByTag.map((cl, idx) => {
            // Determine clinical tag
            let tagLabel = "Open";
            let tagColorClass = "bg-emerald-50 dark:bg-emerald-950/25 text-[#006b5a] dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40 font-bold";
            if (cl.id === 2 || cl.status_type === 'emergency') {
              tagLabel = "Emergency Only";
              tagColorClass = "bg-rose-50 dark:bg-rose-950/25 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/40";
            } else if (cl.id === 3 || cl.status_type === 'closing_soon') {
              tagLabel = "Closes Soon";
              tagColorClass = "bg-amber-50 dark:bg-amber-950/25 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/40";
            } else if (cl.status_type === 'closed') {
              tagLabel = "Closed";
              tagColorClass = "bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-450 border-slate-200 dark:border-slate-700/60";
            }

            return (
              <div 
                key={cl.id} 
                className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-3xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col"
              >
                {/* Cover Image with Rating Badge layered top-right */}
                <div className="h-44 relative">
                  <img 
                    src={cl.cover_image} 
                    alt={cl.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black shadow-md flex items-center gap-1 border border-slate-100 dark:border-slate-800">
                    <span className="text-amber-500 text-xs">⭐</span>
                    <span className="text-slate-800 dark:text-slate-200">{cl.rating || (cl.id === 2 ? '4.7' : cl.id === 3 ? '4.8' : '4.9')}</span>
                  </div>
                </div>

                {/* Info and Actions */}
                <div className="p-4.5 space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-headline font-black text-sm text-slate-900 dark:text-white leading-tight">
                      {cl.name}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-mono font-extrabold border ${tagColorClass}`}>
                      {tagLabel}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal font-medium">
                    {cl.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-semibold font-mono pb-1 border-b border-slate-100 dark:border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{cl.address}</span>
                  </div>

                  {/* Booking and View map actions */}
                  <div className="flex gap-2.5 pt-1">
                    <button
                      onClick={() => {
                        const firstDocOfClinic = dentistsTable.find(d => d.clinic_id === cl.id) || dentistsTable[0];
                        setSelectedDoctorForBooking(firstDocOfClinic);
                        showToast(`Opened Booking with Doctor of ${cl.name}`);
                      }}
                      className="flex-1 bg-[#0058bc] hover:bg-[#00479e] text-white font-extrabold text-[11px] py-2.5 rounded-full shadow-md active-scale transition-colors text-center"
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => showToast(`Calibrated Driving Route for GPS: ${cl.name} (${cl.address}). Distance: ${cl.id === 1 ? '1.2km' : cl.id === 2 ? '2.4km' : '3.8km'}`)}
                      className="flex-1 bg-white dark:bg-slate-900 border border-[#006b5a] text-[#006b5a] dark:text-[#00ab8a] hover:bg-[#006b5a]/5 font-extrabold text-[11px] py-2.5 rounded-full active-scale transition-all text-center"
                    >
                      View Map
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Connect channels block */}
        <div className="bg-slate-50 rounded-2xl p-4 mt-2 space-y-3 font-sans select-none border border-slate-100">
          <h4 className="font-headline font-extrabold text-[11px] text-center text-slate-800">
            {lang === 'en' ? 'Connect with us' : 'تواصل معنا'}
          </h4>
          <div className="flex justify-around items-center gap-1.5">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); showToast('Heading to Hala Dent Facebook Feed'); }}
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-[#0058bc]"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-3xs active-scale">
                <Globe className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-[9px] font-bold">Facebook</span>
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); showToast('Heading to Hala Dent @hala_dent Instagram'); }}
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-pink-600"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-3xs active-scale">
                <ImageIcon className="w-4 h-4 text-pink-500" />
              </div>
              <span className="text-[9px] font-bold">Instagram</span>
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); showToast('App link generator copied to clipboard'); }}
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-3xs active-scale">
                <Share2 className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              </div>
              <span className="text-[9px] font-bold">Share App</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`min-h-screen ${theme.bg} ${theme.text} flex flex-col relative font-sans selection:bg-blue-200`}
      dir={lang === 'en' ? 'ltr' : 'rtl'}
    >
      {/* Toast message channel */}
      {toastMessage && (
        <div className="fixed top-8 left-4 right-4 z-[9999] animate-bounce bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium py-3 px-5 rounded-2xl shadow-xl border border-emerald-400 flex items-center gap-3 max-w-md mx-auto">
          <CheckCircle className="w-5 h-5 text-white shrink-0" />
          <span className="text-xs">{toastMessage}</span>
        </div>
      )}

      {!isLoggedIn ? (
        <div className="flex-1 w-full flex flex-col justify-between items-center bg-slate-50 dark:bg-[#0f1413] relative p-8 select-none">
          <div className="w-full max-w-sm flex-1 flex flex-col justify-center items-center py-6">
            <div className="relative w-24 h-24 rounded-full shadow-lg flex items-center justify-center bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 overflow-hidden mx-auto">
              <img 
                src={activeLogo.src} 
                alt="Hala Dent Logo" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            
            <h1 className="font-headline font-extrabold text-3xl text-neutral-800 dark:text-neutral-100 tracking-tight mt-5 text-center">
              {lang === 'en' ? 'Hala Dent' : lang === 'ar' ? 'هلا دنت' : 'هالا دێنت'}
            </h1>
            <p className="text-xs text-slate-400 font-bold tracking-wide mt-1 text-center font-serif">
               {lang === 'en' ? 'Premium Dental Care' : lang === 'ar' ? 'رعايـة أسنان مميـزة' : 'چاودێری ددانی پێشکەوتوو'}
            </p>

            {/* Quick Language switcher inside splash */}
            <div className="flex items-center bg-white dark:bg-slate-900 p-1 rounded-full text-xs shrink-0 select-none border border-slate-200 dark:border-slate-800 mt-5 shadow-3xs">
              <button
                onClick={() => { setLang('en'); showToast('Language swapped to English'); }}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-[#0058bc] text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                EN
              </button>
              <button
                onClick={() => { setLang('ar'); showToast('تم تغيير اللغة للعربية'); }}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${lang === 'ar' ? 'bg-[#0058bc] text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                عربي
              </button>
              <button
                onClick={() => { setLang('ku'); showToast('زمان گۆڕدرا بۆ کوردی'); }}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${lang === 'ku' ? 'bg-[#0058bc] text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                کوردی
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                showToast('Signing in secure session...');
                setTimeout(() => {
                  setIsLoggedIn(true);
                  localStorage.setItem('hala_dent_logged_in', 'true');
                  showToast('Slaw! Welcome back to Hala Dent.');
                }, 800);
              }}
              className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200/80 dark:border-slate-800 shadow-md w-full max-w-sm mt-8 space-y-4 flex flex-col"
            >
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                  {lang === 'en' ? 'Phone Number' : lang === 'ar' ? 'رقم الهاتف' : 'ژمارەی مۆبایل'}
                </label>
                <div className="flex bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20">
                  <span className="bg-slate-100 dark:bg-slate-700 px-3.5 py-2.5 text-xs text-slate-500 dark:text-slate-300 font-bold border-r border-slate-200 dark:border-slate-700 flex items-center shrink-0">
                    +964
                  </span>
                  <input
                    type="tel"
                    placeholder="750 123 4567"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-transparent focus:outline-none text-xs font-semibold text-slate-950 dark:text-slate-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#0058bc] hover:bg-[#00479e] text-white font-extrabold text-xs py-3.5 rounded-full w-full shadow-md active-scale transition-colors text-center"
              >
                {lang === 'en' ? 'Continue' : lang === 'ar' ? 'متابعة' : 'بەردەوامبە'} &arr;
              </button>
            </form>
          </div>

          <p className="text-[10px] text-slate-300 dark:text-slate-600 font-mono text-center tracking-wide mt-auto">
            Device ID: [Hidden Signature]
          </p>
        </div>
      ) : (
        <>
          {/* App Header bar */}
          {activeTab === 'more' ? (
            <header className={`px-5 h-16 border-b ${theme.border} ${theme.headerBg} flex items-center justify-between sticky top-0 z-40 select-none shrink-0 font-sans`}>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { setActiveTab('clinics'); showToast('Back to clinics directory'); }} 
                  className="p-1 text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full shrink-0 transition-colors"
                >
                  <ArrowLeft className="w-5.5 h-5.5 stroke-[2.5]" />
                </button>
                <span className="font-headline font-black text-lg text-blue-600 dark:text-blue-400">
                  Hala Dent
                </span>
              </div>

              <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                {/* Theme Switcher Button */}
                <button
                  onClick={() => {
                    const nextTheme = themeMode === 'light' ? 'dark' : 'light';
                    setThemeMode(nextTheme);
                    showToast(nextTheme === 'dark' ? "Atmosphere preset: Clinical Dark Mode" : "Atmosphere preset: Soft Clinic Light");
                  }}
                  className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors active-scale shrink-0"
                  title="Toggle Atmosphere Theme"
                >
                  {themeMode === 'light' ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 animate-pulse text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072-7.072 5 5 0 01-7.072 7.072z" />
                    </svg>
                  )}
                </button>
                <button onClick={() => showToast('Search settings')} className="p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors active-scale">
                  <Search className="w-5 h-5 stroke-[2.5]" />
                </button>
                <button onClick={() => { setActiveTab('clinics'); }} className="p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors active-scale">
                  <Home className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </header>
          ) : (
            <header className={`backdrop-blur-md px-5 h-16 border-b ${theme.border} ${theme.headerBg} flex items-center justify-between sticky top-0 z-40 select-none shrink-0`}>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <img 
                    src={activeLogo.src} 
                    alt="Hala Dent Logo" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h2 className="font-headline font-extrabold text-base text-blue-600 dark:text-blue-400 tracking-tight">
                  {t.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {/* Quick Language Toggle Selector directly inside header */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-full text-xs shrink-0 select-none border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => { setLang('en'); showToast('Language swapped to English'); }}
                    className={`px-2 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-[#0058bc] text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => { setLang('ar'); showToast('تم تغيير اللغة للعربية'); }}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'ar' ? 'bg-[#0058bc] text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                  >
                    عربي
                  </button>
                  <button
                    onClick={() => { setLang('ku'); showToast('زمان گۆڕدرا بۆ کوردی'); }}
                    className={`px-2 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'ku' ? 'bg-[#0058bc] text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                  >
                    کوردی
                  </button>
                </div>

                {/* Theme Switcher Button */}
                <button
                  onClick={() => {
                    const nextTheme = themeMode === 'light' ? 'dark' : 'light';
                    setThemeMode(nextTheme);
                    showToast(nextTheme === 'dark' ? "Atmosphere preset: Clinical Dark Mode" : "Atmosphere preset: Soft Clinic Light");
                  }}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-blue-600 dark:text-blue-400 active-scale shrink-0"
                  title="Toggle Atmosphere Theme"
                >
                  {themeMode === 'light' ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 animate-pulse text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072-7.072 5 5 0 01-7.072 7.072z" />
                    </svg>
                  )}
                </button>

                {/* Notification Icon Badge */}
                <button
                  onClick={() => {
                    setActiveTab('more');
                    showToast('Viewing Patient Notifications');
                  }}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-blue-600 dark:text-blue-400 active-scale relative shrink-0"
                >
                  <Bell className="w-5 h-5" />
                  {notificationsTable.some(n => !n.is_read) && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
                  )}
                </button>
              </div>
            </header>
          )}

          {/* Interactive Main Body View */}
          <div className={`flex-1 overflow-hidden relative flex flex-col ${theme.bg}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: lang === 'en' ? 12 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: lang === 'en' ? -12 : 12 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={`flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar pb-24 ${theme.text}`}
              >
                
                {/* 1. VIEW TAB: CLINICS / HOME VIEW */}
                {activeTab === 'clinics' && (
                  <div className="animate-fade-in p-4 space-y-4">
                    {/* Shared Search Bar (if not Layout 5 which has a custom minimalist look) */}
                    {homeLayout !== 5 && (
                      <div className="relative">
                        <Search className="absolute top-3.5 left-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder={t.searchPlaceholder}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2.5 ${theme.inputBg} ${theme.inputText} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-2xl text-xs font-medium placeholder-slate-400`}
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-3 bg-slate-200 dark:bg-slate-700 text-slate-500 rounded-full p-0.5 hover:bg-slate-300"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={homeLayout}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="space-y-4"
                      >
                        {/* ================= STYLE 1: MODERN PREMIUM BENTO GRID ================= */}
                        {homeLayout === 1 && (
                          <div className="grid grid-cols-2 gap-3">
                            {/* Giant Welcome Greeting (col-span-2) */}
                            <div className="col-span-2 bg-slate-900 text-white rounded-3xl p-4 relative overflow-hidden shadow-sm">
                              <div className="absolute right-2 bottom-0 opacity-10">
                                <Sparkles className="w-32 h-32 text-blue-400" />
                              </div>
                              <span className="text-[9px] bg-blue-600 px-2 py-0.5 rounded-full uppercase font-mono tracking-wider">Premium Member</span>
                              <h3 className="font-headline font-extrabold text-base mt-1.5 text-white">Slaw, {currentUser.name}!</h3>
                              <p className="text-[11px] text-slate-200 leading-normal font-sans mt-0.5">Your dental wellness is trackable today. Welcome back.</p>
                            </div>

                            {/* Bento A: Quick book widget (col-span-2) */}
                            <div className="col-span-2 bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 text-white rounded-3xl p-4 shadow-sm relative overflow-hidden">
                              <div className="absolute right-2 top-2 opacity-15">
                                <Calendar className="w-24 h-24" />
                              </div>
                              <span className="text-[8px] bg-white/20 backdrop-blur px-2.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold">{t.quickAction}</span>
                              <h4 className="font-headline font-extrabold text-sm mt-1">{t.bookAppointment}</h4>
                              <p className="text-[10px] text-blue-100 leading-tight mt-1 max-w-[80%]">{t.bookSub}</p>
                              <button
                                onClick={() => { setActiveTab('doctors'); showToast('Please select a doctor to begin booking'); }}
                                className="mt-3.5 bg-emerald-400 text-slate-900 font-extrabold text-[10px] px-3.5 py-1.5 rounded-full hover:opacity-90 active-scale"
                              >
                                Find Specialist
                              </button>
                            </div>

                            {/* Bento B: Mini Maps Locator */}
                            <div
                              onClick={() => { setActiveTab('clinics'); showToast('Interactive clinics locator active'); }}
                              className="col-span-1 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 rounded-3xl p-3 flex flex-col justify-between align-start shadow-3xs cursor-pointer hover:border-blue-300 dark:hover:border-blue-500 transition-all active-scale h-36"
                            >
                              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h5 className="font-bold text-[11px] text-slate-800 dark:text-slate-100">Erbil Map</h5>
                                <p className="text-[9px] text-slate-400 dark:text-slate-400 mt-0.5 truncate">Gulan St, Erbil</p>
                              </div>
                              <span className="text-[9px] font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-0.5">3 Branches →</span>
                            </div>

                            {/* Bento C: Emergency Voice Dial */}
                            <div 
                              onClick={() => { showToast('Simulated direct voice dialed +964 750 123 4567'); }}
                              className="col-span-1 bg-rose-50 dark:bg-rose-950/20 border border-rose-100/70 dark:border-rose-900/45 rounded-3xl p-3 flex flex-col justify-between align-start shadow-3xs cursor-pointer hover:bg-rose-100/50 dark:hover:bg-rose-900/30 transition-all active-scale h-36"
                            >
                              <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center animate-pulse">
                                <Phone className="w-4 h-4 fill-white" />
                              </div>
                              <div>
                                <h5 className="font-bold text-[11px] text-rose-800 dark:text-rose-300">{t.emergencyButton}</h5>
                                <p className="text-[9px] text-rose-500 dark:text-rose-400 mt-0.5">Immediate 24/7 Voice Line</p>
                              </div>
                              <span className="text-[9px] font-extrabold text-rose-600 dark:text-rose-400">Simulate Dial →</span>
                            </div>

                            {/* Bento D: Promo highlight (col-span-2) */}
                            <div className="col-span-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-3xl flex items-center gap-3 shadow-xs">
                              <div className="p-2 bg-white/20 rounded-2xl shrink-0">
                                <Sparkles className="w-6 h-6 text-yellow-300" />
                              </div>
                              <div className="flex-1">
                                <h5 className="text-[11px] font-bold uppercase leading-tight text-emerald-100">LATEST CAMPAIGN OFFER</h5>
                                <span className="font-headline font-extrabold text-xs text-white leading-tight">30% Whitening Discount Active</span>
                              </div>
                              <button
                                onClick={() => { setActiveTab('services'); showToast('Whitening details focused!'); }}
                                className="bg-white text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full active-scale shrink-0"
                              >
                                View Deal
                              </button>
                            </div>
                          </div>
                        )}

                        {/* ================= STYLE 2: CLINICAL DIRECTORY LIST ================= */}
                        {homeLayout === 2 && (
                          <div className="space-y-4">
                            {/* Categories Selection Bar */}
                            <div className="space-y-1.5">
                              <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide px-1">Specialty Categories</span>
                              <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-1">
                                {categoriesTable.map((cat) => (
                                  <button
                                    key={cat.id}
                                    onClick={() => {
                                      showToast(`Filtering directory by ${cat.name}`);
                                      setActiveTab('services');
                                    }}
                                    className="flex-none bg-white dark:bg-slate-800 font-bold text-[10px] text-slate-700 dark:text-slate-200 px-3.5 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-3xs flex items-center gap-1.5"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    {cat.name}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Horizontal Slider of Top Doctors */}
                            <div className="space-y-1.5">
                              <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide px-1">{t.topSpecialists}</span>
                              <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
                                {dentistsTable.map((doc) => (
                                  <div
                                    key={doc.id}
                                    className="flex-none w-32 bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 p-2.5 rounded-2xl text-center shadow-3xs relative"
                                  >
                                    <img
                                      src={doc.image}
                                      alt={doc.name}
                                      className="w-12 h-12 rounded-full object-cover mx-auto border border-emerald-400 shadow-3xs mb-1.5"
                                    />
                                    <h6 className="font-extrabold text-[10px] text-slate-800 dark:text-slate-100 truncate">{doc.name}</h6>
                                    <p className="text-[8px] text-slate-400 dark:text-slate-400 truncate">{doc.title}</p>
                                    <button
                                      onClick={() => { setSelectedDoctorForBooking(doc); }}
                                      className="mt-2 w-full py-1 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 text-[#0058bc] dark:text-blue-400 font-extrabold text-[9px] rounded-lg transition-colors"
                                    >
                                      Book Now
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Detailed Directory Clinics Lists */}
                            <div className="space-y-3">
                              <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide px-1">{t.nearbyText}</span>
                              {clinicsTable.map((cl) => (
                                <div
                                  key={cl.id}
                                  className="bg-white dark:bg-slate-900 rounded-3xl p-3 border border-slate-200/70 dark:border-slate-800/80 shadow-3xs space-y-2.5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                                >
                                  <div className="relative h-28 rounded-2xl overflow-hidden">
                                    <img src={cl.cover_image} alt={cl.name} className="w-full h-full object-cover" />
                                    <span className="absolute top-2 right-2 bg-emerald-500 text-white font-bold text-[8px] px-2 py-0.5 rounded-full uppercase">
                                      Licensed Clinic
                                    </span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between items-start">
                                      <h4 className="font-headline font-extrabold text-xs text-slate-800 dark:text-slate-100 leading-tight">{cl.name}</h4>
                                      <span className="text-[10px] font-bold text-[#006b5a] dark:text-emerald-400 flex items-center gap-0.5 font-sans">★ {cl.rating || (cl.id === 2 ? '5.0' : '4.9')}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{cl.description}</p>
                                    <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800 mt-1 text-[9px] text-[#414755] dark:text-slate-400 font-semibold font-mono">
                                      <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                      <span className="truncate">{cl.address}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[9px] text-[#414755] dark:text-slate-400 font-semibold font-mono">
                                      <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                      <span>{cl.phone}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ================= STYLE 3: INTELLIGENT MAP HUB ================= */}
                        {homeLayout === 3 && (
                          <div className="space-y-4">
                            {/* Embedded GPS Banner */}
                            <div className={`${theme.card} border rounded-3xl p-3.5 space-y-2 shadow-3xs`}>
                              <div className="flex justify-between items-center">
                                <span className="bg-emerald-500/10 text-emerald-700 font-mono text-[9px] px-2 py-0.5 rounded-md font-extrabold uppercase">
                                  Free OpenStreetMap Active
                                </span>
                                <span className="text-[9px] text-slate-400 font-extrabold font-mono tracking-wider">SECURE & UNLIMITED</span>
                              </div>
                              <h4 className="text-xs font-bold mt-1">Hala Dent Free Map Center</h4>
                              <p className="text-[10px] text-slate-400 leading-relaxed">Zoom and pan Erbil City below. Selecting a dental branch from the coordinates matrix automatically centers the satellite route map!</p>
                            </div>

                            {/* Immersive Map Visual */}
                            <div className="relative h-60 rounded-3xl overflow-hidden shadow-xs border border-slate-200/80 z-10">
                              <iframe
                                title="Free OpenStreetMap"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                src={getOsmMapUrl(selectedMapClinicId)}
                                allowFullScreen
                              />
                              <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-20">
                                <span className="bg-blue-600/95 backdrop-blur-md text-white font-mono text-[8px] px-2.5 py-1 rounded-md font-bold text-center uppercase tracking-wider backdrop-blur-xs">
                                  OSM Interactive
                                </span>
                              </div>
                              <div className="absolute bottom-2 left-2 right-2 z-20">
                                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2.5 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-7 h-7 rounded-lg bg-[#0058bc] flex items-center justify-center shrink-0">
                                      <MapPin className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="min-w-0">
                                      <h5 className="font-extrabold text-[10px] text-slate-950 dark:text-white truncate">
                                        {clinicsTable.find(c => c.id === selectedMapClinicId)?.name || 'Erbil Branch'}
                                      </h5>
                                      <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate">
                                        {clinicsTable.find(c => c.id === selectedMapClinicId)?.address || 'Erbil, Kurdistan'}
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      const cl = clinicsTable.find(c => c.id === selectedMapClinicId);
                                      if (cl) {
                                        const doc = dentistsTable.find(d => d.clinic_id === cl.id) || dentistsTable[0];
                                        setSelectedDoctorForBooking(doc);
                                        showToast(`Initiating slot appointment booking at ${cl.name}`);
                                      }
                                    }}
                                    className="bg-[#0058bc] text-white font-extrabold text-[9px] px-3 py-1.5 rounded-full select-none active-scale whitespace-nowrap"
                                  >
                                    Book Branch
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Nearest Branches List with simulated distances */}
                            <div className="space-y-2.5">
                              <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide px-1">Clinic Locations Matrix</span>
                              {clinicsTable.map((cl, idx) => {
                                const isSelected = cl.id === selectedMapClinicId;
                                return (
                                  <div
                                    key={cl.id}
                                    onClick={() => {
                                      setSelectedMapClinicId(cl.id);
                                      showToast(`Panning free map to ${cl.name}`);
                                    }}
                                    className={`p-3 rounded-2xl border transition-all active-scale cursor-pointer flex items-center justify-between gap-3 ${
                                      isSelected
                                        ? 'bg-blue-50/75 border-blue-500 shadow-3xs dark:bg-blue-950/20'
                                        : `${theme.card} hover:border-slate-300`
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                        <MapPin className="w-4 h-4" />
                                      </div>
                                      <div className="min-w-0">
                                        <h5 className="font-extrabold text-[11px] text-slate-800 dark:text-slate-100 truncate leading-snug">{cl.name}</h5>
                                        <p className="text-[9px] text-slate-400 truncate font-mono">{cl.address}</p>
                                      </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                      <span className="block text-[11px] font-extrabold text-[#006b5a] dark:text-emerald-400 font-sans">
                                        {cl.id === 1 ? '1.2 km' : cl.id === 2 ? '3.4 km' : '4.8 km'}
                                      </span>
                                      <span className="block text-[8px] text-slate-400 font-semibold font-mono">
                                        {cl.id === 1 ? '4 min drive' : cl.id === 2 ? '10 min drive' : '15 min drive'}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Quick emergency hotline */}
                            <div className="p-3 bg-[#ffdad6]/40 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30 rounded-2xl flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center animate-pulse shrink-0">
                                  <Phone className="w-3.5 h-3.5 fill-white" />
                                </div>
                                <div>
                                  <h5 className="font-bold text-[10px] text-rose-800 dark:text-rose-300 font-headline">Trauma Emergency Line</h5>
                                  <p className="text-[9px] text-rose-500 dark:text-rose-400 font-sans">Instant connection to available trauma clinician</p>
                                </div>
                              </div>
                              <a
                                href="tel:+9647501234567"
                                onClick={(e) => { e.preventDefault(); showToast('Simulating direct emergency dialer call...'); }}
                                className="bg-rose-600 text-white font-extrabold text-[9px] px-3 py-1 rounded-full whitespace-nowrap active-scale"
                              >
                                {t.emergencyButton}
                              </a>
                            </div>
                          </div>
                        )}

                        {/* ================= STYLE 4: PROMOTIONS & HEALTH FEED ================= */}
                        {homeLayout === 4 && (
                          <div className="space-y-4">
                            {/* Health Tip Section */}
                            <div className="bg-[#e8f5e9]/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/50 rounded-3xl p-4 space-y-2.5 shadow-3xs select-none">
                              <div className="flex justify-between items-start">
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-[#006b5a] dark:text-emerald-400 font-extrabold flex items-center gap-1 uppercase tracking-wider font-mono">
                                    <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                    {t.healthTip}
                                  </span>
                                  <h4 className="font-headline font-bold text-xs text-slate-800 dark:text-slate-100">
                                    {t.tipTitle}
                                  </h4>
                                </div>
                                <div className="p-1.5 bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 rounded-xl shadow-3xs font-bold text-xs font-sans">
                                  ★ Daily
                                </div>
                              </div>
                              <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                                {t.tipText}
                              </p>
                              <div className="flex gap-2 pt-1 border-t border-emerald-100 dark:border-emerald-900">
                                <button
                                  onClick={() => showToast('Advanced instructions downloaded.')}
                                  className="bg-emerald-600 text-white font-bold text-[9px] px-3 py-1 rounded-full active-scale animate-pulse lg:animate-none"
                                >
                                  {t.learnMore}
                                </button>
                                <button
                                  onClick={() => showToast('Dismissed daily article banner')}
                                  className="text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-750 font-bold text-[9px] px-3 py-1 rounded-full active-scale bg-white dark:bg-slate-800"
                                >
                                  {t.dismiss}
                                </button>
                              </div>
                            </div>

                            {/* Promos Highlight list */}
                            <div className="space-y-3">
                              <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide px-1">ACTIVE PACKAGES & CAMPAIGNS</span>
                              {offersTable.map((of) => (
                                <div
                                  key={of.id}
                                  className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-3xs flex flex-col hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                                >
                                  <div className="h-32 relative">
                                    <img src={of.image} alt={of.title} className="w-full h-full object-cover" />
                                    <span className="absolute top-3 left-3 bg-blue-600 text-white font-extrabold text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                                      {of.discount}
                                    </span>
                                  </div>
                                  <div className="p-3.5 space-y-1">
                                    <h4 className="font-headline font-extrabold text-xs text-slate-800 dark:text-slate-100 leading-tight">{of.title}</h4>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{of.description}</p>
                                    <div className="flex justify-between items-center pt-2 mt-1 border-t border-slate-100 dark:border-slate-800">
                                      <span className="text-[9px] text-amber-600 dark:text-amber-400 font-bold font-sans">Valid till: {of.expiry_date}</span>
                                      <button
                                        onClick={() => {
                                          setActiveTab('services');
                                          showToast(`Claim instructions sent for: ${of.title}`);
                                        }}
                                        className="bg-blue-600 text-white font-bold text-[9px] px-3 py-1 rounded-lg hover:opacity-95 active-scale"
                                      >
                                        Claim Offer
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Connect Channels Section */}
                            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 space-y-3 font-sans">
                              <h4 className="font-headline font-extrabold text-xs text-center text-slate-800 dark:text-slate-100">
                                Join our Online Smile Community
                              </h4>
                              <p className="text-[10px] text-slate-400 text-center select-none leading-normal">Get instant diagnostic clips and live cosmetic feedback on Erbil channels.</p>
                              <div className="flex justify-around items-center gap-1.5 pt-1.5">
                                <a
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); showToast('Heading to Hala Dent Facebook Feed'); }}
                                  className="flex flex-col items-center gap-1 text-slate-500 hover:text-blue-600"
                                >
                                  <div className="w-9 h-9 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-3xs active-scale">
                                    <Globe className="w-4 h-4 text-blue-600 font-mono" />
                                  </div>
                                  <span className="text-[8px] font-bold">Facebook</span>
                                </a>
                                <a
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); showToast('Heading to Hala Dent @hala_dent Instagram'); }}
                                  className="flex flex-col items-center gap-1 text-slate-500 hover:text-pink-600"
                                >
                                  <div className="w-9 h-9 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-3xs active-scale">
                                    <ImageIcon className="w-4 h-4 text-pink-500" />
                                  </div>
                                  <span className="text-[8px] font-bold">Instagram</span>
                                </a>
                                <a
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); showToast('App link generator copied to clipboard'); }}
                                  className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900"
                                >
                                  <div className="w-9 h-9 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-3xs active-scale font-mono">
                                    <Share2 className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                                  </div>
                                  <span className="text-[8px] font-bold">Share App</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ================= STYLE 5: CONCIERGE SERVICE ACTION BOARD ================= */}
                        {homeLayout === 5 && (
                          <div className="space-y-4">
                            {/* Flat Welcome Concierge Header */}
                            <div className="text-center py-2 space-y-1 select-none">
                              <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded-full font-mono font-extrabold uppercase">
                                Concierge Online
                              </span>
                              <h3 className="font-headline font-extrabold text-base text-slate-800 dark:text-slate-100 italic">Slaw, {currentUser.name}</h3>
                              <p className="text-[10px] text-slate-400 dark:text-slate-400 font-medium font-sans">How can our Erbil medical practitioners support your dental care list today?</p>
                            </div>

                            {/* 4 Quick Launch Quadrants */}
                            <div className="grid grid-cols-2 gap-3 pb-1">
                              <button
                                onClick={() => { setActiveTab('doctors'); showToast('Loaded doctors list for direct select booking'); }}
                                className="bg-white dark:bg-slate-900 p-3.5 rounded-3xl border border-slate-200/70 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500 shadow-3xs flex flex-col items-center justify-center text-center active-scale transition-all"
                              >
                                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-1.5 shrink-0 text-blue-600 dark:text-blue-400 font-mono">
                                  <Calendar className="w-4 h-4" />
                                </div>
                                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug font-sans">Book Appointment</span>
                                <span className="text-[8px] text-slate-400 dark:text-slate-400 font-semibold mt-0.5 font-mono">12 Specialists</span>
                              </button>

                              <button
                                onClick={() => { setActiveTab('more'); showToast('Offline medical histories retrieved safely'); }}
                                className="bg-white dark:bg-slate-900 p-3.5 rounded-3xl border border-slate-200/70 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500 shadow-3xs flex flex-col items-center justify-center text-center active-scale transition-all"
                              >
                                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mb-1.5 shrink-0 text-emerald-600 dark:text-emerald-400">
                                  <FileText className="w-4 h-4 font-mono" />
                                </div>
                                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug font-sans">My Medical Records</span>
                                <span className="text-[8px] text-slate-400 dark:text-slate-400 font-semibold mt-0.5 font-mono">2 Active Rows</span>
                              </button>

                              <button
                                onClick={() => { setActiveTab('chat'); }}
                                className="bg-white dark:bg-slate-900 p-3.5 rounded-3xl border border-slate-200/70 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500 shadow-3xs flex flex-col items-center justify-center text-center active-scale transition-all"
                              >
                                <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center mb-1.5 shrink-0 text-purple-600 dark:text-purple-400">
                                  <MessageCircle className="w-4 h-4" />
                                </div>
                                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug font-sans">Chat Assistants</span>
                                <span className="text-[8px] text-slate-400 dark:text-slate-400 font-semibold mt-0.5 font-mono">Instant Bot</span>
                              </button>

                              <button
                                onClick={() => { setActiveTab('more'); showToast('Directory inquiry section opened'); }}
                                className="bg-white dark:bg-slate-900 p-3.5 rounded-3xl border border-slate-200/70 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500 shadow-3xs flex flex-col items-center justify-center text-center active-scale transition-all"
                              >
                                <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center mb-1.5 shrink-0 text-amber-600 dark:text-amber-400">
                                  <HelpCircle className="w-4 h-4 font-mono" />
                                </div>
                                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug font-sans">Send Inquiry</span>
                                <span className="text-[8px] text-slate-400 dark:text-slate-400 font-semibold mt-0.5 font-mono">Feedback Desk</span>
                              </button>
                            </div>

                            {/* Recent Registered Appointments Status */}
                            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-3xs space-y-2.5">
                              <div className="flex justify-between items-center select-none animate-fade-in">
                                <span className="text-[9px] text-[#006b5a] dark:text-emerald-400 font-extrabold uppercase font-mono">
                                  Active Appointment Schedule
                                </span>
                                <span className="text-[9px] text-slate-400 dark:text-slate-400 font-extrabold">{appointmentsTable.length} Booked</span>
                              </div>
                              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-0.5">
                                {appointmentsTable.map((ap) => {
                                  const doc = dentistsTable.find(d => d.id === ap.dentist_id);
                                  return (
                                    <div key={ap.id} className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs font-sans">
                                      <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 bg-blue-100 dark:bg-blue-950/40 text-[#0058bc] dark:text-blue-400 rounded-full flex items-center justify-center font-extrabold text-[10px]">
                                          {ap.time.substring(0, 2)}
                                        </div>
                                        <div>
                                          <h5 className="font-extrabold text-[11px] text-slate-800 dark:text-slate-200 font-headline">{doc?.name || 'Dr. Specialist'}</h5>
                                          <p className="text-[9px] text-slate-400 font-mono">{ap.date} &bull; {ap.time}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <span className={`px-2 py-0.5 rounded-full text-[8px] uppercase tracking-wider font-mono font-extrabold ${
                                          ap.status === 'confirmed' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
                                        }`}>
                                          {ap.status}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}

                {/* 2. VIEW TAB: DOCTORS DIRECTORY (with Horizontal views & verification badges) */}
                {activeTab === 'doctors' && (
                  <div className="animate-fade-in p-4 space-y-4 font-sans">
                    {/* Back Arrow Header */}
                    <div className="flex items-center gap-3 select-none">
                      <button 
                        onClick={() => { setActiveTab('clinics'); showToast('Back to clinics directory'); }} 
                        className="p-1 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full shrink-0"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div>
                        <h1 className="font-headline font-extrabold text-lg text-slate-900 dark:text-white leading-none">
                          {lang === 'en' ? 'Our Specialists' : lang === 'ar' ? 'أخصائيو عيادتنا' : 'پزیشکە پسپۆڕەکانمان'}
                        </h1>
                        <p className="text-[9px] text-slate-400 dark:text-slate-400 font-semibold mt-1">
                          {lang === 'en' ? 'World-class dental professionals' : 'طاقم علاج عالمي متميز لخدمتكم'}
                         </p>
                      </div>
                    </div>

                    {/* Rich paragraph description matching Screen 5 subtitle */}
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {lang === 'en' 
                        ? 'Meet our team of world-class dental professionals dedicated to your smile and oral health. Every doctor is certified by the regional health ministry with verified active practice licenses.'
                        : 'تعرف على نخبة من الأطباء والاستشاريين الملتزمين برعاية صحة وجمال ابتسامتك بأعلى معايير الدقة والتعقيم.'}
                    </p>

                    {/* Interactive Filter row styled select block */}
                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase font-black font-mono tracking-wider px-1">Filter Specialty</span>
                      <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-1 select-none">
                        {[
                          { key: '', label: 'All Specialties' },
                          { key: 'Orthodontist', label: 'Orthodontists' },
                          { key: 'Surgeon', label: 'Oral Surgeons' },
                          { key: 'General', label: 'General Care' },
                          { key: 'Cosmetic', label: 'Cosmetics' }
                        ].map((p) => (
                          <button
                            key={p.key}
                            onClick={() => {
                              setActiveDoctorFilter(p.key);
                              showToast(`Displaying ${p.label}`);
                            }}
                            className={`flex-none font-bold text-[10.5px] px-3.5 py-1.5 rounded-full transition-all active-scale border z-10 ${
                              activeDoctorFilter === p.key 
                                ? 'bg-blue-600 text-white border-blue-600 shadow-3xs' 
                                : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200/70 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Search result list displaying Screen 5 structure layout */}
                    <div className="space-y-4">
                      {filteredDentists.map((doc, idx) => {
                        const isFav = favoritesTable.some(f => f.dentist_id === doc.id);
                        
                        // Custom features to display Screen 5 metadata bullet points
                        let expYears = doc.years_of_experience ? `${doc.years_of_experience} yrs exp` : "12 yrs exp";
                        let specialBadges = doc.certification ? [doc.certification, "Licensed Practice"] : ["Board Certified", "Invisalign Gold"];
                        if (!doc.years_of_experience && !doc.certification) {
                          if (doc.id === 1) {
                            expYears = "15 yrs exp";
                            specialBadges = ["Chief Implantologist", "Dental Arts Tutor"];
                          } else if (doc.id === 2) {
                            expYears = "8 yrs exp";
                            specialBadges = ["Pediatric Specialist", "Painless Care"];
                          } else {
                            expYears = "10 yrs exp";
                            specialBadges = ["General Practitioner", "3D Scan Expert"];
                          }
                        }

                        return (
                          <div
                            key={doc.id}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-3xs flex flex-col gap-3.5 relative hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                          >
                            <div className="flex items-start gap-3.5">
                              {/* Square / Rounded modern Doctor avatar avatar with verification badge overlay */}
                              <div className="relative w-18 h-18 rounded-2xl overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 shadow-3xs">
                                <img
                                  src={doc.image}
                                  alt={doc.name}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute bottom-1 right-1 w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center border border-white dark:border-slate-900 text-[8px] font-black">
                                  ✓
                                </div>
                              </div>

                              {/* Doctor info text */}
                              <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                  <h4 className="font-headline font-black text-xs text-slate-900 dark:text-slate-100 truncate">
                                    {doc.name}
                                  </h4>
                                  <button
                                    onClick={() => handleToggleFavoriteDoc(doc.id)}
                                    className={`p-1 rounded-full border border-slate-100 dark:border-slate-800 active-scale ${isFav ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-500' : 'text-slate-300 dark:text-slate-500 hover:text-rose-500 bg-white dark:bg-slate-800'}`}
                                  >
                                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-300 dark:text-slate-500'}`} />
                                  </button>
                                </div>

                                <p className="text-[10.5px] text-[#006b5a] dark:text-emerald-400 font-extrabold leading-none">
                                  {doc.title}
                                </p>

                                <p className="text-[10px] text-slate-400 dark:text-slate-400 font-medium line-clamp-1 leading-normal">
                                  {doc.bio}
                                </p>

                                {/* Rating block */}
                                <div className="flex items-center gap-1 text-[10px] text-slate-505 dark:text-slate-400 font-semibold font-mono">
                                  <span className="text-amber-500">⭐</span>
                                  <span className="text-slate-800 dark:text-slate-200 font-extrabold">{doc.rating || '4.9'}</span>
                                  <span className="text-slate-400">({doc.reviews_count || '120'} reviews)</span>
                                </div>
                              </div>
                            </div>

                            {/* Bullet tags matching Screen 5 credentials */}
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold font-mono text-[8px] uppercase tracking-wide px-2.5 py-0.5 rounded-full">
                                {expYears}
                              </span>
                              {specialBadges.map((badge, bIdx) => (
                                <span key={bIdx} className="bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold font-mono text-[8px] uppercase tracking-wide px-2.5 py-0.5 rounded-full">
                                  {badge}
                                </span>
                              ))}
                            </div>

                            {/* Dual Side-by-Side buttons row */}
                            <div className="flex gap-2.5 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                              <button
                                onClick={() => {
                                  // Fake open Profile Modal sheet details
                                  showToast(`Viewing full credentials profile of ${doc.name}`);
                                }}
                                className="flex-1 bg-white dark:bg-slate-900 border border-[#006b5a] dark:border-[#008b76] text-[#006b5a] dark:text-[#00ab8e] hover:bg-[#006b5a]/5 font-extrabold text-[11px] py-2.5 rounded-full active-scale transition-all text-center"
                              >
                                View Profile
                              </button>
                              <button
                                onClick={() => setSelectedDoctorForBooking(doc)}
                                className="flex-1 bg-[#0058bc] hover:bg-[#00479e] text-white font-extrabold text-[11px] py-2.5 rounded-full shadow-md active-scale transition-colors text-center"
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      {filteredDentists.length === 0 && (
                        <div className="text-center py-8 text-slate-400 space-y-1 select-none">
                          <User className="w-10 h-10 mx-auto text-slate-300" />
                          <p className="text-xs">No doctors matched your criteria.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. VIEW TAB: SERVICES BENTO VIEW (Language switchers and interactive grid) */}
                {activeTab === 'services' && (
                  <div className="animate-fade-in p-4 space-y-4">
                    {/* Floating Banner */}
                    <div className="relative h-44 rounded-3xl overflow-hidden shadow-md select-none">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGJXz6_mbNuFGsONq6Hwa6cYsl3WTYt4tkkDT8d2C2atnj9PDNIKYk8FgwQLNp3FfC8LFtrIVM3bjman42Jomp4gRVw7nM236aehvbm2qQa-KJnF70o5Fkx4T8sNFtwR66k13FoexkcLf7rLtsI-XQXBav5fY2GhUdVyGgs_CnuqyIS02BXgqnlmxCr7SbPhcTsCAKeVdsm6NAgOJc_JhlQt-AYctgUH_mf7c2v46v_S4MxTuC-MrrB43K71Eb5nuFlGkfi5RCqw"
                        alt="High-tech Painless Dentistry"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent flex flex-col justify-center p-4">
                        <span className="bg-[#54f8d7] text-[#005143] text-[9px] font-extrabold px-2 py-0.5 rounded-full w-fit uppercase mb-1">
                          New Technology
                        </span>
                        <h4 className="font-headline font-extrabold text-white text-sm tracking-tight leading-snug">
                          Painless Laser Dentistry
                        </h4>
                        <p className="text-[10px] text-blue-100 max-w-[140px] leading-tight mb-2">
                          Airflow scaling and cold-shade bleaching
                        </p>
                        <button
                          onClick={() => {
                            const teethWhitening = servicesTable.find(s => s.id === 1 || s.name.toLowerCase().includes('whitening') || s.name.toLowerCase().includes('laser')) || servicesTable[0];
                            if (teethWhitening) setSelectedServiceDetail(teethWhitening);
                          }}
                          className="w-fit bg-white text-blue-900 text-[10px] font-bold px-3 py-1 rounded-full active-scale"
                        >
                          {t.learnMore}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mb-1 select-none">
                      <h4 className="font-headline font-bold text-xs text-slate-800 dark:text-slate-100">
                        {t.ourServices}
                      </h4>
                      <button
                        onClick={() => setSelectedCategoryFilter(null)}
                        className="text-blue-600 dark:text-blue-400 font-bold text-[10px] hover:underline"
                      >
                        Reset Filter
                      </button>
                    </div>

                    {/* Large bento category cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {categoriesTable.map((cat) => (
                        <div
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategoryFilter(cat.id);
                            showToast(`Filtered services category: ${cat.name}`);
                          }}
                          className={`p-3.5 rounded-2xl border transition-all active-scale cursor-pointer ${selectedCategoryFilter === cat.id ? 'bg-blue-600 text-white border-blue-500 shadow-md' : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200/70 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700'}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            {cat.id === 1 ? (
                              <Smile className={`w-6 h-6 shrink-0 ${selectedCategoryFilter === cat.id ? 'text-white' : 'text-blue-600'}`} />
                            ) : cat.id === 2 ? (
                              <Layers className={`w-6 h-6 shrink-0 ${selectedCategoryFilter === cat.id ? 'text-white' : 'text-blue-500'}`} />
                            ) : cat.id === 3 ? (
                              <PlusCircle className={`w-6 h-6 shrink-0 ${selectedCategoryFilter === cat.id ? 'text-white' : 'text-emerald-500'}`} />
                            ) : (
                              <Sparkles className={`w-6 h-6 shrink-0 ${selectedCategoryFilter === cat.id ? 'text-white' : 'text-amber-500'}`} />
                            )}
                            <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full ${selectedCategoryFilter === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                              {cat.total_clicks} UI clicks
                            </span>
                          </div>
                          <h4 className="font-bold text-[11px] leading-snug">{cat.name}</h4>
                          <p className={`text-[9px] line-clamp-2 mt-1 leading-normal ${selectedCategoryFilter === cat.id ? 'text-blue-100' : 'text-slate-400 dark:text-slate-400'}`}>
                            {cat.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Services detailed files matching selected filters */}
                    <div className="space-y-3">
                      {filteredServices.map((srv) => (
                        <div
                          key={srv.id}
                          className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800/80 shadow-xs flex items-center justify-between gap-3 active-scale cursor-pointer hover:border-slate-300 dark:hover:border-slate-700"
                          onClick={() => setSelectedServiceDetail(srv)}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={srv.image}
                              alt={srv.name}
                              className="w-12 h-12 object-cover rounded-xl border border-slate-100 dark:border-slate-800 shrink-0"
                            />
                            <div>
                              <h5 className="font-bold text-xs text-slate-950 dark:text-slate-100">{srv.name}</h5>
                              <p className="text-[10px] text-slate-400 line-clamp-1">{srv.description}</p>
                              <div className="flex items-center gap-2 mt-1 select-none">
                                <span className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-bold text-[9px] px-2 py-0.5 rounded-md">
                                  ${srv.price}
                                </span>
                                {srv.warranty_months > 0 && (
                                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono text-[9px] px-1.5 py-0.5 rounded-md">
                                    {srv.warranty_months}m warranty
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <ChevronRightIcon className="w-4 h-4 text-slate-300 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. VIEW TAB: LIVE CHAT ASSISTANT CHATROOM */}
                {activeTab === 'chat' && (
                  <div className="animate-fade-in p-4 flex flex-col h-[525px] overflow-hidden">
                    <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-950/25 border border-blue-200 dark:border-blue-900/30 px-3 py-2 rounded-2xl mb-3 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300">Support Representative Active</span>
                      </div>
                      <span className="text-[9px] text-slate-400 dark:text-slate-400">Response time: &lt; 2 minutes</span>
                    </div>

                    {/* Grok Setup Configuration panel */}
                    <div className="mb-3 shrink-0 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/70 dark:bg-slate-900/40">
                      <button
                        onClick={() => setShowGrokSetup(!showGrokSetup)}
                        className="w-full flex justify-between items-center px-3.5 py-2.5 text-left hover:bg-slate-100 dark:hover:bg-slate-800/30 transition-all select-none focus:outline-none"
                      >
                        <div className="flex items-center gap-2">
                          <Settings className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Grok (X.AI) Custom Mode</span>
                        </div>
                        <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono tracking-wide border border-slate-300/40 dark:border-slate-700/50">
                          {localStorage.getItem("grok_api_key") ? "Grok Enabled" : "Default Mode"}
                        </span>
                      </button>
                      
                      {showGrokSetup && (
                        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/20 space-y-2.5 animate-slide-up">
                          <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-normal">
                            Provide your custom X.AI Grok API Key. Interactions will securely route through Grok models (grok-2-1212) on our server proxy. Leave blank to default back to Gemini.
                          </p>
                          <div className="flex gap-2">
                            <input
                              type="password"
                              placeholder="Insert xai-..."
                              value={grokKeyInput}
                              onChange={(e) => setGrokKeyInput(e.target.value)}
                              className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => {
                                const trimmed = grokKeyInput.trim();
                                if (trimmed) {
                                  localStorage.setItem("grok_api_key", trimmed);
                                  showToast("Custom Grok AI Mode Enabled!");
                                } else {
                                  localStorage.removeItem("grok_api_key");
                                  showToast("Default AI Mode Restored.");
                                }
                                setShowGrokSetup(false);
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] py-1.5 px-4 rounded-xl active-scale"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Simulated Message stream */}
                    <div className="flex-1 overflow-y-auto space-y-3 pb-3 pr-1 hide-scrollbar">
                      {chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex flex-col max-w-[240px] space-y-1 ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                        >
                          <div className={`p-2.5 rounded-2xl text-xs font-medium ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-none'}`}>
                            {msg.text}
                          </div>
                          <span className="text-[9px] text-slate-400 px-1">{msg.time}</span>
                        </div>
                      ))}
                      {isBotTyping && (
                        <div className="flex flex-col max-w-[240px] space-y-1 mr-auto items-start animate-pulse">
                          <div className="p-2.5 rounded-2xl text-xs font-medium bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-500 dark:text-slate-300 rounded-tl-none flex items-center gap-1.5 shadow-sm">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                          <span className="text-[9px] text-slate-400 px-1">AI Assistant is typing...</span>
                        </div>
                      )}
                    </div>

                    {/* Preconfigured smart clinical queries */}
                    <div className="py-2 flex flex-wrap gap-1.5 shrink-0 select-none">
                      <button
                        onClick={() => handleSendMessage("Do you have active laser teeth whitening discounts available?")}
                        className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-bold text-[9px] py-1 px-2.5 rounded-full"
                      >
                        🏷️ Discount Pricing?
                      </button>
                      <button
                        onClick={() => handleSendMessage("How much do orthodontic aligners cost in Erbil?")}
                        className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-bold text-[9px] py-1 px-2.5 rounded-full"
                      >
                        🦷 Aligner treatment?
                      </button>
                    </div>

                    {/* Input control block */}
                    <div className="flex gap-2 shrink-0 pt-1 pb-1">
                      <input
                        type="text"
                        placeholder="Ask about aligners, emergency care, prices..."
                        value={chatInquiry}
                        onChange={(e) => setChatInquiry(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 px-3.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-xl text-xs"
                      />
                      <button
                        onClick={() => handleSendMessage()}
                        className="bg-blue-600 text-white p-2 rounded-xl active-scale"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 5. VIEW TAB: MORE INFO - OFFERS, CONTACTS & AMENITIES */}
                {activeTab === 'more' && (
                  <div className="animate-fade-in p-4 space-y-5 font-sans bg-[#f8faf9] dark:bg-slate-950 min-h-screen pb-24">
                    
                    {/* Welcome Hero Card styled matching screenshot exactly */}
                    <div className="bg-white dark:bg-slate-900 rounded-[24px] p-4.5 border border-slate-100 dark:border-slate-800 shadow-3xs flex items-center justify-between gap-4 select-none">
                      <div className="flex items-center gap-3.5">
                        {/* Avatar block with verified sign */}
                        <div className="relative shrink-0">
                          <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center shadow-3xs">
                            <User className="w-8 h-8 text-blue-500" />
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#10b981] rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                            <Check className="w-3 h-3 text-white stroke-[3.5]" />
                          </div>
                        </div>
                        
                        {/* Welcome text */}
                        <div className="min-w-0">
                          <h3 className="font-headline font-black text-sm text-slate-900 dark:text-white leading-tight">
                            Welcome to Hala Dent
                          </h3>
                          <p className="text-[10px] text-slate-500 font-semibold leading-normal mt-0.5">
                            Access your medical history and clinical records instantly.
                          </p>
                        </div>
                      </div>

                      {/* Login / Register Button */}
                      <button 
                        onClick={() => {
                          if (isLoggedIn) {
                            setIsLoggedIn(false);
                            showToast("Logged out successfully");
                          } else {
                            showToast("Opening Secure Portal Login");
                          }
                        }}
                        className="bg-[#0058bc] hover:bg-[#00479e] text-white font-black text-[11px] px-4 py-2.5 rounded-full flex items-center gap-1.5 active-scale shrink-0 shadow-sm transition-all whitespace-nowrap"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>Login / Register</span>
                      </button>
                    </div>

                    {/* Section 1: CLINICAL RECORDS */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 px-1 select-none text-[#0058bc]">
                        <ClipboardList className="w-4 h-4 shrink-0" />
                        <span className="text-[10px] uppercase font-black tracking-wider">
                          CLINICAL RECORDS
                        </span>
                      </div>

                      <div className="space-y-2">
                        {/* Patient Profile */}
                        <div 
                          onClick={() => {
                            showToast("Displaying Patient Medical Profile details.");
                          }}
                          className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800/60 hover:border-slate-200 dark:hover:border-slate-700 transition-colors cursor-pointer flex items-center justify-between shadow-3xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600">
                              <User className="w-5 h-5 text-[#005bc5]" />
                            </div>
                            <div>
                              <h4 className="font-headline font-bold text-xs text-slate-800 dark:text-slate-200">
                                Patient Profile
                              </h4>
                              <p className="text-[10px] text-slate-400 dark:text-slate-400 font-medium">
                                Personal details and medical history
                              </p>
                            </div>
                          </div>
                          <ChevronRightIcon className="w-4 h-4 text-slate-300 shrink-0" />
                        </div>

                        {/* My Appointments */}
                        <div 
                          onClick={() => {
                            setActiveTab('clinics');
                            showToast("Directing to active bookings");
                          }}
                          className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800/60 hover:border-slate-200 dark:hover:border-slate-700 transition-colors cursor-pointer flex items-center justify-between shadow-3xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600">
                              <Calendar className="w-5 h-5 text-[#005bc5]" />
                            </div>
                            <div>
                              <h4 className="font-headline font-bold text-xs text-slate-800 dark:text-slate-200">
                                My Appointments
                              </h4>
                              <p className="text-[10px] text-slate-400 font-medium">
                                Scheduled visits and history
                              </p>
                            </div>
                          </div>
                          <ChevronRightIcon className="w-4 h-4 text-slate-300 shrink-0" />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: APP SETTINGS */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 px-1 select-none text-[#0058bc]">
                        <Settings className="w-4 h-4 shrink-0" />
                        <span className="text-[10px] uppercase font-black tracking-wider">
                          APP SETTINGS
                        </span>
                      </div>

                      <div className="space-y-2">
                        {/* Language */}
                        <div 
                          onClick={() => {
                            const nextLang = lang === 'en' ? 'ar' : lang === 'ar' ? 'ku' : 'en';
                            setLang(nextLang);
                            showToast(`Language switched to ${nextLang === 'en' ? 'English' : nextLang === 'ar' ? 'العربية' : 'کوردی'}`);
                          }}
                          className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800/60 hover:border-slate-205 dark:hover:border-slate-705 transition-colors cursor-pointer flex items-center justify-between shadow-3xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600">
                              <Globe className="w-5 h-5 text-[#005bc5]" />
                            </div>
                            <div>
                              <h4 className="font-headline font-bold text-xs text-slate-800 dark:text-slate-100">
                                Language
                              </h4>
                              <p className="text-[10px] text-slate-400 dark:text-slate-400 font-medium font-sans">
                                {lang === 'en' ? 'English' : lang === 'ar' ? 'العربية' : 'کوردی'}
                              </p>
                            </div>
                          </div>
                          <ChevronRightIcon className="w-4 h-4 text-slate-300 shrink-0" />
                        </div>

                        {/* Theme Mode Switch */}
                        <div 
                          className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-3xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600">
                              <Smile className="w-5 h-5 text-[#005bc5]" />
                            </div>
                            <div>
                              <h4 className="font-headline font-bold text-xs text-slate-800 dark:text-slate-100">
                                Dark Mode Theme
                              </h4>
                              <p className="text-[10px] text-slate-400 dark:text-slate-400 font-medium font-sans">
                                {themeMode === 'dark' ? 'Clinical Dark theme active' : 'Clean Light theme active'}
                              </p>
                            </div>
                          </div>
                          
                          {/* Checked Switch toggle button precisely matching mockup */}
                          <label className="relative inline-flex items-center cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              checked={themeMode === 'dark'}
                              onChange={() => {
                                const nextTheme = themeMode === 'light' ? 'dark' : 'light';
                                setThemeMode(nextTheme);
                                showToast(nextTheme === 'dark' ? "Atmosphere preset: Clinical Dark Mode" : "Atmosphere preset: Soft Clinic Light");
                              }}
                              className="sr-only peer" 
                            />
                            <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0058bc]"></div>
                          </label>
                        </div>



                        {/* Notifications */}
                        <div 
                          onClick={() => {
                            showToast("Configuring alert preferences");
                          }}
                          className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800/60 hover:border-slate-205 dark:hover:border-slate-705 transition-colors cursor-pointer flex items-center justify-between shadow-3xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600">
                              <Bell className="w-5 h-5 text-[#005bc5]" />
                            </div>
                            <div>
                              <h4 className="font-headline font-bold text-xs text-slate-800 dark:text-slate-100">
                                Notifications
                              </h4>
                            </div>
                          </div>
                          <ChevronRightIcon className="w-4 h-4 text-slate-300 dark:text-slate-500 shrink-0" />
                        </div>

                        {/* Security */}
                        <div 
                          onClick={() => {
                            showToast("Accessing device passcode options");
                          }}
                          className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800/60 hover:border-slate-250 dark:hover:border-slate-705 transition-colors cursor-pointer flex items-center justify-between shadow-3xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600">
                              <Lock className="w-5 h-5 text-[#005bc5]" />
                            </div>
                            <div>
                              <h4 className="font-headline font-bold text-xs text-slate-800 dark:text-slate-100">
                                Security & Password
                              </h4>
                            </div>
                          </div>
                          <ChevronRightIcon className="w-4 h-4 text-slate-300 dark:text-slate-500 shrink-0" />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: INFORMATION & SUPPORT */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 px-1 select-none text-[#0058bc]">
                        <HelpCircle className="w-4 h-4 shrink-0" />
                        <span className="text-[10px] uppercase font-black tracking-wider">
                          INFORMATION & SUPPORT
                        </span>
                      </div>

                      <div className="space-y-2">
                        {/* Favorites */}
                        <div 
                          onClick={() => {
                            showToast("Displaying your favorite doctors & clinics list");
                          }}
                          className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800 hover:border-slate-205 dark:hover:border-slate-705 transition-colors cursor-pointer flex items-center justify-between shadow-3xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-750 flex items-center justify-center text-slate-600">
                              <Heart className="w-5 h-5 text-[#005bc5]" />
                            </div>
                            <div>
                              <h4 className="font-headline font-bold text-xs text-slate-800 dark:text-slate-100">
                                Favorites
                              </h4>
                            </div>
                          </div>
                          <ChevronRightIcon className="w-4 h-4 text-slate-300 dark:text-slate-500 shrink-0" />
                        </div>

                        {/* Announcements */}
                        <div 
                          onClick={() => {
                            showToast("No new clinical announcements today");
                          }}
                          className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800 hover:border-slate-205 dark:hover:border-slate-705 transition-colors cursor-pointer flex items-center justify-between shadow-3xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-750 flex items-center justify-center text-slate-600">
                              <Megaphone className="w-5 h-5 text-[#005bc5]" />
                            </div>
                            <div>
                              <h4 className="font-headline font-bold text-xs text-slate-800 dark:text-slate-100">
                                Announcements
                              </h4>
                            </div>
                          </div>
                          <ChevronRightIcon className="w-4 h-4 text-slate-300 dark:text-slate-500 shrink-0" />
                        </div>

                        {/* Dynamic Documents loaded directly from content_types & content_translations */}
                        {contentTypesTable.map((docType) => {
                          // 1. Find corresponding translation for active language
                          let translation = contentTranslationsTable.find(
                            (ct) => ct.content_type_id === docType.id && ct.language_code === lang
                          );
                          // Fallback to English if active language translations are pending
                          if (!translation) {
                            translation = contentTranslationsTable.find(
                              (ct) => ct.content_type_id === docType.id && ct.language_code === 'en'
                            );
                          }

                          // 2. Map Lucide icon dynamically
                          let DocIcon = Shield;
                          const keyType = docType.type_key.toLowerCase();
                          if (keyType.includes('terms') || keyType.includes('service') || docType.icon_name === 'description' || docType.icon_name === 'gavel') {
                            DocIcon = FileText;
                          } else if (keyType.includes('help') || keyType.includes('faq') || docType.icon_name === 'help_outline') {
                            DocIcon = HelpCircle;
                          } else if (keyType.includes('version') || keyType.includes('about') || docType.icon_name === 'info_outline') {
                            DocIcon = Info;
                          }

                          const fallbackTitle = docType.type_key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                          const docTitle = translation ? translation.title : fallbackTitle;

                          return (
                            <div 
                              key={docType.id}
                              onClick={() => {
                                setActiveDocKey(docType.type_key);
                              }}
                              className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800 hover:border-slate-205 dark:hover:border-slate-705 transition-colors cursor-pointer flex items-center justify-between shadow-3xs hover:bg-slate-50/10 dark:hover:bg-slate-800/20 active-scale"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-750 flex items-center justify-center text-[#005bc5]">
                                  <DocIcon className="w-5 h-5 text-[#005bc5]" />
                                </div>
                                <div>
                                  <h4 className="font-headline font-bold text-xs text-slate-800 dark:text-slate-100">
                                    {docTitle}
                                  </h4>
                                  <p className="text-[8px] text-slate-400 dark:text-slate-400 font-medium font-mono mt-0.5 uppercase tracking-wide">
                                    Local DB Sync: {docType.type_key}
                                  </p>
                                </div>
                              </div>
                              <ChevronRightIcon className="w-4 h-4 text-slate-300 dark:text-slate-500 shrink-0" />
                            </div>
                          );
                        })}

                        {/* Clinic Locations */}
                        <div 
                          onClick={() => {
                            setActiveTab('clinics');
                            showToast("Check our Gulan and Bakhtiary location lists");
                          }}
                          className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800 hover:border-slate-205 dark:hover:border-slate-705 transition-colors cursor-pointer flex items-center justify-between shadow-3xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-755 flex items-center justify-center text-slate-600">
                              <MapPin className="w-5 h-5 text-[#005bc5]" />
                            </div>
                            <div>
                              <h4 className="font-headline font-bold text-xs text-slate-800 dark:text-slate-100">
                                Clinic Locations
                              </h4>
                            </div>
                          </div>
                          <ChevronRightIcon className="w-4 h-4 text-slate-300 dark:text-slate-500 shrink-0" />
                        </div>

                        {/* Emergency Contact - explicitly red-styled as in mockup */}
                        <div 
                          onClick={() => {
                            showToast("Dialing 24/7 Dental Emergency Hotline: +964 750 445 9000");
                          }}
                          className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer flex items-center justify-between shadow-3xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 flex items-center justify-center">
                              <span className="text-rose-600 dark:text-rose-450 text-[18px] font-black leading-none mt-1">*</span>
                            </div>
                            <div>
                              <h4 className="font-headline font-bold text-xs text-rose-600 dark:text-rose-450">
                                Emergency Contact
                              </h4>
                            </div>
                          </div>
                          <ChevronRightIcon className="w-4 h-4 text-rose-300 dark:text-rose-500 shrink-0" />
                        </div>

                      </div>
                    </div>

                    {/* Quick Log Out to support account toggle */}
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        showToast('Successfully logged out of Hala Dent');
                      }}
                      className="w-full py-3.5 bg-rose-500/10 hover:bg-rose-500/15 text-rose-600 font-extrabold text-xs rounded-2xl active-scale transition-colors text-center shadow-3xs"
                    >
                      Log Out of Clinical Account
                    </button>

                    {/* Social Media Group "Connect with Us" matching screenshot */}
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-[28px] p-5 border border-slate-100 dark:border-slate-800 shadow-3xs flex flex-col gap-3.5 select-none">
                      <h4 className="font-headline font-extrabold text-sm text-[#0058bc] dark:text-blue-400">
                        Connect with Us
                      </h4>
                      
                      <div className="grid grid-cols-5 gap-2 pt-1.5">
                        {[
                          { name: 'FACEBOOK', icon: <Globe className="w-5.5 h-5.5 text-[#0058bc]" /> },
                          { name: 'INSTAGRAM', icon: <Clock className="w-5.5 h-5.5 text-[#0058bc]" /> },
                          { name: 'X', icon: <X className="w-5.5 h-5.5 text-rose-600 dark:text-rose-450" /> },
                          { name: 'SHARE', icon: <Share2 className="w-5.5 h-5.5 text-[#0058bc]" /> },
                          { name: 'WHATSAPP', icon: <MessageCircle className="w-5.5 h-5.5 text-emerald-500" /> }
                        ].map((social, sIdx) => (
                          <div 
                            key={sIdx} 
                            onClick={() => showToast(`Opening Hala Dent's official ${social.name}`)}
                            className="flex flex-col items-center cursor-pointer group"
                          >
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-3xs flex items-center justify-center text-[#0058bc] dark:text-blue-400 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-950/40 transition-colors active-scale">
                              {social.icon}
                            </div>
                            <span className="text-[8px] font-black tracking-wide text-slate-500 dark:text-slate-400 font-mono text-center mt-2.5">
                              {social.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

              {/* Patient Shell Bottom Navbar */}
              <nav className={`fixed bottom-0 left-0 right-0 ${theme.tabBarBg} backdrop-blur-md shadow-[0_-4px_15px_rgba(0,122,255,0.06)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.5)] h-16 border-t ${theme.border} flex justify-around items-center px-2 pb-safe select-none z-[49]`}>
                <button
                  onClick={() => { setActiveTab('clinics'); setSearchQuery(''); }}
                  className={`relative flex flex-col items-center justify-center pb-1 px-3 py-2 transition-all active-scale z-10 ${activeTab === 'clinics' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-[#414755] dark:text-slate-400 hover:text-[#181c1c] dark:hover:text-slate-100'}`}
                >
                  {activeTab === 'clinics' && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-blue-500/10 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Home className="w-5 h-5" />
                  <span className="text-[9px] font-bold mt-0.5">{t.clinicsTab}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('doctors'); setSearchQuery(''); }}
                  className={`relative flex flex-col items-center justify-center pb-1 px-3 py-2 transition-all active-scale z-10 ${activeTab === 'doctors' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-[#414755] dark:text-slate-400 hover:text-[#181c1c] dark:hover:text-slate-100'}`}
                >
                  {activeTab === 'doctors' && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-blue-500/10 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <User className="w-5 h-5" />
                  <span className="text-[9px] font-bold mt-0.5">{t.doctorsTab}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('services'); setSearchQuery(''); }}
                  className={`relative flex flex-col items-center justify-center pb-1 px-3 py-2 transition-all active-scale z-10 ${activeTab === 'services' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-[#414755] dark:text-slate-400 hover:text-[#181c1c] dark:hover:text-slate-100'}`}
                >
                  {activeTab === 'services' && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-blue-500/10 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Layers className="w-5 h-5" />
                  <span className="text-[9px] font-bold mt-0.5">{t.servicesTab}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('chat'); }}
                  className={`relative flex flex-col items-center justify-center pb-1 px-3 py-2 transition-all active-scale z-10 ${activeTab === 'chat' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-[#414755] dark:text-slate-400 hover:text-[#181c1c] dark:hover:text-slate-100'}`}
                >
                  {activeTab === 'chat' && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-blue-500/10 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-[9px] font-bold mt-0.5">{t.chatTab}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('more'); }}
                  className={`relative flex flex-col items-center justify-center pb-1 px-3 py-2 transition-all active-scale z-10 ${activeTab === 'more' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-[#414755] dark:text-slate-400 hover:text-[#181c1c] dark:hover:text-slate-100'}`}
                >
                  {activeTab === 'more' && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-blue-500/10 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Settings className="w-5 h-5" />
                  <span className="text-[9px] font-bold mt-0.5">{t.moreTab}</span>
                </button>
              </nav>

              {/* Patient Appointment Builder Modal / Drawer */}
              <AnimatePresence>
                {selectedDoctorForBooking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-end justify-center z-[60]"
                  >
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ type: "spring", damping: 25, stiffness: 220 }}
                      className="bg-white dark:bg-slate-900 rounded-t-[32px] w-full max-w-md p-5 space-y-4 max-h-[90%] overflow-y-auto border-t dark:border-slate-800"
                    >
                      <div className="flex justify-between items-center select-none">
                        <h4 className="font-headline font-extrabold text-sm text-slate-800 dark:text-slate-100">
                          {t.bookAppointment}
                        </h4>
                        <button
                          onClick={() => setSelectedDoctorForBooking(null)}
                          className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 bg-blue-50 dark:bg-slate-800 border border-blue-100/60 dark:border-slate-700 p-3 rounded-2xl select-none">
                        <img
                          src={selectedDoctorForBooking.image}
                          alt={selectedDoctorForBooking.name}
                          className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
                        />
                        <div>
                          <h5 className="font-bold text-xs text-slate-900 dark:text-white">{selectedDoctorForBooking.name}</h5>
                          <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">{selectedDoctorForBooking.title}</p>
                        </div>
                      </div>

                      <form onSubmit={handleBookAppointmentSubmit} className="space-y-3 font-sans">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Pick Target Date</label>
                          <input
                            type="date"
                            value={bookingForm.date}
                            onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-xl text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Preferred Time Slot</label>
                          <select
                            value={bookingForm.time}
                            onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                            className="w-full px-2 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:ring-1 rounded-xl text-xs"
                          >
                            <option value="09:00 AM" className="dark:bg-slate-900">09:00 AM (Early Slot)</option>
                            <option value="10:00 AM" className="dark:bg-slate-900">10:00 AM</option>
                            <option value="11:30 AM" className="dark:bg-slate-900">11:30 AM</option>
                            <option value="01:00 PM" className="dark:bg-slate-900">01:00 PM (Afternoon checkup)</option>
                            <option value="03:30 PM" className="dark:bg-slate-900">03:30 PM</option>
                            <option value="05:00 PM" className="dark:bg-slate-900">05:00 PM (Late slot)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Special Requests / Symptoms</label>
                          <textarea
                            placeholder="e.g. Extreme crown sensitivity, clear aligners discussion scan, checkup status..."
                            value={bookingForm.notes}
                            onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                            rows={2}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-1 rounded-xl text-xs font-medium placeholder-slate-400 dark:placeholder-slate-500"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-[#0058bc] text-white py-2.5 font-bold text-xs rounded-xl hover:opacity-95 shadow-md active-scale"
                        >
                          File Appointment and Write Table Row
                        </button>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Service item Detail Modal */}
              <AnimatePresence>
                {selectedServiceDetail && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-end justify-center z-[60]"
                  >
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ type: "spring", damping: 25, stiffness: 220 }}
                      className="bg-white dark:bg-slate-900 rounded-t-[32px] w-full max-w-md p-5 space-y-4 max-h-[90%] overflow-y-auto border-t dark:border-slate-800"
                    >
                      <div className="flex justify-between items-center select-none">
                        <h4 className="font-headline font-extrabold text-sm text-slate-800 dark:text-slate-100">
                          Service Detail
                        </h4>
                        <button
                          onClick={() => setSelectedServiceDetail(null)}
                          className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <img
                        src={selectedServiceDetail.image}
                        alt={selectedServiceDetail.name}
                        className="w-full h-32 rounded-2xl object-cover shadow-xs border border-slate-100 dark:border-slate-800"
                      />

                      <div className="space-y-2">
                        <h3 className="font-headline font-extrabold text-[#0058bc] dark:text-blue-400 text-sm tracking-tight leading-snug">
                          {selectedServiceDetail.name}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed leading-normal">
                          {selectedServiceDetail.description}
                        </p>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl space-y-1.5 text-xs text-slate-500 dark:text-slate-300 select-none font-sans border dark:border-slate-800">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400 font-bold">Standard Price:</span>
                            <span className="text-emerald-700 dark:text-emerald-450 font-bold">${selectedServiceDetail.price} USD</span>
                          </div>
                          {selectedServiceDetail.discount_price && selectedServiceDetail.discount_price > 0 && (
                            <div className="flex justify-between text-[11px] bg-cyan-100/45 dark:bg-cyan-950/30 p-1 rounded">
                              <span className="text-cyan-800 dark:text-cyan-400 font-bold">Promo Price:</span>
                              <span className="text-cyan-800 dark:text-cyan-400 font-bold">${selectedServiceDetail.discount_price} USD</span>
                            </div>
                          )}
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400 font-bold font-sans">Target Audience:</span>
                            <span className="text-slate-700 dark:text-slate-200 font-bold">{selectedServiceDetail.target_audience || 'All patients'}</span>
                          </div>
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400 font-bold">Clinical Warranty:</span>
                            <span className="text-slate-700 dark:text-slate-200 font-bold">{selectedServiceDetail.warranty_months > 0 ? `${selectedServiceDetail.warranty_months} Months` : 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400 font-semibold font-sans">Consultation Required:</span>
                            <span className="text-slate-700 dark:text-slate-200 font-semibold">{selectedServiceDetail.requires_consultation ? 'Yes (Full Radiography)' : 'No (Direct entry allowed)'}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const defaultDoc = dentistsTable.find(d => d.clinic_id === selectedServiceDetail.clinic_id) || dentistsTable[0];
                          setSelectedDoctorForBooking(defaultDoc);
                          setSelectedServiceDetail(null);
                        }}
                        className="w-full bg-[#0058bc] text-white py-2 text-xs font-bold rounded-xl active-scale"
                      >
                        Instant Book Consultation
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dynamic Database Documents Modal Drawer */}
              <AnimatePresence>
                {activeDocKey && (() => {
                  const docType = contentTypesTable.find(d => d.type_key === activeDocKey);
                  if (!docType) return null;
                  
                  let translation = contentTranslationsTable.find(
                    (ct) => ct.content_type_id === docType.id && ct.language_code === lang
                  );
                  if (!translation) {
                    translation = contentTranslationsTable.find(
                      (ct) => ct.content_type_id === docType.id && ct.language_code === 'en'
                    );
                  }
                  
                  let DocIcon = Shield;
                  const keyType = docType.type_key.toLowerCase();
                  if (keyType.includes('terms') || keyType.includes('service') || docType.icon_name === 'description' || docType.icon_name === 'gavel') {
                    DocIcon = FileText;
                  } else if (keyType.includes('help') || keyType.includes('faq') || docType.icon_name === 'help_outline') {
                    DocIcon = HelpCircle;
                  } else if (keyType.includes('version') || keyType.includes('about') || docType.icon_name === 'info_outline') {
                    DocIcon = Info;
                  }
                  
                  const fallbackTitle = docType.type_key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                  const docTitle = translation ? translation.title : fallbackTitle;
                  const docContent = translation ? translation.content : 'Document translation pending...';

                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-end justify-center z-[60]"
                    >
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 220 }}
                        className="bg-white dark:bg-slate-900 rounded-t-[32px] w-full max-w-md p-6 space-y-4 max-h-[90%] overflow-y-auto border-t dark:border-slate-800"
                      >
                        <div className="flex justify-between items-center select-none pb-2 border-b border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-[#0058bc] dark:text-blue-400">
                              <DocIcon className="w-5 h-5" />
                            </div>
                            <h4 className="font-headline font-extrabold text-sm text-slate-800 dark:text-slate-100">
                              {docTitle}
                            </h4>
                          </div>
                          <button
                            onClick={() => setActiveDocKey(null)}
                            className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-4 pb-2">
                          <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-wrap select-text p-1">
                            {docContent}
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800 space-y-2 select-none">
                            <div className="flex justify-between text-[9px] font-mono text-slate-400">
                              <span>LANGUAGE DECLARED:</span>
                              <span className="font-bold text-[#0058bc] dark:text-blue-400 uppercase">{lang}</span>
                            </div>
                            <div className="flex justify-between text-[9px] font-mono text-slate-400">
                              <span>DOCUMENT KEY:</span>
                              <span className="font-bold text-slate-600 dark:text-slate-300 uppercase">{docType.type_key}</span>
                            </div>
                            <div className="flex justify-between text-[9px] font-mono text-slate-400">
                              <span>DATABASE ROUTE:</span>
                              <span className="font-bold text-slate-500 dark:text-slate-400 uppercase">content_translations</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveDocKey(null)}
                          className="w-full bg-[#0058bc] hover:bg-[#004bb0] text-white py-3.5 text-xs font-bold rounded-2xl active-scale transition-all"
                        >
                          {lang === 'en' ? 'Close Document' : lang === 'ar' ? 'إغلاق المستند' : 'داخستنی بەڵگەنامە'}
                        </button>
                      </motion.div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </>
          )}

      </div>
  );
}

// Simple layout chevron icon inside services
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}
