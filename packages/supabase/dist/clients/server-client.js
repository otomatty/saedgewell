'use strict';

var chunkNFYSH2V6_js = require('../chunk-NFYSH2V6.js');
require('../chunk-DDAAVRWG.js');
require('server-only');
var headers = require('next/headers');
var ssr = require('@supabase/ssr');

function getSupabaseServerClient() {
  const keys = chunkNFYSH2V6_js.getSupabaseClientKeys();
  return ssr.createServerClient(keys.url, keys.anonKey, {
    cookies: {
      async getAll() {
        const cookieStore = await headers.cookies();
        return cookieStore.getAll();
      },
      async setAll(cookiesToSet) {
        const cookieStore = await headers.cookies();
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

exports.getSupabaseServerClient = getSupabaseServerClient;
//# sourceMappingURL=server-client.js.map
//# sourceMappingURL=server-client.js.map