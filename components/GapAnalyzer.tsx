"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Sparkles, Bookmark, TrendingUp, Target, Zap, X } from "lucide-react";

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
    <div className="p-4 md:p-7 xl:p-8 flex flex-col gap-5 flex-1 min-w-0">

      {/* Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[10px]">
        {[
          { label: "Topics Analyzed",  value: "2,847", icon: Target,     color: "var(--neon-indigo)",  change: "12%", delay: 0.04 },
          { label: "Easy Wins Found",  value: "186",   icon: Zap,        color: "var(--neon-emerald)", change: "24%", delay: 0.08 },
          { label: "Avg Gap Score",    value: "73.4",  icon: TrendingUp, color: "var(--neon-purple)",  change: "8%",  delay: 0.12 },
          { label: "Videos Generated", value: "94",    icon: Sparkles,   color: "var(--neon-pink)",    change: "31%", delay: 0.16 },
        ].map((s) => (
          <MotionDiv key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: s.delay, ease: [0.16, 1, 0.3, 1] }}>
            <div className="bg-card border border-border rounded-lg p-5 shadow-sm hover:border-surface-4 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-semibold text-[var(--text-dim)] tracking-[0.03em]">{s.label}</span>
                <div className="w-[30px] h-[30px] rounded-sm bg-[var(--subtle-overlay)] border border-border flex items-center justify-center">
                  <s.icon size={13} color={s.color} />
                </div>
              </div>
              <div className="font-mono text-2xl font-extrabold text-foreground tracking-tighter">{s.value}</div>
              <div className="flex items-center gap-1 mt-[10px]">
                <span className="text-[11px] font-semibold text-[var(--neon-emerald)]">↑ {s.change}</span>
                <span className="text-[10px] text-[var(--text-dim)]">vs last month</span>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>

      {/* Search bar */}
      <MotionDiv initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="bg-card border border-border rounded-lg shadow-sm p-4 md:px-5 md:py-[18px]">
          <div className="flex flex-col md:flex-row gap-[10px] items-stretch">
            <div className="flex-1 relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)] pointer-events-none" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAnalyze()}
                placeholder="Enter a niche, keyword, or topic to analyze…"
                className="w-full h-11 bg-[var(--surface-1)] border border-border rounded-md text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] pl-9 pr-3"
              />
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleAnalyze}
              className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-foreground text-background shadow-xs hover:opacity-90 h-11 px-6"
              style={{ opacity: isAnalyzing ? 0.7 : 1 }}>
              {isAnalyzing ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Sparkles size={13} /></motion.div> : <Sparkles size={13} />}
              {isAnalyzing ? "Analyzing…" : "Analyze"}
            </motion.button>
            <button onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-secondary text-muted-foreground border border-border hover:bg-[var(--surface-3)] hover:text-foreground hover:border-[var(--surface-4)] h-11 px-6"
              style={{ background: showFilters ? "var(--surface-3)" : undefined }}>
              <SlidersHorizontal size={13} />
              Filters
              {activeCategories.size > 0 && (
                <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[9px] font-extrabold text-white">
                  {activeCategories.size}
                </span>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                <div className="pt-4 mt-4 border-t border-border flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold tracking-[0.10em] uppercase text-[var(--text-dim)]">Category</span>
                    <div className="flex gap-[5px] flex-wrap">
                      {categories.map(cat => (
                        <button key={cat} onClick={() => toggleCat(cat)}
                          className={`inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all h-[26px] px-2.5 text-[10px] ${activeCategories.has(cat) ? "at-btn-brand" : "at-btn-ghost"}`}
                          style={{ border: activeCategories.has(cat) ? "1px solid var(--border-active)" : "1px solid var(--border)" }}>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto flex gap-1 items-center">
                    <span className="text-[10px] font-bold tracking-[0.10em] uppercase text-[var(--text-dim)] mr-1">Sort</span>
                    {["Gap Score", "Demand", "Competition", "Trend"].map(s => (
                      <button key={s} onClick={() => setSelectedSort(s)}
                        className={`inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all h-[26px] px-2.5 text-[10px] ${selectedSort === s ? "at-btn-secondary" : "at-btn-ghost"}`}
                        style={{ fontWeight: selectedSort === s ? 600 : 400 }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionDiv>

      {/* Results + Detail Panel */}
      <div className="flex flex-col xl:grid gap-[10px] flex-1 min-h-0" style={{ gridTemplateColumns: selected ? "1fr 330px" : "1fr" }}>

        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden flex flex-col min-w-0">
          <div className="overflow-x-auto min-w-0">
            <div className="min-w-[700px]">
              <div className="grid px-5 py-[10px] border-b border-border bg-[var(--surface-1)]"
            style={{ gridTemplateColumns: "2fr 100px 90px 90px 90px 80px 36px" }}>
            {["Keyword / Topic", "Gap Score", "Demand", "Competition", "Trend", "Volume", ""].map(h => (
              <div key={h} className="at-table-head-cell">{h}</div>
            ))}
          </div>

          <div className="flex flex-col">
            {filtered.map((row, i) => (
              <MotionDiv key={row.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 + i * 0.04 }}>
                <div
                  className={`at-table-row ${selected?.id === row.id ? "selected" : ""} grid items-center px-5 py-[14px]`}
                  style={{ gridTemplateColumns: "2fr 100px 90px 90px 90px 80px 36px", borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}
                  onClick={() => setSelected(selected?.id === row.id ? null : row)}>
                  <div className="at-table-cell pl-0 min-w-0">
                    <div className="text-sm font-medium text-foreground overflow-hidden text-ellipsis whitespace-nowrap mb-1">{row.keyword}</div>
                    <div className="flex items-center gap-1.5">
                      <span className={`at-badge at-badge-${badgeMeta[row.badge].variant}`}>{badgeMeta[row.badge].label}</span>
                      <span className="text-[10px] text-[var(--text-dim)]">{row.category}</span>
                    </div>
                  </div>
                  <div className="at-table-cell">
                    <span className="font-mono text-lg font-extrabold tracking-[-0.04em]" style={{ color: scoreColor(row.gapScore) }}>{row.gapScore}</span>
                  </div>
                  {[{ v: row.demand, c: "var(--neon-indigo)" }, { v: row.competition, c: row.competition < 30 ? "var(--neon-emerald)" : row.competition < 60 ? "var(--neon-amber)" : "var(--neon-red)" }, { v: row.trend, c: "var(--neon-purple)" }].map((m, mi) => (
                    <div key={mi} className="at-table-cell">
                      <div className="text-[11px] text-foreground mb-[5px]">{m.v}%</div>
                      <div className="at-progress h-[3px]"><div className="at-progress-fill" style={{ width: `${m.v}%`, background: m.c }} /></div>
                    </div>
                  ))}
                  <div className="at-table-cell">
                    <span className="font-mono text-[11px] text-muted-foreground">{row.searchVolume}</span>
                  </div>
                  <div className="px-1 flex justify-center">
                    <button onClick={e => { e.stopPropagation(); toggleSave(row.id); }}
                      className="w-7 h-7 rounded-sm bg-transparent border-none cursor-pointer flex items-center justify-center transition-colors"
                      style={{ color: savedItems.has(row.id) ? "var(--neon-amber)" : "var(--text-dim)" }}>
                      <Bookmark size={12} fill={savedItems.has(row.id) ? "var(--neon-amber)" : "none"} />
                    </button>
                  </div>
                </div>
              </MotionDiv>
            ))}
            </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}>
              <div className="bg-card border border-border rounded-lg shadow-sm p-6 sticky top-0">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <span className={`at-badge at-badge-${badgeMeta[selected.badge].variant}`}>{badgeMeta[selected.badge].label}</span>
                    <div className="text-sm font-semibold text-foreground mt-2 leading-[1.4]">{selected.keyword}</div>
                  </div>
                  <button onClick={() => setSelected(null)} className="bg-transparent border-none cursor-pointer text-[var(--text-dim)] p-1"><X size={14} /></button>
                </div>
                <div className="text-center py-5 border-t border-b border-border mb-5">
                  <div className="font-mono text-[52px] font-extrabold tracking-[-0.04em] leading-none" style={{ color: scoreColor(selected.gapScore) }}>{selected.gapScore}</div>
                  <div className="text-[11px] text-[var(--text-dim)] mt-1">Gap Score</div>
                </div>
                <div className="flex flex-col gap-[14px] mb-5">
                  {[
                    { label: "Demand",      value: selected.demand,      color: "var(--neon-indigo)"  },
                    { label: "Competition", value: selected.competition, color: selected.competition < 30 ? "var(--neon-emerald)" : selected.competition < 60 ? "var(--neon-amber)" : "var(--neon-red)" },
                    { label: "Trend",       value: selected.trend,       color: "var(--neon-purple)"  },
                  ].map(m => (
                    <div key={m.label}>
                      <div className="flex justify-between mb-[5px]">
                        <span className="text-[11px] text-[var(--text-dim)]">{m.label}</span>
                        <span className="font-mono text-[11px] font-bold" style={{ color: m.color }}>{m.value}%</span>
                      </div>
                      <div className="at-progress h-1"><div className="at-progress-fill" style={{ width: `${m.value}%`, background: m.color }} /></div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {[
                    { label: "Search Vol", value: selected.searchVolume },
                    { label: "Avg Views",  value: selected.avgViews },
                    { label: "Category",   value: selected.category },
                    { label: "Difficulty", value: selected.competition < 30 ? "Easy" : selected.competition < 60 ? "Medium" : "Hard" },
                  ].map(s => (
                    <div key={s.label} className="px-3 py-[10px] rounded-sm bg-[var(--surface-1)] border border-border">
                      <div className="text-[9px] font-bold tracking-[0.09em] uppercase text-[var(--text-dim)] mb-1">{s.label}</div>
                      <div className="font-mono text-sm font-bold text-foreground">{s.value}</div>
                    </div>
                  ))}
                </div>
                <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-foreground text-background shadow-xs hover:opacity-90 h-9 px-4 w-full">
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