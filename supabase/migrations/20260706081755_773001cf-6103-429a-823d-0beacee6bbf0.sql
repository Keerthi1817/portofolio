UPDATE public.portfolio_settings
SET data = jsonb_set(
  data,
  '{projects}',
  (data->'projects') || '[
    {
      "id": "5",
      "title": "DigiTrack — Digital Footprint Tracker",
      "description": "A vibe-coded productivity tool that helps users visualize and manage their digital footprint across the web. Built end-to-end using AI-assisted development, showcasing rapid iteration from concept to deployed product.",
      "tags": ["Vibe Coded", "React", "Lovable", "AI-Assisted"],
      "link": "https://digitracker-tool.lovable.app",
      "linkEnabled": true,
      "image": ""
    },
    {
      "id": "6",
      "title": "JobForge — AI Job Application Assistant",
      "description": "An AI-powered assistant that streamlines job applications — tailoring resumes, cover letters, and tracking outreach. Built through AI-augmented prototyping to demonstrate speed from idea to shipped MVP.",
      "tags": ["Vibe Coded", "AI", "Automation", "Lovable"],
      "link": "https://jobforgex.lovable.app",
      "linkEnabled": true,
      "image": ""
    },
    {
      "id": "7",
      "title": "This Portfolio — AI-Native Build",
      "description": "The site you are on right now. React + Tailwind frontend, Lovable Cloud backend for admin-managed content, containerized with Docker and auto-deployed via GitHub Actions to a self-hosted Oracle server.",
      "tags": ["Vibe Coded", "React", "Docker", "CI/CD"],
      "link": "https://kunalx.is-a.dev",
      "linkEnabled": true,
      "image": ""
    }
  ]'::jsonb),
  updated_at = now()
WHERE id = 'main';