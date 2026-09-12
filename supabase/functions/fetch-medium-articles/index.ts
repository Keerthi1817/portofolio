import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function parseMediumRSS(xml: string) {
  const articles: any[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  let i = 0;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];
    const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
                  item.match(/<title>(.*?)<\/title>/)?.[1] || "";
    const link = item.match(/<link>(.*?)<\/link>/)?.[1] || "";
    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
    const descRaw = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] || "";
    // Strip HTML tags for description
    const desc = descRaw.replace(/<[^>]*>/g, "").slice(0, 200);

    articles.push({
      id: `medium-${i}`,
      title,
      description: desc + (desc.length >= 200 ? "..." : ""),
      url: link,
      date: pubDate ? new Date(pubDate).toISOString() : "",
      source: "Medium",
    });
    i++;
  }
  return articles;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Get current portfolio data to find medium username
    const { data: row } = await supabase
      .from("portfolio_settings")
      .select("data")
      .eq("id", "main")
      .single();

    const portfolioData = row?.data as any;
    const username = portfolioData?.mediumUsername?.replace("@", "");

    if (!username) {
      return new Response(JSON.stringify({ articles: [], cached: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch from Medium RSS
    const feedUrl = `https://medium.com/feed/@${username}`;
    const res = await fetch(feedUrl);
    if (!res.ok) throw new Error(`Medium fetch failed: ${res.status}`);
    const xml = await res.text();
    const articles = parseMediumRSS(xml);

    // Cache articles in the portfolio data
    const updatedData = { ...portfolioData, cachedMediumArticles: articles, mediumCachedAt: new Date().toISOString() };
    await supabase
      .from("portfolio_settings")
      .upsert({ id: "main", data: updatedData, updated_at: new Date().toISOString() });

    return new Response(JSON.stringify({ articles, cached: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message, articles: [] }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
