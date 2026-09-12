import { motion } from "framer-motion";

const experience = [
  { role: "AI Engineer", company: "Danfoss", period: "October 2025 - Present", description: "Architecting and deploying end-to-end RAG and agentic AI systems for industrial and supply-chain challenges.", metrics: ["Developed RAG chatbot and Copilot automation solutions, including Power BI dashboards from unstructured industrial data.", "Built an agentic AI pipeline for VFD wiring-diagram interpretation, reducing human intervention by 95%."] },
];

export function ExperienceSection() {
  return <section id="experience" className="py-32 px-6 relative z-10 overflow-hidden"><div className="max-w-6xl mx-auto">
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}><h2 className="text-sm font-display uppercase tracking-widest text-primary mb-4">Experience</h2><h3 className="text-3xl md:text-4xl font-display font-bold mb-12">Career <span className="gradient-text">journey</span></h3></motion.div>
    <div className="relative"><div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" /><div className="space-y-10">{experience.map((exp, i) => <motion.div key={exp.company} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex gap-6"><div className="relative flex-shrink-0"><div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-primary" /></div></div><div className="glass rounded-xl p-6 flex-1"><div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2"><h4 className="font-display font-semibold text-foreground">{exp.role}</h4><span className="text-xs text-muted-foreground font-mono">{exp.period}</span></div><p className="text-sm text-primary mb-3">{exp.company}</p><p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p><ul className="mt-4 pt-4 border-t border-border/30 space-y-2">{exp.metrics.map(metric => <li key={metric} className="flex gap-2 text-sm text-foreground/90 leading-relaxed"><span className="text-primary mt-1 flex-shrink-0">▹</span><span>{metric}</span></li>)}</ul></div></motion.div>)}</div></div>
  </div></section>;
}
