/*
 * KIES 2026 — Supabase configuration
 * -------------------------------------------------------------
 * Fill these in with YOUR Supabase project's values to enable
 * symposium-wide, shared voting. Use the **anon public** key only —
 * NEVER the service_role key. Row Level Security (see supabase-setup.sql)
 * is what keeps writes safe even though this key is public.
 *
 * Find both under: Supabase Dashboard → Project Settings → API.
 *
 * If these are left blank (or supabase-js can't load, e.g. opened offline
 * via file://), the site still runs — voting falls back to a local,
 * per-device tally so the interaction is demonstrable without a backend.
 */
window.SUPABASE_URL = "";       // e.g. "https://abcdefgh.supabase.co"
window.SUPABASE_ANON_KEY = "";  // the anon / public key (safe to expose with RLS)
