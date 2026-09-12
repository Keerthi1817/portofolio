## Plan: Portfolio expansion — Impact, Experience, Resume, Meetings

### 1. New "Impact" section (`src/components/portfolio/ImpactSection.tsx`)
Insert between `ExperienceSection` and `EducationSection` in `src/pages/Index.tsx`.

- 3–4 KPI cards with abstracted, non-confidential metrics. Defaults (editable in admin):
  - "60%+ faster" enterprise document processing
  - "10k+" internal LLM queries served/month
  - "H100" GPU cluster — multi-model self-hosted inference
  - "5+ years" production AI/ML experience
- Glassmorphism cards, large gradient numbers, cyan accent, framer-motion stagger.
- All values come from `data.impact[]` (new field) so you control wording in `/admin`.

**Safety rule we'll bake into the admin helper text:** "Use rounded, non-attributable numbers. No client names, contract values, or unpublished internal KPIs."

### 2. Enrich Experience section
- Extend `experience[]` schema with optional `metrics: string[]` per role.
- Each role renders 2–3 quantified bullets under the description, e.g. "Reduced manual doc review effort ~60%", "Self-hosted 4+ models on H100 NIM cluster".
- No client logos, no contract identifiers.

### 3. Replace resume PDF with on-page Highlights card
- Rewrite `ResumeSection.tsx` → renders a glass card with:
  - Short professional summary
  - 4–6 career highlight bullets (from `data.resumeHighlights`)
  - Core stack chips
  - CTA button: **"Request tailored resume"** → opens mailto with prefilled subject "Resume request — [Role]"
- Remove the Google Drive iframe modal and `resumeUrl` UI (keep field in schema for backward compat, just unused).
- Update memory: resume now Highlights card, no PDF.

### 4. Restructure Contact section — 4 meeting tiers
Replace the single "Pick a Time" Cal.com embed with a **tiered meeting menu**.

New `data.meetings[]` schema (editable in admin):
```
{ id, title, duration, price, priceLabel, reason, calcomUrl, featured }
```

Defaults:

| Tier | Duration | Price | Reason shown on card |
|---|---|---|---|
| Quick Intro & Networking | 15 min | Free | Say hi, see if we click |
| Career & Resume Review | 30 min | $30 | Tailored AI/ML CV + career-path feedback |
| Technical Consultation | 45 min | $90 | RAG / LLMOps / architecture advice for your project |
| Mentorship or Code Review | 60 min | $140 | 1:1 deep-dive on your codebase or interview prep |

Each tier is a glass card with: title, duration badge, price, reason, "Book on Cal.com" button → opens the tier's Cal.com event URL in a new tab. (You set per-tier prices inside Cal.com's native Stripe integration — no payment code on the site.)

Add a clear note under the grid:
> *"Have a quick question? Reach me on LinkedIn or email — I reply within 48 hours."*

Remove the inline iframe + "Pick a Time" flow.

### 5. Admin panel updates (`src/pages/Admin.tsx`)
Add tabs/sections for:
- **Impact** — CRUD list of KPI cards (label, value, suffix)
- **Resume Highlights** — summary text + bullet list editor
- **Meetings** — CRUD list of tiers (title, duration, price, reason, Cal.com URL, featured toggle)
- Experience editor gets a "Metrics" multi-line field per role
- Helper text on Impact + Experience: "Keep numbers rounded/abstracted. No client names or NDA data."

### 6. Schema / data
Update `src/lib/portfolio-data.ts` `PortfolioData` interface and `defaultData` with:
- `impact: { id, value, label, suffix? }[]`
- `experience[].metrics?: string[]`
- `resumeHighlights: { summary, bullets[], stack[] }`
- `meetings: { id, title, duration, price, priceLabel, reason, calcomUrl, featured }[]`

No DB migration needed — everything lives in the existing `portfolio_settings.data` JSONB. Defaults merge in on first load.

### 7. Files touched
- **New:** `src/components/portfolio/ImpactSection.tsx`
- **Edit:** `src/pages/Index.tsx` (mount ImpactSection)
- **Edit:** `src/components/portfolio/ExperienceSection.tsx` (render metrics)
- **Edit:** `src/components/portfolio/ResumeSection.tsx` (full rewrite → Highlights card)
- **Edit:** `src/components/portfolio/ContactSection.tsx` (tiered meeting grid)
- **Edit:** `src/lib/portfolio-data.ts` (schema + defaults)
- **Edit:** `src/pages/Admin.tsx` (new editors)
- **Edit:** memory files (resume + new meetings feature)

### Out of scope (intentional)
- No on-site Stripe checkout — Cal.com handles payments natively.
- No legal/contract review of your specific Worley NDA — you're responsible for the final wording of metrics. Admin will show a reminder.
- Resume PDF link stays in schema but is no longer rendered (easy to re-enable later).

Ready to switch to build mode when you approve.