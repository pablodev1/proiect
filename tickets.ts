import { supabase } from './supabaseClient';

export async function fetchTicketsForUser(userId: string) {
  if (!userId) return [];
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('client_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Eroare la preluarea tichetelor:", error);
    throw error;
  }
  return data || [];
}

export async function fetchTicketById(ticketId: string) {
  if (!ticketId) return null;
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('id', ticketId)
    .single();

  if (error) {
    console.error("Eroare la preluarea tichetului:", error);
    throw error;
  }
  return data;
}

// --- FUNCȚIILE CARE LIPSEAU, ACUM ADĂUGATE ---

/**
 * Preia toate comentariile pentru un anumit tichet.
 */
export async function fetchRepliesForTicket(ticketId: string) {
  if (!ticketId) return [];
  const { data, error } = await supabase
    .from('ticket_replies')
    .select(`*, author:clients ( name, email )`)
    .eq('ticket_id', ticketId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Eroare la preluarea comentariilor:", error);
    throw error;
  }
  return data || [];
}

/**
 * Adaugă un comentariu nou la un tichet.
 */
export async function addReplyToTicket(ticketId: string, userId: string, message: string) {
  if (!ticketId || !userId || !message) {
    throw new Error("Date incomplete pentru adăugarea comentariului.");
  }
  const { data, error } = await supabase
    .from('ticket_replies')
    .insert({
      ticket_id: ticketId,
      user_id: userId,
      message: message,
    });

  if (error) {
    console.error("Eroare la adăugarea comentariului:", error);
    throw error;
  }
  return data;
}

/**
 * Actualizează statusul unui tichet.
 */
export async function updateTicketStatus(ticketId: string, status: 'Deschis' | 'În lucru' | 'Rezolvat') {
  const { data, error } = await supabase
    .from('tickets')
    .update({ status: status })
    .eq('id', ticketId);

  if (error) {
    console.error("Eroare la actualizarea statusului:", error);
    throw error;
  }
  return data;
}