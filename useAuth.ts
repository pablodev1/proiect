import { createContext, useContext } from 'react';
import type { Session } from '@supabase/supabase-js';

// REPARAȚIE: Adaugă 'export' înaintea tipului Profile
export type Profile = {
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth trebuie folosit în interiorul unui AuthProvider");
  }
  return context;
}