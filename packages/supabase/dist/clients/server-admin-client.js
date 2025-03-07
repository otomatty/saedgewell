'use strict';

var chunkNFYSH2V6_js = require('../chunk-NFYSH2V6.js');
require('../chunk-DDAAVRWG.js');
require('server-only');
var supabaseJs = require('@supabase/supabase-js');

var message = "Invalid Supabase Service Role Key. Please add the environment variable SUPABASE_SERVICE_ROLE_KEY.";
function getServiceRoleKey() {
  return chunkNFYSH2V6_js.z.string({
    required_error: message
  }).min(1, {
    message
  }).parse(process.env.SUPABASE_SERVICE_ROLE_KEY);
}
function warnServiceRoleKeyUsage() {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[Dev Only] This is a simple warning to let you know you are using the Supabase Service Role. Make sure it's the right call.`
    );
  }
}

// src/clients/server-admin-client.ts
function getSupabaseServerAdminClient() {
  warnServiceRoleKeyUsage();
  const url = chunkNFYSH2V6_js.getSupabaseClientKeys().url;
  return supabaseJs.createClient(url, getServiceRoleKey(), {
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
      autoRefreshToken: false
    }
  });
}

exports.getSupabaseServerAdminClient = getSupabaseServerAdminClient;
//# sourceMappingURL=server-admin-client.js.map
//# sourceMappingURL=server-admin-client.js.map