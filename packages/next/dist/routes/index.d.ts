import { NextRequest, NextResponse } from 'next/server';
import { User } from '@supabase/supabase-js';
import { z } from 'zod';

interface Config<Schema> {
    auth?: boolean;
    captcha?: boolean;
    schema?: Schema;
}
interface HandlerParams<Schema extends z.ZodType | undefined, RequireAuth extends boolean | undefined> {
    request: NextRequest;
    user: RequireAuth extends false ? undefined : User;
    body: Schema extends z.ZodType ? z.infer<Schema> : undefined;
    params: Record<string, string>;
}
/**
 * Enhanced route handler function.
 *
 * This function takes a request and parameters object as arguments and returns a route handler function.
 * The route handler function can be used to handle HTTP requests and apply additional enhancements
 * based on the provided parameters.
 *
 * Usage:
 * export const POST = enhanceRouteHandler(
 *   ({ request, body, user }) => {
 *     return new Response(`Hello, ${body.name}!`);
 *   },
 *   {
 *     schema: z.object({
 *       name: z.string(),
 *     }),
 *   },
 * );
 *
 */
declare const enhanceRouteHandler: <Body, Params extends Config<z.ZodType<Body, z.ZodTypeDef>>>(handler: ((params: HandlerParams<Params["schema"], Params["auth"]>) => NextResponse | Response) | ((params: HandlerParams<Params["schema"], Params["auth"]>) => Promise<NextResponse | Response>), params?: Params) => (request: NextRequest, routeParams: {
    params: Promise<Record<string, string>>;
}) => Promise<Response>;

export { enhanceRouteHandler };
