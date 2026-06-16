/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
  Video
} from 'lucide-react';

import {
  SEED_CATEGORIES,
  SEED_SUB_CATEGORIES,
  SEED_CLINICS,
  SEED_DENTISTS,
  SEED_SERVICES,
  SEED_OFFERS,
  SEED_MEDIA,
  INITIAL_NOTIFICATIONS
} from './data';

import { Category, SubCategory, Clinic, Dentist, Service, Offer, User as UserType, Favorite, Appointment, Contact, Notification, Media } from './types';

export default function App() {
  // View mode state - Focused preview vs full-stack developer DB terminal
  const [viewMode, setViewMode] = useState<'app' | 'dual'>('app');

  // Device Language State
  const [lang, setLang] = useState<'en' | 'ar' | 'ku'>('en');

  // Active Android Emulator Navigation
  const [activeTab, setActiveTab] = useState<'clinics' | 'doctors' | 'services' | 'chat' | 'more'>('clinics');

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

  const t = translations[lang];

  // Helper trigger to blink data row in Supabase Live Inspector
  const triggerRowHighlight = (table: string, id: number) => {
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

    const newAppointment: Appointment = {
      id: appointmentsTable.length + 1,
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
      id: notificationsTable.length + 1,
      user_id: currentUser.id,
      title: 'Appointment Request Registered',
      message: `Your appointment with ${selectedDoctorForBooking.name} on ${bookingForm.date} at ${bookingForm.time} is pending clinical confirmation.`,
      is_read: false,
      date: new Date().toISOString(),
      type: 'appointment'
    };
    setNotificationsTable([newNotification, ...notificationsTable]);

    // Update clicks metric of category
    const catId = selectedDoctorForBooking.id === 1 ? 2 : selectedDoctorForBooking.id === 2 ? 1 : 4;
    setCategoriesTable(prev => prev.map(c => c.id === catId ? { ...c, total_clicks: c.total_clicks + 1 } : c));

    showToast(`Appointment registered with ${selectedDoctorForBooking.name}! See Database table: appointments`);
    triggerRowHighlight('appointments', newAppointment.id);
    setSelectedDoctorForBooking(null);
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
  const handleSendMessage = (textToSend?: string) => {
    const rawMessage = textToSend || chatInquiry;
    if (!rawMessage.trim()) return;

    const userMsg = { sender: 'user' as const, text: rawMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInquiry('');

    // Instant realistic medical clinic bot answering system
    setTimeout(() => {
      let replyText = "Understood. Our customer service is notified. Would you like to check our clinics or top dentists instead?";
      const lower = rawMessage.toLowerCase();
      if (lower.includes('whitening') || lower.includes('tbyyd') || lower.includes('bleach')) {
        replyText = "Hala Dent is running a 30% discount on laser whitening! You can view this offer under the 'More' section or book teeth whitening directly with Dr. Sara Hawar.";
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('daea') || lower.includes('نرخ')) {
        replyText = "Hala Dent strives for transparency. Our standard scale is $80, consultation is $150 (completely credited if treatment is started), and teeth whitening is promo priced at $245.";
      } else if (lower.includes('braces') || lower.includes('ortho') || lower.includes('تعديل') || lower.includes('تەلی ددان')) {
        replyText = "We utilize intra-oral 3D scans for custom clear aligners. This is led by Dr. Sarah Khalil at Gulan Main St clinic. Would you like us to schedule a 3D assessment?";
      } else if (lower.includes('emergency') || lower.includes('pain') || lower.includes('وجع') || lower.includes('ئازار')) {
        replyText = "For extreme urgent toothaches, please tap the red EMERGENCY block at the top of the app home screen to dial our active 24/7 dentists directly.";
      }

      const botReply = {
        sender: 'bot' as const,
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, botReply]);
    }, 1000);
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

  const renderUnifiedHome = () => {
    return (
      <div className="p-4 space-y-4">
        
        {/* Welcome Greet Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-4.5 relative overflow-hidden shadow-sm select-none">
          <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
            <Sparkles className="w-36 h-36 text-blue-400" />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[8px] bg-blue-600 px-2 py-0.5 rounded-full uppercase font-mono tracking-wider font-extrabold text-white">★ Active Patient</span>
              <h3 className="font-headline font-extrabold text-white text-sm mt-1.5">Slaw, {currentUser.name}!</h3>
              <p className="text-[10px] text-slate-300 leading-normal font-sans mt-0.5">Your dental wellness is active. Welcome back.</p>
            </div>
            <img src={currentUser.profile_picture} alt={currentUser.name} className="w-10 h-10 rounded-full border border-blue-500 object-cover shadow-sm" />
          </div>
        </div>

        {/* Shared Search Bar */}
        <div className="relative">
          <Search className="absolute top-3.5 left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-2xl text-xs font-semibold placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 bg-slate-200 text-slate-500 rounded-full p-0.5 hover:bg-slate-300"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Campaign Promo banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3.5 rounded-3xl flex items-center gap-3 shadow-xs">
          <div className="p-2 bg-white/20 rounded-2xl shrink-0">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-[8px] font-extrabold uppercase leading-none text-emerald-100 font-mono">Special Campaign Promo</h5>
            <h4 className="font-headline font-extrabold text-xs text-white leading-tight mt-0.5">30% Whitening Discount Active</h4>
            <p className="text-[9px] text-emerald-100 truncate mt-0.5 font-medium">Lifting yellowing matrices safely.</p>
          </div>
          <button
            onClick={() => { setActiveTab('services'); showToast('Whitening details focused!'); }}
            className="bg-white hover:bg-emerald-50 text-emerald-800 text-[9px] font-extrabold px-3 py-1.5 rounded-full active-scale shrink-0"
          >
            Claim
          </button>
        </div>

        {/* Specialty Categories Scroll */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-1">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide">Specialties &amp; Services</span>
            <button onClick={() => { setActiveTab('services'); }} className="text-[9px] text-blue-600 font-extrabold hover:underline">See All</button>
          </div>
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-1">
            {categoriesTable.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryFilter(cat.id);
                  setActiveTab('services');
                  showToast(`Loaded services for specialty: ${cat.name}`);
                }}
                className="flex-none bg-white font-bold text-[10px] text-slate-700 px-3.5 py-1.5 rounded-full border border-slate-200/60 hover:bg-slate-50 transition-colors shadow-3xs flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Top Specialists list carousel */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-1">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide">{t.topSpecialists}</span>
            <button onClick={() => { setActiveTab('doctors'); }} className="text-[9px] text-blue-600 font-extrabold hover:underline">Directory</button>
          </div>
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
            {dentistsTable.map((doc) => (
              <div
                key={doc.id}
                className="flex-none w-32 bg-white border border-slate-200/50 p-2.5 rounded-2xl text-center shadow-3xs relative flex flex-col justify-between"
              >
                <div>
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-11 h-11 rounded-full object-cover mx-auto border border-emerald-400 shadow-3xs mb-1.5"
                  />
                  <h6 className="font-extrabold text-[10px] text-slate-800 truncate">{doc.name}</h6>
                  <p className="text-[8px] text-slate-400 truncate">{doc.title}</p>
                </div>
                <button
                  onClick={() => { setSelectedDoctorForBooking(doc); }}
                  className="mt-2.5 w-full py-1 bg-blue-50 hover:bg-blue-100 text-[#0058bc] font-extrabold text-[9px] rounded-lg transition-colors active-scale"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* GPS location and Routing */}
        <div className="space-y-2">
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide px-1">GPS Route &amp; Nearest Clinics</span>
          
          <div className="relative h-36 rounded-3xl overflow-hidden shadow-3xs border border-slate-200/60">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8MnDfu4W9Qm2gh-epGMr6eVix1A6C2oQuZl4vyaYs3PewWFnvuhewuxvYebVFJLvN3YL88wuyAzfSP0KqYasxoisUET5cEvMMA4Jf-P5AImkuu9sIqJbxfrDH9ge9v62vavZ28TIrwoWngvG9O3D3qJIe0M7hf7n59lgNmk0bc5J_9uXEZsrDwgzBofupr80eNbMnChXruiABCNLmdikrk-dXUw3eVOP6Aoo4hk2dRBdwY7Z5cK79jTFNZvYkdyRXUVViFoIfPA"
              alt="Erbil City Locator map"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/15 pointer-events-none" />
            <div className="absolute top-2 right-2 flex flex-col gap-1.5">
              <span className="bg-emerald-500 text-white font-mono text-[7px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs animate-pulse">
                ● GPS ONLINE
              </span>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-md border border-slate-100 flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <div className="min-w-0">
                  <h5 className="font-bold text-[8.5px] text-slate-900 truncate">Calibrating nearest dental chairs...</h5>
                  <p className="text-[7.5px] text-slate-500 truncate font-mono">Gulan Street, Erbil</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            {clinicsTable.map((cl, idx) => (
              <div
                key={cl.id}
                className="bg-white p-2 rounded-2xl border border-slate-100/85 shadow-3xs flex items-center justify-between gap-3 hover:border-slate-300 transition-all cursor-pointer active-scale"
                onClick={() => {
                  showToast(`Driving routing calibrated to: ${cl.name}. Dist: ${idx === 0 ? '1.2 km' : idx === 1 ? '3.4 km' : '4.8 km'}`);
                }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-3 h-3 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-extrabold text-[9.5px] text-slate-800 truncate leading-snug">{cl.name}</h5>
                    <p className="text-[7.5px] text-slate-400 truncate font-mono">{cl.address}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="block text-[9px] font-extrabold text-[#006b5a] font-sans">
                    {idx === 0 ? '1.2 km' : idx === 1 ? '3.4 km' : '4.8 km'}
                  </span>
                  <span className="block text-[7.5px] text-slate-400 font-semibold font-mono">
                    {idx === 0 ? '4m drive' : idx === 1 ? '10m drive' : '15m drive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Status */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-3xs space-y-2">
          <div className="flex justify-between items-center select-none">
            <span className="text-[8px] text-[#006b5a] font-extrabold uppercase font-mono tracking-wider">
              Personal Appointment Schedule
            </span>
            <span className="text-[8px] text-slate-400 font-extrabold">{appointmentsTable.length} Booked</span>
          </div>
          <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-0.5 scrollbar-thin">
            {appointmentsTable.map((ap) => {
              const doc = dentistsTable.find(d => d.id === ap.dentist_id);
              return (
                <div key={ap.id} className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center justify-between gap-3 text-xs font-sans">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 text-[#0058bc] rounded-full flex items-center justify-center font-extrabold text-[9px]">
                      {ap.time.substring(0, 2)}
                    </div>
                    <div>
                      <h5 className="font-extrabold text-[10px] text-slate-800 font-headline">{doc?.name || 'Dr. Specialist'}</h5>
                      <p className="text-[8px] text-slate-400 font-mono">{ap.date} &bull; {ap.time}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-2 py-0.5 rounded-full text-[7.5px] uppercase tracking-wider font-mono font-extrabold ${
                      ap.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-250' : 'bg-amber-100 text-amber-800 border border-amber-250'
                    }`}>
                      {ap.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Emergency Voice hotline */}
        <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-rose-505 bg-rose-500 text-white rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-3 h-3 fill-white" />
            </div>
            <div>
              <h5 className="font-bold text-[9px] text-rose-800 font-headline">{t.emergencyButton}</h5>
              <p className="text-[7.5px] text-rose-500 font-sans leading-none mt-0.5">Clinical trauma callback line</p>
            </div>
          </div>
          <button
            onClick={() => { showToast('Simulating direct hotline dial...'); }}
            className="bg-rose-600 text-white text-[8px] font-extrabold px-2.5 py-1 rounded-full active-scale"
          >
            Dial Hotline
          </button>
        </div>

        {/* Healthy Tooth Tip Section */}
        <div className="bg-[#e8f5e9]/65 border border-emerald-200/50 rounded-2xl p-3 space-y-1.5 shadow-3xs select-none">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <span className="text-[7.5px] text-[#006b5a] font-extrabold flex items-center gap-1 uppercase tracking-wider font-mono">
                <Shield className="w-3 h-3 text-emerald-600" />
                {t.healthTip}
              </span>
              <h4 className="font-headline font-bold text-[11px] text-slate-800 mt-0.5">
                {t.tipTitle}
              </h4>
            </div>
            <div className="p-1 bg-white text-emerald-600 rounded-lg shadow-3xs font-extrabold text-[8px] font-mono">
              ★ TIP
            </div>
          </div>
          <p className="text-[8.5px] text-slate-600 leading-normal font-sans">
            {t.tipText}
          </p>
        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Toast message channel */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[9999] animate-bounce bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium py-3 px-5 rounded-2xl shadow-xl border border-emerald-400 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header / Brand Header */}
      <header className="bg-slate-900/60 border-b border-slate-800 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline font-extrabold text-2xl tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Hala Dent Applet
                </h1>
                <span className="text-[10px] bg-slate-800 text-cyan-400 uppercase tracking-widest px-2 py-0.5 rounded-md font-mono border border-cyan-800">
                  Android Live SDK
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Interactive Directory &amp; Supabase Database persistence emulator
              </p>
            </div>
          </div>

          {/* View Mode & Language Selection Center */}
          <div className="flex flex-wrap items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => {
                  setViewMode('app');
                  showToast('Swapped to Premium Focused Screen');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all duration-150 active-scale select-none ${viewMode === 'app' ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              >
                📱 App Preview
              </button>
              <button
                onClick={() => {
                  setViewMode('dual');
                  showToast('Swapped to Full Stack DB Inspector Dev mode');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all duration-150 active-scale select-none ${viewMode === 'dual' ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              >
                ⚡ Developer DB Terminal
              </button>
            </div>

            {/* Viewport Dynamic Fitting Scale Controller */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs text-slate-400 gap-1 select-none shrink-0">
              <span className="pl-2 pr-1 font-semibold text-[10px] uppercase font-mono tracking-wider text-slate-500 hidden sm:inline">📏 Scale Phone:</span>
              {[
                { val: 1.0, lab: '100%' },
                { val: 0.9, lab: '90%' },
                { val: 0.85, lab: '85%' },
                { val: 0.8, lab: '80%' },
                { val: 0.75, lab: '75%' }
              ].map((sc) => (
                <button
                  key={sc.val}
                  onClick={() => {
                    setAppScale(sc.val);
                    showToast(`Scaled phone workspace to ${sc.lab}`);
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] font-extrabold transition-all duration-100 ${appScale === sc.val ? 'bg-blue-600/90 text-white shadow-sm' : 'hover:bg-slate-900 text-slate-400 hover:text-slate-200'}`}
                >
                  {sc.lab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => { setLang('en'); showToast('Language swapped to English LTR'); }}
                className={`px-3 py-1.5 rounded-full font-bold active-scale transition-all ${lang === 'en' ? 'bg-blue-600/20 text-blue-400 border border-blue-500' : 'bg-slate-800 text-slate-400 hover:bg-slate-705'}`}
              >
                EN
              </button>
              <button
                onClick={() => { setLang('ar'); showToast('Language swapped to Arabic RTL'); }}
                className={`px-3 py-1.5 rounded-full font-bold active-scale transition-all ${lang === 'ar' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500' : 'bg-slate-800 text-slate-400 hover:bg-slate-705'}`}
              >
                العربية
              </button>
              <button
                onClick={() => { setLang('ku'); showToast('Language swapped to Kurdish RTL'); }}
                className={`px-3 py-1.5 rounded-full font-bold active-scale transition-all ${lang === 'ku' ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500' : 'bg-slate-800 text-slate-400 hover:bg-slate-705'}`}
              >
                کوردی
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className={`max-w-7xl mx-auto px-6 py-6 flex-1 w-full transition-all duration-300 ${viewMode === 'app' ? 'flex flex-col items-center justify-center' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'}`}>
        
        {/* ================= COLUMN 1: INTERACTIVE SMARTPHONE EMULATOR (Col-span-5) ================= */}
        <section className={`${viewMode === 'app' ? 'w-full max-w-[440px] py-4' : 'lg:col-span-12 xl:col-span-5'} flex flex-col items-center relative`}>
          {viewMode === 'app' && (
            <div className="absolute inset-0 -z-10 select-none overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-500/5 rounded-full blur-[90px]" />
              <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-cyan-500/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/3 right-1/4 w-[380px] h-[380px] bg-emerald-500/5 rounded-full blur-[100px]" />
            </div>
          )}
          
          {/* Viewport Scale Fitting Wrapper */}
          <div 
            className="transition-all duration-300 origin-top flex justify-center items-start"
            style={{ 
              transform: `scale(${appScale})`, 
              height: `${780 * appScale}px`,
              width: `${400 * appScale}px`,
              marginBottom: `${(appScale - 1) * 780}px`,
              marginRight: `${(appScale - 1) * 400 + 4}px`
            }}
          >
            <div className="relative w-[400px] bg-slate-950 rounded-[55px] p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-4 border-slate-800 ring-2 ring-slate-900/50">
            {/* Phone Ear Speaker and Selfie Camera sensors */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-36 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center gap-1.5">
              <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-800"></div>
            </div>

            {/* Android Dynamic Screen Container */}
            <div
              className="bg-[#f7faf9] text-[#181c1c] rounded-[42px] overflow-hidden min-h-[720px] max-h-[720px] flex flex-col relative font-sans shadow-inner selection:bg-blue-200"
              dir={lang === 'en' ? 'ltr' : 'rtl'}
            >
              {/* Emulator Status Bar */}
              <div className="bg-white/80 backdrop-blur px-6 pt-3 pb-1 flex justify-between items-center text-xs text-[#414755] font-semibold border-b border-slate-100 z-40 select-none">
                <span>10:26 AM</span>
                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span>LTE</span>
                  <div className="w-4 h-2.5 bg-[#414755] rounded-sm relative p-0.5">
                    <div className="w-full h-full bg-white rounded-xs"></div>
                  </div>
                </div>
              </div>

              {/* Emulator App Header bar */}
              <header className="bg-white/90 backdrop-blur-md px-5 h-14 border-b border-slate-100 flex items-center justify-between sticky top-0 z-40 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Home className="w-4.5 h-4.5 text-blue-600" />
                  </div>
                  <h2 className="font-headline font-extrabold text-base text-blue-600 tracking-tight">
                    {t.title}
                  </h2>
                </div>

                <div className="flex items-center gap-1">
                  {/* Notification Icon Badge */}
                  <button
                    onClick={() => {
                      setActiveTab('more');
                      showToast('Viewing Patient Notifications');
                    }}
                    className="p-1.5 hover:bg-slate-100 rounded-full text-blue-600 active-scale relative"
                  >
                    <Bell className="w-4.5 h-4.5" />
                    {notificationsTable.some(n => !n.is_read) && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      showToast('Map locator initiated. Centers near Gulan St, Erbil.');
                      setActiveTab('clinics');
                    }}
                    className="p-1.5 hover:bg-slate-100 rounded-full text-blue-600 active-scale"
                  >
                    <Map className="w-4.5 h-4.5" />
                  </button>
                </div>
              </header>

              {/* Emulator Interactive Main Screen Body */}
              <div className="flex-1 overflow-hidden relative flex flex-col bg-[#f7faf9]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: lang === 'en' ? 12 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: lang === 'en' ? -12 : 12 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar pb-24 text-slate-800"
                  >
                
                {/* 1. VIEW TAB: CLINICS / HOME VIEW */}
                {activeTab === 'clinics' && renderUnifiedHome()}
                {false && activeTab === 'clinics' && (
                  <div className="animate-fade-in p-4 space-y-4">
                    {/* Compact Gorgeous Switcher */}
                    <div className="bg-white rounded-2xl p-2.5 border border-slate-200/60 shadow-xs flex items-center justify-between gap-2 select-none">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider font-mono">🏠 Design Preset Switcher</span>
                        <span className="text-xs text-blue-600 font-extrabold">
                          {homeLayout === 1 && '1. Modern Bento Grid'}
                          {homeLayout === 2 && '2. Directory List'}
                          {homeLayout === 3 && '3. Intelligent Map Hub'}
                          {homeLayout === 4 && '4. Offers & Advice Feed'}
                          {homeLayout === 5 && '5. Direct Action Center'}
                        </span>
                      </div>
                      <div className="flex bg-slate-100 p-1 rounded-xl">
                        {[1, 2, 3, 4, 5].map((idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setHomeLayout(idx);
                              showToast(`Loaded layout style preset ${idx}: ${idx === 1 ? 'Bento' : idx === 2 ? 'Directory' : idx === 3 ? 'Map Hub' : idx === 4 ? 'Offers' : 'Direct'}`);
                            }}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all relative active-scale flex items-center justify-center ${
                              homeLayout === idx
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            {idx}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Shared Search Bar under switcher (if not Layout 5 which has a custom minimalist look) */}
                    {homeLayout !== 5 && (
                      <div className="relative">
                        <Search className="absolute top-3.5 left-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder={t.searchPlaceholder}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-2xl text-xs font-medium placeholder-slate-400"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-3 bg-slate-200 text-slate-500 rounded-full p-0.5 hover:bg-slate-300"
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
                              className="col-span-1 bg-white border border-slate-200/70 rounded-3xl p-3 flex flex-col justify-between align-start shadow-3xs cursor-pointer hover:border-blue-300 transition-all active-scale h-36"
                            >
                              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <h5 className="font-bold text-[11px] text-slate-800">Erbil Map</h5>
                                <p className="text-[9px] text-slate-400 mt-0.5 truncate">Gulan St, Erbil</p>
                              </div>
                              <span className="text-[9px] font-extrabold text-blue-600 flex items-center gap-0.5">3 Branches →</span>
                            </div>

                            {/* Bento C: Emergency Voice Dial */}
                            <div 
                              onClick={() => { showToast('Simulated direct voice dialed +964 750 123 4567'); }}
                              className="col-span-1 bg-rose-50 border border-rose-100/70 rounded-3xl p-3 flex flex-col justify-between align-start shadow-3xs cursor-pointer hover:bg-rose-100/50 transition-all active-scale h-36"
                            >
                              <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center animate-pulse">
                                <Phone className="w-4 h-4 fill-white" />
                              </div>
                              <div>
                                <h5 className="font-bold text-[11px] text-rose-800">{t.emergencyButton}</h5>
                                <p className="text-[9px] text-rose-500 mt-0.5">Immediate 24/7 Voice Line</p>
                              </div>
                              <span className="text-[9px] font-extrabold text-rose-600">Simulate Dial →</span>
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
                                    className="flex-none bg-white font-bold text-[10px] text-slate-700 px-3.5 py-1.5 rounded-full border border-slate-200/60 hover:bg-slate-50 transition-colors shadow-3xs flex items-center gap-1.5"
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
                                    className="flex-none w-32 bg-white border border-slate-200/50 p-2.5 rounded-2xl text-center shadow-3xs relative"
                                  >
                                    <img
                                      src={doc.image}
                                      alt={doc.name}
                                      className="w-12 h-12 rounded-full object-cover mx-auto border border-emerald-400 shadow-3xs mb-1.5"
                                    />
                                    <h6 className="font-extrabold text-[10px] text-slate-800 truncate">{doc.name}</h6>
                                    <p className="text-[8px] text-slate-400 truncate">{doc.title}</p>
                                    <button
                                      onClick={() => { setSelectedDoctorForBooking(doc); }}
                                      className="mt-2 w-full py-1 bg-blue-50 hover:bg-blue-100 text-[#0058bc] font-extrabold text-[9px] rounded-lg transition-colors"
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
                                  className="bg-white rounded-3xl p-3 border border-slate-200/70 shadow-3xs space-y-2.5 hover:border-slate-300 transition-colors"
                                >
                                  <div className="relative h-28 rounded-2xl overflow-hidden">
                                    <img src={cl.cover_image} alt={cl.name} className="w-full h-full object-cover" />
                                    <span className="absolute top-2 right-2 bg-emerald-500 text-white font-bold text-[8px] px-2 py-0.5 rounded-full uppercase">
                                      Licensed Clinic
                                    </span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between items-start">
                                      <h4 className="font-headline font-extrabold text-xs text-slate-800 leading-tight">{cl.name}</h4>
                                      <span className="text-[10px] font-bold text-[#006b5a] flex items-center gap-0.5 font-sans">★ {cl.id === 2 ? '5.0' : '4.9'}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{cl.description}</p>
                                    <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-100 mt-1 text-[9px] text-[#414755] font-semibold font-mono">
                                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                                      <span className="truncate">{cl.address}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[9px] text-[#414755] font-semibold font-mono font-mono">
                                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
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
                            <div className="bg-white border border-slate-200 rounded-3xl p-3 space-y-2 shadow-3xs">
                              <div className="flex justify-between items-center">
                                <span className="bg-emerald-500/10 text-emerald-700 font-mono text-[9px] px-2 py-0.5 rounded-md font-bold uppercase">
                                  GPS Routing: Erbil City
                                </span>
                                <span className="text-[9px] text-slate-400 font-extrabold font-mono tracking-wider">3 ACTIVE SATELLITES</span>
                              </div>
                              <h4 className="text-xs font-bold text-slate-800 mt-1">Hala Dent GPS Coordinates Linked</h4>
                              <p className="text-[10px] text-slate-500">Route guidance triggers automatically. Select a target clinic to plan real-time directions.</p>
                            </div>

                            {/* Immersive Map Visual */}
                            <div className="relative h-56 rounded-3xl overflow-hidden shadow-xs border border-slate-200">
                              <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8MnDfu4W9Qm2gh-epGMr6eVix1A6C2oQuZl4vyaYs3PewWFnvuhewuxvYebVFJLvN3YL88wuyAzfSP0KqYasxoisUET5cEvMMA4Jf-P5AImkuu9sIqJbxfrDH9ge9v62vavZ28TIrwoWngvG9O3D3qJIe0M7hf7n59lgNmk0bc5J_9uXEZsrDwgzBofupr80eNbMnChXruiABCNLmdikrk-dXUw3eVOP6Aoo4hk2dRBdwY7Z5cK79jTFNZvYkdyRXUVViFoIfPA"
                                alt="Erbil City precise locator"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2 flex flex-col gap-1.5">
                                <span className="bg-blue-600 text-white font-mono text-[8px] px-2.5 py-0.5 rounded-md font-bold text-center uppercase tracking-wider backdrop-blur-xs">
                                  GPS Enabled
                                </span>
                              </div>
                              <div className="absolute bottom-2 left-2 right-2">
                                <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-md border border-slate-100 flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                                    <MapPin className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="min-w-0">
                                    <h5 className="font-bold text-[10px] text-slate-900 truncate">Erbil Central Route Guidance</h5>
                                    <p className="text-[9px] text-slate-500 truncate">Calibrating nearest dental diagnostic chairs...</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Nearest Branches List with simulated distances */}
                            <div className="space-y-2.5">
                              <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide px-1">Distance matrix & routing</span>
                              {clinicsTable.map((cl, idx) => (
                                <div
                                  key={cl.id}
                                  className="bg-white p-3 rounded-2xl border border-slate-100/80 shadow-3xs flex items-center justify-between gap-3 hover:border-slate-300 transition-all active-scale"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                      <MapPin className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="min-w-0">
                                      <h5 className="font-extrabold text-[11px] text-slate-800 truncate leading-snug">{cl.name}</h5>
                                      <p className="text-[9px] text-slate-400 truncate font-mono">{cl.address}</p>
                                    </div>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className="block text-[11px] font-extrabold text-[#006b5a] font-sans">
                                      {idx === 0 ? '1.2 km' : idx === 1 ? '3.4 km' : '4.8 km'}
                                    </span>
                                    <span className="block text-[8px] text-slate-400 font-semibold font-mono">
                                      {idx === 0 ? '4 min drive' : idx === 1 ? '10 min drive' : '15 min drive'}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Quick emergency hotline */}
                            <div className="p-3 bg-[#ffdad6]/40 border border-rose-200/50 rounded-2xl flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center animate-pulse shrink-0">
                                  <Phone className="w-3.5 h-3.5 fill-white" />
                                </div>
                                <div>
                                  <h5 className="font-bold text-[10px] text-rose-800 font-headline">Trauma Emergency Line</h5>
                                  <p className="text-[9px] text-rose-500 font-sans">Instant connection to available trauma clinician</p>
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
                            <div className="bg-[#e8f5e9]/60 border border-emerald-200/50 rounded-3xl p-4 space-y-2.5 shadow-3xs select-none">
                              <div className="flex justify-between items-start">
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-[#006b5a] font-extrabold flex items-center gap-1 uppercase tracking-wider font-mono">
                                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                                    {t.healthTip}
                                  </span>
                                  <h4 className="font-headline font-bold text-xs text-slate-800">
                                    {t.tipTitle}
                                  </h4>
                                </div>
                                <div className="p-1.5 bg-white text-emerald-600 rounded-xl shadow-3xs font-bold text-xs font-sans">
                                  ★ Daily
                                </div>
                              </div>
                              <p className="text-[10px] text-slate-600 leading-relaxed font-semibold">
                                {t.tipText}
                              </p>
                              <div className="flex gap-2 pt-1 border-t border-emerald-100">
                                <button
                                  onClick={() => showToast('Advanced instructions downloaded.')}
                                  className="bg-emerald-600 text-white font-bold text-[9px] px-3 py-1 rounded-full active-scale animate-pulse lg:animate-none"
                                >
                                  {t.learnMore}
                                </button>
                                <button
                                  onClick={() => showToast('Dismissed daily article banner')}
                                  className="text-slate-500 border border-slate-300 font-bold text-[9px] px-3 py-1 rounded-full active-scale bg-white"
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
                                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-3xs flex flex-col hover:border-slate-300 transition-colors"
                                >
                                  <div className="h-32 relative">
                                    <img src={of.image} alt={of.title} className="w-full h-full object-cover" />
                                    <span className="absolute top-3 left-3 bg-blue-600 text-white font-extrabold text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                                      {of.discount}
                                    </span>
                                  </div>
                                  <div className="p-3.5 space-y-1">
                                    <h4 className="font-headline font-extrabold text-xs text-slate-800 leading-tight">{of.title}</h4>
                                    <p className="text-[10px] text-slate-500 leading-relaxed font-sans">{of.description}</p>
                                    <div className="flex justify-between items-center pt-2 mt-1 border-t border-slate-100">
                                      <span className="text-[9px] text-amber-600 font-bold font-sans">Valid till: {of.expiry_date}</span>
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
                            <div className="bg-slate-50 rounded-3xl p-4 space-y-3 font-sans">
                              <h4 className="font-headline font-extrabold text-xs text-center text-slate-800">
                                Join our Online Smile Community
                              </h4>
                              <p className="text-[10px] text-slate-400 text-center select-none leading-normal">Get instant diagnostic clips and live cosmetic feedback on Erbil channels.</p>
                              <div className="flex justify-around items-center gap-1.5 pt-1.5">
                                <a
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); showToast('Heading to Hala Dent Facebook Feed'); }}
                                  className="flex flex-col items-center gap-1 text-slate-500 hover:text-blue-600"
                                >
                                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-3xs active-scale">
                                    <Globe className="w-4 h-4 text-blue-600 font-mono" />
                                  </div>
                                  <span className="text-[8px] font-bold">Facebook</span>
                                </a>
                                <a
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); showToast('Heading to Hala Dent @hala_dent Instagram'); }}
                                  className="flex flex-col items-center gap-1 text-slate-500 hover:text-pink-600"
                                >
                                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-3xs active-scale">
                                    <ImageIcon className="w-4 h-4 text-pink-500" />
                                  </div>
                                  <span className="text-[8px] font-bold">Instagram</span>
                                </a>
                                <a
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); showToast('App link generator copied to clipboard'); }}
                                  className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900"
                                >
                                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-3xs active-scale font-mono">
                                    <Share2 className="w-4 h-4 text-slate-700" />
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
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-mono font-extrabold uppercase">
                                Concierge Online
                              </span>
                              <h3 className="font-headline font-extrabold text-base text-slate-800 italic">Slaw, {currentUser.name}</h3>
                              <p className="text-[10px] text-slate-400 font-medium font-sans">How can our Erbil medical practitioners support your dental care list today?</p>
                            </div>

                            {/* 4 Quick Launch Quadrants */}
                            <div className="grid grid-cols-2 gap-3 pb-1">
                              <button
                                onClick={() => { setActiveTab('doctors'); showToast('Loaded doctors list for direct select booking'); }}
                                className="bg-white p-3.5 rounded-3xl border border-slate-200/70 hover:border-blue-400 shadow-3xs flex flex-col items-center justify-center text-center active-scale transition-all"
                              >
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-1.5 shrink-0 text-blue-600 font-mono">
                                  <Calendar className="w-4 h-4" />
                                </div>
                                <span className="text-[11px] font-bold text-slate-800 leading-snug font-sans">Book Appointment</span>
                                <span className="text-[8px] text-slate-400 font-semibold mt-0.5 font-mono">12 специалистов</span>
                              </button>

                              <button
                                onClick={() => { setActiveTab('more'); showToast('Offline medical histories retrieved safely'); }}
                                className="bg-white p-3.5 rounded-3xl border border-slate-200/70 hover:border-blue-400 shadow-3xs flex flex-col items-center justify-center text-center active-scale transition-all"
                              >
                                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-1.5 shrink-0 text-emerald-600">
                                  <FileText className="w-4 h-4 font-mono" />
                                </div>
                                <span className="text-[11px] font-bold text-slate-800 leading-snug font-sans">My Medical Records</span>
                                <span className="text-[8px] text-slate-400 font-semibold mt-0.5 font-mono">2 Active Rows</span>
                              </button>

                              <button
                                onClick={() => { setActiveTab('chat'); }}
                                className="bg-white p-3.5 rounded-3xl border border-slate-200/70 hover:border-blue-400 shadow-3xs flex flex-col items-center justify-center text-center active-scale transition-all"
                              >
                                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center mb-1.5 shrink-0 text-purple-600">
                                  <MessageCircle className="w-4 h-4" />
                                </div>
                                <span className="text-[11px] font-bold text-slate-800 leading-snug font-sans">Chat Assistants</span>
                                <span className="text-[8px] text-slate-400 font-semibold mt-0.5 font-mono">Instant bot</span>
                              </button>

                              <button
                                onClick={() => { setActiveTab('more'); showToast('Directory inquiry section opened'); }}
                                className="bg-white p-3.5 rounded-3xl border border-slate-200/70 hover:border-blue-400 shadow-3xs flex flex-col items-center justify-center text-center active-scale transition-all"
                              >
                                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mb-1.5 shrink-0 text-amber-600">
                                  <HelpCircle className="w-4 h-4 font-mono" />
                                </div>
                                <span className="text-[11px] font-bold text-slate-800 leading-snug font-sans">Send Inquiry</span>
                                <span className="text-[8px] text-slate-400 font-semibold mt-0.5 font-mono">Feedback desk</span>
                              </button>
                            </div>

                            {/* Recent Registered Appointments Status */}
                            <div className="bg-white p-3.5 rounded-3xl border border-slate-200/80 shadow-3xs space-y-2.5">
                              <div className="flex justify-between items-center select-none animate-fade-in">
                                <span className="text-[9px] text-[#006b5a] font-extrabold uppercase font-mono">
                                  Active Appointment Schedule
                                </span>
                                <span className="text-[9px] text-slate-400 font-extrabold">{appointmentsTable.length} Booked</span>
                              </div>
                              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-0.5">
                                {appointmentsTable.map((ap) => {
                                  const doc = dentistsTable.find(d => d.id === ap.dentist_id);
                                  return (
                                    <div key={ap.id} className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex items-center justify-between gap-3 text-xs font-sans">
                                      <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 bg-blue-100 text-[#0058bc] rounded-full flex items-center justify-center font-extrabold text-[10px]">
                                          {ap.time.substring(0, 2)}
                                        </div>
                                        <div>
                                          <h5 className="font-extrabold text-[11px] text-slate-800 font-headline">{doc?.name || 'Dr. Specialist'}</h5>
                                          <p className="text-[9px] text-slate-400 font-mono">{ap.date} &bull; {ap.time}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <span className={`px-2 py-0.5 rounded-full text-[8px] uppercase tracking-wider font-mono font-extrabold ${
                                          ap.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
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
                  <div className="animate-fade-in p-4 space-y-4">
                    <div className="flex justify-between items-center select-none">
                      <h3 className="font-headline font-extrabold text-sm text-slate-900">
                        {t.doctorsList}
                      </h3>
                      <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                        {filteredDentists.length} Active specialists
                      </span>
                    </div>

                    {/* Filter specialties pills */}
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
                          onClick={() => setActiveDoctorFilter(p.key)}
                          className={`flex-none font-bold text-[10px] px-3 py-1 rounded-full transition-all active-scale ${activeDoctorFilter === p.key ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>

                    {/* Horizontal slider of Featured Specialists */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">
                          {t.topSpecialists}
                        </span>
                      </div>
                      
                      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 pt-1 select-none">
                        {dentistsTable.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex-none w-36 bg-white border border-slate-200/60 p-3 rounded-2xl shadow-xs text-center relative group"
                          >
                            <button
                              onClick={() => handleToggleFavoriteDoc(doc.id)}
                              className="absolute top-1.5 right-1.5 p-1 bg-slate-50 hover:bg-slate-100 text-slate-300 hover:text-red-500 rounded-full transition-transform active-scale z-10"
                            >
                              <Heart
                                className={`w-3.5 h-3.5 ${favoritesTable.some(f => f.dentist_id === doc.id) ? 'fill-red-500 text-red-500' : ''}`}
                              />
                            </button>

                            <div className="relative w-16 h-16 mx-auto mb-2">
                              <img
                                src={doc.image}
                                alt={doc.name}
                                className="w-full h-full object-cover rounded-full border-2 border-emerald-500/35 shadow-xs"
                              />
                              <span className="absolute bottom-0 right-0 h-4 w-4 bg-emerald-500 text-white rounded-full flex items-center justify-center border-2 border-white text-[8px]">
                                ✓
                              </span>
                            </div>

                            <h5 className="font-bold text-[11px] text-slate-800 leading-tight truncate">
                              {doc.name}
                            </h5>
                            <p className="text-[9px] text-slate-400 truncate mb-2">
                              {doc.title}
                            </p>

                            <button
                              onClick={() => {
                                setSelectedDoctorForBooking(doc);
                                showToast(`Appointment drawer loaded for ${doc.name}`);
                              }}
                              className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-extrabold text-[10px] py-1 rounded-full transition-colors active-scale"
                            >
                              Book Doc
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Search result lists */}
                    <div className="space-y-3">
                      {filteredDentists.map((doc) => {
                        const isFav = favoritesTable.some(f => f.dentist_id === doc.id);
                        return (
                          <div
                            key={doc.id}
                            className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center gap-3 relative hover:border-slate-300 transition-colors"
                          >
                            <img
                              src={doc.image}
                              alt={doc.name}
                              className="w-16 h-16 rounded-xl object-cover border border-slate-100 shadow-xs shrink-0"
                            />

                            <div className="flex-1 min-w-0 space-y-0.5">
                              <div className="flex items-center gap-1">
                                <h4 className="font-bold text-xs text-slate-900 truncate">
                                  {doc.name}
                                </h4>
                                <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                              </div>
                              <p className="text-[10px] text-emerald-600 font-semibold">
                                {doc.title}
                              </p>
                              <p className="text-[10px] text-slate-400 line-clamp-1 pr-4">
                                {doc.bio}
                              </p>
                              <div className="flex items-center gap-1 pt-1 text-[10px]">
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <span className="font-bold text-slate-800">{doc.rating || '4.9'}</span>
                                <span className="text-slate-400">({doc.reviews_count || '120'} reviews)</span>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1 shrink-0 justify-end h-full">
                              <button
                                onClick={() => handleToggleFavoriteDoc(doc.id)}
                                className={`p-1.5 rounded-full border border-slate-100 active-scale ${isFav ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-slate-50 text-slate-400 hover:text-rose-500'}`}
                              >
                                <Heart className="w-3.5 h-3.5 fill-current" />
                              </button>
                              <button
                                onClick={() => setSelectedDoctorForBooking(doc)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-3 py-1 px-4 py-1.5 rounded-full active-scale"
                              >
                                Book
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
                            const teethWhitening = servicesTable.find(s => s.id === 1);
                            if (teethWhitening) setSelectedServiceDetail(teethWhitening);
                          }}
                          className="w-fit bg-white text-blue-900 text-[10px] font-bold px-3 py-1 rounded-full active-scale"
                        >
                          {t.learnMore}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mb-1 select-none">
                      <h4 className="font-headline font-bold text-xs text-slate-800">
                        {t.ourServices}
                      </h4>
                      <button
                        onClick={() => setSelectedCategoryFilter(null)}
                        className="text-blue-600 font-bold text-[10px] hover:underline"
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
                          className={`p-3.5 rounded-2xl border transition-all active-scale cursor-pointer ${selectedCategoryFilter === cat.id ? 'bg-blue-600 text-white border-blue-500 shadow-md' : 'bg-white text-slate-800 border-slate-200/70 shadow-xs hover:border-slate-300'}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="material-symbols-outlined text-2xl text-blue-600">
                              {cat.icon}
                            </span>
                            <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full ${selectedCategoryFilter === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                              {cat.total_clicks} UI clicks
                            </span>
                          </div>
                          <h4 className="font-bold text-[11px] leading-snug">{cat.name}</h4>
                          <p className={`text-[9px] line-clamp-2 mt-1 leading-normal ${selectedCategoryFilter === cat.id ? 'text-blue-100' : 'text-slate-400'}`}>
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
                          className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center justify-between gap-3 active-scale cursor-pointer hover:border-slate-300"
                          onClick={() => setSelectedServiceDetail(srv)}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={srv.image}
                              alt={srv.name}
                              className="w-12 h-12 object-cover rounded-xl border border-slate-100 shrink-0"
                            />
                            <div>
                              <h5 className="font-bold text-xs text-slate-950">{srv.name}</h5>
                              <p className="text-[10px] text-slate-400 line-clamp-1">{srv.description}</p>
                              <div className="flex items-center gap-2 mt-1 select-none">
                                <span className="bg-emerald-50 text-emerald-700 font-bold text-[9px] px-2 py-0.5 rounded-md">
                                  ${srv.price}
                                </span>
                                {srv.warranty_months > 0 && (
                                  <span className="bg-slate-100 text-slate-500 font-mono text-[9px] px-1.5 py-0.5 rounded-md">
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
                    <div className="flex justify-between items-center bg-blue-50 border border-blue-100 px-3 py-2 rounded-2xl mb-3 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[11px] font-bold text-blue-800">Support Representative Active</span>
                      </div>
                      <span className="text-[9px] text-slate-400">Response time: &lt; 2 minutes</span>
                    </div>

                    {/* Simulated Message stream */}
                    <div className="flex-1 overflow-y-auto space-y-3 pb-3 pr-1 hide-scrollbar">
                      {chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex flex-col max-w-[240px] space-y-1 ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                        >
                          <div className={`p-2.5 rounded-2xl text-xs font-medium ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-tl-none'}`}>
                            {msg.text}
                          </div>
                          <span className="text-[9px] text-slate-400 px-1">{msg.time}</span>
                        </div>
                      ))}
                    </div>

                    {/* Preconfigured smart clinical queries */}
                    <div className="py-2 flex flex-wrap gap-1.5 shrink-0 select-none">
                      <button
                        onClick={() => handleSendMessage("Do you have active laser teeth whitening discounts available?")}
                        className="bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 font-bold text-[9px] py-1 px-2.5 rounded-full"
                      >
                        🏷️ Discount Pricing?
                      </button>
                      <button
                        onClick={() => handleSendMessage("How much do orthodontic aligners cost in Erbil?")}
                        className="bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 font-bold text-[9px] py-1 px-2.5 rounded-full"
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
                        className="flex-1 px-3.5 py-1.5 bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-xl text-xs"
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
                  <div className="animate-fade-in p-4 space-y-4">
                    
                    {/* Active Promos list */}
                    <div className="space-y-2 select-none">
                      <h4 className="font-headline font-bold text-xs text-slate-800">
                        {t.promosHeader}
                      </h4>
                      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                        {offersTable.map((off) => (
                          <div
                            key={off.id}
                            className="flex-none w-64 h-36 rounded-2xl overflow-hidden relative shadow-xs"
                          >
                            <img
                              src={off.image}
                              alt={off.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 to-transparent flex flex-col justify-end p-3">
                              <span className="bg-[#54f8d7] text-[#005143] text-[9px] font-extrabold px-2 py-0.5 rounded-full w-fit uppercase mb-1">
                                {off.discount}
                              </span>
                              <h5 className="text-white font-bold text-xs">{off.title}</h5>
                              <p className="text-slate-200 text-[10px] line-clamp-1">{off.description}</p>
                              <span className="text-[8px] text-slate-400 mt-1 font-mono">Expires {off.expiry_date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Patient Notifications Panel */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                          <Bell className="w-4.5 h-4.5 text-blue-600" />
                          Inbox Notifications
                        </span>
                        <button
                          onClick={() => {
                            setNotificationsTable(prev => prev.map(n => ({ ...n, is_read: true })));
                            showToast('Marked all as read');
                          }}
                          className="text-[10px] text-slate-400 hover:text-slate-500 font-semibold"
                        >
                          Clear Badges
                        </button>
                      </div>

                      <div className="space-y-2 max-h-36 overflow-y-auto pr-1 hide-scrollbar">
                        {notificationsTable.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-2.5 rounded-xl text-xs flex justify-between gap-2 border ${notif.is_read ? 'bg-slate-50 border-slate-100' : 'bg-cyan-50/40 border-cyan-100'}`}
                          >
                            <div className="space-y-0.5 text-[11px]">
                              <p className="font-bold text-slate-800">{notif.title}</p>
                              <p className="text-slate-500 leading-normal">{notif.message}</p>
                              <span className="text-[9px] text-slate-400 block font-mono">{notif.date.slice(11,16)}</span>
                            </div>
                            <button
                              onClick={() => handleDeleteRow('notifications', notif.id)}
                              className="text-slate-300 hover:text-rose-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonials */}
                    <div className="space-y-2 select-none">
                      <h4 className="font-headline font-bold text-xs text-slate-800">
                        {t.testimonialsHeader}
                      </h4>
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 italic relative">
                        <p className="text-[11px] text-slate-600 leading-relaxed pr-6">
                          "The digital tooth scanning was incredible. I've never felt so comfortable at a dentist before. Highly recommended for nervous patients!"
                        </p>
                        <div className="mt-3 flex items-center gap-2 not-italic">
                          <div className="w-7 h-7 rounded-full bg-[#58fbda] text-[#00201a] font-bold text-xs flex items-center justify-center shadow-xs">
                            RA
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-slate-800">Rawand Aziz</p>
                            <div className="flex text-amber-400 text-[8px]">
                              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Amenities list */}
                    <div className="space-y-2 select-none">
                      <h4 className="font-headline font-bold text-xs text-slate-800">
                        {t.amenitiesHeader}
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white border border-slate-100 rounded-xl p-2.5 flex items-center gap-2 shadow-xs">
                          <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                          <div>
                            <h5 className="font-bold text-[10px] text-slate-800">High-Tech Lab</h5>
                            <p className="text-[8px] text-slate-400">Precision imaging</p>
                          </div>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-xl p-2.5 flex items-center gap-2 shadow-xs">
                          <Smile className="w-4 h-4 text-[#006b5a] shrink-0" />
                          <div>
                            <h5 className="font-bold text-[10px] text-slate-800">Kids Friendly</h5>
                            <p className="text-[8px] text-slate-400">Anxiety-free zone</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Contact Form backing the contacts table */}
                    <div className="bg-white border border-cyan-100/50 rounded-2xl p-4 p-md space-y-3">
                      <h4 className="font-headline font-bold text-xs text-blue-900 border-b border-slate-100 pb-2">
                        {t.contactUs}
                      </h4>
                      
                      <form onSubmit={handleContactSubmit} className="space-y-2.5">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">Name *</label>
                          <input
                            type="text"
                            placeholder="e.g. Karwan Majid"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 rounded-xl text-xs"
                          />
                        </div>

                        <div className="space-y-1 font-sans">
                          <label className="text-[10px] font-bold text-slate-500">Phone *</label>
                          <input
                            type="text"
                            placeholder="e.g. +964 750 123 4567"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 rounded-xl text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">How can we assist you?</label>
                          <select
                            value={contactForm.reason}
                            onChange={(e) => setContactForm({ ...contactForm, reason: e.target.value })}
                            className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 focus:ring-1 rounded-xl text-xs"
                          >
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Severe Tooth Pain">Severe Tooth Pain</option>
                            <option value="Veneers / Whitening quote">Veneers / Whitening quote</option>
                            <option value="Orthodontic Scanner booking">Orthodontic Scanner booking</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">Message</label>
                          <textarea
                            placeholder="Detailed messages or callback timing preferences..."
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            rows={2}
                            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 rounded-xl text-xs"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 bg-gradient-to-tr from-blue-600 to-cyan-500 hover:opacity-95 text-white text-xs font-bold rounded-xl shadow-xs active-scale"
                        >
                          Submit Directory Query
                        </button>
                      </form>
                    </div>
                  </div>
                )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Emulator Interactive Android Bottom Navbar */}
              <nav className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-[0_-4px_15px_rgba(0,122,255,0.06)] h-16 border-t border-slate-100 flex justify-around items-center px-2 pb-safe select-none z-50">
                <button
                  onClick={() => { setActiveTab('clinics'); setSearchQuery(''); }}
                  className={`relative flex flex-col items-center justify-center pb-1 px-3 py-2 transition-all active-scale z-10 ${activeTab === 'clinics' ? 'text-blue-600 font-bold' : 'text-[#414755] hover:text-[#181c1c]'}`}
                >
                  {activeTab === 'clinics' && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-blue-500/10 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Home className="w-5 h-5 animate-pulse" />
                  <span className="text-[9px] font-bold mt-0.5">{t.clinicsTab}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('doctors'); setSearchQuery(''); }}
                  className={`relative flex flex-col items-center justify-center pb-1 px-3 py-2 transition-all active-scale z-10 ${activeTab === 'doctors' ? 'text-blue-600 font-bold' : 'text-[#414755] hover:text-[#181c1c]'}`}
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
                  className={`relative flex flex-col items-center justify-center pb-1 px-3 py-2 transition-all active-scale z-10 ${activeTab === 'services' ? 'text-blue-600 font-bold' : 'text-[#414755] hover:text-[#181c1c]'}`}
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
                  className={`relative flex flex-col items-center justify-center pb-1 px-3 py-2 transition-all active-scale z-10 ${activeTab === 'chat' ? 'text-blue-600 font-bold' : 'text-[#414755] hover:text-[#181c1c]'}`}
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
                  className={`relative flex flex-col items-center justify-center pb-1 px-3 py-2 transition-all active-scale z-10 ${activeTab === 'more' ? 'text-blue-600 font-bold' : 'text-[#414755] hover:text-[#181c1c]'}`}
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
                    className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-end z-[60]"
                  >
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ type: "spring", damping: 25, stiffness: 220 }}
                      className="bg-white rounded-t-[32px] w-full p-5 space-y-4 max-h-[90%] overflow-y-auto"
                    >
                      <div className="flex justify-between items-center select-none">
                        <h4 className="font-headline font-extrabold text-sm text-slate-800">
                          {t.bookAppointment}
                        </h4>
                        <button
                          onClick={() => setSelectedDoctorForBooking(null)}
                          className="bg-slate-100 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 bg-blue-50 border border-blue-100/60 p-3 rounded-2xl select-none">
                        <img
                          src={selectedDoctorForBooking.image}
                          alt={selectedDoctorForBooking.name}
                          className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-xs"
                        />
                        <div>
                          <h5 className="font-bold text-xs text-slate-900">{selectedDoctorForBooking.name}</h5>
                          <p className="text-[10px] text-blue-600 font-bold">{selectedDoctorForBooking.title}</p>
                        </div>
                      </div>

                      <form onSubmit={handleBookAppointmentSubmit} className="space-y-3 font-sans">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">Pick Target Date</label>
                          <input
                            type="date"
                            value={bookingForm.date}
                            onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-xl text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">Preferred Time Slot</label>
                          <select
                            value={bookingForm.time}
                            onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                            className="w-full px-2 py-2 bg-slate-50 border border-slate-200 focus:ring-1 rounded-xl text-xs"
                          >
                            <option value="09:00 AM">09:00 AM (Early Slot)</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="11:30 AM">11:30 AM</option>
                            <option value="01:00 PM">01:00 PM (Afternoon checkup)</option>
                            <option value="03:30 PM">03:30 PM</option>
                            <option value="05:00 PM">05:00 PM (Late slot)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">Special Requests / Symptoms</label>
                          <textarea
                            placeholder="e.g. Extreme crown sensitivity, clear aligners discussion scan, checkup status..."
                            value={bookingForm.notes}
                            onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                            rows={2}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 rounded-xl text-xs font-medium"
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
                    className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-end z-[60]"
                  >
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ type: "spring", damping: 25, stiffness: 220 }}
                      className="bg-white rounded-t-[32px] w-full p-5 space-y-4 max-h-[90%] overflow-y-auto"
                    >
                      <div className="flex justify-between items-center select-none">
                        <h4 className="font-headline font-extrabold text-sm text-slate-800">
                          Service Detail
                        </h4>
                        <button
                          onClick={() => setSelectedServiceDetail(null)}
                          className="bg-slate-100 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <img
                        src={selectedServiceDetail.image}
                        alt={selectedServiceDetail.name}
                        className="w-full h-32 rounded-2xl object-cover shadow-xs border border-slate-100"
                      />

                      <div className="space-y-2">
                        <h3 className="font-headline font-extrabold text-[#0058bc] text-sm tracking-tight leading-snug">
                          {selectedServiceDetail.name}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed leading-normal">
                          {selectedServiceDetail.description}
                        </p>

                        <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 text-xs text-slate-505 select-none font-sans">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400 font-bold">Standard Price:</span>
                            <span className="text-emerald-700 font-bold">${selectedServiceDetail.price} USD</span>
                          </div>
                          {selectedServiceDetail.discount_price && selectedServiceDetail.discount_price > 0 && (
                            <div className="flex justify-between text-[11px] bg-cyan-100/40 p-1 rounded">
                              <span className="text-cyan-800 font-bold">Promo Price:</span>
                              <span className="text-cyan-800 font-bold">${selectedServiceDetail.discount_price} USD</span>
                            </div>
                          )}
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400 font-bold font-sans">Target Audience:</span>
                            <span className="text-slate-700 font-bold">{selectedServiceDetail.target_audience || 'All patients'}</span>
                          </div>
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400 font-bold">Clinical Warranty:</span>
                            <span className="text-slate-700 font-bold">{selectedServiceDetail.warranty_months > 0 ? `${selectedServiceDetail.warranty_months} Months` : 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400 font-semibold font-sans">Consultation Required:</span>
                            <span className="text-slate-700 font-semibold">{selectedServiceDetail.requires_consultation ? 'Yes (Full Radiography)' : 'No (Direct entry allowed)'}</span>
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

            </div>
          </div>
          </div>
        </section>

        {/* ================= COLUMN 2: SUPABASE LIVE Persisted DATABASE INSPECTOR (Col-span-7) ================= */}
        {viewMode === 'dual' && (
          <section className="col-span-1 lg:col-span-12 xl:col-span-7 bg-[#161b22] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Inspector Header with Tab choices */}
          <div className="bg-slate-900 border-b border-slate-800 p-4 select-none">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-sm text-slate-100 flex items-center gap-2">
                    Supabase DB Inspector
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-emerald-400 font-mono font-normal">
                      Postgres engine ACTIVE
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-sans">
                    Monitor live transaction inserts, clicks, and appointments written in real-time
                  </p>
                </div>
              </div>

              {/* Admin simulated operation trigger */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const seedApp = appointmentsTable[0];
                    if (seedApp && seedApp.status === 'pending') {
                      handleAdminApproveAppointment(seedApp.id);
                    } else {
                      showToast('First row already approved, select of emulator to write a new pending appointment!');
                    }
                  }}
                  className="bg-emerald-600 text-white font-sans text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-500 hover:bg-emerald-700 transition-colors active-scale flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5 text-white" />
                  Simulate Admin Confirmation
                </button>
              </div>
            </div>

            {/* List of 12 Tables conforming to Supabase database scheme script */}
            <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pt-4 select-none">
              {[
                { id: 'appointments', label: 'appointments (RLS)', rows: appointmentsTable.length },
                { id: 'contacts', label: 'contacts (RLS)', rows: contactsTable.length },
                { id: 'favorites', label: 'favorites (RLS)', rows: favoritesTable.length },
                { id: 'notifications', label: 'notifications (RLS)', rows: notificationsTable.length },
                { id: 'clinics', label: 'clinics (Public Read)', rows: clinicsTable.length },
                { id: 'dentists', label: 'dentists (Public Read)', rows: dentistsTable.length },
                { id: 'services', label: 'services (Public Read)', rows: servicesTable.length },
                { id: 'offers', label: 'offers (Public Read)', rows: offersTable.length },
                { id: 'categories', label: 'categories', rows: categoriesTable.length },
                { id: 'sub_categories', label: 'sub_categories', rows: subCategoriesTable.length },
                { id: 'media', label: 'media', rows: mediaTable.length }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setInspectorActiveTable(t.id)}
                  className={`flex-none font-mono text-[10px] px-3 py-1.5 rounded-md transition-all ${inspectorActiveTable === t.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold' : 'bg-slate-800/60 text-slate-400 border border-transparent hover:bg-slate-800'}`}
                >
                  📁 {t.label}
                  <span className="ml-1 bg-slate-900 border border-slate-700 px-1 py-0.2 rounded font-sans font-normal text-slate-300">
                    {t.rows}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Row Spreadsheet visualization conforming with schema column specs */}
          <div className="p-4 overflow-x-auto bg-[#0d1117] min-h-[360px] max-h-[460px] overflow-y-auto">
            {/* Table headers and rows */}
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[10px] select-none">
                  {inspectorActiveTable === 'appointments' && (
                    <>
                      <th className="py-2 px-3">id (BigSerial)</th>
                      <th className="py-2 px-3">user_id</th>
                      <th className="py-2 px-3">clinic_id</th>
                      <th className="py-2 px-3">dentist_id</th>
                      <th className="py-2 px-3">date (Date)</th>
                      <th className="py-2 px-3">time (Time)</th>
                      <th className="py-2 px-3">status</th>
                      <th className="py-2 px-3">created_at</th>
                      <th className="py-2 px-3 text-right">Actions</th>
                    </>
                  )}
                  {inspectorActiveTable === 'contacts' && (
                    <>
                      <th className="py-2 px-3">id</th>
                      <th className="py-2 px-3">name</th>
                      <th className="py-2 px-3 font-sans">phone</th>
                      <th className="py-2 px-3">message</th>
                      <th className="py-2 px-3">reason</th>
                      <th className="py-2 px-3">call_time</th>
                      <th className="py-2 px-3">status</th>
                      <th className="py-2 px-3">source</th>
                      <th className="py-2 px-3 text-right">Actions</th>
                    </>
                  )}
                  {inspectorActiveTable === 'favorites' && (
                    <>
                      <th className="py-2 px-3">id</th>
                      <th className="py-2 px-3">user_id</th>
                      <th className="py-2 px-3">clinic_id</th>
                      <th className="py-2 px-3">dentist_id</th>
                      <th className="py-2 px-3">notes</th>
                      <th className="py-2 px-3 select-none">created_at</th>
                      <th className="py-2 px-3 text-right">Actions</th>
                    </>
                  )}
                  {inspectorActiveTable === 'notifications' && (
                    <>
                      <th className="py-2 px-3">id</th>
                      <th className="py-2 px-3">user_id</th>
                      <th className="py-2 px-3">title</th>
                      <th className="py-2 px-3">message</th>
                      <th className="py-2 px-3 text-center">is_read</th>
                      <th className="py-2 px-3">type</th>
                      <th className="py-2 px-3">date</th>
                      <th className="py-2 px-3 text-right">Actions</th>
                    </>
                  )}
                  {inspectorActiveTable === 'clinics' && (
                    <>
                      <th className="py-2 px-3">id</th>
                      <th className="py-2 px-3">name</th>
                      <th className="py-2 px-3">phone</th>
                      <th className="py-2 px-3">address</th>
                      <th className="py-2 px-3">logo_url</th>
                      <th className="py-2 px-3">cover_url</th>
                      <th className="py-2 px-3">created_at</th>
                    </>
                  )}
                  {inspectorActiveTable === 'dentists' && (
                    <>
                      <th className="py-2 px-3">id</th>
                      <th className="py-2 px-3">clinic_id</th>
                      <th className="py-2 px-3">name</th>
                      <th className="py-2 px-3">title</th>
                      <th className="py-2 px-3">bio</th>
                      <th className="py-2 px-3">image_url</th>
                      <th className="py-2 px-3">created_at</th>
                    </>
                  )}
                  {inspectorActiveTable === 'services' && (
                    <>
                      <th className="py-2 px-3">id</th>
                      <th className="py-2 px-3">name</th>
                      <th className="py-2 px-3">price</th>
                      <th className="py-2 px-3">duration (min)</th>
                      <th className="py-2 px-3">warranty_months</th>
                      <th className="py-2 px-3">consultation_required</th>
                      <th className="py-2 px-3">is_available</th>
                    </>
                  )}
                  {inspectorActiveTable === 'offers' && (
                    <>
                      <th className="py-2 px-3">id</th>
                      <th className="py-2 px-3">clinic_id</th>
                      <th className="py-2 px-3">title</th>
                      <th className="py-2 px-3">discount</th>
                      <th className="py-2 px-3">expiry_date</th>
                      <th className="py-2 px-3">image_path</th>
                    </>
                  )}
                  {inspectorActiveTable === 'categories' && (
                    <>
                      <th className="py-2 px-3">id</th>
                      <th className="py-2 px-3">name</th>
                      <th className="py-2 px-3">slug</th>
                      <th className="py-2 px-3">total_clicks</th>
                      <th className="py-2 px-3">is_active</th>
                    </>
                  )}
                  {inspectorActiveTable === 'sub_categories' && (
                    <>
                      <th className="py-2 px-3">id</th>
                      <th className="py-2 px-3">category_id</th>
                      <th className="py-2 px-3">name</th>
                      <th className="py-2 px-3">is_featured</th>
                      <th className="py-2 px-3">created_at</th>
                    </>
                  )}
                  {inspectorActiveTable === 'media' && (
                    <>
                      <th className="py-2 px-3">id</th>
                      <th className="py-2 px-3">clinic_id</th>
                      <th className="py-2 px-3">file_path</th>
                      <th className="py-2 px-3">file_type</th>
                      <th className="py-2 px-3">dimensions</th>
                      <th className="py-2 px-3">is_public</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {/* RENDERING APPOINTMENTS */}
                {inspectorActiveTable === 'appointments' && appointmentsTable.map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors text-slate-300 hover:bg-slate-800/20 ${highlightedRowId === `appointments-${row.id}` ? 'bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/30' : ''}`}
                  >
                    <td className="py-3 px-3 font-semibold text-emerald-400">#{row.id}</td>
                    <td className="py-3 px-3">user_{row.user_id}</td>
                    <td className="py-3 px-3">clinic_{row.clinic_id}</td>
                    <td className="py-3 px-3">dentist_{row.dentist_id || 'NULL'}</td>
                    <td className="py-3 px-3 text-slate-200">{row.date}</td>
                    <td className="py-3 px-3 font-mono">{row.time}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${row.status === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[10px] text-slate-500">{row.created_at.slice(0, 10)}</td>
                    <td className="py-3 px-3 text-right space-x-1 whitespace-nowrap">
                      {row.status === 'pending' && (
                        <button
                          onClick={() => handleAdminApproveAppointment(row.id)}
                          className="px-2 py-1 bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600 hover:text-white rounded text-[10px] font-bold"
                        >
                          Confirm
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteRow('appointments', row.id)}
                        className="p-1 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded"
                        title="Delete query row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* RENDERING CONTACTS TABLE */}
                {inspectorActiveTable === 'contacts' && contactsTable.map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors hover:bg-slate-800/10 ${highlightedRowId === `contacts-${row.id}` ? 'bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/30' : ''}`}
                  >
                    <td className="py-3 px-3 font-semibold text-emerald-400">#{row.id}</td>
                    <td className="py-3 px-3 font-sans text-slate-200 font-medium">{row.name}</td>
                    <td className="py-3 px-3 select-all tracking-wider text-slate-300 font-sans">{row.phone}</td>
                    <td className="py-3 px-3 text-[11px] text-slate-400 max-w-[150px] truncate" title={row.message}>{row.message}</td>
                    <td className="py-3 px-3 text-cyan-400">{row.contact_reason}</td>
                    <td className="py-3 px-3 text-slate-400 text-[10px]">{row.preferred_call_time || 'Anytime'}</td>
                    <td className="py-3 px-3">
                      <span className="bg-blue-950 text-blue-400 border border-blue-800 px-2 py-0.5 rounded-full text-[9px] uppercase font-bold">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500 text-[10px]">{row.source || 'advert'}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleDeleteRow('contacts', row.id)}
                        className="p-1 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* RENDERING FAVORITES */}
                {inspectorActiveTable === 'favorites' && favoritesTable.map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors hover:bg-slate-800/10 ${highlightedRowId === `favorites-${row.id}` ? 'bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/30' : ''}`}
                  >
                    <td className="py-3 px-3 font-semibold text-emerald-400">#{row.id}</td>
                    <td className="py-3 px-3">user_{row.user_id}</td>
                    <td className="py-3 px-3 text-slate-400">{row.clinic_id ? `clinic_${row.clinic_id}` : 'NULL'}</td>
                    <td className="py-3 px-3 font-sans text-amber-500">{row.dentist_id ? `dentist_${row.dentist_id}` : 'NULL'}</td>
                    <td className="py-3 px-3 text-[11px] text-slate-400 max-w-[140px] truncate" title={row.notes}>{row.notes || 'NULL'}</td>
                    <td className="py-3 px-3 text-slate-500 text-[10px] select-all">{row.created_at.slice(0, 10)}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleDeleteRow('favorites', row.id)}
                        className="p-1 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* RENDERING NOTIFICATIONS */}
                {inspectorActiveTable === 'notifications' && notificationsTable.map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors hover:bg-slate-800/10 ${highlightedRowId === `notifications-${row.id}` ? 'bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/30' : ''}`}
                  >
                    <td className="py-3 px-3 font-semibold text-emerald-400">#{row.id}</td>
                    <td className="py-3 px-3">user_{row.user_id}</td>
                    <td className="py-3 px-3 font-bold text-slate-200">{row.title}</td>
                    <td className="py-3 px-3 text-slate-400 select-all max-w-[180px] truncate" title={row.message}>{row.message}</td>
                    <td className="py-3 px-3 text-center">{row.is_read ? 'true' : 'false'}</td>
                    <td className="py-3 px-3"><span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">{row.type}</span></td>
                    <td className="py-3 px-3 text-slate-500 text-[10px]">{row.date.slice(11, 16)}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleDeleteRow('notifications', row.id)}
                        className="p-1 hover:text-rose-500 hover:bg-rose-500/10 rounded text-slate-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* RENDERING CLINICS */}
                {inspectorActiveTable === 'clinics' && clinicsTable.map((row) => (
                  <tr key={row.id} className="text-slate-300 hover:bg-slate-800/10 transition-colors">
                    <td className="py-3 px-3 font-semibold text-emerald-400">#{row.id}</td>
                    <td className="py-3 px-3 font-sans font-bold text-slate-100">{row.name}</td>
                    <td className="py-3 px-3 text-slate-300 font-sans tracking-tight">{row.phone}</td>
                    <td className="py-3 px-3 text-slate-400 font-sans text-[11px]">{row.address}</td>
                    <td className="py-3 px-3 max-w-[124px] truncate text-[9px] text-[#2cdebf]">{row.logo}</td>
                    <td className="py-3 px-3 max-w-[124px] truncate text-[9px] text-slate-500">{row.cover_image}</td>
                    <td className="py-3 px-3 text-slate-600 text-[10px]">{row.created_at.slice(0, 10)}</td>
                  </tr>
                ))}

                {/* RENDERING DENTISTS */}
                {inspectorActiveTable === 'dentists' && dentistsTable.map((row) => (
                  <tr key={row.id} className="text-slate-300 hover:bg-slate-800/10 transition-colors">
                    <td className="py-3 px-3 font-semibold text-emerald-400">#{row.id}</td>
                    <td className="py-3 px-3 text-slate-400">clinic_{row.clinic_id}</td>
                    <td className="py-3 px-3 font-sans font-bold text-slate-200">{row.name}</td>
                    <td className="py-3 px-3 text-cyan-400 font-semibold">{row.title}</td>
                    <td className="py-3 px-3 text-slate-400 max-w-[130px] truncate text-[11px]">{row.bio}</td>
                    <td className="py-3 px-3 max-w-[100px] truncate text-[9px] text-slate-500">{row.image}</td>
                    <td className="py-3 px-3 text-slate-600 text-[10px]">{row.created_at.slice(0, 10)}</td>
                  </tr>
                ))}

                {/* RENDERING SERVICES */}
                {inspectorActiveTable === 'services' && servicesTable.map((row) => (
                  <tr key={row.id} className="text-slate-200 hover:bg-slate-800/10 transition-colors">
                    <td className="py-3 px-3 font-semibold text-emerald-400">#{row.id}</td>
                    <td className="py-3 px-3 font-bold font-sans">{row.name}</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">${row.price} USD</td>
                    <td className="py-3 px-3">{row.duration} minutes</td>
                    <td className="py-3 px-3">{row.warranty_months} m</td>
                    <td className="py-3 px-3 text-amber-500">{row.requires_consultation ? 'true' : 'false'}</td>
                    <td className="py-3 px-3">{row.is_available ? 'true' : 'false'}</td>
                  </tr>
                ))}

                {/* RENDERING OFFERS */}
                {inspectorActiveTable === 'offers' && offersTable.map((row) => (
                  <tr key={row.id} className="text-slate-300 hover:bg-slate-800/10">
                    <td className="py-3 px-3 font-semibold text-emerald-400">#{row.id}</td>
                    <td className="py-3 px-3">clinic_{row.clinic_id}</td>
                    <td className="py-3 px-3 font-bold text-slate-200 font-sans">{row.title}</td>
                    <td className="py-3 px-3 text-[#2cdebf] font-bold text-[10px]">{row.discount}</td>
                    <td className="py-3 px-3 text-amber-400 font-mono text-[11px]">{row.expiry_date}</td>
                    <td className="py-3 px-3 max-w-[140px] truncate text-[9px] text-slate-500">{row.image}</td>
                  </tr>
                ))}

                {/* RENDERING CATEGORIES */}
                {inspectorActiveTable === 'categories' && categoriesTable.map((row) => (
                  <tr key={row.id} className="text-slate-300 hover:bg-slate-800/10 whitespace-nowrap">
                    <td className="py-3 px-3 font-semibold text-emerald-400">#{row.id}</td>
                    <td className="py-3 px-3 font-sans text-slate-200 font-bold">{row.name}</td>
                    <td className="py-3 px-3 text-slate-400">{row.slug}</td>
                    <td className="py-3 px-3 text-cyan-400 font-bold">{row.total_clicks}</td>
                    <td className="py-3 px-3 text-slate-500">{row.is_active ? 'true' : 'false'}</td>
                  </tr>
                ))}

                {/* RENDERING SUB_CATEGORIES */}
                {inspectorActiveTable === 'sub_categories' && subCategoriesTable.map((row) => (
                  <tr key={row.id} className="text-slate-300 hover:bg-slate-800/10">
                    <td className="py-3 px-3 font-semibold text-emerald-400">#{row.id}</td>
                    <td className="py-3 px-3">category_{row.category_id}</td>
                    <td className="py-3 px-3 font-sans text-slate-200 font-semibold">{row.name}</td>
                    <td className="py-3 px-3 text-cyan-400">{row.is_featured ? 'true' : 'false'}</td>
                    <td className="py-3 px-3 text-slate-600 text-[10px]">{row.created_at.slice(0, 10)}</td>
                  </tr>
                ))}

                {/* RENDERING MEDIA */}
                {inspectorActiveTable === 'media' && mediaTable.map((row) => (
                  <tr key={row.id} className="text-slate-300 hover:bg-slate-800/10">
                    <td className="py-3 px-3 font-semibold text-emerald-400">#{row.id}</td>
                    <td className="py-3 px-3">clinic_{row.clinic_id || 'NULL'}</td>
                    <td className="py-3 px-3 max-w-[180px] truncate text-[10px] text-emerald-400 select-all">{row.file_path}</td>
                    <td className="py-3 px-3 text-slate-400 text-xs">{row.file_type}</td>
                    <td className="py-3 px-3 text-slate-500 text-[11px]">{row.dimensions || 'N/A'}</td>
                    <td className="py-3 px-3 text-slate-500">{row.is_public ? 'true' : 'false'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Database DDL SQL Schema viewer & interactive guides */}
          <div className="bg-slate-900 border-t border-slate-800 p-5 space-y-4">
            <h4 className="font-sans font-bold text-xs text-slate-200 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-emerald-400" />
              Erbil Supabase PostgreSQL Blueprint Schema &amp; Seed Generator
            </h4>

            <div className="text-[11px] text-slate-400 leading-relaxed space-y-2">
              <p>
                When deploying to Supabase, these tables map in a 1-to-1 manner. High reliability constraints (foreign keys, defaults) ensure that relationships are preserved:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li><strong className="text-emerald-400">appointments:</strong> References `users`, `clinics`, and `dentists` with status constraints for high clinical precision.</li>
                <li><strong className="text-emerald-400">favorites:</strong> Facilitates personalized directories for clinical branches or preferred dentists.</li>
                <li><strong className="text-emerald-400 font-mono">Row Level Security (RLS):</strong> Allowed read access for anonymous queries; other tables have targeted authorization keys.</li>
              </ul>
            </div>

            <div className="bg-[#0b0f19] border border-slate-800 p-3 rounded-xl font-mono text-[10px] max-h-48 overflow-y-auto text-slate-400 whitespace-pre">
{`-- Create SQL constraint triggers conforming to your tables
ALTER TABLE appointments ADD CONSTRAINT ch_status CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'));
ALTER TABLE contacts ADD CONSTRAINT ch_contact_status CHECK (status IN ('new', 'in_progress', 'resolved'));

-- Active Row Insertion Payload for Yousif Majid (User #1)
INSERT INTO appointments (user_id, clinic_id, dentist_id, date, time, status)
VALUES (1, ${appointmentsTable[0]?.clinic_id || 1}, ${appointmentsTable[0]?.dentist_id || 1}, '${appointmentsTable[0]?.date || '2026-06-15'}', '${appointmentsTable[0]?.time || '09:30 AM'}', 'pending');`}
            </div>
          </div>
        </section>
        )}

      </main>

      {/* Footer System Credits */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 px-6 text-center text-xs text-slate-600 font-sans">
        <div className="max-w-7xl mx-auto space-y-2 select-none">
          <p className="font-bold tracking-wide text-slate-400">HALA DENT CLINICS DIRECTORY CO.</p>
          <p>© 2026 Erbil Governorate - Hala Dent Clinical Precision System. Autogenerated and deployed conforming with strict custom parameters.</p>
        </div>
      </footer>
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
