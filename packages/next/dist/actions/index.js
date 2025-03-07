'use strict';

var navigation = require('next/navigation');
var server = require('@kit/auth/captcha/server');
var requireUser = require('@kit/supabase/require-user');
var serverClient = require('@kit/supabase/server-client');

// ../../node_modules/server-only/index.js
throw new Error(
  "This module cannot be imported from a Client Component module. It should only be used from a Server Component."
);

// src/utils/index.ts
var zodParseFactory = (schema) => (data) => {
  try {
    return schema.parse(data);
  } catch (err) {
    console.error(err);
    throw new Error(`Invalid data: ${err}`);
  }
};

// src/actions/index.ts
function enhanceAction(fn, config) {
  return async (params) => {
    var _a, _b;
    const requireAuth = (_a = config.auth) != null ? _a : true;
    let user = void 0;
    const data = config.schema ? zodParseFactory(config.schema)(params) : params;
    const verifyCaptcha = (_b = config.captcha) != null ? _b : false;
    if (verifyCaptcha) {
      const token = data.captchaToken;
      await server.verifyCaptchaToken(token);
    }
    if (requireAuth) {
      const auth = await requireUser.requireUser(serverClient.getSupabaseServerClient());
      if (!auth.data) {
        navigation.redirect(auth.redirectTo);
      }
      user = auth.data;
    }
    return fn(data, user);
  };
}

exports.enhanceAction = enhanceAction;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map