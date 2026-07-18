"use client";

import { motion } from "framer-motion";
import { modules, phaseColors } from "@/lib/course-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Ruler, FlaskConical, Beaker, Lightbulb, Activity, Search, FileText, GitBranch, MessageSquare, BarChart3, Gauge, Brain, Cuboid, Workflow, Users, PenTool } from "lucide-react";
import { useState } from "react";

const toolCategories: Record<string, { name: string; description: string; color: string }> = {
  "define": { name: "Define Phase", description: "Problem definition and project scoping tools", color: "#34d399" },
  "measure": { name: "Measure Phase", description: "Data collection and measurement tools", color: "#22d3ee" },
  "analyze": { name: "Analyze Phase", description: "Root cause identification and verification tools", color: "#fbbf24" },
  "improve": { name: "Improve Phase", description: "Solution design and optimization tools", color: "#a78bfa" },
  "control": { name: "Control Phase", description: "Process monitoring and sustainment tools", color: "#fb7185" },
  "lean": { name: "Lean Tools", description: "Waste elimination and flow optimization", color: "#2dd4bf" },
  "advanced": { name: "Advanced / Black Belt", description: "Advanced statistical and design tools", color: "#fb923c" },
  "leadership": { name: "Leadership", description: "Change management and project leadership", color: "#f472b6" },
};

export function ToolsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const allTools = modules.flatMap((m) =>
    m.tools.map((tool) => ({
      name: tool,
      phase: m.phase,
      moduleId: m.id,
      moduleTitle: m.shortTitle,
      belt: m.belt,
    }))
  );

  // Deduplicate
  const uniqueTools = allTools.reduce((acc, tool) => {
    const key = tool.name;
    if (!acc.find((t) => t.name === key)) {
      acc.push(tool);
    }
    return acc;
  }, [] as typeof allTools);

  const filteredTools = selectedCategory === "all"
    ? uniqueTools
    : uniqueTools.filter((t) => t.phase === selectedCategory);

  const categories = [...new Set(modules.flatMap((m) => m.phase))];

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            Tools & <span className="text-teal-400">Techniques</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive reference of all Six Sigma and Lean tools covered in this course. Each tool is mapped to its DMAIC phase and module.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === "all" ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "text-muted-foreground hover:text-foreground border border-transparent"
            }`}
          >
            All ({uniqueTools.length})
          </button>
          {categories.map((cat) => {
            const tc = toolCategories[cat];
            const count = uniqueTools.filter((t) => t.phase === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  selectedCategory === cat
                    ? "border-opacity-30"
                    : "text-muted-foreground hover:text-foreground border-transparent"
                }`}
                style={selectedCategory === cat ? {
                  backgroundColor: `${tc.color}15`,
                  color: tc.color,
                  borderColor: `${tc.color}40`,
                } : {}}
              >
                {tc.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Selected category info */}
        {selectedCategory !== "all" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <Card className="border-border/30" style={{ backgroundColor: `${toolCategories[selectedCategory]?.color}05` }}>
              <CardContent className="p-4">
                <h3 className="font-bold" style={{ color: toolCategories[selectedCategory]?.color }}>
                  {toolCategories[selectedCategory]?.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {toolCategories[selectedCategory]?.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Tools grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTools.map((tool, i) => {
            const pc = phaseColors[tool.phase];
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.5) }}
              >
                <Card className="border-border/30 hover:border-border/60 transition-all h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-semibold">{tool.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{tool.moduleTitle}</p>
                      </div>
                      <Badge variant="outline" className={`text-[10px] shrink-0 ${pc?.bg} ${pc?.text} ${pc?.border}`}>
                        {tool.phase}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <Badge variant="outline" className={`text-[10px] ${
                        tool.belt === "green" ? "border-emerald-500/30 text-emerald-500" : "border-zinc-500/30 text-zinc-400"
                      }`}>
                        {tool.belt} belt
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}