import { NeuralBackground } from "@/components/NeuralBackground";
import { CursorFollower } from "@/components/CursorFollower";
import { Navbar } from "@/components/portfolio/Navbar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { ImpactSection } from "@/components/portfolio/ImpactSection";
import { EducationSection } from "@/components/portfolio/EducationSection";
import { CertificationsSection } from "@/components/portfolio/CertificationsSection";
import { ResumeSection } from "@/components/portfolio/ResumeSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { Footer } from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <CursorFollower />
      <NeuralBackground />
      <div className="grid-pattern fixed inset-0 pointer-events-none opacity-30" style={{ zIndex: 1 }} />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ImpactSection />
      <EducationSection />
      <CertificationsSection />
      <ResumeSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
