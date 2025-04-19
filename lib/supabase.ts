import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type GuestbookRow = {
  id: string;
  name: string;
  message: string;
  created_at: string;
  password?: string;
}

export type GuestbookInsert = Omit<GuestbookRow, 'id' | 'created_at'>; 