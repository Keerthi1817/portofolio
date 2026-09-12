import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Rss } from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  date: string;
  source: string;
}

function formatDate(d: string) {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

const CACHE_MAX_AGE_MS = 60 * 60 * 1000; // 1 hour

export function ArticlesSection() {
  const { data } = usePortfolioData();
  const [mediumArticles, setMediumArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data.mediumUsername) {
      setMediumArticles([]);
      return;
    }

    const cached = (data.cachedMediumArticles || []) as Article[];
    if (cached.length > 0) setMediumArticles(cached);

    const cachedAt = data.mediumCachedAt ? new Date(data.mediumCachedAt).getTime() : 0;
    const isStale = Date.now() - cachedAt > CACHE_MAX_AGE_MS;

    if (isStale) {
      setLoading(cached.length === 0);
      supabase.functions
        .invoke("fetch-medium-articles")
        .then(({ data: res, error }) => {
          if (error) throw error;
          if (res?.articles) setMediumArticles(res.articles as Article[]);
        })
        .catch((err) => console.error("Failed to fetch Medium articles:", err))
        .finally(() => setLoading(false));
    }
  }, [data.mediumUsername, data.cachedMediumArticles, data.mediumCachedAt]);

  const manualArticles = data.articles || [];
  const allArticles = [
    ...manualArticles,
    ...mediumArticles.map((a) => ({ ...a, date: formatDate(a.date) })),
  ];

  if (allArticles.length === 0 && !loading && !data.mediumUsername) return null;

  return (
    <section id="articles" className="py-32 px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-display uppercase tracking-widest text-primary mb-4">Articles</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-12">
            Thoughts & <span className="gradient-text">writings</span>
          </h3>
        </motion.div>

        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground mb-8">
            <Rss className="w-4 h-4 animate-pulse" />
            <span className="text-sm">Fetching articles from Medium...</span>
          </div>
        )}

        {allArticles.length === 0 && !loading ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-12 text-center"
          >
            <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">
              Articles will appear here. Add your Medium username or manual articles in the admin portal.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allArticles.map((article, i) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group glass rounded-xl p-6 hover:border-primary/30 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">
                    {article.source}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h4 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{article.description}</p>
                <div className="flex items-center gap-1 mt-4 text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Read article</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
