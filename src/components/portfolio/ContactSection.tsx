import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

export function ContactSection() {
  const { data } = usePortfolioData();
  const { contact } = data;

  return (
    <section id="contact" className="py-32 px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
          <h2 className="text-sm font-display uppercase tracking-widest text-primary mb-4">Contact</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Open to <span className="gradient-text">AI engineering opportunities</span></h3>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">I am an AI Engineer with 1 year of experience and am currently looking for a job opportunity. To discuss a role further, please contact me via email or LinkedIn.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-wrap items-center justify-center gap-3">
          {contact.email && <a href={`mailto:${contact.email}`} className="flex items-center gap-2 px-5 py-2.5 rounded-lg glass-hover text-sm font-medium"><Mail className="w-4 h-4 text-primary" /><span>{contact.email}</span></a>}
          {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-lg glass-hover text-sm font-medium"><Linkedin className="w-4 h-4 text-primary" /><span>LinkedIn</span></a>}
        </motion.div>
      </div>
    </section>
  );
}
