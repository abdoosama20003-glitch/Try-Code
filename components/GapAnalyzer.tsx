"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, SlidersHorizontal,
  Sparkles, Bookmark, TrendingUp, Target, Zap, X,
} from "lucide-react";

const MotionDiv = motion.create("div" as any);

type BadgeType = "easy-win" | "competitive" | "emerging" | "golden";
interface TopicData {
  id: number; keyword: string; category: string; demand: number; competition: number;
  trend: number; gapScore: number; badge: BadgeType; searchVolume: string; avgViews: string;
}

const mockData: TopicData[] = [
  { id: 1, keyword: "Python Automation for Beginners",  category: "Programming", demand: 92, competition: 23, trend: 88, gapScore: 94, badge: "golden",      searchVolume: "74K/mo",  avgViews: "120K" },
  { id: 2, keyword: "AI Tools No One Talks About",      category: "AI & ML",    demand: 89, competition: 18, trend: 95, gapScore: 91, badge: "easy-win",    searchVolume: "45K/mo",  avgViews: "89K"  },
  { id: 3, keyword: "React vs Next.js 2026",            category: "Web Dev",    demand: 78, competition: 45, trend: 72, gapScore: 76, badge: "emerging",    searchVolume: "38K/mo",  avgViews: "65K"  },
  { id: 4, keyword: "Passive Income with AI SaaS",      category: "Business",   demand: 95, competition: 67, trend: 82, gapScore: 68, badge: "competitive", searchVolume: "92K/mo",  avgViews: "210K" },
  { id: 5, keyword: "Learn Rust in 30 Days",            category: "Programming", demand: 71, competition: 15, trend: 91, gapScore: 89, badge: "easy-win",    searchVolume: "28K/mo",  avgViews: "42K"  },
  { id: 6, keyword: "No-Code App Development",          category: "Tech",       demand: 84, competition: 52, trend: 65, gapScore: 62, badge: "emerging",    searchVolume: "56K/mo",  avgViews: "78K"  },
  { id: 7, keyword: "Figma to Code Workflow",           category: "Design",     demand: 76, competition: 12, trend: 84, gapScore: 92, badge: "golden",      searchVolume: "22K/mo",  avgViews: "35K"  },
  { id: 8, keyword: "ChatGPT Prompt Engineering",       category: "AI & ML",    demand: 97, competition: 89, trend: 58, gapScore: 35, badge: "competitive", searchVolume: "180K/mo", avgViews: "340K" },
];

const badgeMeta: Record<BadgeType, { label: string; variant: "success" | "warning" | "danger" | "info" | "purple" }> = {
  "golden":      { label: "Golden",      variant: "warning" },
  "easy-win":    { label: "Easy Win",    variant: "success" },
  "emerging":    { label: "Emerging",    variant: "info" },
  "competitive": { label: "Competitive", variant: "danger"  },
};

const scoreColor = (v: number) =>
  v >= 85 ? "var(--neon-emerald)" : v >= 70 ? "var(--neon-amber)" : "var(--neon-red)";

export function GapAnalyzer() {
  const [searchQuery, setSearchQuery]   = useState("Python for beginners");
  const [showFilters, setShowFilters]   = useState(false);
  const [selectedSort, setSelectedSort] = useState("Gap Score");
  const [isAnalyzing, setIsAnalyzing]   = useState(false);
  const [savedItems, setSavedItems]     = useState<Set<number>>(new Set());
  const [selected, setSelected]         = useState<TopicData | null>(null);
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());

  const handleAnalyze = () => { setIsAnalyzing(true); setTimeout(() => setIsAnalyzing(false), 2000); };
  const toggleSave    = (id: number) => setSavedItems(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleCat     = (cat: string) => setActiveCategories(p => { const n = new Set(p); n.has(cat) ? n.delete(cat) : n.add(cat); return n; });

  const categories = [...new Set(mockData.map(d => d.category))];

  const filtered = [...mockData]
    .filter(d => activeCategories.size === 0 || activeCategories.has(d.category))
    .sort((a, b) => {
      if (selectedSort === "Demand")      return b.demand - a.demand;
      if (selectedSort === "Competition") return a.competition - b.competition;
      if (selectedSort === "Trend")       return b.trend - a.trend;
      return b.gapScore - a.gapScore;
    });

  return (
    <div className="p-7 md:p-8 flex flex-col gap-5 flex-1">

      {/* ── Stats Strip ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {[
          { label: "Topics Analyzed",  value: "2,847", icon: Target,     color: "var(--neon-indigo)",  change: "12%", delay: 0.04 },
          { label: "Easy Wins Found",  value: "186",   icon: Zap,        color: "var(--neon-emerald)", change: "24%", delay: 0.08 },
          { label: "Avg Gap Score",    value: "73.4",  icon: TrendingUp, color: "var(--neon-purple)",  change: "8%",  delay: 0.12 },
          { label: "Videos Generated", value: "94",    icon: Sparkles,   color: "var(--neon-pink)",    change: "31%", delay: 0.16 },
        ].map((s, i) => (
          <MotionDiv key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: s.delay, ease: [0.16, 1, 0.3, 1] }}>
            <div className="bg-card border border-border rounded-lg p-5 shadow-sm hover:border-surface-4 hover:shadow-md transition-all">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 600, color: "var(--text-dim)", letterSpacing: "0.03em" }}>{s.label}</span>
                <div style={{ width: 30, height: 30, borderRadius: "var(--radius)", background: "var(--subtle-overlay)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.icon size={13} color={s.color} />
                </div>
              </div>
              <div className="font-mono text-2xl font-extrabold text-foreground tracking-tighter">{s.value}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 10 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "var(--neon-emerald)" }}>↑ {s.change}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)" }}>vs last month</span>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>

      {/* ── Search bar ── */}
      <MotionDiv initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="bg-card border border-border rounded-lg shadow-sm p-4" style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "stretch" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)", pointerEvents: "none" }} />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAnalyze()}
                placeholder="Enter a niche, keyword, or topic to analyze…"
                className="w-full h-9.5 px-3 bg-surface-1 border border-border rounded-md text-foreground text-sm outline-none placeholder:text-muted hover:border-surface-4 focus:border-primary focus:ring-3 focus:ring-ring h-11 px-3.5 text-base"
                style={{ paddingLeft: 36 }}
              />
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleAnalyze}
              className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-foreground text-background shadow-xs hover:opacity-90 h-11 px-6"
              style={{ fontFamily: "var(--font-sans)", opacity: isAnalyzing ? 0.7 : 1 }}
            >
              {isAnalyzing ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Sparkles size={13} /></motion.div> : <Sparkles size={13} />}
              {isAnalyzing ? "Analyzing…" : "Analyze"}
            </motion.button>
            <button onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-secondary text-muted-foreground border border-border hover:bg-surface-3 hover:text-foreground hover:border-surface-4 h-11 px-6"
              style={{ fontFamily: "var(--font-sans)", background: showFilters ? "var(--surface-3)" : undefined }}
            >
              <SlidersHorizontal size={13} />
              Filters
              {activeCategories.size > 0 && <span style={{ width: 16, height: 16, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 800, color: "white" }}>{activeCategories.size}</span>}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }} style={{ overflow: "hidden" }}>
                <div style={{ paddingTop: 16, marginTop: 16, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--text-dim)" }}>Category</span>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {categories.map(cat => (
                        <button key={cat} onClick={() => toggleCat(cat)}
                          className={`inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none h-6.5 px-2.5 text-[10px] ${activeCategories.has(cat) ? "at-btn-brand" : "at-btn-ghost"}`}
                          style={{ fontFamily: "var(--font-sans)", border: activeCategories.has(cat) ? "1px solid var(--border-active)" : "1px solid var(--border)" }}
                        >{cat}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 4, alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--text-dim)", marginRight: 4 }}>Sort</span>
                    {["Gap Score", "Demand", "Competition", "Trend"].map(s => (
                      <button key={s} onClick={() => setSelectedSort(s)}
                        className={`inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none h-6.5 px-2.5 text-[10px] ${selectedSort === s ? "at-btn-secondary" : "at-btn-ghost"}`}
                        style={{ fontFamily: "var(--font-sans)", fontWeight: selectedSort === s ? 600 : 400 }}
                      >{s}</button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionDiv>

      {/* ── Results + Detail Panel ── */}
      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 330px" : "1fr", gap: 10, flex: 1, minHeight: 0 }}>

        <div className="bg-card border border-border rounded-lg shadow-sm" style={{ overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 100px 90px 90px 90px 80px 36px", padding: "10px 20px", borderBottom: "1px solid var(--border)", background: "var(--surface-1)" }}>
            {["Keyword / Topic", "Gap Score", "Demand", "Competition", "Trend", "Volume", ""].map(h => (
              <div key={h} className="at-table-head-cell">{h}</div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {filtered.map((row, i) => (
              <MotionDiv key={row.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 + i * 0.04 }}>
                <div
                  className={`at-table-row ${selected?.id === row.id ? "selected" : ""}`}
                  style={{ display: "grid", gridTemplateColumns: "2fr 100px 90px 90px 90px 80px 36px", padding: "14px 20px", borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", alignItems: "center" }}
                  onClick={() => setSelected(selected?.id === row.id ? null : row)}
                >
                  <div className="at-table-cell" style={{ paddingLeft: 0, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 4 }}>{row.keyword}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span className={`at-badge at-badge-${badgeMeta[row.badge].variant}`}>{badgeMeta[row.badge].label}</span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)" }}>{row.category}</span>
                    </div>
                  </div>
                  <div className="at-table-cell">
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-lg)", fontWeight: 800, color: scoreColor(row.gapScore), letterSpacing: "-0.04em" }}>{row.gapScore}</span>
                  </div>
                  {[{ v: row.demand, c: "var(--neon-indigo)" }, { v: row.competition, c: row.competition < 30 ? "var(--neon-emerald)" : row.competition < 60 ? "var(--neon-amber)" : "var(--neon-red)" }, { v: row.trend, c: "var(--neon-purple)" }].map((m, mi) => (
                    <div key={mi} className="at-table-cell">
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--foreground)", marginBottom: 5 }}>{m.v}%</div>
                      <div className="at-progress" style={{ height: 3 }}><div className="at-progress-fill" style={{ width: `${m.v}%`, background: m.c }} /></div>
                    </div>
                  ))}
                  <div className="at-table-cell">
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted-foreground)" }}>{row.searchVolume}</span>
                  </div>
                  <div style={{ padding: "0 4px", display: "flex", justifyContent: "center" }}>
                    <button onClick={e => { e.stopPropagation(); toggleSave(row.id); }}
                      style={{ width: 28, height: 28, borderRadius: "var(--radius)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: savedItems.has(row.id) ? "var(--neon-amber)" : "var(--text-dim)", transition: "color 0.15s" }}
                      onMouseEnter={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLButtonElement).style.color = "var(--neon-amber)"}
                      onMouseLeave={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLButtonElement).style.color = savedItems.has(row.id) ? "var(--neon-amber)" : "var(--text-dim)"}
                    >
                      <Bookmark size={12} fill={savedItems.has(row.id) ? "var(--neon-amber)" : "none"} />
                    </button>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}>
              <div className="bg-card border border-border rounded-lg shadow-sm p-6" style={{ position: "sticky", top: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <span className={`at-badge at-badge-${badgeMeta[selected.badge].variant}`}>{badgeMeta[selected.badge].label}</span>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", marginTop: 8, lineHeight: 1.4 }}>{selected.keyword}</div>
                  </div>
                  <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-dim)", padding: 4 }}><X size={14} /></button>
                </div>
                <div style={{ textAlign: "center", padding: "20px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: 20 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 52, fontWeight: 800, color: scoreColor(selected.gapScore), letterSpacing: "-0.04em", lineHeight: 1 }}>{selected.gapScore}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", marginTop: 4 }}>Gap Score</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
                  {[
                    { label: "Demand",      value: selected.demand,      color: "var(--neon-indigo)"  },
                    { label: "Competition", value: selected.competition, color: selected.competition < 30 ? "var(--neon-emerald)" : selected.competition < 60 ? "var(--neon-amber)" : "var(--neon-red)" },
                    { label: "Trend",       value: selected.trend,       color: "var(--neon-purple)"  },
                  ].map(m => (
                    <div key={m.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)" }}>{m.label}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: m.color }}>{m.value}%</span>
                      </div>
                      <div className="at-progress" style={{ height: 4 }}><div className="at-progress-fill" style={{ width: `${m.value}%`, background: m.color }} /></div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                  {[
                    { label: "Search Vol", value: selected.searchVolume },
                    { label: "Avg Views",  value: selected.avgViews },
                    { label: "Category",   value: selected.category },
                    { label: "Difficulty", value: selected.competition < 30 ? "Easy" : selected.competition < 60 ? "Medium" : "Hard" },
                  ].map(s => (
                    <div key={s.label} style={{ padding: "10px 12px", borderRadius: "var(--radius)", background: "var(--surface-1)", border: "1px solid var(--border)" }}>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.09em", color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--foreground)" }}>{s.value}</div>
                    </div>
                  ))}
                </div>
                <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-foreground text-background shadow-xs hover:opacity-90 h-9 px-4" style={{ width: "100%", fontFamily: "var(--font-sans)" }}>
                  <Sparkles size={13} /> Generate Content Pack
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}