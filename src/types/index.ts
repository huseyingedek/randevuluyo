export interface Salon {
  id: string;
  slug: string;
  name: string;
  description: string;
  address: string;
  district: string;
  city: string;
  phone: string;
  email: string;
  cover_image: string;
  gallery: string[];
  rating: number;
  review_count: number;
  is_verified: boolean;
  is_featured: boolean;
  opening_hours: OpeningHours;
  categories: string[];
  created_at: string;
}

export interface OpeningHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: boolean;
  start: string;
  end: string;
}

export interface Service {
  id: string;
  salon_id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
}

export interface Staff {
  id: string;
  salon_id: string;
  name: string;
  title: string;
  avatar: string;
  specialties: string[];
}

export interface Appointment {
  id: string;
  salon_id: string;
  service_id: string;
  staff_id: string;
  user_id: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes: string;
  created_at: string;
  service?: Service;
  staff?: Staff;
  salon?: Salon;
}

export interface Review {
  id: string;
  salon_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}
