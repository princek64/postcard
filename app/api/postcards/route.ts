import { NextResponse } from 'next/server';
import { createPostcard } from '@/lib/postcards';
import type { FilterType, NewPostcard } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const postcard: NewPostcard = {
      sender_id: body.sender_id ?? null,
      recipient_name: String(body.recipient_name ?? '').trim(),
      recipient_contact: String(body.recipient_contact ?? '').trim(),
      photo_url: String(body.photo_url ?? '').trim(),
      filter_type: String(body.filter_type ?? 'retro') as FilterType,
      caption: String(body.caption ?? '').trim().slice(0, 40),
      note: String(body.note ?? '').trim().slice(0, 300),
      location_name: String(body.location_name ?? '').trim(),
      lat: Number(body.lat ?? 0),
      lng: Number(body.lng ?? 0),
    };
    if (!postcard.recipient_name || !postcard.recipient_contact || !postcard.photo_url || !postcard.caption || !postcard.note || !postcard.location_name) {
      return NextResponse.json({ error: 'Missing required postcard fields.' }, { status: 400 });
    }
    const created = await createPostcard(postcard);
    return NextResponse.json({ postcard: created, url: `/postcard/${created.id}` }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create postcard.' }, { status: 500 });
  }
}
