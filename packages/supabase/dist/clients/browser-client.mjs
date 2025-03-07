import { getSupabaseClientKeys } from '../chunk-YRL4GUPF.mjs';
import '../chunk-FJBZBVPE.mjs';
import { createBrowserClient } from '@supabase/ssr';

function getSupabaseBrowserClient() {
  const keys = getSupabaseClientKeys();
  return createBrowserClient(keys.url, keys.anonKey);
}

export { getSupabaseBrowserClient };
//# sourceMappingURL=browser-client.mjs.map
//# sourceMappingURL=browser-client.mjs.map