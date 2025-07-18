import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Asigură-te că folosești alias-ul '@'
import type { Session, User } from '@supabase/supabase-js';

// Definirea tipurilor
type Profile = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  domain_name: string | null;
  domain_url: string | null;
  domain_expiry_date: string | null;
  service_expiry_date: string | null;
  package_name: string | null;
};

type AuthContextType = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (user: User) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Eroare la preluarea profilului:', error);
      }
      setProfile(data || null);
    } catch (error) {
      console.error('Eroare neașteptată la preluarea profilului:', error);
      setProfile(null);
    }
  }, []);
  
  useEffect(() => {
    const initializeSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session?.user) {
        await fetchProfile(session.user);
      }
      setLoading(false);
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setLoading(true); 
        setSession(newSession);
        if (newSession?.user) {
          await fetchProfile(newSession.user);
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

  // REPARAȚIE: Adăugăm un efect pentru a gestiona revenirea în tab, care rezolvă problema deconectării.
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        // Când tab-ul devine vizibil, cerem lui Supabase să verifice starea sesiunii.
        // Asta va forța o reîmprospătare a token-ului dacă este necesar.
        await supabase.auth.getSession();
      }
    };

    // Adăugăm un "listener" pentru evenimentul de schimbare a vizibilității
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Curățăm listener-ul când componenta nu mai este folosită
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  const refreshProfile = useCallback(async () => {
    if (session?.user) {
      await fetchProfile(session.user);
    }
  }, [session, fetchProfile]);
  
  const value = useMemo(() => ({
    session,
    profile,
    loading,
    refreshProfile,
  }), [session, profile, loading, refreshProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth trebuie folosit în interiorul unui AuthProvider");
  }
  return context;
}