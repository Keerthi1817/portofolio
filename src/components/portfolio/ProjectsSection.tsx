import { motion } from "framer-motion";
import { ExternalLink, Upload } from "lucide-react";

const appUrl = "https://pd-rag-app-bwgpeqgehrakdre6.southindia-01.azurewebsites.net/";
const techStack = ["Python", "RAG", "Azure OpenAI", "Vector Search", "LLM", "Azure App Service"];

export function ProjectsSection() {
  return <section id="projects" className="py-32 px-6 relative z-10 overflow-hidden"><div className="max-w-6xl mx-auto">
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}><h2 className="text-sm font-display uppercase tracking-widest text-primary mb-4">Projects</h2><h3 className="text-3xl md:text-4xl font-display font-bold mb-12">Featured <span className="gradient-text">work</span></h3></motion.div>
    <div className="grid md:grid-cols-5 gap-6">
      <motion.a href={appUrl} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="md:col-span-3 group glass-hover rounded-xl p-7 flex flex-col cursor-pointer">
        <div className="flex items-start justify-between mb-4"><h4 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">Enterprise RAG System</h4><ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" /></div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">A production-ready document intelligence application that lets users upload files, ask natural-language questions, and receive grounded answers from retrieved source content. Built to make enterprise knowledge easier to search, explore, and use.</p>
        <div className="flex flex-wrap gap-2">{techStack.map(tag => <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{tag}</span>)}</div>
      </motion.a>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="md:col-span-2 glass rounded-xl p-7 border-primary/30">
        <Upload className="w-6 h-6 text-primary mb-4" /><h4 className="font-display font-semibold text-foreground mb-3">Try the application</h4><p className="text-sm text-muted-foreground leading-relaxed mb-5">Click the project card, upload a file, and start querying it to test the retrieval quality.</p><p className="text-sm text-foreground mb-5">Sign in with <span className="font-mono text-primary">admin</span> as both the ID and password.</p><a href={appUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-display font-semibold text-primary hover:gap-3 transition-all">Launch application <ExternalLink className="w-4 h-4" /></a>
      </motion.div>
    </div>
  </div></section>;
}
