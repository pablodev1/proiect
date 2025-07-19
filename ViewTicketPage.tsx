import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabaseClient';
import { fetchTicketById, fetchRepliesForTicket, addReplyToTicket, updateTicketStatus } from '@/lib/tickets';
import { useAuth } from '@/hooks/useAuth';
import { IoArrowBack, IoSend, IoCloseCircleOutline, IoPersonCircleOutline, IoAttach, IoImageOutline } from 'react-icons/io5';

type Reply = {
  id: string;
  message: string;
  created_at: string;
  attachment_url?: string;
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
  client_id: string;
  attachment_url?: string;
};

export function ViewTicketPage() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const { session, profile } = useAuth();
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const loadData = async () => {
    if (!ticketId) return;
    try {
      const ticketData = await fetchTicketById(ticketId);
      setTicket(ticketData);
      const repliesData = await fetchRepliesForTicket(ticketId);
      setReplies(repliesData || []);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleAddReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newReply.trim() && !attachment) || !session?.user || !ticketId) return;

    setSending(true);
    try {
      let attachmentUrl: string | null = null;
      if (attachment) {
        const fileExt = attachment.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('ticket-attachments').upload(fileName, attachment);
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage.from('ticket-attachments').getPublicUrl(fileName);
        attachmentUrl = urlData.publicUrl;
      }
      
      const newReplyData = await addReplyToTicket(ticketId, session.user.id, newReply, attachmentUrl);

      if (newReplyData && newReplyData.length > 0) {
        const replyWithAuthor: Reply = {
          ...newReplyData[0],
          author: { name: profile?.name || 'Client', role: profile?.role || 'client' }
        };
        setReplies(currentReplies => [...currentReplies, replyWithAuthor]);
      }
      
      setNewReply('');
      setAttachment(null);
    } catch (error) {
      console.error(error);
      alert("Eroare la trimiterea mesajului.");
    } finally {
      setSending(false);
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
            <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white bg-primary"><IoPersonCircleOutline className="text-2xl" /></div>
            <div className="w-full">
              <p className="font-bold text-foreground">{profile?.name || 'Client'}</p>
              <div className="mt-1 inline-block text-left p-4 rounded-lg bg-background/50 prose prose-invert max-w-none">
                <p>{ticket.description}</p>
                {ticket.attachment_url && (<a href={ticket.attachment_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-3 text-primary hover:underline"><IoAttach /> Vezi Atașament</a>)}
              </div>
            </div>
          </div>
          {replies.map((reply) => {
            const isAuthorAdmin = reply.author?.role === 'admin';
            const authorName = reply.author?.name || (isAuthorAdmin ? 'Suport Tehnic' : 'Client');
            const authorInitial = authorName.charAt(0).toUpperCase();
            return (
              <div key={reply.id} className={`flex gap-4 ${isAuthorAdmin ? 'justify-end' : ''}`}>
                <div className={`w-full flex gap-4 ${isAuthorAdmin ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white ${isAuthorAdmin ? 'bg-secondary' : 'bg-primary'}`}>{authorInitial}</div>
                    <div className={`${isAuthorAdmin ? 'text-right' : ''}`}>
                        <p className="font-bold text-foreground">{authorName}</p>
                        <div className={`mt-1 inline-block text-left p-4 rounded-lg prose prose-invert max-w-none ${isAuthorAdmin ? 'bg-secondary/20' : 'bg-background/50'}`}>
                           {reply.message && <p>{reply.message}</p>}
                           {reply.attachment_url && (<a href={reply.attachment_url} target="_blank" rel="noopener noreferrer"><img src={reply.attachment_url} alt="Atașament" className="mt-2 rounded-lg max-w-xs cursor-pointer"/></a>)}
                        </div>
                    </div>
                </div>
              </div>
            );
          })}
        </div>

        {ticket.status !== 'Rezolvat' && (
          <div className="mt-8 pt-6 border-t border-border">
            {attachment && (<div className="mb-2 text-sm text-slate-300">Atașat: {attachment.name}</div>)}
            <form onSubmit={handleAddReply} className="flex gap-4 items-center">
              <label htmlFor="file-input" className="cursor-pointer text-slate-400 hover:text-primary p-3 rounded-lg bg-background/50 border border-border"><IoImageOutline className="text-xl"/></label>
              <input id="file-input" type="file" onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/gif"/>
              <input type="text" value={newReply} onChange={(e) => setNewReply(e.target.value)} placeholder="Scrie un răspuns..." className="w-full bg-background/50 border border-border rounded-lg px-4 py-3"/>
              <button type="submit" className="bg-primary text-white p-3 rounded-lg" disabled={sending}>{sending ? '...' : <IoSend />}</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}