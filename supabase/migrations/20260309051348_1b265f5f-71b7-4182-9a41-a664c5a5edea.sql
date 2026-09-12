
-- Create portfolio_settings table with a single-row design
CREATE TABLE public.portfolio_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read (public portfolio)
CREATE POLICY "Public read access"
  ON public.portfolio_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can insert/update (admin uses anon key, no auth required for this simple portfolio)
CREATE POLICY "Allow upsert"
  ON public.portfolio_settings
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
