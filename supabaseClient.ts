import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// ACEST PAS ESTE OBLIGATORIU PENTRU DIAGNOSTIC
console.log("URL-ul Supabase folosit:", supabaseUrl);
console.log("Cheia Anon este încărcată?:", supabaseAnonKey ? 'DA' : 'NU, LIPSEȘTE!');

if (!supabaseUrl || !supabaseAnonKey) {
  alert("EROARE CRITICĂ: Cheile Supabase nu sunt setate corect în fișierul .env! Aplicația nu poate funcționa.");
  throw new Error("Cheile Supabase (URL & Anon Key) nu sunt definite.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);