import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'; // Aici este calea corectată

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (resetError) {
        throw resetError;
      }

      setMessage('Un link de resetare a parolei a fost trimis la adresa ta de email.');
    } catch (err: any) {
      setError(err.message || 'A apărut o eroare. Te rog, încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md py-8 px-4 mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl font-bold">Resetează Parola</h1>
        <p className="mt-2 text-lg text-slate-300">
          Îți amintești parola?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Autentifică-te
          </Link>
        </p>
      </div>

      <div className="bg-surface/60 border border-border p-8 rounded-2xl">
        <form onSubmit={handlePasswordReset} className="space-y-6">
          <p className="text-sm text-slate-400">Introdu adresa de email asociată contului tău și îți vom trimite un link pentru a-ți reseta parola.</p>
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

          {message && <p className="text-green-400 text-sm text-center p-3 bg-green-500/10 rounded-lg">{message}</p>}
          {error && <p className="text-red-400 text-sm text-center p-3 bg-red-500/10 rounded-lg">{error}</p>}

          <button type="submit" disabled={loading} className="w-full font-heading text-white font-bold py-3 rounded-full text-lg bg-accent-gradient disabled:opacity-50">
            {loading ? 'Se trimite...' : 'Trimite Link de Resetare'}
          </button>
        </form>
      </div>
    </div>
  );
}