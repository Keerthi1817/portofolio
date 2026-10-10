// Content that is read from data by the portfolio sections: hero, about (bio), skills, contact, articles.
//
// The Experience, Education, Impact, Certifications/Achievements, Projects and Resume sections are written
// directly in their component files (src/components/portfolio/*.tsx), so edit them there.
// This is a static site (GitHub Pages): there is no database or admin page, edit this file and commit.

export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    bio: string;
    image: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
  articles: {
    id: string;
    title: string;
    description: string;
    url: string;
    date: string;
    source: string;
  }[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    instagram: string;
    calcom: string;
  };
}

const defaultData: PortfolioData = {
  hero: {
    name: "Keerthivasan K",
    title: "AI Engineer",
    subtitle: "AI Engineer with hands-on industry experience in end-to-end AI/ML and GenAI solutions.",
    cta: "View My Work",
  },
  about: {
    bio: "AI Engineer with hands-on industry experience in end-to-end AI/ML and GenAI solutions. Architected RAG and agentic AI workflows for industrial and supply-chain use cases.",
    image: "",
  },
  skills: [
    {
      category: "Core Skills",
      items: ["Python", "PyTorch", "TensorFlow", "LangChain", "RAG", "Vector Search", "Power BI", "Prompt Engineering"],
    },
  ],
  articles: [],
  contact: {
    email: "keerthivasan1845@gmail.com",
    github: "https://github.com/Keerthi1817",
    linkedin: "https://www.linkedin.com/in/keerthivasan1845/",
    instagram: "https://www.instagram.com/BilinearBrick/",
    calcom: "",
  },
};

export function getDefaultPortfolioData(): PortfolioData {
  return { ...defaultData };
}
