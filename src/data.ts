/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, SubCategory, Clinic, Dentist, Service, Offer, Media, Notification } from './types';

export const SEED_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'General Dentistry',
    icon: 'medical_services',
    description: 'Routine checkups, scaling, fillings, and essential oral health maintenance.',
    display_order: 1,
    is_active: true,
    slug: 'general-dentistry',
    banner_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGJXz6_mbNuFGsONq6Hwa6cYsl3WTYt4tkkDT8d2C2atnj9PDNIKYk8FgwQLNp3FfC8LFtrIVM3bjman42Jomp4gRVw7nM236aehvbm2qQa-KJnF70o5Fkx4T8sNFtwR66k13FoexkcLf7rLtsI-XQXBav5fY2GhUdVyGgs_CnuqyIS02BXgqnlmxCr7SbPhcTsCAKeVdsm6NAgOJc_JhlQt-AYctgUH_mf7c2v46v_S4MxTuC-MrrB43K71Eb5nuFlGkfi5RCqw',
    total_clicks: 1450,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Orthodontics',
    icon: 'dentistry',
    description: 'Alignment specialists offering traditional braces and advanced clear aligners.',
    display_order: 2,
    is_active: true,
    slug: 'orthodontics',
    banner_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8PSO8oqmzA2OyrgYB3hyZLuHLU3Wbg2_tmwHFAw9ZIRGOcsIeNYZqJrtRjWCApmoZAHld3xO1iuZZfpcJ_rjwQvHM_uAPOf_odLUatfaznZupM_kc2BGdzVnx7NyzJoQKVvfpZdXqPDSNrGonto1IW5uR3iiBD-msM0WCg3XfwbqWnsGhYUFR4Ug8cJIFd7XVIZI_2KreiMTi8eHXTUo32TZuChgZkjBS1At8a5Bw7fq69H5s1McN3_J9sW6nTHX8ySiAu4CDxg',
    total_clicks: 980,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Dental Implants',
    icon: 'medical_information',
    description: 'Permanent, premium solutions for missing teeth with state-of-the-art prosthetic mapping.',
    display_order: 3,
    is_active: true,
    slug: 'implants',
    banner_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcOssliZyHqZI9rqFPtv_WE1bbX3I1IhiQcTM-T1WekZgLnJRI9JwMOzkNfqLSZ5xiyvpLXMCPT-DsnHgUvJECQkW-hfFzS5xYe4YaTEFzyR18Pf4wQCw2AFMj8_c7TMbVruvoTpcPzsqgmDSD0y14GawmGVTooVHxPaGtD78V7O-blnaMN4ZjjTrqXTZWvKBgaB8XMs2qxF3W-ODGb1IP7kiNvzrJurGDj2gu_OHA4RcSmReiU8k4x7SVPqwMYIXvtcsH3ECsGQ',
    total_clicks: 720,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Cosmetic Dentistry',
    icon: 'mood',
    description: 'Smile enhancement therapies including veneers, whitening, and aesthetic bonding.',
    display_order: 4,
    is_active: true,
    slug: 'cosmetic',
    banner_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCngtXHFUh6vJQ_NPRsu-LdnU_j845tLztGxTJRAZYy5heUGuh_Feg2qeYcrxqFzHzmB_0FXXtPYO8hmMSjL3C1zUp42nP4Umc3ZlcSmIHLhSiwi0XVKO823wlmPKDKSxwF-urdnaruOPWTr5WKzK8oa8fuCEsUvY-_pQiZmkRMiRDshaKWD_oiNaGT337htdR3rMRsU98nSV1MZkPs77fzuvIcjrSVBNoUIZcThMp1G0M6EbFcqBGnK0R3UInOWq_RDWEG1DH1Og',
    total_clicks: 1210,
    created_at: new Date().toISOString()
  }
];

export const SEED_SUB_CATEGORIES: SubCategory[] = [
  {
    id: 1,
    category_id: 1,
    name: 'Professional Cleaning',
    icon: 'clean_hands',
    description: 'Advanced plaque & tartar removal, airflow polishing, and periodontal review.',
    display_order: 1,
    slug: 'professional-cleaning',
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    category_id: 2,
    name: 'Clear Aligners',
    icon: 'verified',
    description: 'Nearly invisible orthodontic shells customized using precision AI orthographic mapping.',
    display_order: 1,
    slug: 'clear-aligners',
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    category_id: 4,
    name: 'Laser Teeth Whitening',
    icon: 'flare',
    description: 'High-intensity precise laser activated tooth shade bleaching.',
    display_order: 1,
    slug: 'laser-whitening',
    is_featured: true,
    created_at: new Date().toISOString()
  }
];

export const SEED_CLINICS: Clinic[] = [
  {
    id: 1,
    name: 'Hala Dent - Erbil Main Square',
    description: 'Our state-of-the-art smart dental facility at Erbil. Equipped with modern European architectural diagnostics, in-house high-tech digital laboratories, and extreme hygienic air sterilization systems.',
    address: 'Gulan Street, Near Dream City, Erbil, Kurdistan',
    phone: '+964 750 123 4567',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcOssliZyHqZI9rqFPtv_WE1bbX3I1IhiQcTM-T1WekZgLnJRI9JwMOzkNfqLSZ5xiyvpLXMCPT-DsnHgUvJECQkW-hfFzS5xYe4YaTEFzyR18Pf4wQCw2AFMj8_c7TMbVruvoTpcPzsqgmDSD0y14GawmGVTooVHxPaGtD78V7O-blnaMN4ZjjTrqXTZWvKBgaB8XMs2qxF3W-ODGb1IP7kiNvzrJurGDj2gu_OHA4RcSmReiU8k4x7SVPqwMYIXvtcsH3ECsGQ',
    category_id: 1,
    cover_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClWoLVbxtJ5OSLc_Z1Fe1Wg7umlvxRv2-_LIkSXxmatCSy0JymTAZg4qNRG3leh1Xm_OYIXl3gHAq3fIyURodg0X9zWgBFkZR7MAaWVgD5pzQk2MaI7sYkAFJ2RK9MHCELfK63IAKnsI4WheSS9KgrOmCnhEo39p5BP3GvVxwckib5qA0GyME5tN-lM9ghp8eaGO6zi2nbsh4yE_1VlD8QxxN11dof-TzIWlgMcrO3HfR9vt_kCIQhfoezZh8IYZRxjLaBQuNHlw',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Hala Dent - Bakhtyari Premium',
    description: 'Ultra-exclusive boutique clinic specializing in complex oral cosmetic surgery and dental implant prosthodontics in the high-end residential district of Bakhtyari.',
    address: 'Main Bakhtyari Boulevard, Opposite Gulan Tower, Erbil',
    phone: '+964 750 987 6543',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcOssliZyHqZI9rqFPtv_WE1bbX3I1IhiQcTM-T1WekZgLnJRI9JwMOzkNfqLSZ5xiyvpLXMCPT-DsnHgUvJECQkW-hfFzS5xYe4YaTEFzyR18Pf4wQCw2AFMj8_c7TMbVruvoTpcPzsqgmDSD0y14GawmGVTooVHxPaGtD78V7O-blnaMN4ZjjTrqXTZWvKBgaB8XMs2qxF3W-ODGb1IP7kiNvzrJurGDj2gu_OHA4RcSmReiU8k4x7SVPqwMYIXvtcsH3ECsGQ',
    category_id: 4,
    cover_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClWoLVbxtJ5OSLc_Z1Fe1Wg7umlvxRv2-_LIkSXxmatCSy0JymTAZg4qNRG3leh1Xm_OYIXl3gHAq3fIyURodg0X9zWgBFkZR7MAaWVgD5pzQk2MaI7sYkAFJ2RK9MHCELfK63IAKnsI4WheSS9KgrOmCnhEo39p5BP3GvVxwckib5qA0GyME5tN-lM9ghp8eaGO6zi2nbsh4yE_1VlD8QxxN11dof-TzIWlgMcrO3HfR9vt_kCIQhfoezZh8IYZRxjLaBQuNHlw',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Hala Dent - English Village Family',
    description: 'Family-centered dental retreat featuring colorful calming zones for children, extensive preventive hygiene programs, and a dedicated 24/7 Dental Emergency unit.',
    address: 'English Village Gate 3, Erbil, Kurdistan',
    phone: '+964 750 444 3322',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcOssliZyHqZI9rqFPtv_WE1bbX3I1IhiQcTM-T1WekZgLnJRI9JwMOzkNfqLSZ5xiyvpLXMCPT-DsnHgUvJECQkW-hfFzS5xYe4YaTEFzyR18Pf4wQCw2AFMj8_c7TMbVruvoTpcPzsqgmDSD0y14GawmGVTooVHxPaGtD78V7O-blnaMN4ZjjTrqXTZWvKBgaB8XMs2qxF3W-ODGb1IP7kiNvzrJurGDj2gu_OHA4RcSmReiU8k4x7SVPqwMYIXvtcsH3ECsGQ',
    category_id: 1,
    cover_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClWoLVbxtJ5OSLc_Z1Fe1Wg7umlvxRv2-_LIkSXxmatCSy0JymTAZg4qNRG3leh1Xm_OYIXl3gHAq3fIyURodg0X9zWgBFkZR7MAaWVgD5pzQk2MaI7sYkAFJ2RK9MHCELfK63IAKnsI4WheSS9KgrOmCnhEo39p5BP3GvVxwckib5qA0GyME5tN-lM9ghp8eaGO6zi2nbsh4yE_1VlD8QxxN11dof-TzIWlgMcrO3HfR9vt_kCIQhfoezZh8IYZRxjLaBQuNHlw',
    created_at: new Date().toISOString()
  }
];

export const SEED_DENTISTS: Dentist[] = [
  {
    id: 1,
    clinic_id: 1,
    name: 'Dr. Sarah Khalil',
    bio: 'Board-Certified Orthodontist with over 12 years of clinical excellence in invisible braces and AI-driven alignment therapies. Alumna of Erbil Medical University & University of London.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2QH-WhzB4msY-_zjflj-b-WdQWTVwgU8Wo56cF6luw-dAAgsb1YiIooGfLFTdZivNI-cd4ZBYpYJxzybeAKn_mKv4S15Gm3gVwizzzzdh4bR3sLrQyIswVc1xrVGJ3Q4PoHC14P66ywC0KaATlEPi1t075Mswt7f92EUDAallZco8GLIpuE8CmokdrN9OZDXJyo8_Si07NNzMyacPUBuAj1A1mxhp9TLJkEvSpRNdK-XHh646bVVqLRCMSgh7lJPJqUzsfoALcw',
    title: 'Senior Orthodontist',
    rating: 4.9,
    reviews_count: 120,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    clinic_id: 2,
    name: 'Dr. Ahmed Omar',
    bio: 'Consultant Maxillofacial Surgeon specializing in highly complex titanium implants, aesthetic bone restorations, and pain-free laser surgery with extreme clinical precision.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGUwQXJs52OKI8gNwvv941qgwAcl8g3Gmkckd9RMyBuPlWjhKHFNBm7WXoeyfIKkE5EVD9s4J-jsy6fM1mEPmxhlOm2xqyZPdsR4e89B0keQyfGKwHmI-gbEaFdFeWHL0beMRcs5kRP8ChQUrQI8nSEnMLMwtmiHXDgGAy86u5UtlnGFWyoN0kcRg20xIkhTNCAMO4uOcDOGPY7am__dshr1IMdCGRPBZ16l3v5cxwxqC-QgZboB_3q4ylq_lSabu_-7hI9TJKtQ',
    title: 'Chief Oral Surgeon',
    rating: 5.0,
    reviews_count: 88,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    clinic_id: 3,
    name: 'Dr. Hana Rostam',
    bio: 'Compassionate pediatric care dentist with extensive qualifications in child cognitive distraction techniques, ensuring dental hygiene visits are completely anxiety-free.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhp9hmFtKPmRnW_edY8R3I2gZmLpxJ008-i8KlY_4Gs4o79EUp61ppu_ChO5vqTtRtqeLhSOTYvz4AyUZ0q5dy2nB314UMMuqUeiiREiP9wPrGZyhLCM4pKim4ziNEGnQNq-7yCgkooZyOUND45PD52gWcBn718c3pMkQP8ib7QY-gfRHOvCH4Iz1rI2QQvjTVvtiPXpNk5xKrmyW8yoRIC7Fnrbu4wsBQO24W02Xymoj-GcR1v_YjhUQc5uo_3m2uZDA1hL-k_w',
    title: 'Pediatric Specialist',
    rating: 4.8,
    reviews_count: 95,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    clinic_id: 1,
    name: 'Dr. Ahmad Khalid',
    bio: 'Expert general practitioner focused on deep preventative care, precision restoration fillings, and comprehensive smile scanning using advanced 3D orthographic scanners.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvmoUYqyK1RlsS-DV9RlJjfuOtbSCxaaldJ4bc2w1c4PCm8c_DXSIIyBpaJf9BK0cA7HRGmL80oDKGummXkMxHT8BLqSE7_ifxxF3PTM4e8zFPZOzERw2EgD-xp32SAFTfEuoax020GiLvqiB3_V8LiTrKVfoPilsZ6n2ksydvdseBwZkLu_XNLcV78ynkstf2lXRhab13xsl34y3KBtPpmRGXOQD0BgxbP9CwKMKsjkyXQbS51u7NewsxDOTZhI9TQwJNjhSnMg',
    title: 'Lead General Practitioner',
    rating: 4.9,
    reviews_count: 142,
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    clinic_id: 1,
    name: 'Dr. Sara Hawar',
    bio: 'Cosmetic reconstruction physician specializing in ultra-thin ceramic veneers, full-mouth Hollywood smiles, and non-invasive cold laser bleaching systems.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpd1si3zLIyA6YaDADzn95_c_rFxa0NM9FH2xmZJcGN0YlnPSlVKw0v9HFPX-8M9nv94-iqFldYrJWPRswW_fc3T2q-Q51XBR0rztiyMvN9XUVCW4cDndpSYOJfLh_icNaxyHjQjUkREysQ3Z1bqM1rqRGrFimqMbzA4ncW_eOUm5TxM0gZCxyFxzbB8hKeb-IshUpih9GtXkvw836azrOi6N50mH8FAblAlvJX4F_6-b5epzv98CLhQRRPWDQ-FJFUsCeXl6j2Q',
    title: 'Cosmetic Smile Designer',
    rating: 5.0,
    reviews_count: 76,
    created_at: new Date().toISOString()
  }
];

export const SEED_SERVICES: Service[] = [
  {
    id: 1,
    name: 'Laser Teeth Whitening',
    description: 'Our proprietary painless medical laser activates our premium whitening gel, lifting yellowing matrices and enhancing your smile shade safely without damaging enamel layers.',
    price: 350.00,
    discount_price: 245.00,
    duration: 45,
    clinic_id: 1,
    is_available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCngtXHFUh6vJQ_NPRsu-LdnU_j845tLztGxTJRAZYy5heUGuh_Feg2qeYcrxqFzHzmB_0FXXtPYO8hmMSjL3C1zUp42nP4Umc3ZlcSmIHLhSiwi0XVKO823wlmPKDKSxwF-urdnaruOPWTr5WKzK8oa8fuCEsUvY-_pQiZmkRMiRDshaKWD_oiNaGT337htdR3rMRsU98nSV1MZkPs77fzuvIcjrSVBNoUIZcThMp1G0M6EbFcqBGnK0R3UInOWq_RDWEG1DH1Og',
    category_id: 4,
    target_audience: 'Adults seeking maximum shade correction',
    warranty_months: 12,
    requires_consultation: false,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Standard Scaling & Airflow Polishing',
    description: 'Thorough ultrasonic removal of hardened tartar minerals from root lines followed by baking soda micro-airflow polish for smooth sparkling alignment.',
    price: 80.00,
    duration: 30,
    clinic_id: 1,
    is_available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8PSO8oqmzA2OyrgYB3hyZLuHLU3Wbg2_tmwHFAw9ZIRGOcsIeNYZqJrtRjWCApmoZAHld3xO1iuZZfpcJ_rjwQvHM_uAPOf_odLUatfaznZupM_kc2BGdzVnx7NyzJoQKVvfpZdXqPDSNrGonto1IW5uR3iiBD-msM0WCg3XfwbqWnsGhYUFR4Ug8cJIFd7XVIZI_2KreiMTi8eHXTUo32TZuChgZkjBS1At8a5Bw7fq69H5s1McN3_J9sW6nTHX8ySiAu4CDxg',
    category_id: 1,
    target_audience: 'Everyone (Recommended every 6 months)',
    warranty_months: 0,
    requires_consultation: false,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Clear Aligners Consultation',
    description: 'Interactive high-tech orthodontic scoping utilizing structural intra-oral 3D scanning, yielding a full timeline simulation of teeth movement without brace lines.',
    price: 150.00,
    discount_price: 0.00,
    duration: 40,
    clinic_id: 1,
    is_available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8PSO8oqmzA2OyrgYB3hyZLuHLU3Wbg2_tmwHFAw9ZIRGOcsIeNYZqJrtRjWCApmoZAHld3xO1iuZZfpcJ_rjwQvHM_uAPOf_odLUatfaznZupM_kc2BGdzVnx7NyzJoQKVvfpZdXqPDSNrGonto1IW5uR3iiBD-msM0WCg3XfwbqWnsGhYUFR4Ug8cJIFd7XVIZI_2KreiMTi8eHXTUo32TZuChgZkjBS1At8a5Bw7fq69H5s1McN3_J9sW6nTHX8ySiAu4CDxg',
    category_id: 2,
    target_audience: 'Aesthetic conscious adults & teenagers',
    warranty_months: 24,
    requires_consultation: true,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Premium Dental Implant',
    description: 'Surgical titanium cylinder anchor inserted into bone matrices supporting custom milled solid zirconium dental crowns, acting exactly like organic tooth roots.',
    price: 1200.00,
    duration: 60,
    clinic_id: 2,
    is_available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcOssliZyHqZI9rqFPtv_WE1bbX3I1IhiQcTM-T1WekZgLnJRI9JwMOzkNfqLSZ5xiyvpLXMCPT-DsnHgUvJECQkW-hfFzS5xYe4YaTEFzyR18Pf4wQCw2AFMj8_c7TMbVruvoTpcPzsqgmDSD0y14GawmGVTooVHxPaGtD78V7O-blnaMN4ZjjTrqXTZWvKBgaB8XMs2qxF3W-ODGb1IP7kiNvzrJurGDj2gu_OHA4RcSmReiU8k4x7SVPqwMYIXvtcsH3ECsGQ',
    category_id: 3,
    target_audience: 'Patients with complete single or multiple tooth loss',
    warranty_months: 60,
    requires_consultation: true,
    created_at: new Date().toISOString()
  }
];

export const SEED_OFFERS: Offer[] = [
  {
    id: 1,
    clinic_id: 1,
    title: 'Teeth Whitening Discount',
    description: 'Professional high-intensity precise cold laser activated treatment at our modern facilities for a secure, beautiful, bright smile.',
    discount: '30% DISCOUNT',
    expiry_date: '2026-08-31',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCngtXHFUh6vJQ_NPRsu-LdnU_j845tLztGxTJRAZYy5heUGuh_Feg2qeYcrxqFzHzmB_0FXXtPYO8hmMSjL3C1zUp42nP4Umc3ZlcSmIHLhSiwi0XVKO823wlmPKDKSxwF-urdnaruOPWTr5WKzK8oa8fuCEsUvY-_pQiZmkRMiRDshaKWD_oiNaGT337htdR3rMRsU98nSV1MZkPs77fzuvIcjrSVBNoUIZcThMp1G0M6EbFcqBGnK0R3UInOWq_RDWEG1DH1Og',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    clinic_id: 3,
    title: 'Family Checkup Plan',
    description: 'Complete specialized family package covering routine consults, panoramic smart radiography, scaling, polishing, and specific pediatric care advice.',
    discount: 'POPULAR ACCREDITATION',
    expiry_date: '2026-12-15',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjkrf5fVaHlOZbfAP-DiU0-DYodUvThBXiYMncm-uWbVbE8kVQxFnzFRTu6mVAjKOQkEYVLYhFLxvtM2CESAZNUdkINB9sacE8sDujZHRyXMnM5fFZMMT4fyTYGybo5XpNI1s4h_qGPHFUNViaTLWiHUbN7mowxMxiptRmjKPP-Ess3htpu6Jlz3HNxuTvIUpCogoRt23VgzCqABdfbnQRWtvxqgoQfUbhWsKSmQ3-mccVx8r8i04oBj3jbDp0c0ZjSObMzRS8PA',
    created_at: new Date().toISOString()
  }
];

export const SEED_MEDIA: Media[] = [
  {
    id: 1,
    clinic_id: 1,
    file_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8PSO8oqmzA2OyrgYB3hyZLuHLU3Wbg2_tmwHFAw9ZIRGOcsIeNYZqJrtRjWCApmoZAHld3xO1iuZZfpcJ_rjwQvHM_uAPOf_odLUatfaznZupM_kc2BGdzVnx7NyzJoQKVvfpZdXqPDSNrGonto1IW5uR3iiBD-msM0WCg3XfwbqWnsGhYUFR4Ug8cJIFd7XVIZI_2KreiMTi8eHXTUo32TZuChgZkjBS1At8a5Bw7fq69H5s1McN3_J9sW6nTHX8ySiAu4CDxg',
    file_type: 'image/jpeg',
    title: 'AI Orthodontics Imaging',
    is_public: true,
    upload_date: new Date().toISOString()
  },
  {
    id: 2,
    clinic_id: 1,
    file_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClWoLVbxtJ5OSLc_Z1Fe1Wg7umlvxRv2-_LIkSXxmatCSy0JymTAZg4qNRG3leh1Xm_OYIXl3gHAq3fIyURodg0X9zWgBFkZR7MAaWVgD5pzQk2MaI7sYkAFJ2RK9MHCELfK63IAKnsI4WheSS9KgrOmCnhEo39p5BP3GvVxwckib5qA0GyME5tN-lM9ghp8eaGO6zi2nbsh4yE_1VlD8QxxN11dof-TzIWlgMcrO3HfR9vt_kCIQhfoezZh8IYZRxjLaBQuNHlw',
    file_type: 'image/jpeg',
    title: 'Erbil Facility Reception',
    is_public: true,
    dimensions: '1920x1080',
    upload_date: new Date().toISOString()
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    user_id: 1,
    title: 'Welcome to Hala Dent!',
    message: 'Browse top clinics and book dental visits around Erbil in seconds with absolute precision.',
    is_read: false,
    date: new Date().toISOString(),
    type: 'system'
  },
  {
    id: 2,
    user_id: 1,
    title: '30% Whitening Promo Active',
    message: 'Check out the active Teet Whitening promo under the Offers section and bright up your teeth.',
    is_read: false,
    date: new Date(Date.now() - 3600000).toISOString(),
    type: 'promotion'
  }
];

export const SEED_CONTENT_TYPES = [
  { id: 1, type_key: 'privacy_policy', icon_name: 'Shield' },
  { id: 2, type_key: 'terms_of_service', icon_name: 'FileText' },
  { id: 3, type_key: 'help_center', icon_name: 'HelpCircle' },
  { id: 4, type_key: 'app_version', icon_name: 'Info' }
];

export const SEED_CONTENT_TRANSLATIONS = [
  // Privacy Policy
  {
    id: 1,
    content_type_id: 1,
    language_code: 'en',
    title: 'Privacy & Security Policy',
    content: 'At Hala Dent Clinic in Erbil, your patient files, orthodontic 3D visual scans, and treatment histories are securely guarded under HIPAA confidentiality standards. We never disclose records to third parties without express consensus.'
  },
  {
    id: 2,
    content_type_id: 1,
    language_code: 'ar',
    title: 'سياسة الخصوصية والأمان',
    content: 'في عيادات هلا دنت بأربيل، يتم حفظ ملفاتكم المرضية، وصور الأشعة الفموية ثلاثية الأبعاد، وتاريخكم العلاجي بسرية تامة وتشفير كامل وفقاً لأعلى معايير السرية الطبية. نحن لا نشارك بياناتكم مع أي جهة خارجية.'
  },
  {
    id: 3,
    content_type_id: 1,
    language_code: 'ku',
    title: 'سیاسەتی پاراستنی نهێنی',
    content: 'لە کلینیکەکانی هالا دێنت لە هەولێر، فایلەکانی نەخۆش، وێنەی سێ ڕەهەندی پووک و ددان، و مێژووی چارەسەرکردن بە تەواوی پارێزراون بەپێی بەرزترین ستانداردەکانی نهێنی پزیشکی. ئێمە زانیارییەکانتان بەهیچ لایەنێک نادەین.'
  },
  // Terms of Service
  {
    id: 4,
    content_type_id: 2,
    language_code: 'en',
    title: 'Clinical Terms of Service',
    content: '1. Appointment bookings represent pre-scheduled clinician slots. Please cancel at least 3 hours prior.\n2. The $150 consultation fee is 100% credited toward your dental treatment once initiated.\n3. Custom clear aligner programs require professional evaluation by Dr. Sarah Khalil.'
  },
  {
    id: 5,
    content_type_id: 2,
    language_code: 'ar',
    title: 'شروط الخدمة الطبية',
    content: '١. حجوزات المواعيد تمثل فترات مخصصة للأطباء. يرجى إلغاء الموعد قبل ٣ ساعات على الأقل في حال عدم الحضور.\n٢. رسوم الاستشارة البالغة ١٥٠ دولاراً تُقيد بالكامل كرصيد مجاني من كلفة أي علاج تبدأه في العيادة.\n٣. برامج تقويم الأسنان الشفاف تتطلب فحصاً رقمياً دقيقاً بإشراف الدكتورة سارة خليل.'
  },
  {
    id: 6,
    content_type_id: 2,
    language_code: 'ku',
    title: 'مەرجەکانی پێشکەشکردنی خزمەتگوزاری',
    content: '١. بڕینی نۆرە کاتێکی تایبەتە بۆ پزیشک. تکایە لایەنی کەم ٣ کاتژمێر پێشتر نۆرەکەت هەڵبوەشێنەوە پێش نەهاتن.\n٢. کرێی پشکنین کە ١٥٠ دۆلارە بە تەواوی دەبێت بە داشکاندن لەسەر هەر چارەسەرێک کە لە کلینیکەکە دەستی پێ دەکەیت.\n٣. چارەسەری تەلی ددانی ڕوون پێویستی بە پشکنینی دیجیتاڵی ورد هەیە بە سەرپەرشتی د. سارە خەلیل.'
  },
  // Help Center
  {
    id: 7,
    content_type_id: 3,
    language_code: 'en',
    title: 'Help & FAQ Desk',
    content: '• Q: Where are you located?\nA: Gulan Main Street and Bakhtyari Distict, Erbil.\n\n• Q: How can I reach emergency help?\nA: You can call our 24/7 Red Emergency Hotline prominently listed at the top of the Home layout anytime.\n\n• Q: How much is professional teeth whitening?\nA: Our laser whitening is discounted to $245 (regularly $350).'
  },
  {
    id: 8,
    content_type_id: 3,
    language_code: 'ar',
    title: 'مركز المساعدة والدعم',
    content: '• س: أين تقع فروعكم؟\nج: شارع كولان الرئيسي وحي بختياري، أربيل.\n\n• س: كيف يمكنني الاتصال بالطوارئ؟\nج: يمكنك الضغط على شريط الطوارئ الأحمر في أعلى الشاشة الرئيسية للاتصال المباشر على مدار ٢٤ ساعة.\n\n• س: ما هي كلفة تبييض الأسنان بالليزر؟\nج: تبييض الأسنان بالليزر متوفر حالياً بعرض خاص بقيمة ٢٤٥ دولاراً (السعر الأصلي ٣٥٠ دولاراً).'
  },
  {
    id: 9,
    content_type_id: 3,
    language_code: 'ku',
    title: 'سەنتەری یارمەتی و پشتیوانی',
    content: '• پ: لقی سەرەکیتان لەکوێیە؟\nو: شەقامی گوڵانی سەرەکی و گەڕەکی بەختیاری، هەولێر.\n\n• پ: چۆن پەیوەندی بە فریاگوزاری خێراوە بکەم؟\nو: دەتوانیت لە هەر کاتێکدا بێت کلیک لەسەر هێڵی فریاگوزاری سوور بکەیت لە سەرەوەی لاپەڕەی سەرەکی.\n\n• پ: کای تبييض (سپی کردنەوە)ی ددان بە لێزەر چەندە؟\nو: سپیکردنەوەی لێزەری ئێستا بە ئۆفەری تایبەتە بە ٢٤٥ دۆلار (نرخی ئاسایی ٣٥٠ دۆلارە).'
  },
  // App Version Info
  {
    id: 10,
    content_type_id: 4,
    language_code: 'en',
    title: 'App Version Information',
    content: 'Hala Dent Patient Portal v3.5.2 (Erbil Build)\n- Built with high-speed React & Tailwind CSS\n- Dynamic Database Table Integration\n- Server-side Live Gemini AI Receptionist Response Bridge'
  },
  {
    id: 11,
    content_type_id: 4,
    language_code: 'ar',
    title: 'معلومات إصدار التطبيق',
    content: 'بوابة هلا دنت للمرضى الإصدار ٣.٥.٢ (نسخة أربيل)\n- مبني بأحدث تقنيات رياكت و تيلويند كلاس\n- ربط ديناميكي مباشر ومستقر بقواعد البيانات\n- نظام ردود الذكاء الاصطناعي جيميناي المتطور'
  },
  {
    id: 12,
    content_type_id: 4,
    language_code: 'ku',
    title: 'زانیاری جۆری ئەپڵیکەیشن',
    content: 'بەرنامەی هالا دێنت ڤێرژنی ٣.٥.٢ (وەرگێڕانی هەولێر)\n- دروستکراو بە تەکنەلۆژیای خێرای React و Tailwind CSS\n- گرێدراوی ڕاستەوخۆ بە داتابەیسی سەرهێڵ\n- پشتگیریکراو بە ژیری دەستکردی جێمینای'
  }
];

