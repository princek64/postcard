export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
};

export function hasSupabaseConfig() {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}
