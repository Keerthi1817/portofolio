import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  { degree: "M.Tech in Data Science", institution: "Amrita Vishwa Vidyapeetham, Bengaluru", period: "2024 - 2026", description: "CGPA: 9.16 | Ranked 5th overall in the university.", link: "https://drive.google.com/file/d/1hp1pIvgs8fooUwBrR_aIQwjasNv3EpeX/view?usp=sharing" },
  { degree: "B.Tech in Information Technology", institution: "Anna University", period: "2020 - 2024", description: "CGPA: 8.25" },
];

const cardClass = "glass rounded-xl p-6 hover:border-primary/30 transition-all duration-300";

export function EducationSection() {
  return <section id="education" className="py-32 px-6 relative z-10 overflow-hidden"><div className="max-w-6xl mx-auto"><motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}><h2 className="text-sm font-display uppercase tracking-widest text-primary mb-4">Education</h2><h3 className="text-3xl md:text-4xl font-display font-bold mb-12">Academic <span className="gradient-text">background</span></h3></motion.div><div className="space-y-6">{education.map((edu, i) => {
    const inner = <div className="flex items-start gap-5"><div className="w-14 h-14 rounded-xl bg-secondary/80 flex items-center justify-center flex-shrink-0"><GraduationCap className="w-7 h-7 text-primary" /></div><div><h4 className="font-display font-semibold text-lg text-foreground">{edu.degree}</h4><p className="text-primary text-sm font-medium mt-0.5">{edu.institution}</p><p className="text-xs text-muted-foreground mt-1 font-mono">{edu.period}</p><p className="text-sm text-muted-foreground mt-3 leading-relaxed">{edu.description}</p></div></div>;
    return edu.link ? <motion.a key={edu.degree} href={edu.link} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className={`${cardClass} block`}>{inner}</motion.a> : <motion.div key={edu.degree} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className={cardClass}>{inner}</motion.div>;
  })}</div></div></section>;
}
