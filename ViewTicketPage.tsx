import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoArrowBack, IoSend, IoCloseCircleOutline, IoPersonCircleOutline, IoAttach } from 'react-icons/io5';

// REPARAȚIE: Am înlocuit căile relative cu alias-ul '@'
import { fetchTicketById, fetchRepliesForTicket, addReplyToTicket, updateTicketStatus } from '@/lib/tickets';
import { useAuth } from '@/contexts/AuthContext';


// Definirea tipurilor pentru o mai bună verificare
type Reply = {
  id: string;
  message: string;
  created_at: string;
  author: {
    name: string;
    role: 'admin' | 'client';
  } | null;
};

type Ticket = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  client_id: string;
  attachment_url?: string;
};

export function ViewTicketPage() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const { session, profile } = useAuth();
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!ticketId) return;
    try {
      const ticketData = await fetchTicketById(ticketId);
      setTicket(ticketData);
      const repliesData = await fetchRepliesForTicket(ticketId);
      setReplies(repliesData);
    } catch (error) {
      console.error("Nu s-au putut încărca datele tichetului.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadData();
  }, [ticketId]);

  const handleAddReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim() || !session?.user || !ticketId) return;

    try {
      await addReplyToTicket(ticketId, session.user.id, newReply);
      setNewReply('');
      await loadData();
    } catch (error) {
      alert("Eroare la trimiterea mesajului.");
    }
  };
  
  const handleCloseTicket = async () => {
    if (ticketId && window.confirm("Ești sigur că vrei să marchezi acest tichet ca 'Rezolvat'?")) {
      try {
        await updateTicketStatus(ticketId, 'Rezolvat');
        await loadData();
      } catch (error) {
        alert("Eroare la închiderea tichetului.");
      }
    }
  };

  if (loading) return <div className="w-full text-center py-10">Se încarcă detaliile tichetului...</div>;
  if (!ticket) return <div className="w-full text-center py-10">Tichetul nu a fost găsit.</div>;

  const isAdmin = profile?.role === 'admin';
  const isTicketOwner = ticket?.client_id === session?.user?.id;
  const getStatusColor = (status: string) => {
    if (status === 'Rezolvat') return 'bg-green-500/20 text-green-300';
    if (status === 'În lucru') return 'bg-yellow-500/20 text-yellow-300';
    if (status === 'Deschis') return 'bg-red-500/20 text-red-300';
    return 'bg-slate-500/20 text-slate-300';
  };

  return (
    <div className="w-full max-w-4xl py-8 px-4 mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <Link to="/client/dashboard" className="flex items-center gap-2 text-slate-300 hover:text-primary">
          <IoArrowBack /> Înapoi la Dashboard
        </Link>
        {(isAdmin || isTicketOwner) && ticket.status !== 'Rezolvat' && (
          <button onClick={handleCloseTicket} className="flex items-center gap-2 bg-red-500/80 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-red-500">
            <IoCloseCircleOutline /> Închide Tichetul
          </button>
        )}
      </div>
      <div className="bg-surface/60 border border-border p-8 rounded-2xl">
        <div className="border-b border-border pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-primary font-bold">TKT-{String(ticket.id).padStart(4, '0')}</p>
              <h1 className="font-heading text-3xl font-bold mt-1">{ticket.title}</h1>
            </div>
            <div className={`text-sm font-bold px-3 py-1 rounded-full ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white bg-primary">
                <IoPersonCircleOutline className="text-2xl" />
            </div>
            <div className="w-full">
              <p className="font-bold text-foreground">{profile?.name || 'Client'}</p>
              <div className="mt-1 inline-block text-left p-4 rounded-lg bg-background/50 prose prose-invert max-w-none">
                <p>{ticket.description}</p>
                {ticket.attachment_url && (
                   <a href={ticket.attachment_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-3 text-primary hover:underline">
                      <IoAttach /> Vezi Atașament
                   </a>
                )}
              </div>
            </div>
          </div>

          {replies.map((reply) => {
            const isAuthorAdmin = reply.author?.role === 'admin';
            const authorName = reply.author?.name || (isAuthorAdmin ? 'Suport Tehnic' : 'Client');
            const authorInitial = authorName.charAt(0).toUpperCase();

            return (
              <div key={reply.id} className={`flex gap-4 ${isAuthorAdmin ? 'justify-end' : 'justify-start'}`}>
                <div className={`w-full flex gap-4 ${isAuthorAdmin ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white ${isAuthorAdmin ? 'bg-secondary' : 'bg-primary'}`}>
                        {authorInitial}
                    </div>
                    <div className={`${isAuthorAdmin ? 'text-right' : 'text-left'}`}>
                        <p className="font-bold text-foreground">{authorName}</p>
                        <div className={`mt-1 inline-block text-left p-4 rounded-lg prose prose-invert max-w-none ${isAuthorAdmin ? 'bg-secondary/20' : 'bg-background/50'}`}>
                            <p>{reply.message}</p>
                        </div>
                    </div>
                </div>
              </div>
            );
          })}
        </div>

        {ticket.status !== 'Rezolvat' && (
          <form onSubmit={handleAddReply} className="mt-8 pt-6 border-t border-border flex gap-4 items-center">
             <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white bg-primary">
                <IoPersonCircleOutline className="text-2xl" />
            </div>
            <input 
              type="text" 
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Scrie un răspuns..."
              className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:ring-primary focus:border-primary"
            />
            <button type="submit" className="bg-primary text-white p-3 rounded-lg hover:bg-primary/80 disabled:opacity-50" disabled={!newReply.trim()}>
              <IoSend />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}