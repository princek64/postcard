# Postcard Travel Diary

A Next.js MVP for sending stylized digital postcards and collecting them on a personal memory map.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local` and Vercel.
4. Create a storage bucket for uploaded postcard photos when you replace the current URL-based compose field with file upload.

Without Supabase env vars, the app falls back to demo postcard data so the UI can still be reviewed.

## Deploying to Vercel

Set these environment variables in Vercel before deploying:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_MAPBOX_TOKEN` if you wire the dashboard to a live Mapbox map
- `NEXT_PUBLIC_SITE_URL`

Then deploy with the default Next.js settings. Vercel will run `npm install` and `npm run build`.
