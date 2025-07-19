import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  IoAddCircle,
  IoPersonCircleOutline,
  IoLogOutOutline
} from 'react-icons/io5';
import { signOut } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';
import { fetchTicketsForUser } from '@/lib/tickets';

type Ticket = {
  id: number;
  title: string;
  status: 'Deschis' | 'În lucru' | 'Rezolvat';
};

export function DashboardPage() {
  const navigate = useNavigate();
  const { session, profile, loading } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  useEffect(() => {
    const userId = session?.user?.id;
    if (userId) {
      setLoadingTickets(true);
      fetchTicketsForUser(userId)
        .then(userTickets => {
          setTickets(userTickets || []);
        })
        .catch(error => {
          console.error("Nu s-au putut încărca tichetele.", error);
          setTickets([]);
        })
        .finally(() => {
          setLoadingTickets(false);
        });
    } else if (!loading) {
      setTickets([]);
      setLoadingTickets(false);
    }
  }, [session?.user?.id, loading]);

  const getStatusColor = (status: string) => {
    if (status === 'Rezolvat') return 'text-green-400';
    if (status === 'În lucru') return 'text-yellow-400';
    if (status === 'Deschis') return 'text-red-400';
    return 'text-slate-400';
  };
  
  const activeTickets = tickets.filter(t => t.status !== 'Rezolvat');

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Eroare la delogare:', error);
    }
  };

  return (
    <div className="w-full max-w-6xl py-8 px-4 mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-12">
        <div>
          <h1 className="font-heading text-4xl font-bold">Bun venit, {profile?.name || 'Client'}!</h1>
          <p className="mt-2 text-lg text-slate-300">Email: {session?.user?.email}</p>
        </div>
        <div className="flex items-center gap-4">
            <Link to="/client/profile" className="flex items-center gap-2 bg-surface/80 border border-border px-4 py-2 rounded-lg hover:border-primary transition-colors">
                <IoPersonCircleOutline/> Profil
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-surface/80 border border-border px-4 py-2 rounded-lg hover:border-red-500/50 transition-colors">
                <IoLogOutOutline/> Deconectare
            </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-surface/60 border border-border p-6 rounded-2xl">
           <h3 className="font-heading text-xl font-bold mb-4">Status Servicii</h3>
             <div className="space-y-3 text-slate-300">
                <p>Nume Domeniu: <span className="font-semibold text-white">{profile?.domain_name || 'Niciunul'}</span></p>
                <p>Expiră la: <span className="font-semibold text-white">{profile?.domain_expiry_date ? new Date(profile.domain_expiry_date).toLocaleDateString('ro-RO') : 'N/A'}</span></p>
                <p>Pachet Actual: <span className="font-semibold text-white">{profile?.package_name || 'Niciun pachet activ'}</span></p>
            </div>
        </div>

        <div className="lg:col-span-2 bg-surface/60 border border-border p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading text-xl font-bold">Tichete de Suport</h3>
             <Link to="/client/new-ticket" className="flex items-center gap-2 font-semibold text-primary hover:text-white transition-colors">
                <IoAddCircle /> Creează Tichet
            </Link>
          </div>
          
          {loadingTickets ? (
            <div className="text-center py-10"><p>Se încarcă tichetele...</p></div>
          ) : activeTickets.length > 0 ? (
            <div className="space-y-3">
              {activeTickets.map((ticket) => (
                <Link to={`/client/ticket/${ticket.id}`} key={ticket.id} className="bg-background/50 p-3 rounded-lg flex justify-between items-center hover:bg-background transition-colors cursor-pointer">
                  <div>
                    <span className="font-bold">TKT-{String(ticket.id).padStart(4, '0')}</span>
                    <p className="text-slate-300 text-sm">{ticket.title}</p>
                  </div>
                  <span className={`text-sm font-bold ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border-2 border-dashed border-border rounded-lg">
              <p className="text-slate-400">Nu ai niciun tichet de suport activ.</p>
               <Link to="/client/history" className="text-sm text-primary hover:underline mt-2 block">
                    Vezi tichetele arhivate
                </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}