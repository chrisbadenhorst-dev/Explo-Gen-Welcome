import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null | undefined;

/**
 * Server-only Supabase client using the secret key (Supabase's current
 * dashboard naming for the full-access server key — formerly "service_role").
 * Falls back to SUPABASE_SERVICE_ROLE_KEY for older projects that still use
 * that name. Never imported from a Client Component. Returns null when
 * Supabase isn't configured yet, so the app can fall back to the in-memory
 * demo data (see lib/invitations.ts).
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  if (cachedClient !== undefined) return cachedClient;

  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) {
    cachedClient = null;
    return cachedClient;
  }

  cachedClient = createClient(url, secretKey, {
    auth: { persistSession: false },
  });
  return cachedClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.SUPABASE_URL && (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY),
  );
}
