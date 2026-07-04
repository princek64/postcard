import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Postcard Travel Diary', description: 'Send tactile digital postcards and map your memories.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
