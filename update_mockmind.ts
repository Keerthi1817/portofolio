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
  const projects = portfolio.projects || [];
  const idx = projects.findIndex((p: any) => p.id === "10" || p.title?.toLowerCase().includes("mock mind"));
  if (idx < 0) {
    console.error("Mock Mind project not found");
    process.exit(1);
  }

  projects[idx] = {
    ...projects[idx],
    title: "Mock Mind AI — Voice Agentic AI Interviewer",
    description: "A voice-first AI interviewer that conducts realistic mock interviews. Upload your resume and it tailors questions to your experience plus FAANG/MAANG-style rounds. Skip the resume to pick predefined tracks like Python, SQL, or Docker, each with a tailored question model. Private repo.",
    link: "#",
    linkEnabled: false,
  };

  const { data: saveResult, error: saveError } = await supabase.functions.invoke("admin-portfolio", {
    body: { action: "save", password: ADMIN_PASSWORD, data: portfolio },
  });

  if (saveError) {
    console.error("Save failed:", saveError);
    process.exit(1);
  }

  console.log("Mock Mind updated:", saveResult);
}

main();
