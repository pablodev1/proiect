import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// REPARAȚIE: Am înlocuit căile relative cu alias-ul '@'
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';


export function NewTicketPage() {
  const { session } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Mică');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    } else {
      setAttachment(null);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setError('Te rog, completează titlul și descrierea.');
      return;
    }

    if (!session?.user) {
      setError("Sesiunea a expirat. Te rog să te autentifici din nou.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      let attachmentUrl = null;

      if (attachment) {
        const fileExt = attachment.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('ticket-attachments')
          .upload(filePath, attachment);
        
        if (uploadError) {
          throw new Error(`Eroare la încărcarea fișierului: ${uploadError.message}`);
        }
        
        const { data: urlData } = supabase.storage
          .from('ticket-attachments')
          .getPublicUrl(filePath);
        
        attachmentUrl = urlData.publicUrl;
      }
      
      const { error: insertError } = await supabase
        .from('tickets')
        .insert({
          client_id: session.user.id,
          title: title,
          description: description,
          priority: priority,
          status: 'Deschis',
          attachment_url: attachmentUrl,
        });

      if (insertError) {
        throw new Error(`Eroare la crearea tichetului: ${insertError.message}`);
      }

      alert('Tichetul a fost creat cu succes!');
      navigate('/client/dashboard');
    } catch (err: any) {
      setError(err.message || 'A apărut o eroare neașteptată.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl py-8 px-4 mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold">Creează un Tichet Nou</h1>
        <p className="mt-2 text-lg text-slate-300">Descrie problema ta și vom reveni cu o soluție.</p>
      </div>

      <div className="bg-surface/60 border border-border p-8 rounded-2xl">
        <form onSubmit={handleCreateTicket} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">Titlu Tichet</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-background/50 border border-border rounded-lg px-4 py-2" required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">Descrierea Problemei</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="w-full bg-background/50 border border-border rounded-lg px-4 py-2" required></textarea>
          </div>
          
          <div>
            <label htmlFor="attachment" className="block text-sm font-medium text-slate-300 mb-2">Atașează Screenshot (Opțional)</label>
            <input type="file" id="attachment" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif" className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"/>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-slate-300 mb-2">Nivel de Prioritate</label>
            <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full bg-background/50 border border-border rounded-lg px-4 py-2">
              <option>Mică</option>
              <option>Medie</option>
              <option>Mare</option>
            </select>
          </div>

          {error && <p className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg">{error}</p>}

          <button type="submit" disabled={loading} className="w-full font-heading text-white font-bold py-3 rounded-full text-lg bg-accent-gradient disabled:opacity-50">
            {loading ? 'Se trimite...' : 'Creează Tichet'}
          </button>
        </form>
      </div>
    </div>
  );
}