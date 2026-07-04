'use client';
import { FormEvent, useState } from 'react';
import { filters, type FilterType } from '@/lib/types';

export function ComposeForm(){
  const[filter,setFilter]=useState<FilterType>('retro');
  const[photo,setPhoto]=useState('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80');
  const[note,setNote]=useState('Wish you could feel this warm evening air. Sending a tiny piece of the trip your way.');
  const[status,setStatus]=useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Sending your postcard…');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/postcards', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      photo_url: photo,
      filter_type: filter,
      caption: form.get('caption'),
      note,
      location_name: form.get('location_name'),
      lat: form.get('lat'),
      lng: form.get('lng'),
      recipient_name: form.get('recipient_name'),
      recipient_contact: form.get('recipient_contact'),
    }) });
    const result = await response.json();
    setStatus(response.ok ? `On its way — share ${result.url}` : result.error);
  }
  return <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_.9fr]"><div className="space-y-4"><div className="aspect-[1.52] overflow-hidden rounded-[2rem] shadow-postcard"><img src={photo} className={`h-full w-full object-cover filter-${filter}`} alt="Postcard preview"/></div><label className="block text-sm font-semibold">Photo URL<input value={photo} onChange={e=>setPhoto(e.target.value)} className="mt-2 w-full rounded-2xl border border-kraft/30 bg-white/50 p-3"/></label><div className="grid grid-cols-2 gap-3">{filters.map(f=><button type="button" key={f.id} onClick={()=>setFilter(f.id)} className={`rounded-2xl border p-4 text-left ${filter===f.id?'border-rust bg-rust/10':'border-kraft/25 bg-white/40'}`}><b>{f.label}</b><span className="block text-xs text-cocoa/60">{f.description}</span></button>)}</div></div><div className="space-y-4 rounded-[2rem] paper p-6 shadow-postcard"><input name="caption" placeholder="Caption" maxLength={40} required className="w-full rounded-2xl bg-white/55 p-3"/><textarea value={note} onChange={e=>setNote(e.target.value.slice(0,300))} required className="h-40 w-full rounded-2xl bg-white/55 p-3 font-hand text-xl"/><p className="text-right text-xs">{note.length}/300</p><input name="location_name" placeholder="Location name, e.g. London, England" required className="w-full rounded-2xl bg-white/55 p-3"/><div className="grid grid-cols-2 gap-3"><input name="lat" placeholder="Latitude" type="number" step="any" required className="rounded-2xl bg-white/55 p-3"/><input name="lng" placeholder="Longitude" type="number" step="any" required className="rounded-2xl bg-white/55 p-3"/></div><input name="recipient_name" placeholder="Recipient name" required className="w-full rounded-2xl bg-white/55 p-3"/><input name="recipient_contact" placeholder="Email or phone" required className="w-full rounded-2xl bg-white/55 p-3"/><button className="w-full rounded-full bg-rust px-5 py-4 font-semibold text-cream">Send postcard — on its way</button>{status&&<p className="rounded-2xl bg-white/60 p-3 text-sm text-cocoa">{status}</p>}</div></form>
}
