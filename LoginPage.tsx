import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signInWithEmail } from '../lib/auth';

export function LoginPage() {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      await refreshProfile();
      navigate('/client/dashboard');
    } catch (err: any) {
      setError(err.message || 'Email sau parolă incorectă.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md py-8 px-4 mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl font-bold">Autentificare</h1>
        <p className="mt-2 text-lg text-slate-300">
          Nu ai cont?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Înregistrează-te aici
          </Link>
        </p>
      </div>

      <div className="bg-surface/60 border border-border p-8 rounded-2xl">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Adresă de Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background/50 border border-border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            {/* AICI ESTE SECȚIUNEA CARE LIPSEA LA TINE */}
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">Parolă</label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Am uitat parola
              </Link>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background/50 border border-border rounded-lg px-4 py-2"
              required
            />
          </div>

           {error && <p className="text-red-400 text-sm text-center p-3 bg-red-500/10 rounded-lg">{error}</p>}

          <button type="submit" disabled={loading} className="w-full font-heading text-white font-bold py-3 rounded-full text-lg bg-accent-gradient disabled:opacity-50">
            {loading ? 'Se autentifică...' : 'Intră în Cont'}
          </button>
        </form>
      </div>
    </div>
  );
}