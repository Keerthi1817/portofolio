import { supabase } from "./src/integrations/supabase/client";

const ADMIN_PASSWORD = "SunnyDay2026@";

async function main() {
  const { data, error } = await supabase
    .from("portfolio_settings")
    .select("data")
    .eq("id", "main")
    .maybeSingle();

  if (error || !data?.data) {
    console.error("Failed to load portfolio settings:", error);
    process.exit(1);
  }

  const portfolio = data.data as any;

  // Insert Oracle Agentic AI Associate certification after Generative AI Professional
  const certifications = portfolio.certifications || [];
  const newCert = {
    id: "14",
    name: "Oracle Certified Agentic AI Associate",
    issuer: "Oracle",
    date: "2024",
    credentialUrl:
      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=5BA171881BFD3BDAD42A6FFB682BF2A0AD8EFE844C96102E46895A8534B244E1",
    logoUrl: "",
  };

  const generativeIdx = certifications.findIndex(
    (c: any) =>
      c.name === "Oracle Certified Generative AI Professional" ||
      c.name.toLowerCase().includes("generative ai professional")
  );
  if (generativeIdx >= 0) {
    certifications.splice(generativeIdx + 1, 0, newCert);
  } else {
    certifications.unshift(newCert);
  }

  // Insert Mock Mind AI project as a featured build
  const projects = portfolio.projects || [];
  const newProject = {
    id: "10",
    title: "Mock Mind AI — Voice Agentic Interview Coach",
    description:
      "Building a voice-first AI interviewer that runs realistic mock interviews using agentic AI, giving instant feedback on answers, communication, and reasoning. Exploring real-time speech + LLM orchestration for interactive coaching.",
    tags: ["Voice AI", "Agentic AI", "OpenAI", "Python", "Realtime"],
    link: "#",
    linkEnabled: false,
    image: "",
  };

  const insertAt = Math.min(2, projects.length);
  projects.splice(insertAt, 0, newProject);

  // Save back via admin edge function
  const { data: saveResult, error: saveError } = await supabase.functions.invoke("admin-portfolio", {
    body: {
      action: "save",
      password: ADMIN_PASSWORD,
      data: portfolio,
    },
  });

  if (saveError) {
    console.error("Save failed:", saveError);
    process.exit(1);
  }

  console.log("Portfolio updated:", saveResult);
}

main();
