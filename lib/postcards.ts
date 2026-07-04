import { demoPostcards } from './demo-data';
import { hasSupabaseConfig } from './env';
import { supabaseFetch } from './supabase';
import type { NewPostcard, Postcard } from './types';

export async function listPostcards(senderId?: string): Promise<Postcard[]> {
  if (!hasSupabaseConfig()) return demoPostcards;
  return supabaseFetch<Postcard[]>('postcards', {
    query: {
      select: '*',
      order: 'created_at.desc',
      sender_id: senderId ? `eq.${senderId}` : undefined,
    },
    cache: 'no-store',
  });
}

export async function getPostcard(id: string): Promise<Postcard | null> {
  if (!hasSupabaseConfig()) return demoPostcards.find((postcard) => postcard.id === id) ?? demoPostcards[0] ?? null;
  const rows = await supabaseFetch<Postcard[]>('postcards', { query: { select: '*', id: `eq.${id}`, limit: 1 }, cache: 'no-store' });
  return rows[0] ?? null;
}

export async function createPostcard(postcard: NewPostcard): Promise<Postcard> {
  return (await supabaseFetch<Postcard[]>('postcards', { method: 'POST', body: JSON.stringify(postcard) }))[0];
}

export async function markPostcardOpened(id: string): Promise<void> {
  if (!hasSupabaseConfig()) return;
  await supabaseFetch<Postcard[]>('postcards', { method: 'PATCH', query: { id: `eq.${id}`, opened_at: 'is.null' }, body: JSON.stringify({ opened_at: new Date().toISOString() }) });
}
