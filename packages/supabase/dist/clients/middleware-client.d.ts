import * as _supabase_supabase_js from '@supabase/supabase-js';
import * as _supabase_supabase_js_dist_module_lib_types from '@supabase/supabase-js/dist/module/lib/types';
import { NextRequest, NextResponse } from 'next/server';
import { Database } from '../database.types.js';

/**
 * Creates a middleware client for Supabase.
 *
 * @param {NextRequest} request - The Next.js request object.
 * @param {NextResponse} response - The Next.js response object.
 */
declare function createMiddlewareClient<GenericSchema = Database>(request: NextRequest, response: NextResponse): _supabase_supabase_js.SupabaseClient<GenericSchema, "public" extends keyof GenericSchema ? keyof GenericSchema & "public" : string & keyof GenericSchema, GenericSchema["public" extends keyof GenericSchema ? keyof GenericSchema & "public" : string & keyof GenericSchema] extends _supabase_supabase_js_dist_module_lib_types.GenericSchema ? GenericSchema["public" extends keyof GenericSchema ? keyof GenericSchema & "public" : string & keyof GenericSchema] : any>;

export { createMiddlewareClient };
