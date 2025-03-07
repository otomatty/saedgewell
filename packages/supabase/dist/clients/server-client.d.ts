import * as _supabase_supabase_js from '@supabase/supabase-js';
import * as _supabase_supabase_js_dist_module_lib_types from '@supabase/supabase-js/dist/module/lib/types';
import { Database } from '../database.types.js';

/**
 * @name getSupabaseServerClient
 * @description Creates a Supabase client for use in the Server.
 */
declare function getSupabaseServerClient<GenericSchema = Database>(): _supabase_supabase_js.SupabaseClient<GenericSchema, "public" extends keyof GenericSchema ? keyof GenericSchema & "public" : string & keyof GenericSchema, GenericSchema["public" extends keyof GenericSchema ? keyof GenericSchema & "public" : string & keyof GenericSchema] extends _supabase_supabase_js_dist_module_lib_types.GenericSchema ? GenericSchema["public" extends keyof GenericSchema ? keyof GenericSchema & "public" : string & keyof GenericSchema] : any>;

export { getSupabaseServerClient };
