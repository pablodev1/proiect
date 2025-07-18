import { supabase } from './supabaseClient';

export async function signUpWithEmail(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: { name: name }
    }
  });
  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// FUNCȚIA CARE LIPSEA
export async function updateUserProfile(userId: string, name: string) {
  const { data, error } = await supabase
    .from('clients')
    .update({ name: name })
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
}