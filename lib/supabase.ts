import { env } from './env';

type Query = Record<string, string | number | boolean | undefined>;

function requireConfig() {
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them in Vercel and your local .env file.');
  }
  return { url: env.supabaseUrl.replace(/\/$/, ''), key: env.supabaseAnonKey };
}

export async function supabaseFetch<T>(path: string, options: RequestInit & { query?: Query } = {}): Promise<T> {
  const { url, key } = requireConfig();
  const requestUrl = new URL(`${url}/rest/v1/${path}`);
  Object.entries(options.query ?? {}).forEach(([name, value]) => {
    if (value !== undefined) requestUrl.searchParams.set(name, String(value));
  });
  const response = await fetch(requestUrl, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...options.headers,
    },
  });
  if (!response.ok) throw new Error(`Supabase request failed: ${response.status} ${await response.text()}`);
  return response.json() as Promise<T>;
}
