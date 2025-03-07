import { getSupabaseClientKeys } from '../chunk-YRL4GUPF.mjs';
import '../chunk-FJBZBVPE.mjs';
import 'server-only';
import { createServerClient } from '@supabase/ssr';

function createMiddlewareClient(request, response) {
  const keys = getSupabaseClientKeys();
  return createServerClient(keys.url, keys.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      }
    }
  });
}

export { createMiddlewareClient };
//# sourceMappingURL=middleware-client.mjs.map
//# sourceMappingURL=middleware-client.mjs.map