"use client";

import { motion } from "framer-motion";
import { useLearningStore } from "@/lib/store";
import { learningPath, modules, phaseColors } from "@/lib/course-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Clock, ChevronRight, Award, Lock } from "lucide-react";

export function RoadmapSection() {
  const { moduleProgress, activeBelt, setBelt, setModule, markModuleComplete, getModuleProgress } = useLearningStore();

  const filteredMilestones = learningPath.filter((m) => activeBelt === "all" || m.belt === activeBelt);
  const allModules = modules.filter((m) => activeBelt === "all" || m.belt === activeBelt || m.belt === "both");

  const getMilestoneProgress = (milestone: (typeof learningPath)[0]) => {
    if (milestone.moduleIds.length === 0) return 0;
    const completed = milestone.moduleIds.filter((id) => moduleProgress[id]?.completed).length;
    return Math.round((completed / milestone.moduleIds.length) * 100);
  };

  const isMilestoneLocked = (index: number) => {
    if (index === 0) return false;
    const prev = filteredMilestones[index - 1];
    if (!prev) return false;
    return getMilestoneProgress(prev) < 100;
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            Learning <span className="text-emerald-400">Roadmap</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your structured path from Six Sigma fundamentals to Black Belt mastery. Complete each milestone to unlock the next stage.
          </p>

          {/* Belt filter */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {(["all", "green", "black"] as const).map((belt) => (
              <Button
                key={belt}
                variant={activeBelt === belt ? "default" : "outline"}
                size="sm"
                onClick={() => setBelt(belt)}
                className={`rounded-full px-5 capitalize ${
                  activeBelt === belt
                    ? belt === "green"
                      ? "bg-emerald-600 hover:bg-emerald-500"
                      : belt === "black"
                      ? "bg-zinc-800 hover:bg-zinc-700"
                      : ""
                    : ""
                }`}
              >
                {belt === "all" ? "All Levels" : `${belt === "green" ? "🟢" : "⚫"} ${belt} Belt`}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Roadmap timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/30 to-violet-500/50" />

          <div className="space-y-4 sm:space-y-6">
            {filteredMilestones.map((milestone, index) => {
              const progress = getMilestoneProgress(milestone);
              const locked = isMilestoneLocked(index);
              const milestoneModules = milestone.moduleIds.map((id) => modules.find((m) => m.id === id)).filter(Boolean);
              const colors = phaseColors[milestoneModules[0]?.phase || "define"];

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="relative pl-14 sm:pl-20"
                >
                  {/* Timeline node */}
                  <div
                    className={`absolute left-4 sm:left-6 top-6 w-4 h-4 rounded-full border-2 z-10 transition-colors ${
                      progress === 100
                        ? "bg-emerald-500 border-emerald-500"
                        : locked
                        ? "bg-muted border-muted-foreground/30"
                        : `bg-background ${colors?.border || "border-cyan-500/50"}`
                    }`}
                  />

                  <Card
                    className={`border-border/50 transition-all ${
                      locked ? "opacity-60" : "hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                milestone.belt === "green"
                                  ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                                  : "border-zinc-500/40 text-zinc-300 bg-zinc-500/10"
                              }`}
                            >
                              {milestone.belt === "green" ? "Green Belt" : "Black Belt"}
                            </Badge>
                            {locked && <Lock className="w-3.5 h-3.5 text-muted-foreground/50" />}
                          </div>
                          <CardTitle className="text-lg font-bold truncate">{milestone.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {milestone.estimatedHours}h
                          </span>
                          {progress === 100 ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <span className="text-xs font-medium text-muted-foreground">{progress}%</span>
                          )}
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <Progress value={progress} className="h-1.5" />
                      </div>
                    </CardHeader>

                    {/* Module list inside milestone */}
                    {milestoneModules.length > 0 && (
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          {milestoneModules.map((mod) => {
                            if (!mod) return null;
                            const mp = getModuleProgress(mod.id);
                            const isComplete = moduleProgress[mod.id]?.completed;
                            const phaseColor = phaseColors[mod.phase];

                            return (
                              <div
                                key={mod.id}
                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer group ${
                                  isComplete
                                    ? "border-emerald-500/20 bg-emerald-500/5"
                                    : "border-border/30 hover:border-border/60 hover:bg-secondary/50"
                                }`}
                                onClick={() => !locked && setModule(mod.id)}
                              >
                                {isComplete ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                ) : (
                                  <Circle className="w-5 h-5 text-muted-foreground/40 shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium truncate">{mod.shortTitle}</span>
                                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${phaseColor?.bg} ${phaseColor?.text} ${phaseColor?.border}`}>
                                      {mod.phase}
                                    </Badge>
                                  </div>
                                  <span className="text-xs text-muted-foreground">{mod.duration}</span>
                                </div>
                                {!locked && <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-emerald-400 transition-colors shrink-0" />}
                              </div>
                            );
                          })}

                          {/* Cert milestones with no modules */}
                          {milestone.moduleIds.length === 0 && (
                            <div className="text-center py-4">
                              <Award className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                              <p className="text-sm text-muted-foreground">Certification preparation milestone</p>
                              <p className="text-xs text-muted-foreground/70">Review all modules and take practice exams</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}