'use strict';

var chunkNFYSH2V6_js = require('../chunk-NFYSH2V6.js');
require('../chunk-DDAAVRWG.js');
var ssr = require('@supabase/ssr');

function getSupabaseBrowserClient() {
  const keys = chunkNFYSH2V6_js.getSupabaseClientKeys();
  return ssr.createBrowserClient(keys.url, keys.anonKey);
}

exports.getSupabaseBrowserClient = getSupabaseBrowserClient;
//# sourceMappingURL=browser-client.js.map
//# sourceMappingURL=browser-client.js.map