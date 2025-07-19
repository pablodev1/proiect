import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBack, IoArchiveOutline } from 'react-icons/io5';

// REPARAȚIE: Folosim noul alias '@' pentru căi stabile
import { useAuth } from '@/hooks/useAuth';
import { fetchTicketsForUser } from '@/lib/tickets';

type Ticket = {
  id: number;
  title: string;
  status: 'Deschis' | 'În lucru' | 'Rezolvat';
  created_at: string;
};

export function TicketHistoryPage() {
  const { session } = useAuth();
  const [resolvedTickets, setResolvedTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getHistory() {
      if (session?.user?.id) {
        setLoading(true);
        try {
          const allTickets = await fetchTicketsForUser(session.user.id);
          const filteredTickets = allTickets.filter((ticket: Ticket) => ticket.status === 'Rezolvat');
          setResolvedTickets(filteredTickets);
        } catch (error) {
          console.error("Nu s-a putut încărca istoricul tichetelor.", error);
        } finally {
          setLoading(false);
        }
      }
    }
    getHistory();
  }, [session]);

  return (
    <div className="w-full max-w-4xl py-8 px-4 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <IoArchiveOutline className="text-3xl text-primary" />
          <div>
            <h1 className="font-heading text-4xl font-bold">Istoric Tichete</h1>
            <p className="mt-1 text-lg text-slate-300">Aici sunt toate tichetele tale rezolvate.</p>
          </div>
        </div>
        <Link to="/client/dashboard" className="flex items-center gap-2 text-slate-300 hover:text-primary">
          <IoArrowBack /> Înapoi la Dashboard
        </Link>
      </div>

      <div className="bg-surface/60 border border-border p-8 rounded-2xl">
        {loading ? (
          <p className="text-center">Se încarcă istoricul...</p>
        ) : resolvedTickets.length > 0 ? (
          <div className="space-y-4">
            {resolvedTickets.map((ticket) => (
              <Link
                to={`/client/ticket/${ticket.id}`}
                key={ticket.id}
                className="block bg-background/50 p-4 rounded-lg hover:bg-background transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold">TKT-{String(ticket.id).padStart(4, '0')}</span>
                    <p className="text-slate-300">{ticket.title}</p>
                  </div>
                  <div className="text-right">
                     <span className="text-sm font-bold text-green-400">{ticket.status}</span>
                     <p className="text-xs text-slate-400 mt-1">
                        Închis la: {new Date(ticket.created_at).toLocaleDateString('ro-RO')}
                     </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400 py-6">Nu există tichete în istoric.</p>
        )}
      </div>
    </div>
  );
}