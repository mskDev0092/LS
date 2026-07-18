"use client";

import { motion } from "framer-motion";
import { modules, phaseColors, sigmaLevelData } from "@/lib/course-data";
import { useLearningStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy, BookOpen, Play, Target, Clock, CheckCircle2,
  TrendingUp, Award, BarChart3
} from "lucide-react";

export function ProgressDashboard() {
  const { moduleProgress, quizResults } = useLearningStore();

  const totalModules = modules.length;
  const completedModules = Object.values(moduleProgress).filter((p) => p.completed).length;
  const overallPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  const greenModules = modules.filter((m) => m.belt === "green" || m.belt === "both");
  const blackModules = modules.filter((m) => m.belt === "black");
  const greenCompleted = greenModules.filter((m) => moduleProgress[m.id]?.completed).length;
  const blackCompleted = blackModules.filter((m) => moduleProgress[m.id]?.completed).length;

  const totalQuizQuestions = modules.reduce((sum, m) => sum + m.quizQuestions.length, 0);
  const totalVideos = modules.reduce((sum, m) => sum + m.videos.length, 0);
  const totalHours = modules.reduce((sum, m) => {
    const h = parseFloat(m.duration);
    return sum + (isNaN(h) ? 0 : h);
  }, 0);

  const videosWatched = Object.values(moduleProgress).reduce(
    (sum, p) => sum + (p.videoWatched?.length || 0),
    0
  );

  const phaseProgress = modules.reduce((acc, m) => {
    if (!acc[m.phase]) acc[m.phase] = { total: 0, completed: 0, name: m.phase };
    acc[m.phase].total++;
    if (moduleProgress[m.id]?.completed) acc[m.phase].completed++;
    return acc;
  }, {} as Record<string, { total: number; completed: number; name: string }>);

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            Your <span className="text-violet-400">Progress</span>
          </h2>
          <p className="text-muted-foreground">Track your learning journey and measure your readiness for certification.</p>
        </motion.div>

        {/* Main stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {[
            { label: "Modules Done", value: `${completedModules}/${totalModules}`, icon: BookOpen, color: "text-emerald-400" },
            { label: "Videos Watched", value: `${videosWatched}/${totalVideos}`, icon: Play, color: "text-rose-400" },
            { label: "Total Content", value: `${totalHours}h`, icon: Clock, color: "text-cyan-400" },
            { label: "Quiz Questions", value: totalQuizQuestions.toString(), icon: Trophy, color: "text-amber-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-border/50 h-full">
                <CardContent className="p-4 sm:p-5 text-center">
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-xl sm:text-2xl font-black">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Belt progress */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-emerald-500/20 h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    Green Belt
                  </CardTitle>
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-400">
                    {Math.round((greenCompleted / greenModules.length) * 100)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <Progress value={(greenCompleted / greenModules.length) * 100} className="h-2" />
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-secondary/50">
                    <div className="text-lg font-bold text-emerald-400">{greenCompleted}</div>
                    <div className="text-[10px] text-muted-foreground">Completed</div>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/50">
                    <div className="text-lg font-bold">{greenModules.length - greenCompleted}</div>
                    <div className="text-[10px] text-muted-foreground">Remaining</div>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/50">
                    <div className="text-lg font-bold">{greenModules.length}</div>
                    <div className="text-[10px] text-muted-foreground">Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="border-zinc-500/20 h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-zinc-400" />
                    Black Belt
                  </CardTitle>
                  <Badge variant="outline" className="border-zinc-500/40 text-zinc-300">
                    {Math.round((blackCompleted / blackModules.length) * 100)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <Progress value={(blackCompleted / blackModules.length) * 100} className="h-2" />
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-secondary/50">
                    <div className="text-lg font-bold text-zinc-300">{blackCompleted}</div>
                    <div className="text-[10px] text-muted-foreground">Completed</div>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/50">
                    <div className="text-lg font-bold">{blackModules.length - blackCompleted}</div>
                    <div className="text-[10px] text-muted-foreground">Remaining</div>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/50">
                    <div className="text-lg font-bold">{blackModules.length}</div>
                    <div className="text-[10px] text-muted-foreground">Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Phase breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Progress by DMAIC Phase</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(phaseProgress).map(([phase, data]) => {
                  const pc = phaseColors[phase];
                  const pct = Math.round((data.completed / data.total) * 100);
                  return (
                    <div key={phase} className="flex items-center gap-3">
                      <div className="w-20 sm:w-24 shrink-0">
                        <span className={`text-xs font-semibold uppercase tracking-wider ${pc?.text || ""}`}>
                          {phase}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: pc?.accent || "#888" }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground w-16 text-right shrink-0">
                        {data.completed}/{data.total} ({pct}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sigma level target */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6"
        >
          <Card className="border-border/30 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
              <h3 className="font-bold mb-1">Your Learning Sigma Level</h3>
              <div className="text-4xl font-black text-emerald-400 mb-1">
                {overallPercent >= 100 ? "6σ" : overallPercent >= 83 ? "5σ" : overallPercent >= 67 ? "4σ" : overallPercent >= 50 ? "3σ" : overallPercent >= 33 ? "2σ" : "1σ"}
              </div>
              <p className="text-sm text-muted-foreground">
                Complete all modules to achieve Six Sigma mastery level
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}