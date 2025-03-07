import { User } from '@supabase/supabase-js';
import { z, ZodType } from 'zod';

/**
 * @name enhanceAction
 * @description Enhance an action with captcha, schema and auth checks
 */
declare function enhanceAction<Args, Response, Config extends {
    auth?: boolean;
    captcha?: boolean;
    schema?: z.ZodType<Config['captcha'] extends true ? Args & {
        captchaToken: string;
    } : Args, z.ZodTypeDef>;
}>(fn: (params: Config['schema'] extends ZodType ? z.infer<Config['schema']> : Args, user: Config['auth'] extends false ? undefined : User) => Response | Promise<Response>, config: Config): (params: Config["schema"] extends ZodType ? z.infer<Config["schema"]> : Args) => Promise<Response>;

export { enhanceAction };
