import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { PortfolioData, getDefaultPortfolioData } from "@/lib/portfolio-data";
import { supabase } from "@/integrations/supabase/client";

interface PortfolioContextValue {
  data: PortfolioData;
  loading: boolean;
  saveData: (newData: PortfolioData) => Promise<void>;
  resetData: () => Promise<void>;
  refetch: () => Promise<void>;
}

const PortfolioContext: React.Context<PortfolioContextValue | null> =
  ((globalThis as any).__PortfolioContext__ ??=
    createContext<PortfolioContextValue | null>(null));

async function fetchFromDb(): Promise<PortfolioData> {
  const defaults = getDefaultPortfolioData();
  const { data, error } = await supabase
    .from("portfolio_settings")
    .select("data")
    .eq("id", "main")
    .maybeSingle();
  if (error) {
    console.error("Failed to load portfolio settings:", error);
    return defaults;
  }
  if (data?.data && typeof data.data === "object") {
    return { ...defaults, ...(data.data as Partial<PortfolioData>) };
  }
  return defaults;
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(getDefaultPortfolioData());
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    const fresh = await fetchFromDb();
    setData(fresh);
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const saveData = useCallback(async (newData: PortfolioData) => {
    setData(newData);
    const password = sessionStorage.getItem("admin-pw") || "";
    const { error } = await supabase.functions.invoke("admin-portfolio", {
      body: { action: "save", password, data: newData },
    });
    if (error) {
      console.error("Failed to save portfolio settings:", error);
      throw error;
    }
  }, []);

  const resetData = useCallback(async () => {
    const defaults = getDefaultPortfolioData();
    setData(defaults);
    const password = sessionStorage.getItem("admin-pw") || "";
    const { error } = await supabase.functions.invoke("admin-portfolio", {
      body: { action: "reset", password },
    });
    if (error) {
      console.error("Failed to reset portfolio settings:", error);
      throw error;
    }
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, saveData, resetData, refetch }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioData() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolioData must be used within PortfolioProvider");
  return ctx;
}
