import { SupabaseClient } from '@supabase/supabase-js';

/**
 * @name createAuthCallbackService
 * @description Creates an instance of the AuthCallbackService
 * @param client
 */
declare function createAuthCallbackService(client: SupabaseClient): AuthCallbackService;
/**
 * @name AuthCallbackService
 * @description Service for handling auth callbacks in Supabase
 *
 * This service handles a variety of situations and edge cases in Supabase Auth.
 *
 */
declare class AuthCallbackService {
    private readonly client;
    constructor(client: SupabaseClient);
    /**
     * @name verifyTokenHash
     * @description Verifies the token hash and type and redirects the user to the next page
     * This should be used when using a token hash to verify the user's email
     * @param request
     * @param params
     */
    verifyTokenHash(request: Request, params: {
        redirectPath: string;
        errorPath?: string;
    }): Promise<URL>;
    /**
     * @name exchangeCodeForSession
     * @description Exchanges the auth code for a session and redirects the user to the next page or an error page
     * @param request
     * @param params
     */
    exchangeCodeForSession(request: Request, params: {
        redirectPath: string;
        errorPath?: string;
    }): Promise<{
        nextPath: string;
    }>;
}

export { createAuthCallbackService };
