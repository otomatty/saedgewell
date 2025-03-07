import { SupabaseClient, User } from '@supabase/supabase-js';

/**
 * @name requireUser
 * @description Require a session to be present in the request
 * @param client
 */
declare function requireUser(client: SupabaseClient): Promise<{
    error: null;
    data: User;
} | ({
    error: AuthenticationError;
    data: null;
    redirectTo: string;
} | {
    error: MultiFactorAuthError;
    data: null;
    redirectTo: string;
})>;
declare class AuthenticationError extends Error {
    constructor();
}
declare class MultiFactorAuthError extends Error {
    constructor();
}

export { requireUser };
