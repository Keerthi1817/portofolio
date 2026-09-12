import { motion } from "framer-motion";
import { Award } from "lucide-react";

const achievements = [
  {
    text: "Certificate of Appreciation from the Danfoss President for delivering a high-impact AI solution.",
    link: "https://drive.google.com/file/d/1QDE37NlMv8-hXP_TknggCuHwoqByHyTT/view?usp=sharing",
  },
  {
    rank: "#1",
    text: "National Level Hackathon (Tech Spark 2k23), Global Institute of Technology, Vellore.",
    link: "https://drive.google.com/file/d/12ElWIJ1xzzd9y5zmbCLmgbZBSsVCCgaI/view?usp=sharing",
  },
  {
    rank: "#1",
    text: "Paper Presentation — Mira Techno Fest, National Level Technical Symposium, Annai Mira Institute of Technology, Vellore.",
    link: "https://drive.google.com/file/d/12C3ve3AZHmIWxOjkjZHhRWsPAabuzUO1/view?usp=sharing",
  },
  {
    rank: "#1",
    text: "Paper Presentation in Infogram 2023, National Level Technical Symposium, CAHET College of Engineering, Vellore.",
    link: "https://drive.google.com/file/d/12UTHzmD_hfJw9uXiQZ79fZ6Wbe9k50iE/view?usp=sharing",
  },
  {
    rank: "#1",
    text: "National Hackathon, Technomania 2k23, Global Institute of Technology, Vellore.",
    link: "https://drive.google.com/file/d/1hgdnJs2dzMk-PjdCOE6DvCmO74tVumeK/view?usp=sharing",
  },
  {
    rank: "#2",
    text: "Paper Presentation — Zenithrive, Technical Symposium, Annai Mira Institute of Technology, Vellore.",
    link: "https://drive.google.com/file/d/1wLfG7rHs2nXtJQX0OKDudbjM7PcU_1Bf/view?usp=sharing",
  },
  {
    rank: "#2",
    text: "Paper Presentation, National Level Technical Symposium, C. Abdul Hakeem College of Engineering and Technology, Vellore.",
    link: "https://drive.google.com/file/d/1XfsTIazjMds1xWDHLva5i0_abiJXlw0s/view?usp=sharing",
  },
];

export function CertificationsSection() {
  return <section id="achievements" className="py-32 px-6 relative z-10 overflow-hidden"><div className="max-w-6xl mx-auto"><motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}><h2 className="text-sm font-display uppercase tracking-widest text-primary mb-4">Achievements</h2><h3 className="text-3xl md:text-4xl font-display font-bold mb-12">Recognition and <span className="gradient-text">milestones</span></h3></motion.div><div className="grid md:grid-cols-2 gap-6">{achievements.map((achievement, i) => <motion.a key={achievement.text} href={achievement.link} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass rounded-xl p-6 flex gap-4 transition-colors hover:bg-primary/5"><div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">{achievement.rank ? <span className="text-2xl font-display font-bold gradient-text leading-none">{achievement.rank}</span> : <Award className="w-5 h-5 text-primary" />}</div><p className="text-sm text-muted-foreground leading-relaxed">{achievement.text}</p></motion.a>)}</div></div></section>;
}
