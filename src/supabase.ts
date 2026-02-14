import { createClient } from '@supabase/supabase-js';

// Te klucze otrzymasz po założeniu projektu na supabase.com
// Możesz je dodać do pliku .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
