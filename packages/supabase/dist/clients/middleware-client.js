'use strict';

var chunkNFYSH2V6_js = require('../chunk-NFYSH2V6.js');
require('../chunk-DDAAVRWG.js');
require('server-only');
var ssr = require('@supabase/ssr');

function createMiddlewareClient(request, response) {
  const keys = chunkNFYSH2V6_js.getSupabaseClientKeys();
  return ssr.createServerClient(keys.url, keys.anonKey, {
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

exports.createMiddlewareClient = createMiddlewareClient;
//# sourceMappingURL=middleware-client.js.map
//# sourceMappingURL=middleware-client.js.map