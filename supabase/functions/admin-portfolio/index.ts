// Admin-only portfolio write endpoint.
// Validates the caller against the adminPassword stored in portfolio_settings,
// then performs writes using the service role so table-level RLS can deny anon writes.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// Constant-time-ish string compare
function eq(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false },
  });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const action = String(body?.action ?? "");
  const password = String(body?.password ?? "");
  if (!password) return json({ error: "Missing password" }, 401);

  // Load current stored admin password
  const { data: current, error: readErr } = await admin
    .from("portfolio_settings")
    .select("data")
    .eq("id", "main")
    .maybeSingle();
  if (readErr) return json({ error: "Read failed" }, 500);

  const storedPw =
    (current?.data as any)?.adminPassword ?? "Chinamade@123!"; // default matches portfolio-data.ts
  if (!eq(password, String(storedPw))) {
    return json({ error: "Invalid credentials" }, 401);
  }

  if (action === "verify") {
    return json({ ok: true });
  }

  if (action === "save") {
    const data = body?.data;
    if (!data || typeof data !== "object") return json({ error: "Missing data" }, 400);
    const { error } = await admin.from("portfolio_settings").upsert({
      id: "main",
      data,
      updated_at: new Date().toISOString(),
    });
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  if (action === "reset") {
    const { error } = await admin.from("portfolio_settings").delete().eq("id", "main");
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  return json({ error: "Unknown action" }, 400);
});
