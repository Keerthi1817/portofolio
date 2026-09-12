import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

export function AboutSection() {
  const { data: { about } } = usePortfolioData();
  const highlights = [
    "Built RAG and agentic AI pipelines for industrial use cases",
    "Built an AI system that reads VFD electrical wiring diagrams and traces signal paths, reducing manual effort by 95%.",
    "For my M.Tech thesis, fine-tuned and evaluated LLMs, exceeding a BERTScore benchmark by 19.7%.",
    "Turned highly unstructured industrial data into clear Power BI dashboards and decision-ready insights.",
  ];

  return (
    <section id="about" className="py-32 px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-display uppercase tracking-widest text-primary mb-4">About</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-8">
            Building impactful <span className="gradient-text">AI solutions</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3"
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{about.bio}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="glass rounded-xl p-6 glow-box">
              <h4 className="font-display font-semibold mb-4 text-foreground">Highlights</h4>
              <ul className="space-y-3">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
