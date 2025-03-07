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

// src/routes/index.ts
var enhanceRouteHandler = (handler, params) => {
  return async function routeHandler(request, routeParams) {
    var _a, _b;
    let user = void 0;
    const shouldVerifyCaptcha = (_a = params == null ? void 0 : params.captcha) != null ? _a : false;
    if (shouldVerifyCaptcha) {
      const token = captchaTokenGetter(request);
      if (token) {
        await server.verifyCaptchaToken(token);
      } else {
        return new Response("Captcha token is required", { status: 400 });
      }
    }
    const client = serverClient.getSupabaseServerClient();
    const shouldVerifyAuth = (_b = params == null ? void 0 : params.auth) != null ? _b : true;
    if (shouldVerifyAuth) {
      const auth = await requireUser.requireUser(client);
      if (auth.error) {
        return navigation.redirect(auth.redirectTo);
      }
      user = auth.data;
    }
    let body = void 0;
    if (params == null ? void 0 : params.schema) {
      const json = await request.clone().json();
      body = zodParseFactory(params.schema)(
        json
      );
    }
    return handler({
      request,
      body,
      user,
      params: await routeParams.params
    });
  };
};
function captchaTokenGetter(request) {
  return request.headers.get("x-captcha-token");
}

exports.enhanceRouteHandler = enhanceRouteHandler;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map