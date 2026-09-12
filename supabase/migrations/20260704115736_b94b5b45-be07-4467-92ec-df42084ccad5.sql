
-- Lock down write access to portfolio_settings.
-- Public read remains open; all writes must go through the admin-portfolio edge function (service role).

DROP POLICY IF EXISTS "Allow upsert" ON public.portfolio_settings;
DROP POLICY IF EXISTS "Public read access" ON public.portfolio_settings;

-- Public read is intentional (portfolio content is displayed to all visitors)
CREATE POLICY "Public read access"
  ON public.portfolio_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- No INSERT/UPDATE/DELETE policies for anon/authenticated => all writes denied.
-- The service role (used by the admin-portfolio edge function) bypasses RLS.

-- Tighten grants: remove write privileges from anon/authenticated.
REVOKE INSERT, UPDATE, DELETE ON public.portfolio_settings FROM anon, authenticated, public;
GRANT SELECT ON public.portfolio_settings TO anon, authenticated;
GRANT ALL ON public.portfolio_settings TO service_role;
