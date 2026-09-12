import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, RotateCcw, Plus, Trash2, Terminal, Lock, Eye, EyeOff, Calendar as CalendarIcon, ArrowUp, ArrowDown as ArrowDownIcon } from "lucide-react";
import { PortfolioData, getDefaultPortfolioData } from "@/lib/portfolio-data";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Admin() {
  const { data: dbData, loading: dbLoading, saveData, resetData } = usePortfolioData();
  const [data, setData] = useState<PortfolioData>(getDefaultPortfolioData());
  const [tab, setTab] = useState<string>("hero");
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const session = sessionStorage.getItem("admin-auth");
    if (session === "true") setAuthenticated(true);
  }, []);

  useEffect(() => {
    if (!dbLoading) setData(dbData);
  }, [dbData, dbLoading]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validEmail = data.adminEmail || "admin@portfolio.local";
    const validPassword = data.adminPassword || "admin123";
    if (email === validEmail && password === validPassword) {
      setAuthenticated(true);
      sessionStorage.setItem("admin-auth", "true");
      sessionStorage.setItem("admin-pw", password);
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-8 w-full max-w-sm glow-box"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Admin Portal</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-display text-muted-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-secondary border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="admin@portfolio.local"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-display text-muted-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-secondary border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary pr-10"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_20px_hsl(175_80%_50%/0.3)] transition-all"
            >
              Sign In
            </button>
          </form>
          <Link to="/" className="block text-center text-sm text-muted-foreground mt-4 hover:text-primary transition-colors">
            ← Back to Portfolio
          </Link>
        </motion.div>
      </div>
    );
  }

  const save = async () => {
    await saveData(data);
    toast.success("Portfolio updated!");
  };

  const reset = async () => {
    if (!confirm("Reset ALL portfolio content to defaults? This deletes the saved row in the database and cannot be undone.")) return;
    await resetData();
    setData(getDefaultPortfolioData());
    toast.success("Reset to defaults");
  };

  const tabs = ["hero", "about", "projects", "impact", "skills", "experience", "education", "certifications", "articles", "contact", "meetings", "resume", "settings"] as const;

  return (
    <div className="min-h-screen bg-background">
      <div className="glass border-b border-border/30 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 font-display font-bold">
              <Terminal className="w-5 h-5 text-primary" />
              <span>Admin Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground border border-border hover:border-destructive transition-all">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button onClick={save} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_20px_hsl(175_80%_50%/0.3)] transition-all">
              <Save className="w-4 h-4" /> Save
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-display capitalize transition-all ${
                tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {tab === "hero" && <HeroEditor data={data} setData={setData} />}
          {tab === "about" && <AboutEditor data={data} setData={setData} />}
          {tab === "projects" && <ProjectsEditor data={data} setData={setData} />}
          {tab === "impact" && <ImpactEditor data={data} setData={setData} />}
          {tab === "skills" && <SkillsEditor data={data} setData={setData} />}
          {tab === "experience" && <ExperienceEditor data={data} setData={setData} />}
          {tab === "education" && <EducationEditor data={data} setData={setData} />}
          {tab === "certifications" && <CertificationsEditor data={data} setData={setData} />}
          {tab === "articles" && <ArticlesEditor data={data} setData={setData} />}
          {tab === "contact" && <ContactEditor data={data} setData={setData} />}
          {tab === "meetings" && <MeetingsEditor data={data} setData={setData} />}
          {tab === "resume" && <ResumeEditor data={data} setData={setData} />}
          {tab === "settings" && <SettingsEditor data={data} setData={setData} />}
        </motion.div>
      </div>
    </div>
  );
}

type EditorProps = { data: PortfolioData; setData: (d: PortfolioData) => void };

function Field({ label, value, onChange, multiline, placeholder }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-display text-muted-foreground mb-2">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} placeholder={placeholder} className="w-full rounded-lg bg-secondary border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-muted-foreground/50" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg bg-secondary border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50" />
      )}
    </div>
  );
}

function HeroEditor({ data, setData }: EditorProps) {
  const update = (key: keyof typeof data.hero, val: string) => setData({ ...data, hero: { ...data.hero, [key]: val } });
  return (
    <div className="glass rounded-xl p-6">
      <h3 className="font-display font-semibold text-lg mb-6">Hero Section</h3>
      <Field label="Name" value={data.hero.name} onChange={(v) => update("name", v)} />
      <Field label="Title" value={data.hero.title} onChange={(v) => update("title", v)} />
      <Field label="Subtitle" value={data.hero.subtitle} onChange={(v) => update("subtitle", v)} multiline />
      <Field label="CTA Button Text" value={data.hero.cta} onChange={(v) => update("cta", v)} />
    </div>
  );
}

function AboutEditor({ data, setData }: EditorProps) {
  const updateBio = (v: string) => setData({ ...data, about: { ...data.about, bio: v } });
  const updateHighlight = (i: number, v: string) => {
    const h = [...data.about.highlights];
    h[i] = v;
    setData({ ...data, about: { ...data.about, highlights: h } });
  };
  const addHighlight = () => setData({ ...data, about: { ...data.about, highlights: [...data.about.highlights, ""] } });
  const removeHighlight = (i: number) => setData({ ...data, about: { ...data.about, highlights: data.about.highlights.filter((_, idx) => idx !== i) } });

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="font-display font-semibold text-lg mb-6">About Section</h3>
      <Field label="Bio" value={data.about.bio} onChange={updateBio} multiline />
      <Field label="About Image URL" value={data.about.image} onChange={(v) => setData({ ...data, about: { ...data.about, image: v } })} placeholder="https://..." />
      <div className="mb-4">
        <label className="block text-sm font-display text-muted-foreground mb-2">Highlights</label>
        {data.about.highlights.map((h, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input value={h} onChange={(e) => updateHighlight(i, e.target.value)} className="flex-1 rounded-lg bg-secondary border border-border px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            <button onClick={() => removeHighlight(i)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        <button onClick={addHighlight} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 mt-2"><Plus className="w-4 h-4" /> Add Highlight</button>
      </div>
    </div>
  );
}

function ProjectsEditor({ data, setData }: EditorProps) {
  const updateProject = (i: number, key: string, val: string | boolean) => {
    const p = [...data.projects];
    p[i] = { ...p[i], [key]: val };
    setData({ ...data, projects: p });
  };
  const updateTags = (i: number, val: string) => {
    const p = [...data.projects];
    p[i] = { ...p[i], tags: val.split(",").map((t) => t.trim()) };
    setData({ ...data, projects: p });
  };
  const addProject = () => setData({ ...data, projects: [...data.projects, { id: Date.now().toString(), title: "", description: "", tags: [], link: "", linkEnabled: true, image: "" }] });
  const removeProject = (i: number) => setData({ ...data, projects: data.projects.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg">Projects</h3>
        <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"><Plus className="w-4 h-4" /> Add Project</button>
      </div>
      {data.projects.map((p, i) => (
        <div key={p.id} className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground font-mono">Project {i + 1}</span>
            <button onClick={() => removeProject(i)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
          </div>
          <Field label="Title" value={p.title} onChange={(v) => updateProject(i, "title", v)} />
          <Field label="Description" value={p.description} onChange={(v) => updateProject(i, "description", v)} multiline />
          <Field label="Tags (comma-separated)" value={p.tags.join(", ")} onChange={(v) => updateTags(i, v)} />
          <Field label="Link" value={p.link} onChange={(v) => updateProject(i, "link", v)} />
          <Field label="Image URL" value={p.image} onChange={(v) => updateProject(i, "image", v)} placeholder="https://..." />
          <div className="flex items-center gap-3 mt-2">
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={p.linkEnabled !== false} onChange={(e) => updateProject(i, "linkEnabled", e.target.checked)} className="accent-primary" />
              Enable hyperlink
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsEditor({ data, setData }: EditorProps) {
  const updateCategory = (i: number, val: string) => {
    const s = [...data.skills];
    s[i] = { ...s[i], category: val };
    setData({ ...data, skills: s });
  };
  const updateItems = (i: number, val: string) => {
    const s = [...data.skills];
    s[i] = { ...s[i], items: val.split(",").map((t) => t.trim()) };
    setData({ ...data, skills: s });
  };
  const addSkill = () => setData({ ...data, skills: [...data.skills, { category: "", items: [] }] });
  const removeSkill = (i: number) => setData({ ...data, skills: data.skills.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg">Skills</h3>
        <button onClick={addSkill} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"><Plus className="w-4 h-4" /> Add Category</button>
      </div>
      {data.skills.map((s, i) => (
        <div key={i} className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => removeSkill(i)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg ml-auto"><Trash2 className="w-4 h-4" /></button>
          </div>
          <Field label="Category" value={s.category} onChange={(v) => updateCategory(i, v)} />
          <Field label="Skills (comma-separated)" value={s.items.join(", ")} onChange={(v) => updateItems(i, v)} />
        </div>
      ))}
    </div>
  );
}

function ExperienceEditor({ data, setData }: EditorProps) {
  const updateExp = (i: number, key: string, val: string) => {
    const e = [...data.experience];
    e[i] = { ...e[i], [key]: val };
    setData({ ...data, experience: e });
  };
  const updateMetrics = (i: number, val: string) => {
    const e = [...data.experience];
    e[i] = { ...e[i], metrics: val.split("\n").map((s) => s.trim()).filter(Boolean) };
    setData({ ...data, experience: e });
  };
  const addExp = () => setData({ ...data, experience: [...data.experience, { id: Date.now().toString(), role: "", company: "", period: "", description: "", metrics: [] }] });
  const removeExp = (i: number) => setData({ ...data, experience: data.experience.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg">Experience</h3>
        <button onClick={addExp} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"><Plus className="w-4 h-4" /> Add Experience</button>
      </div>
      <p className="text-xs text-muted-foreground -mt-2">Tip: keep metrics rounded and non-attributable (e.g. "~60% faster", "10k+ queries/month"). Never include client names, contract values, or unpublished internal KPIs.</p>
      {data.experience.map((e, i) => (
        <div key={e.id} className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground font-mono">Experience {i + 1}</span>
            <button onClick={() => removeExp(i)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
          </div>
          <Field label="Role" value={e.role} onChange={(v) => updateExp(i, "role", v)} />
          <Field label="Company" value={e.company} onChange={(v) => updateExp(i, "company", v)} />
          <Field label="Period" value={e.period} onChange={(v) => updateExp(i, "period", v)} />
          <Field label="Description" value={e.description} onChange={(v) => updateExp(i, "description", v)} multiline />
          <Field
            label="Metrics (one per line, abstracted numbers only)"
            value={(e.metrics || []).join("\n")}
            onChange={(v) => updateMetrics(i, v)}
            multiline
            placeholder={"Reduced manual review effort ~60%\nSelf-hosted 4+ LLMs on H100 cluster"}
          />
        </div>
      ))}
    </div>
  );
}

function EducationEditor({ data, setData }: EditorProps) {
  const edu = data.education || [];
  const updateEdu = (i: number, key: string, val: string) => {
    const e = [...edu];
    e[i] = { ...e[i], [key]: val };
    setData({ ...data, education: e });
  };
  const addEdu = () => setData({ ...data, education: [...edu, { id: Date.now().toString(), degree: "", institution: "", period: "", description: "", logoUrl: "" }] });
  const removeEdu = (i: number) => setData({ ...data, education: edu.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg">Education</h3>
        <button onClick={addEdu} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"><Plus className="w-4 h-4" /> Add Education</button>
      </div>
      {edu.map((e, i) => (
        <div key={e.id} className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground font-mono">Education {i + 1}</span>
            <button onClick={() => removeEdu(i)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
          </div>
          <Field label="Degree / Program" value={e.degree} onChange={(v) => updateEdu(i, "degree", v)} />
          <Field label="Institution" value={e.institution} onChange={(v) => updateEdu(i, "institution", v)} />
          <Field label="Period" value={e.period} onChange={(v) => updateEdu(i, "period", v)} />
          <Field label="Description" value={e.description} onChange={(v) => updateEdu(i, "description", v)} multiline />
          <Field label="Logo URL" value={e.logoUrl} onChange={(v) => updateEdu(i, "logoUrl", v)} placeholder="https://example.com/logo.png" />
        </div>
      ))}
    </div>
  );
}

function CertificationsEditor({ data, setData }: EditorProps) {
  const certs = data.certifications || [];
  const updateCert = (i: number, key: string, val: string) => {
    const c = [...certs];
    c[i] = { ...c[i], [key]: val };
    setData({ ...data, certifications: c });
  };
  const addCert = () => setData({ ...data, certifications: [...certs, { id: Date.now().toString(), name: "", issuer: "", date: "", credentialUrl: "", logoUrl: "" }] });
  const removeCert = (i: number) => setData({ ...data, certifications: certs.filter((_, idx) => idx !== i) });
  const moveCert = (from: number, to: number) => {
    if (to < 0 || to >= certs.length) return;
    const c = [...certs];
    const [item] = c.splice(from, 1);
    c.splice(to, 0, item);
    setData({ ...data, certifications: c });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg">Certifications</h3>
        <button onClick={addCert} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"><Plus className="w-4 h-4" /> Add Certification</button>
      </div>
      {certs.map((c, i) => (
        <div key={c.id} className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-mono">#{i + 1}</span>
              <button onClick={() => moveCert(i, i - 1)} disabled={i === 0} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ArrowUp className="w-4 h-4" /></button>
              <button onClick={() => moveCert(i, i + 1)} disabled={i === certs.length - 1} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ArrowDownIcon className="w-4 h-4" /></button>
            </div>
            <button onClick={() => removeCert(i)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
          </div>
          <Field label="Certification Name" value={c.name} onChange={(v) => updateCert(i, "name", v)} />
          <Field label="Issuer" value={c.issuer} onChange={(v) => updateCert(i, "issuer", v)} />
          <Field label="Date" value={c.date} onChange={(v) => updateCert(i, "date", v)} placeholder="2023" />
          <Field label="Credential URL" value={c.credentialUrl} onChange={(v) => updateCert(i, "credentialUrl", v)} placeholder="https://..." />
          <Field label="Logo URL" value={c.logoUrl} onChange={(v) => updateCert(i, "logoUrl", v)} placeholder="https://example.com/logo.png" />
        </div>
      ))}
    </div>
  );
}

function ArticlesEditor({ data, setData }: EditorProps) {
  const articles = data.articles || [];
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const updateArticle = (i: number, key: string, val: string) => {
    const a = [...articles];
    a[i] = { ...a[i], [key]: val };
    setData({ ...data, articles: a });
  };

  const updateArticleDate = (i: number, date: Date | undefined) => {
    if (date) {
      const formatted = format(date, "MMM d, yyyy");
      updateArticle(i, "date", formatted);
    }
  };

  const addArticle = () => setData({ ...data, articles: [...articles, { id: Date.now().toString(), title: "", description: "", url: "", date: "", source: "Blog" }] });
  const removeArticle = (i: number) => setData({ ...data, articles: articles.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6">
        <h3 className="font-display font-semibold text-lg mb-4">Medium Integration</h3>
        <Field
          label="Medium Username (articles will be auto-fetched)"
          value={data.mediumUsername || ""}
          onChange={(v) => setData({ ...data, mediumUsername: v })}
          placeholder="@username or username"
        />
        <p className="text-xs text-muted-foreground">Articles from your Medium profile will be fetched automatically via RSS.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-lg">Manual Articles</h3>
          <button onClick={addArticle} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"><Plus className="w-4 h-4" /> Add Article</button>
        </div>
        {articles.map((a, i) => (
          <div key={a.id} className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground font-mono">Article {i + 1}</span>
              <button onClick={() => removeArticle(i)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
            <Field label="Title" value={a.title} onChange={(v) => updateArticle(i, "title", v)} />
            <Field label="Description" value={a.description} onChange={(v) => updateArticle(i, "description", v)} multiline />
            <Field label="URL" value={a.url} onChange={(v) => updateArticle(i, "url", v)} />
            
            <div className="mb-4">
              <label className="block text-sm font-display text-muted-foreground mb-2">Date</label>
              <Popover 
                open={editingIndex === i} 
                onOpenChange={(open) => setEditingIndex(open ? i : null)}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !a.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {a.date || <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={a.date ? new Date(a.date) : undefined}
                    onSelect={(date) => {
                      updateArticleDate(i, date);
                      setEditingIndex(null);
                    }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Field label="Source" value={a.source} onChange={(v) => updateArticle(i, "source", v)} placeholder="Blog, Medium, Dev.to, etc." />
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactEditor({ data, setData }: EditorProps) {
  const update = (key: keyof typeof data.contact, val: string) => setData({ ...data, contact: { ...data.contact, [key]: val } });
  return (
    <div className="glass rounded-xl p-6">
      <h3 className="font-display font-semibold text-lg mb-6">Contact Info</h3>
      <Field label="Email" value={data.contact.email} onChange={(v) => update("email", v)} />
      <Field label="GitHub URL" value={data.contact.github} onChange={(v) => update("github", v)} />
      <Field label="LinkedIn URL" value={data.contact.linkedin} onChange={(v) => update("linkedin", v)} />
      <Field label="Cal.com Embed URL (e.g. https://cal.com/username/30min)" value={data.contact.calcom} onChange={(v) => update("calcom", v)} />
    </div>
  );
}

function ResumeEditor({ data, setData }: EditorProps) {
  const rh = data.resumeHighlights || { summary: "", bullets: [], stack: [] };
  const update = (key: string, val: any) =>
    setData({ ...data, resumeHighlights: { ...rh, [key]: val } });

  return (
    <div className="space-y-4">
      <div className="glass rounded-xl p-6">
        <h3 className="font-display font-semibold text-lg mb-2">Resume Highlights</h3>
        <p className="text-xs text-muted-foreground mb-6">
          Shown on the portfolio as a concise set of career highlights.
        </p>
        <Field label="Summary" value={rh.summary} onChange={(v) => update("summary", v)} multiline />
        <Field
          label="Highlights (one per line)"
          value={rh.bullets.join("\n")}
          onChange={(v) => update("bullets", v.split("\n").map((s) => s.trim()).filter(Boolean))}
          multiline
          placeholder={"Built enterprise RAG on Azure OpenAI\nSelf-hosted LLMs on H100 cluster"}
        />
        <Field
          label="Core stack (comma-separated)"
          value={rh.stack.join(", ")}
          onChange={(v) => update("stack", v.split(",").map((s) => s.trim()).filter(Boolean))}
          placeholder="Python, LangChain, Azure OpenAI, Kubernetes"
        />
      </div>

      <div className="glass rounded-xl p-6">
        <h3 className="font-display font-semibold text-sm mb-3">Backup: full PDF URL (optional, no longer rendered)</h3>
        <Field
          label="Resume PDF URL"
          value={data.resumeUrl}
          onChange={(v) => setData({ ...data, resumeUrl: v })}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Kept for backward compatibility. The site now shows the highlights card above instead of an embedded PDF.
        </p>
      </div>
    </div>
  );
}

function ImpactEditor({ data, setData }: EditorProps) {
  const impact = data.impact || [];
  const updateKpi = (i: number, key: string, val: string) => {
    const arr = [...impact];
    arr[i] = { ...arr[i], [key]: val };
    setData({ ...data, impact: arr });
  };
  const addKpi = () =>
    setData({ ...data, impact: [...impact, { id: Date.now().toString(), value: "", suffix: "", label: "" }] });
  const removeKpi = (i: number) =>
    setData({ ...data, impact: impact.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg">Impact / KPI Cards</h3>
        <button onClick={addKpi} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors">
          <Plus className="w-4 h-4" /> Add KPI
        </button>
      </div>
      <p className="text-xs text-muted-foreground -mt-2">
        ⚠️ Keep numbers rounded and non-attributable. No client names, contract values, or unpublished internal KPIs. You are responsible for what you publish.
      </p>
      {impact.map((k, i) => (
        <div key={k.id} className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground font-mono">KPI {i + 1}</span>
            <button onClick={() => removeKpi(i)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Value" value={k.value} onChange={(v) => updateKpi(i, "value", v)} placeholder="60" />
            <Field label="Suffix (optional)" value={k.suffix || ""} onChange={(v) => updateKpi(i, "suffix", v)} placeholder="%+ or k+ or yrs" />
          </div>
          <Field label="Label" value={k.label} onChange={(v) => updateKpi(i, "label", v)} multiline placeholder="Faster enterprise document processing via RAG pipelines" />
        </div>
      ))}
    </div>
  );
}

function MeetingsEditor({ data, setData }: EditorProps) {
  const meetings = data.meetings || [];
  const updateM = (i: number, key: string, val: any) => {
    const arr = [...meetings];
    arr[i] = { ...arr[i], [key]: val };
    setData({ ...data, meetings: arr });
  };
  const addM = () =>
    setData({
      ...data,
      meetings: [
        ...meetings,
        { id: Date.now().toString(), title: "", duration: "30 min", price: "", priceLabel: "", reason: "", calcomUrl: "", featured: false },
      ],
    });
  const removeM = (i: number) =>
    setData({ ...data, meetings: meetings.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg">Meeting Tiers</h3>
        <button onClick={addM} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors">
          <Plus className="w-4 h-4" /> Add Meeting Tier
        </button>
      </div>
      <p className="text-xs text-muted-foreground -mt-2">
        Each tier links out to its own Cal.com event. Set prices inside Cal.com's native Stripe integration — no payment code on this site.
      </p>
      {meetings.map((m, i) => (
        <div key={m.id} className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground font-mono">Tier {i + 1}</span>
            <button onClick={() => removeM(i)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <Field label="Title" value={m.title} onChange={(v) => updateM(i, "title", v)} placeholder="Technical Consultation" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Duration" value={m.duration} onChange={(v) => updateM(i, "duration", v)} placeholder="45 min" />
            <Field label="Price label (display)" value={m.priceLabel || m.price} onChange={(v) => updateM(i, "priceLabel", v)} placeholder="$90 or Free" />
          </div>
          <Field label="Reason / description" value={m.reason} onChange={(v) => updateM(i, "reason", v)} multiline placeholder="RAG, LLMOps or architecture advice for your project." />
          <Field label="Cal.com URL" value={m.calcomUrl} onChange={(v) => updateM(i, "calcomUrl", v)} placeholder="https://cal.com/you/45min" />
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer mt-2">
            <input
              type="checkbox"
              checked={!!m.featured}
              onChange={(e) => updateM(i, "featured", e.target.checked)}
              className="accent-primary"
            />
            Mark as featured / "Popular"
          </label>
        </div>
      ))}
    </div>
  );
}

function SettingsEditor({ data, setData }: EditorProps) {
  return (
    <div className="glass rounded-xl p-6">
      <h3 className="font-display font-semibold text-lg mb-6">Admin Settings</h3>
      <Field
        label="Admin Email"
        value={data.adminEmail || "admin@portfolio.local"}
        onChange={(v) => setData({ ...data, adminEmail: v })}
        placeholder="your@email.com"
      />
      <Field
        label="Admin Password"
        value={data.adminPassword || "admin123"}
        onChange={(v) => setData({ ...data, adminPassword: v })}
        placeholder="Set your admin password"
      />
      <p className="text-xs text-muted-foreground mt-2">
        Default credentials: <span className="font-mono text-primary">admin@portfolio.local</span> / <span className="font-mono text-primary">admin123</span>. 
        Change these and click Save to secure your admin portal.
      </p>
    </div>
  );
}
