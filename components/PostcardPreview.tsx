'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Postcard } from '@/lib/types';

function ThreeCard({ flipped }: { flipped: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    const card = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.35, 0.05), new THREE.MeshStandardMaterial({ color: flipped ? '#f3dfbf' : '#d88a55', roughness: 0.65 }));
    scene.add(card);
    scene.add(new THREE.AmbientLight('#fff2df', 2));
    const light = new THREE.DirectionalLight('#ffffff', 2);
    light.position.set(2, 3, 4);
    scene.add(light);
    let frame = 0;
    const animate = () => {
      card.rotation.y += ((flipped ? Math.PI : 0) - card.rotation.y) * 0.12;
      card.rotation.x = Math.sin(Date.now() / 900) * 0.04;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();
    const resize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); renderer.dispose(); mount.removeChild(renderer.domElement); };
  }, [flipped]);
  return <div ref={mountRef} className="h-full w-full" />;
}

export function Postcard3D({ postcard }: { postcard: Postcard }) {
  const [flipped,setFlipped]=useState(false);
  const date=useMemo(()=>new Intl.DateTimeFormat('en',{month:'short',day:'numeric',year:'numeric'}).format(new Date(postcard.created_at)),[postcard.created_at]);
  return <section className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] items-center">
    <button aria-label="Flip postcard" onClick={()=>setFlipped(!flipped)} className="h-[360px] rounded-[2rem] bg-gradient-to-br from-kraft/30 to-rust/20 shadow-postcard">
      <ThreeCard flipped={flipped}/>
      <p className="-mt-12 text-sm text-cocoa/70">Click the floating card to flip it.</p>
    </button>
    <article className="relative aspect-[1.52] overflow-hidden rounded-[2rem] shadow-postcard paper">
      {!flipped ? <><img src={postcard.photo_url} alt={postcard.caption} className={`h-full w-full object-cover filter-${postcard.filter_type}`} /><div className="absolute bottom-5 left-5 rounded-full bg-cream/80 px-4 py-2 text-sm font-medium text-cocoa backdrop-blur">{postcard.caption}</div></> : <div className="flex h-full flex-col justify-between p-8"><div><p className="text-sm uppercase tracking-[.25em] text-rust">{postcard.location_name}</p><p className="mt-6 font-hand text-2xl leading-relaxed">{postcard.note}</p></div><div className="flex items-end justify-between"><div><p className="text-sm text-cocoa/60">For</p><p className="text-xl font-semibold">{postcard.recipient_name}</p></div><div className="grid h-12 w-12 place-items-center rounded-full bg-rust text-cream">S</div></div></div>}
    </article>
    <p className="lg:col-span-2 text-center text-sm text-cocoa/65">Sent {date} · {postcard.opened_at ? 'Delivered and opened' : 'Delivered'}</p>
  </section>;
}
