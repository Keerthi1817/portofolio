import { supabase } from "./src/integrations/supabase/client";

async function main() {
  const { data, error } = await supabase.from("portfolio_settings").select("data").eq("id", "main").maybeSingle();
  if (error) {
    console.error(error);
    process.exit(1);
  }
  if (data?.data) {
    console.log(JSON.stringify(data.data, null, 2));
  } else {
    console.log("{}");
  }
}
main();
