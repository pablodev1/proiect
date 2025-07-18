import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// AICI ESTE CORECȚIA: am schimbat "../../lib/auth" în "../lib/auth"
import { signUpWithEmail } from '../lib/auth';

export function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Te rog, completează toate câmpurile.');
      return;
    }
    setLoading(true);
    try {
      await signUpWithEmail(email, password, name);
      alert('Contul a fost creat! Te rog să verifici email-ul pentru confirmare.');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'A apărut o eroare la înregistrare.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md py-8 px-4 mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl font-bold">Creează un Cont Nou</h1>
        <p className="mt-2 text-lg text-slate-300">
          Ai deja cont?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Autentifică-te aici
          </Link>
        </p>
      </div>

      <div className="bg-surface/60 border border-border p-8 rounded-2xl">
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Nume Complet</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-background/50 border border-border rounded-lg px-4 py-2"
              required
            />
          </div>
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
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Parolă</label>
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
            {loading ? 'Se înregistrează...' : 'Creează Cont'}
          </button>
        </form>
      </div>
    </div>
  );
}