import { zodParseFactory } from '../chunk-WR2JIB65.mjs';
import { redirect } from 'next/navigation';
import { verifyCaptchaToken } from '@kit/auth/captcha/server';
import { requireUser } from '@kit/supabase/require-user';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

var enhanceRouteHandler = (handler, params) => {
  return async function routeHandler(request, routeParams) {
    var _a, _b;
    let user = void 0;
    const shouldVerifyCaptcha = (_a = params == null ? void 0 : params.captcha) != null ? _a : false;
    if (shouldVerifyCaptcha) {
      const token = captchaTokenGetter(request);
      if (token) {
        await verifyCaptchaToken(token);
      } else {
        return new Response("Captcha token is required", { status: 400 });
      }
    }
    const client = getSupabaseServerClient();
    const shouldVerifyAuth = (_b = params == null ? void 0 : params.auth) != null ? _b : true;
    if (shouldVerifyAuth) {
      const auth = await requireUser(client);
      if (auth.error) {
        return redirect(auth.redirectTo);
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

export { enhanceRouteHandler };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map