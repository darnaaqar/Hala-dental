import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dkofobocffyzlpmqrrwo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrb2ZvYm9jZmZ5emxwbXFycndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NDY0NTIsImV4cCI6MjA5NjQyMjQ1Mn0.JmQWvPhsMjobIAWM1EuRtHOsomBJ8U5FiY20ml8dRSo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase client initialized with project URL:', SUPABASE_URL);

/**
 * Robust fetch abstraction that returns data or null, with custom order/filter mappings
 */
export async function fetchSupabaseData(table: string, options: {
  select?: string;
  limit?: number;
  order?: string;
  ascending?: boolean;
  eq?: { column: string; value: any };
  single?: boolean;
} = {}) {
  try {
    let query = supabase.from(table).select(options.select || '*');
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    if (options.order) {
      query = query.order(options.order, { ascending: options.ascending !== false });
    }
    if (options.eq) {
      query = query.eq(options.eq.column, options.eq.value);
    }
    if (options.single) {
      const { data, error } = await query.single();
      if (error) throw error;
      return data;
    }
    
    const { data, error } = await query;
    if (error) {
      console.warn(`Error compiling Supabase retrieval for table '${table}':`, error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error(`Error fetching ${table} from Supabase:`, err);
    return null;
  }
}
