import { createClient } from '@supabase/supabase-js';

// Demo credentials - replace with actual Supabase credentials in production
const supabaseUrl = 'https://demo.supabase.co';
const supabaseKey = 'demo-key';

export const supabase = createClient(supabaseUrl, supabaseKey);