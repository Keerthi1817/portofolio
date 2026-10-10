import React, { createContext, useContext, ReactNode } from "react";
import { PortfolioData, getDefaultPortfolioData } from "@/lib/portfolio-data";

interface PortfolioContextValue {
  data: PortfolioData;
  loading: boolean;
}

// Keep one context instance across hot reloads.
const PortfolioContext: React.Context<PortfolioContextValue | null> =
  ((globalThis as any).__PortfolioContext__ ??=
    createContext<PortfolioContextValue | null>(null));

// All content is hardcoded in src/lib/portfolio-data.ts. This is a static site (GitHub Pages):
// there is no database or admin panel, so edit that file to change the content.
const value: PortfolioContextValue = { data: getDefaultPortfolioData(), loading: false };

export function PortfolioProvider({ children }: { children: ReactNode }) {
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolioData() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolioData must be used within PortfolioProvider");
  return ctx;
}
