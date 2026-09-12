import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";

const highlights = [
  "AI Engineer with hands-on industry experience in end-to-end AI/ML and GenAI solutions.",
  "Architected RAG and agentic AI workflows for industrial and supply-chain use cases.",
  "Fine-tuned and evaluated LLMs for personalized learning, achieving a best BERTScore F1 of 0.8501 — 19.7% above benchmark.",
  "Built PBI dashboards and Data pipelines from highly unstructured industrial data.",
  "Experienced in Python, LangChain, PyTorch, TensorFlow, Power BI and production-focused AI delivery.",
];
const stack = ["Python", "PyTorch", "TensorFlow", "LangChain", "RAG", "Vector Search", "Power BI", "Prompt Engineering"];

export function ResumeSection() {
  return <section id="resume" className="py-32 px-6 relative z-10 overflow-hidden"><div className="max-w-6xl mx-auto"><motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}><h2 className="text-sm font-display uppercase tracking-widest text-primary mb-4">Resume</h2><h3 className="text-3xl md:text-4xl font-display font-bold mb-8">Career <span className="gradient-text">highlights</span></h3></motion.div><motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="glass rounded-xl p-8 md:p-10 glow-box"><div className="flex items-start gap-4 mb-6"><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"><FileText className="w-6 h-6 text-primary" /></div><p className="text-muted-foreground leading-relaxed text-base md:text-lg">AI/ML practitioner focused on scalable, production-grade solutions that turn complex technical work into actionable outcomes for cross-functional teams.</p></div><div className="grid md:grid-cols-2 gap-8 mt-8"><div><h4 className="text-xs font-display uppercase tracking-widest text-primary mb-4 flex items-center gap-2"><Sparkles className="w-3 h-3" /> Selected highlights</h4><ul className="space-y-3">{highlights.map(item => <li key={item} className="flex gap-3 text-sm text-muted-foreground leading-relaxed"><span className="text-primary mt-1.5 flex-shrink-0">▹</span><span>{item}</span></li>)}</ul></div><div><h4 className="text-xs font-display uppercase tracking-widest text-primary mb-4">Core stack</h4><div className="flex flex-wrap gap-2">{stack.map(item => <span key={item} className="px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/20 text-xs font-mono text-foreground/90">{item}</span>)}</div></div></div></motion.div></div></section>;
}
