"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Sparkles, Bookmark, TrendingUp, Target, Zap, X, Menu, Bell } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationPanel } from "./Overlays";
import { useSidebar } from "@/context/SidebarContext";

const D = motion.create("div" as any);
const fade = (d = 0) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16, 1, 0.3, 1] } });

type BadgeType = "easy-win" | "competitive" | "emerging" | "golden";
interface TopicData {
  id: number; keyword: string; category: string; demand: number; competition: number;
  trend: number; gapScore: number; badge: BadgeType; searchVolume: string; avgViews: string;
}

const mockData: TopicData[] = [
  { id: 1, keyword: "Python Automation for Beginners", category: "Programming", demand: 92, competition: 23, trend: 88, gapScore: 94, badge: "golden", searchVolume: "74K/mo", avgViews: "120K" },
  { id: 2, keyword: "AI Tools No One Talks About", category: "AI & ML", demand: 89, competition: 18, trend: 95, gapScore: 91, badge: "easy-win", searchVolume: "45K/mo", avgViews: "89K" },
  { id: 3, keyword: "React vs Next.js 2026", category: "Web Dev", demand: 78, competition: 45, trend: 72, gapScore: 76, badge: "emerging", searchVolume: "38K/mo", avgViews: "65K" },
  { id: 4, keyword: "Passive Income with AI SaaS", category: "Business", demand: 95, competition: 67, trend: 82, gapScore: 68, badge: "competitive", searchVolume: "92K/mo", avgViews: "210K" },
  { id: 5, keyword: "Learn Rust in 30 Days", category: "Programming", demand: 71, competition: 15, trend: 91, gapScore: 89, badge: "easy-win", searchVolume: "28K/mo", avgViews: "42K" },
  { id: 6, keyword: "No-Code App Development", category: "Tech", demand: 84, competition: 52, trend: 65, gapScore: 62, badge: "emerging", searchVolume: "56K/mo", avgViews: "78K" },
  { id: 7, keyword: "Figma to Code Workflow", category: "Design", demand: 76, competition: 12, trend: 84, gapScore: 92, badge: "golden", searchVolume: "22K/mo", avgViews: "35K" },
  { id: 8, keyword: "ChatGPT Prompt Engineering", category: "AI & ML", demand: 97, competition: 89, trend: 58, gapScore: 35, badge: "competitive", searchVolume: "180K/mo", avgViews: "340K" },
];

const badgeColors: Record<BadgeType, { bg: string; border: string; text: string }> = {
  golden: { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)", text: "#FBBF24" },
  "easy-win": { bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)", text: "#34D399" },
  emerging: { bg: "rgba(124,92,252,0.1)", border: "rgba(124,92,252,0.2)", text: "#7C5CFC" },
  competitive: { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)", text: "#EF4444" },
};
const badgeLabel: Record<BadgeType, string> = { golden: "Golden", "easy-win": "Easy Win", emerging: "Emerging", competitive: "Competitive" };

const scoreColor = (v: number) => v >= 85 ? "#34D399" : v >= 70 ? "#FBBF24" : "#EF4444";

export function GapAnalyzer() {
  const [searchQuery, setSearchQuery] = useState("Python for beginners");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Gap Score");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [savedItems, setSavedItems] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<TopicData | null>(null);
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  const [showNotifs, setShowNotifs] = useState(false);
  const { setIsMobileOpen } = useSidebar();

  const handleAnalyze = () => { setIsAnalyzing(true); setTimeout(() => setIsAnalyzing(false), 2000); };
  const toggleSave = (id: number) => setSavedItems(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleCat = (cat: string) => setActiveCategories(p => { const n = new Set(p); n.has(cat) ? n.delete(cat) : n.add(cat); return n; });

  const categories = [...new Set(mockData.map(d => d.category))];
  const filtered = [...mockData]
    .filter(d => activeCategories.size === 0 || activeCategories.has(d.category))
    .sort((a, b) => {
      if (selectedSort === "Demand") return b.demand - a.demand;
      if (selectedSort === "Competition") return a.competition - b.competition;
      if (selectedSort === "Trend") return b.trend - a.trend;
      return b.gapScore - a.gapScore;
    });

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between h-14 px-5 md:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileOpen(true)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-transparent text-[var(--text-dim)] cursor-pointer"><Menu size={16} /></button>
            <div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-0.5">Research</div>
              <h1 className="font-heading font-bold text-base text-foreground tracking-tight m-0">Gap Analyzer</h1>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button onClick={() => setShowNotifs(!showNotifs)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-transparent border-none text-[var(--text-dim)] cursor-pointer hover:bg-[var(--hover-overlay)] transition-colors relative"><Bell size={15} /><div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" /></button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-8 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            { label: "Topics Analyzed", value: "2,847", icon: Target, color: "#7C5CFC", change: "+12%" },
            { label: "Easy Wins Found", value: "186", icon: Zap, color: "#34D399", change: "+24%" },
            { label: "Avg Gap Score", value: "73.4", icon: TrendingUp, color: "#A855F7", change: "+8%" },
            { label: "Videos Generated", value: "94", icon: Sparkles, color: "#F472B6", change: "+31%" },
          ].map((k, i) => (
            <D key={k.label} {...fade(0.04 + i * 0.05)}>
              <div className="group bg-card border border-border rounded-2xl p-4 hover:border-[var(--surface-4)] transition-all relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${k.color}12`, border: `1px solid ${k.color}20` }}>
                    <k.icon size={14} color={k.color} />
                  </div>
                  <span className="text-[10px] text-[var(--text-dim)]">{k.label}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xl font-extrabold text-foreground tracking-tighter">{k.value}</span>
                  <span className="text-[10px] font-bold text-[#34D399]">{k.change}</span>
                </div>
              </div>
            </D>
          ))}
        </div>

        {/* Search */}
        <D {...fade(0.24)}>
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)] pointer-events-none" />
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAnalyze()}
                  placeholder="Enter a niche, keyword, or topic…"
                  className="w-full h-11 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] pl-10 pr-3" />
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleAnalyze}
                className="inline-flex items-center justify-center gap-2 font-bold text-sm rounded-xl border-none cursor-pointer text-white h-11 px-6"
                style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)", opacity: isAnalyzing ? 0.7 : 1 }}>
                {isAnalyzing ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Sparkles size={14} /></motion.div> : <Sparkles size={14} />}
                {isAnalyzing ? "Analyzing…" : "Analyze"}
              </motion.button>
              <button onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center justify-center gap-2 font-medium text-sm rounded-xl border border-border cursor-pointer h-11 px-5 transition-all ${showFilters ? "bg-[var(--surface-2)] text-foreground" : "bg-transparent text-[var(--text-dim)] hover:text-foreground hover:bg-[var(--hover-overlay)]"}`}>
                <SlidersHorizontal size={14} /> Filters
                {activeCategories.size > 0 && <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[9px] font-bold text-white">{activeCategories.size}</span>}
              </button>
            </div>
            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="pt-4 mt-4 border-t border-border flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)]">Category</span>
                      {categories.map(cat => (
                        <button key={cat} onClick={() => toggleCat(cat)}
                          className={`h-7 px-3 rounded-lg text-[11px] font-medium cursor-pointer transition-all border ${activeCategories.has(cat) ? "bg-primary text-white border-primary" : "bg-transparent text-[var(--text-dim)] border-border hover:text-foreground"}`}>
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="ml-auto flex gap-1 items-center">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mr-1">Sort</span>
                      {["Gap Score", "Demand", "Competition", "Trend"].map(s => (
                        <button key={s} onClick={() => setSelectedSort(s)}
                          className={`h-7 px-3 rounded-lg text-[11px] font-medium cursor-pointer transition-all border ${selectedSort === s ? "bg-[var(--surface-2)] text-foreground border-[var(--surface-4)]" : "bg-transparent text-[var(--text-dim)] border-transparent hover:text-foreground"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </D>

        {/* Results */}
        <div className="flex flex-col xl:grid gap-3 flex-1 min-h-0" style={{ gridTemplateColumns: selected ? "1fr 340px" : "1fr" }}>
          <D {...fade(0.3)}>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  <div className="grid px-5 py-3 border-b border-border bg-[var(--surface-1)]"
                    style={{ gridTemplateColumns: "2fr 100px 90px 90px 90px 80px 36px" }}>
                    {["Keyword / Topic", "Gap Score", "Demand", "Competition", "Trend", "Volume", ""].map(h => (
                      <div key={h} className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)]">{h}</div>
                    ))}
                  </div>
                  {filtered.map((row, i) => (
                    <D key={row.id} {...fade(0.32 + i * 0.03)}>
                      <div className={`grid items-center px-5 py-4 cursor-pointer transition-colors hover:bg-[var(--hover-overlay)] ${selected?.id === row.id ? "bg-[var(--hover-overlay)]" : ""}`}
                        style={{ gridTemplateColumns: "2fr 100px 90px 90px 90px 80px 36px", borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}
                        onClick={() => setSelected(selected?.id === row.id ? null : row)}>
                        <div className="min-w-0">
                          <div className="text-[13px] font-medium text-foreground truncate mb-1.5">{row.keyword}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: badgeColors[row.badge].bg, border: `1px solid ${badgeColors[row.badge].border}`, color: badgeColors[row.badge].text }}>{badgeLabel[row.badge]}</span>
                            <span className="text-[10px] text-[var(--text-dim)]">{row.category}</span>
                          </div>
                        </div>
                        <div><span className="font-mono text-lg font-extrabold" style={{ color: scoreColor(row.gapScore) }}>{row.gapScore}</span></div>
                        {[{ v: row.demand, c: "#7C5CFC" }, { v: row.competition, c: row.competition < 30 ? "#34D399" : row.competition < 60 ? "#FBBF24" : "#EF4444" }, { v: row.trend, c: "#A855F7" }].map((m, mi) => (
                          <div key={mi}>
                            <div className="text-[11px] text-foreground mb-1">{m.v}%</div>
                            <div className="h-1 rounded-full bg-[var(--surface-2)] overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${m.v}%`, background: m.c }} /></div>
                          </div>
                        ))}
                        <div><span className="font-mono text-[11px] text-muted-foreground">{row.searchVolume}</span></div>
                        <div className="flex justify-center">
                          <button onClick={e => { e.stopPropagation(); toggleSave(row.id); }}
                            className="w-8 h-8 rounded-lg bg-transparent border-none cursor-pointer flex items-center justify-center hover:bg-[var(--hover-overlay)] transition-colors"
                            style={{ color: savedItems.has(row.id) ? "#FBBF24" : "var(--text-dim)" }}>
                            <Bookmark size={13} fill={savedItems.has(row.id) ? "#FBBF24" : "none"} />
                          </button>
                        </div>
                      </div>
                    </D>
                  ))}
                </div>
              </div>
            </div>
          </D>

          <AnimatePresence>
            {selected && (
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.24 }}>
                <div className="bg-card border border-border rounded-2xl p-6 sticky top-20">
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: badgeColors[selected.badge].bg, border: `1px solid ${badgeColors[selected.badge].border}`, color: badgeColors[selected.badge].text }}>{badgeLabel[selected.badge]}</span>
                      <div className="text-sm font-bold text-foreground mt-2.5 leading-relaxed">{selected.keyword}</div>
                    </div>
                    <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg bg-transparent border-none cursor-pointer text-[var(--text-dim)] flex items-center justify-center hover:bg-[var(--hover-overlay)] transition-colors"><X size={14} /></button>
                  </div>
                  <div className="text-center py-6 border-t border-b border-border mb-5">
                    <div className="font-mono text-5xl font-extrabold tracking-tighter leading-none" style={{ color: scoreColor(selected.gapScore) }}>{selected.gapScore}</div>
                    <div className="text-[11px] text-[var(--text-dim)] mt-1.5">Gap Score</div>
                  </div>
                  <div className="space-y-4 mb-5">
                    {[
                      { label: "Demand", value: selected.demand, color: "#7C5CFC" },
                      { label: "Competition", value: selected.competition, color: selected.competition < 30 ? "#34D399" : selected.competition < 60 ? "#FBBF24" : "#EF4444" },
                      { label: "Trend", value: selected.trend, color: "#A855F7" },
                    ].map(m => (
                      <div key={m.label}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-[11px] text-[var(--text-dim)]">{m.label}</span>
                          <span className="font-mono text-[11px] font-bold" style={{ color: m.color }}>{m.value}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[var(--surface-2)] overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${m.value}%` }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full rounded-full" style={{ background: m.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {[
                      { label: "Search Vol", value: selected.searchVolume },
                      { label: "Avg Views", value: selected.avgViews },
                      { label: "Category", value: selected.category },
                      { label: "Difficulty", value: selected.competition < 30 ? "Easy" : selected.competition < 60 ? "Medium" : "Hard" },
                    ].map(s => (
                      <div key={s.label} className="px-3 py-3 rounded-xl bg-[var(--surface-1)] border border-border">
                        <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1">{s.label}</div>
                        <div className="font-mono text-sm font-bold text-foreground">{s.value}</div>
                      </div>
                    ))}
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="w-full h-10 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center justify-center gap-2"
                    style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
                    <Sparkles size={14} /> Generate Content Pack
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <NotificationPanel open={showNotifs} onClose={() => setShowNotifs(false)} />
    </div>
  );
}