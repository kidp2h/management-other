import { createBrowserClient } from '@supabase/ssr';

import type { Database } from './database.types';

export function createClient() {
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
    } else {
      throw new Error(
        'Missing env vars: NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL ',
      );
    }
  } catch {
    throw new Error('[CLIENT] Failed to create Supabase client');
  }
}
