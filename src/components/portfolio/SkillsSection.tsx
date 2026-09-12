import { motion } from "framer-motion";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

export function SkillsSection() {
  const { data: { skills } } = usePortfolioData();

  return (
    <section id="skills" className="py-32 px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-display uppercase tracking-widest text-primary mb-4">Skills</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-12">
            Technical <span className="gradient-text">arsenal</span>
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <h4 className="font-display font-semibold text-primary text-sm uppercase tracking-wider mb-4">
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
