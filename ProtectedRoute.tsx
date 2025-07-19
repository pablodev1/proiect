import { Navigate, Outlet } from 'react-router-dom';
// REPARAȚIE: Am actualizat calea de import pentru a folosi noul fișier al hook-ului.
import { useAuth } from '@/hooks/useAuth';

export function ProtectedRoute() {
  const { session, loading } = useAuth();

  if (loading) {
    return <div className="w-full text-center font-heading text-xl mt-20">Se încarcă...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}