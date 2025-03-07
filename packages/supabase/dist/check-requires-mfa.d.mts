import { SupabaseClient } from '@supabase/supabase-js';

/**
 * @name checkRequiresMultiFactorAuthentication
 * @description Checks if the current session requires multi-factor authentication.
 * We do it by checking that the next assurance level is AAL2 and that the current assurance level is not AAL2.
 * @param client
 */
declare function checkRequiresMultiFactorAuthentication(client: SupabaseClient): Promise<boolean>;

export { checkRequiresMultiFactorAuthentication };
