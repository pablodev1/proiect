import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';
import { updateUserProfile } from '@/lib/auth';

export function ProfilePage() {
  const { session, profile, refreshProfile } = useAuth();
  
  const [name, setName] = useState('');
  const [nameLoading, setNameLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
    }
  }, [profile]);

  const handleNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameLoading(true);
    setError('');
    setMessage('');
    try {
      if (!session?.user) throw new Error("Utilizatorul nu este autentificat.");
      await updateUserProfile(session.user.id, name);
      await refreshProfile();
      setMessage('Numele a fost actualizat cu succes!');
    } catch (err: any) {
      setError(`Eroare la actualizarea numelui: ${err.message}`);
    } finally {
      setNameLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      setError('Te rog, introdu o parolă nouă.');
      return;
    }
    setPasswordLoading(true);
    setError('');
    setMessage('');
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setMessage('Parola a fost actualizată cu succes!');
      setNewPassword('');
    } catch (err: any) {
      setError(`Eroare la actualizarea parolei: ${err.message}`);
    } finally {
      setPasswordLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-2xl py-8 px-4 mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold">Profilul Meu</h1>
        <p className="mt-2 text-lg text-slate-300">Email: {session?.user?.email}</p>
      </div>

      {message && <p className="text-green-400 text-sm text-center mb-4 p-3 bg-green-500/10 rounded-lg">{message}</p>}
      {error && <p className="text-red-400 text-sm text-center mb-4 p-3 bg-red-500/10 rounded-lg">{error}</p>}

      <div className="bg-surface/60 border border-border p-8 rounded-2xl">
        <h2 className="font-heading text-2xl font-bold mb-6">Modifică Numele</h2>
        <form onSubmit={handleNameUpdate} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Nume Complet</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full bg-background/50 border border-border rounded-lg px-4 py-2" 
            />
          </div>
          <button type="submit" disabled={nameLoading} className="font-heading text-white font-bold py-2 px-6 rounded-full text-base bg-accent-gradient disabled:opacity-50">
            {nameLoading ? 'Se salvează...' : 'Salvează Numele'}
          </button>
        </form>
      </div>

      <div className="bg-surface/60 border border-border p-8 rounded-2xl mt-8">
        <h2 className="font-heading text-2xl font-bold mb-6">Schimbă Parola</h2>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-slate-300 mb-2">Parolă Nouă</label>
            <input 
              type="password" 
              id="newPassword" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              className="w-full bg-background/50 border border-border rounded-lg px-4 py-2" 
            />
          </div>
          <button type="submit" disabled={passwordLoading} className="font-heading text-white font-bold py-2 px-6 rounded-full text-base bg-accent-gradient disabled:opacity-50">
            {passwordLoading ? 'Se salvează...' : 'Salvează Parola'}
          </button>
        </form>
      </div>
    </div>
  );
}