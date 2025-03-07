import { zodParseFactory } from '../chunk-WR2JIB65.mjs';
import { redirect } from 'next/navigation';
import { verifyCaptchaToken } from '@kit/auth/captcha/server';
import { requireUser } from '@kit/supabase/require-user';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

function enhanceAction(fn, config) {
  return async (params) => {
    var _a, _b;
    const requireAuth = (_a = config.auth) != null ? _a : true;
    let user = void 0;
    const data = config.schema ? zodParseFactory(config.schema)(params) : params;
    const verifyCaptcha = (_b = config.captcha) != null ? _b : false;
    if (verifyCaptcha) {
      const token = data.captchaToken;
      await verifyCaptchaToken(token);
    }
    if (requireAuth) {
      const auth = await requireUser(getSupabaseServerClient());
      if (!auth.data) {
        redirect(auth.redirectTo);
      }
      user = auth.data;
    }
    return fn(data, user);
  };
}

export { enhanceAction };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map