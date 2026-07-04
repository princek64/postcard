'use client';
import { Canvas } from '@react-three/fiber';
import { useMemo, useState } from 'react';
import type { Postcard } from '@/lib/types';

function CardMesh({ flipped }: { flipped: boolean }) {
  return <mesh rotation={[0, flipped ? Math.PI : 0, 0]}><boxGeometry args={[3.6, 2.35, .05]} /><meshStandardMaterial color={flipped ? '#f3dfbf' : '#d88a55'} roughness={.65} /></mesh>;
}
export function Postcard3D({ postcard }: { postcard: Postcard }) {
  const [flipped,setFlipped]=useState(false);
  const date=useMemo(()=>new Intl.DateTimeFormat('en',{month:'short',day:'numeric',year:'numeric'}).format(new Date(postcard.created_at)),[postcard.created_at]);
  return <section className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] items-center">
    <button aria-label="Flip postcard" onClick={()=>setFlipped(!flipped)} className="h-[360px] rounded-[2rem] bg-gradient-to-br from-kraft/30 to-rust/20 shadow-postcard">
      <Canvas camera={{position:[0,0,5]}}><ambientLight intensity={1.5}/><directionalLight position={[2,3,4]} intensity={1.8}/><CardMesh flipped={flipped}/></Canvas>
      <p className="-mt-12 text-sm text-cocoa/70">Click the floating card to flip it.</p>
    </button>
    <article className="relative aspect-[1.52] overflow-hidden rounded-[2rem] shadow-postcard paper">
      {!flipped ? <><img src={postcard.photo_url} alt={postcard.caption} className={`h-full w-full object-cover filter-${postcard.filter_type}`} /><div className="absolute bottom-5 left-5 rounded-full bg-cream/80 px-4 py-2 text-sm font-medium text-cocoa backdrop-blur">{postcard.caption}</div></> : <div className="flex h-full flex-col justify-between p-8"><div><p className="text-sm uppercase tracking-[.25em] text-rust">{postcard.location_name}</p><p className="mt-6 font-hand text-2xl leading-relaxed">{postcard.note}</p></div><div className="flex items-end justify-between"><div><p className="text-sm text-cocoa/60">For</p><p className="text-xl font-semibold">{postcard.recipient_name}</p></div><div className="grid h-12 w-12 place-items-center rounded-full bg-rust text-cream">S</div></div></div>}
    </article>
    <p className="lg:col-span-2 text-center text-sm text-cocoa/65">Sent {date} · {postcard.opened_at ? 'Delivered and opened' : 'Delivered'}</p>
  </section>;
}
