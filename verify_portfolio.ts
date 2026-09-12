import { supabase } from "./src/integrations/supabase/client";

async function main() {
  const { data, error } = await supabase.from("portfolio_settings").select("data").eq("id", "main").maybeSingle();
  if (error || !data?.data) { console.error(error); process.exit(1); }
  const d = data.data as any;
  console.log("Projects:");
  d.projects.forEach((p: any) => console.log(" -", p.title, "(linkEnabled:", p.linkEnabled + ")"));
  console.log("\nCertifications:");
  d.certifications.forEach((c: any) => console.log(" -", c.name));
}
main();
