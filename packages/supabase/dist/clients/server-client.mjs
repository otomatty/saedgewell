import { getSupabaseClientKeys } from '../chunk-YRL4GUPF.mjs';
import '../chunk-FJBZBVPE.mjs';
import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

function getSupabaseServerClient() {
  const keys = getSupabaseClientKeys();
  return createServerClient(keys.url, keys.anonKey, {
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
        } catch (e) {
        }
      }
    }
  });
}

export { getSupabaseServerClient };
//# sourceMappingURL=server-client.mjs.map
//# sourceMappingURL=server-client.mjs.map