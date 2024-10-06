import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL
      && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
    }
    else {
      throw new Error(
        'Missing env vars: NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL ',
      );
    }
  }
  catch {
    throw new Error('[CLIENT] Failed to create Supabase client');
  }
}
