export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Event {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  created_at: string;
}

export interface HealthRecord {
  id: string;
  user_id: string;
  type: 'symptom' | 'medication' | 'appointment' | 'other';
  title: string;
  description?: string;
  date: string;
  created_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  name: string;
  type: string;
  file_url?: string;
  expiration_date?: string;
  description?: string;
  created_at: string;
}

export interface Contact {
  id: string;
  user_id: string;
  name: string;
  role: string;
  phone?: string;
  email?: string;
  description?: string;
  created_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'completed';
  due_date?: string;
  created_at: string;
}

export interface LeisureItem {
  id: string;
  user_id: string;
  title: string;
  type: 'movie' | 'book' | 'game' | 'series' | 'other';
  status: 'to_watch' | 'watching' | 'completed' | 'on_hold';
  rating?: number;
  notes?: string;
  created_at: string;
}

export interface Idea {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: 'personal' | 'professional' | 'creative' | 'business' | 'other';
  created_at: string;
}

export interface FinanceRecord {
  id: string;
  user_id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description?: string;
  date: string;
  created_at: string;
}

export interface Decision {
  id: string;
  user_id: string;
  title: string;
  description: string;
  context?: string;
  outcome?: string;
  date: string;
  created_at: string;
}

export interface Software {
  id: string;
  user_id: string;
  name: string;
  category: string;
  description?: string;
  website?: string;
  is_essential: boolean;
  rating?: number;
  created_at: string;
}

export interface CommunityPost {
  id: string;
  user_id: string;
  user_name: string;
  title: string;
  content: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  user_name: string;
  content: string;
  created_at: string;
}