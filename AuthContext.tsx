import { useEffect, useState, useMemo, ReactNode, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';
import { AuthContext } from '@/hooks/useAuth';
import type { Profile } from '@/hooks/useAuth'; // Importăm tipul Profile

export function AuthProvider({ children }: { children: ReactNode }) {
  // REPARAȚIE: Specificăm explicit tipurile de date permise pentru useState
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (user: User) => {
    const { data: profileData } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', user.id)
      .single();
    setProfile(profileData || null);
  }, []);

  const refreshProfile = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await fetchProfile(session.user);
    }
  }, [fetchProfile]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user) {
          await fetchProfile(session.user);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);
  
  const value = useMemo(() => ({
    session,
    profile,
    loading,
    refreshProfile,
  }), [session, profile, loading, refreshProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}