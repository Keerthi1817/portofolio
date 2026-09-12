import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { BookOpen, Presentation, Rocket, Trophy } from "lucide-react";

const impact = [
  { value: 2, label: "National-level coding hackathons won — developed end-to-end production AI systems in a span of 24 hours", icon: Trophy },
  { value: 4, label: "Paper presentation awards at national-level technical symposiums across Vellore's top engineering colleges", icon: Presentation },
  { value: 2, label: "Research papers published in the proceedings of top AI and machine learning conferences", icon: BookOpen },
  { value: 4, label: "End-to-end AI solutions delivered to production at Danfoss — RAG systems and agentic workflows", icon: Rocket },
];

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const value = useMotionValue(0);
  const display = useTransform(value, (v) => Math.round(v));
  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration: 1.4, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, to, value]);
  return <motion.span ref={ref}>{display}</motion.span>;
}

export function ImpactSection() {
  return <section id="impact" className="py-32 px-6 relative z-10 overflow-hidden"><div className="max-w-6xl mx-auto"><motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}><h2 className="text-sm font-display uppercase tracking-widest text-primary mb-4">Impact</h2><h3 className="text-3xl md:text-4xl font-display font-bold mb-12">Results that <span className="gradient-text">matter</span></h3></motion.div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{impact.map(({ value, label, icon: Icon }, i) => <motion.div key={label} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }} className="glass rounded-xl p-6 group hover:border-primary/30 hover:glow-box hover:-translate-y-1 transition-all duration-300"><div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5"><Icon className="w-5 h-5 text-primary" /></div><p className="text-4xl font-display font-bold gradient-text glow-text"><CountUp to={value} /></p><div className="mt-4 pt-4 border-t border-border/50"><p className="text-sm text-muted-foreground leading-relaxed">{label}</p></div></motion.div>)}</div></div></section>;
}
