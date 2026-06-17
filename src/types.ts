/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  display_order: number;
  is_active: boolean;
  slug: string;
  banner_image: string;
  total_clicks: number;
  created_at: string;
}

export interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  icon: string;
  description: string;
  display_order: number;
  slug: string;
  meta_keywords?: string;
  is_featured: boolean;
  banner_image?: string;
  created_at: string;
}

export interface Clinic {
  id: number | string;
  name: string;
  description: string;
  address: string;
  phone: string;
  logo: string;
  category_id?: number | string;
  sub_category_id?: number | string;
  cover_image: string;
  created_at: string;
  rating?: number;
  review_count?: number;
  status_type?: string;
  tags?: string[];
}

export interface Dentist {
  id: number | string;
  clinic_id: number | string;
  name: string;
  bio: string;
  image: string;
  title: string;
  created_at: string;
  rating?: number;
  reviews_count?: number;
  years_of_experience?: number;
  certification?: string;
}

export interface Service {
  id: number | string;
  name: string;
  description: string;
  price: number;
  duration?: number; // in minutes
  clinic_id: number | string;
  is_available: boolean;
  image: string;
  category_id?: number | string;
  discount_price?: number;
  target_audience?: string;
  warranty_months: number;
  requires_consultation: boolean;
  created_at: string;
}

export interface Offer {
  id: number | string;
  clinic_id: number | string;
  title: string;
  description: string;
  discount: string;
  expiry_date: string;
  image: string;
  created_at: string;
}

export interface User {
  id: number | string;
  name: string;
  phone: string;
  city?: string;
  gender?: string;
  birth_date?: string;
  preferred_language: string;
  profile_picture?: string;
  created_at: string;
}

export interface Favorite {
  id: number | string;
  user_id: number | string;
  clinic_id?: number | string;
  dentist_id?: number | string;
  notes?: string;
  created_at: string;
}

export interface Appointment {
  id: number | string;
  user_id: number | string;
  clinic_id: number | string;
  dentist_id?: number | string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
}

export interface Contact {
  id: number | string;
  name: string;
  phone: string;
  message: string;
  clinic_id: number | string;
  date: string;
  status: 'new' | 'in_progress' | 'resolved';
  contact_reason: string;
  notes?: string;
  preferred_call_time?: string;
  reply_text?: string;
  handled_by_admin_id?: string;
  source?: string;
  attached_problem_image?: string;
  created_at: string;
}

export interface Notification {
  id: number | string;
  user_id: number | string;
  title: string;
  message: string;
  is_read: boolean;
  date: string;
  type?: string;
  deep_link_url?: string;
  expiry_date?: string;
  image_url?: string;
}

export interface Media {
  id: number;
  clinic_id?: number;
  dentist_id?: number;
  file_path: string;
  file_type: string;
  title?: string;
  size?: number;
  upload_date: string;
  dimensions?: string;
  is_public: boolean;
  tags?: string;
  alt_text?: string;
  thumbnail_url?: string;
}
