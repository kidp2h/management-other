import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });
if (!process.env.DATABASE_URL) {
  throw new Error('Missing env var: DATABASE_URL');
}
export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/lib/supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
