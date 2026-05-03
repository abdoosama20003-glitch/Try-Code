"use client";
import { Sparkles } from "lucide-react";
import { TopBar } from "./TopBar";
import { GapAnalyzer } from "./GapAnalyzer";

export function GapAnalyzerPage() {
  return (
    <>
      <TopBar
        label="Research"
        title="Gap Analyzer"
        subtitle="Discover untapped content opportunities with high demand and low competition"
        actionLabel="New Analysis"
        actionIcon={Sparkles}
      />
      <GapAnalyzer />
    </>
  );
}