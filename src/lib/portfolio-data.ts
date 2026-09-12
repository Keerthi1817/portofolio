export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    bio: string;
    highlights: string[];
    image: string;
  };
  projects: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
    linkEnabled: boolean;
    image: string;
  }[];
  impact: {
    id: string;
    value: string;
    suffix?: string;
    label: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
    metrics?: string[];
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    credentialUrl: string;
    logoUrl: string;
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    period: string;
    description: string;
    logoUrl: string;
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
  meetings: {
    id: string;
    title: string;
    duration: string;
    price: string;
    priceLabel: string;
    reason: string;
    calcomUrl: string;
    featured: boolean;
  }[];
  resumeHighlights: {
    summary: string;
    bullets: string[];
    stack: string[];
  };
  resumeUrl: string;
  mediumUsername: string;
  adminPassword: string;
  adminEmail: string;
  cachedMediumArticles?: {
    id: string;
    title: string;
    description: string;
    url: string;
    date: string;
    source: string;
  }[];
  mediumCachedAt?: string;
}

const defaultData: PortfolioData = {
  hero: {
    name: "Keerthivasan K",
    title: "AI Engineer",
    subtitle: "AI Engineer with expertise in AI Agents and LLMOps. I design and build robust, custom AI solutions using RAG, fine-tuning, and prompt engineering for cloud-native deployments.",
    cta: "View My Work",
  },
  about: {
    bio: "I build impactful end-to-end solutions, specializing in sustainable social and technical systems and Generative AI. Expertise in RAG, LLM frameworks, and LLMOps from development to deployment. I can help you with ML, AI, CloudOps, LLMOps, Opensource Development, and Architect Design planning for your usecase.",
    highlights: [
      "Led development of enterprise-grade RAG systems with Azure OpenAI",
      "Built and deployed LLM-powered solutions for real-world workflows",
      "Built Embeddings as a Service (EaaS) pipeline for live data",
      "Open-source contributor — LibreChat, AI file organizer & more",
    ],
    image: "",
  },
  projects: [
    {
      id: "1",
      title: "Enterprise RAG System",
      description: "Built enterprise-grade Retrieval-Augmented Generation systems integrating vector databases and Azure OpenAI to enhance information retrieval across large document corpora.",
      tags: ["LangChain", "Azure OpenAI", "FAISS", "Python"],
      link: "#",
      linkEnabled: true,
      image: "",
    },
    {
      id: "9",
      title: "Atlas AI — Cross-Border Market Entry Intelligence",
      description: "Multi-agent market research platform with 9 specialized LangGraph agents running in parallel to analyze laws, taxes, culture, hiring, competition and economy across 3 countries per query. Multilingual RAG with BGE-M3 (100+ languages) + Milvus over legal/tax/business docs, DuckDuckGo live search and World Bank API for economics. Redis caching for pages/search/embeddings; deployed on Oracle Cloud via Docker Compose with GitHub Actions CI/CD.",
      tags: ["LangGraph", "LangChain", "DeepSeek", "BGE-M3", "Milvus", "FastAPI", "Streamlit", "Redis", "Docker"],
      link: "#",
      linkEnabled: false,
      image: "",
    },
    {
      id: "10",
      title: "Mock Mind AI — Voice Agentic AI Interviewer",
      description: "A voice-first AI interviewer that conducts realistic mock interviews. Upload your resume and it tailors questions to your experience plus FAANG/MAANG-style rounds. Skip the resume to pick predefined tracks like Python, SQL, or Docker, each with a tailored question model. Private repo.",
      tags: ["Voice AI", "Agentic AI", "OpenAI", "Python", "Realtime"],
      link: "#",
      linkEnabled: false,
      image: "",
    },
    {
      id: "2",
      title: "Embeddings as a Service",
      description: "Developed an EaaS pipeline for live data, ensuring real-time updates in the vector database to maintain up-to-date information for RAG applications.",
      tags: ["Python", "Vector DB", "FastAPI", "Docker"],
      link: "#",
      linkEnabled: false,
      image: "",
    },
    {
      id: "3",
      title: "Fine-Tuning Llama on Indian Legal Text",
      description: "Fine-tuned Meta Llama 3.2 3B Instruct on curated Q&A pairs from the Indian Penal Code, CrPC, and Constitution using QLoRA (4-bit quantization + LoRA adapters). Enables fast legal lookups, domain-specific Q&A, and study aids for lawyers, researchers, and law students.",
      tags: ["Llama 3.2", "QLoRA", "PEFT", "Hugging Face", "Indian Law"],
      link: "#",
      linkEnabled: true,
      image: "",
    },
    {
      id: "4",
      title: "AI Telegram Chatbot",
      description: "Built an AI chatbot integrated with Telegram using Ollama, showcasing hands-on experience with LLMs and messaging APIs.",
      tags: ["Ollama", "Python", "Telegram API", "LLMs"],
      link: "#",
      linkEnabled: true,
      image: "",
    },
  ],
  skills: [
    { category: "AI / ML", items: ["PyTorch", "TensorFlow", "Hugging Face", "LangChain", "scikit-learn"] },
    { category: "Agent Frameworks", items: ["LangGraph", "CrewAI", "LangChain Agents"] },
    { category: "LLMOps", items: ["RAG", "Fine-tuning", "Prompt Engineering", "Ollama", "Azure OpenAI"] },
    { category: "Cloud & Infra", items: ["Azure", "AWS", "GCP", "Docker", "Kubernetes", "CI/CD", "Open-Source App Deployments"] },
    { category: "Data & Visualization", items: ["Python", "SQL", "PostgreSQL", "MongoDB", "Neo4j", "Power BI", "Plotly", "Seaborn", "Matplotlib"] },
  ],
  impact: [
    { id: "1", value: "300", suffix: "GB+", label: "Enterprise document corpus processed in production" },
    { id: "2", value: "113", suffix: "K+", label: "Questions answered across global enterprise users" },
    { id: "3", value: "8,400", suffix: "+", label: "Active enterprise users served worldwide" },
    { id: "4", value: "59,420", suffix: "+", label: "Documents indexed (50K+ existing KB + 9,420 newly added)" },
    { id: "5", value: "98.6", suffix: "%", label: "Request success rate in production" },
    { id: "6", value: "8", suffix: "/10", label: "Average user satisfaction rating" },
    { id: "7", value: "18.9", suffix: "K+ hrs", label: "Engineer-time saved (~10 min per query)" },
    { id: "8", value: "$548", suffix: "K+", label: "Estimated cost savings (@ $29/hr engineer rate)" },
  ],
  experience: [
    {
      id: "1",
      role: "Data Scientist",
      company: "Worley",
      period: "June 2023 — Present",
      description: "Led development of enterprise-grade RAG systems, integrating vector databases and Azure OpenAI. Developed EaaS pipeline for live data. Leveraged NVIDIA H100 GPUs to self-host LLMs via Nvidia NIM. Processed unstructured data using Generative AI to extract information from large document volumes.",
      metrics: [
        "Reduced manual document review effort by ~60%",
        "Self-hosted 4+ LLM, embedding & reranker models on H100 cluster",
        "Shipped live EaaS pipeline serving real-time vector updates",
      ],
    },
    {
      id: "2",
      role: "Data Scientist Intern",
      company: "Worley",
      period: "Sept 2022 — May 2023",
      description: "Developed predictive models to forecast output based on real-time interval data. Conducted EDA with data cleaning, visualization, and correlation analysis. Built AI Chatbot using MS Copilot Studio and Azure OpenAI API. Implemented sentiment analysis on user feedback using NLP techniques.",
      metrics: [
        "Built internal AI chatbot adopted across multiple teams",
        "Delivered forecasting models with high directional accuracy on interval data",
      ],
    },
    {
      id: "3",
      role: "Developer Program Member",
      company: "GitHub",
      period: "July 2021 — Present",
      description: "Actively contributing to open-source projects across the AI and developer tooling ecosystem including LibreChat and AI-powered file organizer. Built personal projects such as an AI chatbot integrated with Telegram using Ollama.",
      metrics: [
        "Contributions merged into LibreChat & AI file-organizer projects",
        "Maintainer of personal Ollama × Telegram bot project",
      ],
    },
  ],
  certifications: [
    {
      id: "1",
      name: "Oracle Certified Generative AI Professional",
      issuer: "Oracle",
      date: "2024",
      credentialUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=37CA381FC15578C6FFBA8B0A5ABC4A7F4D602AF9203658C569C5D97A0F5C6F1E",
      logoUrl: "",
    },
    {
      id: "14",
      name: "Oracle Certified Agentic AI Associate",
      issuer: "Oracle",
      date: "2024",
      credentialUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=5BA171881BFD3BDAD42A6FFB682BF2A0AD8EFE844C96102E46895A8534B244E1",
      logoUrl: "",
    },
    {
      id: "2",
      name: "Oracle Certified AI Vector Search Professional",
      issuer: "Oracle",
      date: "2024",
      credentialUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=1C4FBFCFD2F23D48F8DA6B438DF896DF3847A43AE7741A4B6CF532F6E7A8EB03",
      logoUrl: "",
    },
    {
      id: "3",
      name: "Oracle Certified Data Science Professional",
      issuer: "Oracle",
      date: "2024",
      credentialUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=ADC1703C67299A45E4DF95DB203ABEDB1768AD2E2F54C4ED8723E01F89358AF0",
      logoUrl: "",
    },
    {
      id: "4",
      name: "Getting Started with Deep Learning",
      issuer: "NVIDIA",
      date: "2024",
      credentialUrl: "https://learn.nvidia.com/certificates?id=wm4TO4tQQwKiToZ8El4DoA",
      logoUrl: "",
    },
    {
      id: "5",
      name: "Neo4j Certified Professional",
      issuer: "Neo4j",
      date: "2024",
      credentialUrl: "https://graphacademy.neo4j.com/u/89e72221-8d3f-440b-b3c4-cb0d86bf6284/neo4j-certification/",
      logoUrl: "",
    },
    {
      id: "6",
      name: "AI Infrastructure and Operations Fundamentals",
      issuer: "NVIDIA",
      date: "2024",
      credentialUrl: "https://drive.google.com/file/d/1wOTz1LoZr4WGyigMSoC6iW3A-opn8sTL/view?usp=sharing",
      logoUrl: "",
    },
    {
      id: "7",
      name: "CUDA Python Fundamentals",
      issuer: "NVIDIA",
      date: "2024",
      credentialUrl: "https://learn.nvidia.com/certificates?id=p7czaswqTLqUsIRtROneSA",
      logoUrl: "",
    },
    {
      id: "8",
      name: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      date: "2023",
      credentialUrl: "https://www.credly.com/badges/5ce3c251-7cb7-42d3-9615-60da590a7868?source=linked_in_profile",
      logoUrl: "",
    },
    {
      id: "9",
      name: "AWS Cloud Quest: Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialUrl: "https://www.credly.com/badges/c7853675-32e4-424f-87ec-929da00ee3be/linked_in_profile",
      logoUrl: "",
    },
    {
      id: "10",
      name: "Generative AI Fundamentals",
      issuer: "Databricks",
      date: "2023",
      credentialUrl: "https://credentials.databricks.com/7287ca48-1420-4be0-9330-324cd605519b",
      logoUrl: "",
    },
    {
      id: "11",
      name: "Microsoft Certified: Power Platform Fundamentals",
      issuer: "Microsoft",
      date: "2023",
      credentialUrl: "https://www.credly.com/badges/4f3af0b1-c826-40a9-866c-48cc53c4dc7b",
      logoUrl: "",
    },
    {
      id: "12",
      name: "Big Data (BDA) Foundation",
      issuer: "NASSCOM FutureSkills",
      date: "2022",
      credentialUrl: "#",
      logoUrl: "",
    },
    {
      id: "13",
      name: "Databases and SQL for Data Science with Python",
      issuer: "IBM (Coursera)",
      date: "2022",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/NRNX2FRMHEVB",
      logoUrl: "",
    },
  ],
  education: [
    {
      id: "1",
      degree: "Master's in Software Engineering (Dual Degree)",
      institution: "VIT University, Vellore",
      period: "2018 — 2023",
      description: "Studied core & advanced software engineering — DS, Algorithms, DBMS, OS, AI. Completed courses on Deep Learning, Data Science, Cloud Computing and Full Stack Development. Participated in university hackathons (VinnovateIT).",
      logoUrl: "",
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
  meetings: [
    {
      id: "1",
      title: "Quick Intro & Networking",
      duration: "15 min",
      price: "Free",
      priceLabel: "Free",
      reason: "Say hi, see if we click. No agenda — just a quick chat.",
      calcomUrl: "",
      featured: false,
    },
    {
      id: "2",
      title: "Career & Resume Review",
      duration: "30 min",
      price: "$30",
      priceLabel: "$30",
      reason: "Tailored AI/ML CV review + career-path feedback for your target roles.",
      calcomUrl: "",
      featured: false,
    },
    {
      id: "3",
      title: "Technical Consultation",
      duration: "45 min",
      price: "$90",
      priceLabel: "$90",
      reason: "RAG, LLMOps or architecture advice for your project. Bring questions.",
      calcomUrl: "",
      featured: true,
    },
    {
      id: "4",
      title: "Mentorship or Code Review",
      duration: "60 min",
      price: "$140",
      priceLabel: "$140",
      reason: "Deep 1:1 on your codebase, interview prep or ongoing AI mentorship.",
      calcomUrl: "",
      featured: false,
    },
  ],
  resumeHighlights: {
    summary: "AI Engineer specializing in RAG, LLMOps and production GenAI on cloud-native infrastructure. I ship end-to-end systems — from H100 self-hosted inference to enterprise-grade retrieval pipelines.",
    bullets: [
      "Built enterprise RAG systems on Azure OpenAI serving thousands of internal queries/month",
      "Self-hosted LLMs, embedding & reranker models on NVIDIA H100 clusters via NIM",
      "Designed Embeddings-as-a-Service (EaaS) pipelines for live, real-time vector updates",
      "Open-source contributor — LibreChat, AI file-organizer, Ollama × Telegram bot",
      "Multi-cloud (Azure / AWS / GCP) with Docker, Kubernetes & CI/CD in production",
    ],
    stack: ["Python", "PyTorch", "LangChain", "Azure OpenAI", "Kubernetes", "Neo4j", "FastAPI"],
  },
  resumeUrl: "https://drive.google.com/file/d/1yMxvIZeexmHkq1knKkHcwE7IOlumqDEZ/view?usp=sharing",
  mediumUsername: "",
  adminPassword: "Chinamade@123!",
  adminEmail: "admin@keerthivasan.com",
};

export function getDefaultPortfolioData(): PortfolioData {
  return { ...defaultData };
}

// Legacy functions kept for backward compatibility
const STORAGE_KEY = "portfolio-data";

export function getPortfolioData(): PortfolioData {
  return getDefaultPortfolioData();
}

export function savePortfolioData(data: PortfolioData) {
  // No-op: now handled by database
}

export function resetPortfolioData() {
  // No-op: now handled by database
}
