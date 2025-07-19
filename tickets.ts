import { supabase } from './supabaseClient';

export async function fetchTicketsForUser(userId: string) {
  if (!userId) return [];
  const { data, error } = await supabase.from('tickets').select('*').eq('client_id', userId).order('created_at', { ascending: false });
  if (error) { console.error("Eroare la preluarea tichetelor:", error.message); throw new Error(error.message); }
  return data || [];
}

export async function fetchTicketById(ticketId: string) {
  if (!ticketId) return null;
  const numericTicketId = parseInt(ticketId, 10);
  if (isNaN(numericTicketId)) {
    console.error("ID-ul tichetului nu este un număr valid:", ticketId);
    return null;
  }
  const { data, error } = await supabase.from('tickets').select('*, client:clients(name, email)').eq('id', numericTicketId).single();
  if (error && error.code !== 'PGRST116') {
    console.error("Eroare la preluarea tichetului:", error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function fetchRepliesForTicket(ticketId: string) {
  if (!ticketId) return [];
  const { data, error } = await supabase.from('ticket_replies').select(`*, author:clients!user_id(name, email, role)`).eq('ticket_id', ticketId).order('created_at', { ascending: true });
  if (error) { console.error("Eroare la preluarea comentariilor:", error.message); throw new Error(error.message); }
  return data || [];
}

export async function addReplyToTicket(ticketId: string, userId: string, message: string, attachmentUrl: string | null) {
  if (!ticketId || !userId || (!message.trim() && !attachmentUrl)) { throw new Error("Date incomplete."); }
  const { data, error } = await supabase.from('ticket_replies').insert({ ticket_id: ticketId, user_id: userId, message: message, attachment_url: attachmentUrl }).select();
  if (error) { console.error("Eroare la adăugarea comentariului:", error.message); throw new Error(error.message); }
  return data;
}

export async function updateTicketStatus(ticketId: string, status: 'Deschis' | 'În lucru' | 'Rezolvat') {
  const { data, error } = await supabase.from('tickets').update({ status: status }).eq('id', ticketId);
  if (error) { console.error("Eroare la actualizarea statusului:", error.message); throw new Error(error.message); }
  return data;
}