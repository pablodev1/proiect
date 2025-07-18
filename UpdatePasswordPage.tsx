import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.updateUser({ password: password });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Parola a fost actualizată cu succes! Vei fi redirecționat.');
      setTimeout(() => navigate('/client/dashboard'), 2000);
    }
    setLoading(false);
  };
  
  return (
    <main className="w-full max-w-md text-center">
        <div className="bg-surface/60 border border-border p-8 md:p-10 rounded-2xl">
          <h1 className="font-heading text-4xl font-bold mb-2 text-white">Setează Parola Nouă</h1>
          <form onSubmit={handleUpdatePassword} className="space-y-6 text-left mt-8">
            <div>
              <label htmlFor="password">Parolă Nouă</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 mt-2" required />
            </div>
            {message && <p className="text-green-400 text-sm">{message}</p>}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="w-full font-heading text-white font-bold py-3 rounded-full text-lg bg-accent-gradient disabled:opacity-50">
              {loading ? 'Se salvează...' : 'Actualizează Parola'}
            </button>
          </form>
        </div>
    </main>
  )
}