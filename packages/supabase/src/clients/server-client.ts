import 'server-only';

import { cookies } from 'next/headers';

import { createServerClient } from '@supabase/ssr';

import type { Database } from '../database.types';
import { getSupabaseClientKeys } from '../get-supabase-client-keys';

/**
 * @name getSupabaseServerClient
 * @description Creates a Supabase client for use in the Server.
 */
export function getSupabaseServerClient<GenericSchema = Database>() {
  const keys = getSupabaseClientKeys();

  return createServerClient<GenericSchema>(keys.url, keys.anonKey, {
    cookies: {
      async getAll() {
        const cookieStore = await cookies();

        return cookieStore.getAll();
      },
      async setAll(cookiesToSet) {
        const cookieStore = await cookies();

        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
