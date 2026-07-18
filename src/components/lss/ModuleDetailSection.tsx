"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modules, phaseColors, type Module } from "@/lib/course-data";
import { useLearningStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2, XCircle, ArrowLeft, Play, Clock, BookOpen,
  ChevronRight, Trophy, RotateCcw, ExternalLink,
  Target, Ruler, FlaskConical, Beaker, Lightbulb, Activity,
  Search, FileText, GitBranch, MessageSquare, BarChart3,
  Gauge, Brain, Cuboid, Workflow, Users, PenTool
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Target, Ruler, FlaskConical, Beaker, Lightbulb, Activity,
  Search, FileText, GitBranch, MessageSquare, BarChart3,
  Gauge, Brain, Cuboid, Workflow, Users, PenTool
};

export function ModuleDetailSection() {
  const {
    activeModuleId, setSection, moduleProgress, saveQuizAnswer,
    markModuleComplete, getModuleProgress, markVideoWatched,
  } = useLearningStore();
  const [activeTab, setActiveTab] = useState("content");
  const [quizState, setQuizState] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const activeModule = useMemo(() => modules.find((m) => m.id === activeModuleId), [activeModuleId]);
  const mp = activeModuleId ? getModuleProgress(activeModuleId) : null;
  const phaseColor = activeModule ? phaseColors[activeModule.phase] : phaseColors.define;
  const Icon = activeModule ? (iconMap[activeModule.icon] || BookOpen) : BookOpen;

  if (!activeModule) return null;

  const handleQuizSubmit = () => {
    if (activeModule) {
      activeModule.quizQuestions.forEach((q) => {
        const answer = quizState[q.id];
        if (answer !== undefined) {
          saveQuizAnswer(activeModule.id, q.id, answer);
        }
      });
    }
    setShowResults(true);
  };

  const resetQuiz = () => {
    setQuizState({});
    setShowResults(false);
  };

  const quizScore = activeModule.quizQuestions.filter((q) => quizState[q.id] === q.correctIndex).length;
  const quizTotal = activeModule.quizQuestions.length;
  const quizPercent = quizTotal > 0 ? Math.round((quizScore / quizTotal) * 100) : 0;

  return (
    <section className="py-4 sm:py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { setSection("roadmap"); setQuizState({}); setShowResults(false); setActiveTab("content"); }}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Roadmap
        </Button>

        {/* Module header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-start gap-4">
            <div
              className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${phaseColor.accent}15`, color: phaseColor.accent }}
            >
              <Icon className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge variant="outline" className={`text-xs ${phaseColor.bg} ${phaseColor.text} ${phaseColor.border}`}>
                  {activeModule.phase.toUpperCase()}
                </Badge>
                <Badge variant="outline" className={`text-xs ${
                  activeModule.belt === "green"
                    ? "border-emerald-500/40 text-emerald-400"
                    : "border-zinc-500/40 text-zinc-300"
                }`}>
                  {activeModule.belt === "green" ? "Green Belt" : "Black Belt"}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activeModule.duration}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{activeModule.title}</h2>
              <p className="text-muted-foreground mt-1">{activeModule.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-secondary/50">
            <TabsTrigger value="content" className="text-xs sm:text-sm">
              <BookOpen className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-xs sm:text-sm">
              <Target className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Tools</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="text-xs sm:text-sm relative">
              <FlaskConical className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Quiz</span>
              {quizPercent === 100 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />}
            </TabsTrigger>
            <TabsTrigger value="videos" className="text-xs sm:text-sm">
              <Play className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
          </TabsList>

          {/* CONTENT TAB */}
          <TabsContent value="content">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-border/50">
                <CardContent className="p-6 sm:p-8">
                  {/* Key Topics */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Key Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeModule.keyTopics.map((topic, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-border/40">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  {/* Content */}
                  <div className="prose prose-invert prose-sm max-w-none">
                    {activeModule.content.split("\n\n").map((paragraph, i) => {
                      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                        return <h4 key={i} className="text-base font-bold text-foreground mt-6 mb-2">{paragraph.replace(/\*\*/g, "")}</h4>;
                      }
                      if (paragraph.startsWith("**")) {
                        const parts = paragraph.split("**");
                        return (
                          <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3">
                            {parts.map((part, j) =>
                              j % 2 === 1 ? (
                                <strong key={j} className="text-foreground font-semibold">{part}</strong>
                              ) : (
                                <span key={j}>{part}</span>
                              )
                            )}
                          </p>
                        );
                      }
                      if (paragraph.startsWith("- ") || paragraph.startsWith("  - ")) {
                        const items = paragraph.split("\n").filter(Boolean);
                        const isSubItem = paragraph.startsWith("  - ");
                        return (
                          <ul key={i} className={`space-y-1 mb-3 ${isSubItem ? "ml-4" : ""}`}>
                            {items.map((item, j) => (
                              <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                <ChevronRight className={`w-3 h-3 mt-1 shrink-0 ${phaseColor.text}`} />
                                <span>{item.replace(/^[ -]+/, "").replace(/\*\*(.*?)\*\*/g, "$1")}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (paragraph.startsWith("|")) {
                        const rows = paragraph.split("\n").filter(r => !r.match(/^\|[-|:\s]+$/));
                        if (rows.length < 2) return null;
                        const headers = rows[0].split("|").filter(Boolean).map(h => h.trim());
                        return (
                          <div key={i} className="overflow-x-auto mb-4 rounded-lg border border-border/30">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-border/30 bg-secondary/30">
                                  {headers.map((h, j) => (
                                    <th key={j} className="px-3 py-2 text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {rows.slice(1).map((row, j) => (
                                  <tr key={j} className="border-b border-border/20 last:border-0">
                                    {row.split("|").filter(Boolean).map((cell, k) => (
                                      <td key={k} className="px-3 py-2 text-muted-foreground">{cell.trim()}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                      if (paragraph.match(/^\d+\./)) {
                        const items = paragraph.split("\n").filter(Boolean);
                        return (
                          <ol key={i} className="space-y-1 mb-3 list-decimal list-inside">
                            {items.map((item, j) => (
                              <li key={j} className="text-sm text-muted-foreground">{item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}</li>
                            ))}
                          </ol>
                        );
                      }
                      return <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3">{paragraph}</p>;
                    })}
                  </div>

                  {/* Mark Complete */}
                  {!mp?.completed && (
                    <div className="mt-8 flex justify-end">
                      <Button
                        onClick={() => markModuleComplete(activeModule.id)}
                        className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg shadow-emerald-500/20"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Mark as Complete
                      </Button>
                    </div>
                  )}
                  {mp?.completed && (
                    <div className="mt-8 flex items-center justify-end gap-2 text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Module Completed</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* TOOLS TAB */}
          <TabsContent value="tools">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-border/50">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold mb-1">Tools & Techniques</h3>
                  <p className="text-sm text-muted-foreground mb-6">Key tools used in this phase of the DMAIC methodology.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeModule.tools.map((tool, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-secondary/20 hover:border-border/60 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: phaseColor.accent }} />
                        <span className="text-sm font-medium">{tool}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* QUIZ TAB */}
          <TabsContent value="quiz">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-border/50">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold">Knowledge Check</h3>
                      <p className="text-sm text-muted-foreground">{quizTotal} questions · {activeModule.difficulty || activeModule.belt} level</p>
                    </div>
                    {showResults && (
                      <div className="flex items-center gap-2">
                        <Badge className={`${quizPercent >= 80 ? "bg-emerald-600" : quizPercent >= 60 ? "bg-amber-600" : "bg-red-600"}`}>
                          {quizScore}/{quizTotal} ({quizPercent}%)
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={resetQuiz}>
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {activeModule.quizQuestions.map((q, qi) => {
                      const selectedAnswer = quizState[q.id];
                      const isCorrect = selectedAnswer === q.correctIndex;
                      const isAnswered = selectedAnswer !== undefined;

                      return (
                        <motion.div
                          key={q.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: qi * 0.05 }}
                          className="p-4 rounded-xl border border-border/30 space-y-3"
                        >
                          <p className="text-sm font-semibold flex items-start gap-2">
                            <span className="shrink-0 w-6 h-6 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold">{qi + 1}</span>
                            {q.question}
                          </p>

                          <div className="space-y-2 ml-8">
                            {q.options.map((option, oi) => {
                              const isSelected = selectedAnswer === oi;
                              const isCorrectOption = oi === q.correctIndex;
                              let optionClass = "border-border/30 hover:border-border/60 cursor-pointer";
                              if (showResults) {
                                if (isCorrectOption) optionClass = "border-emerald-500/50 bg-emerald-500/10";
                                else if (isSelected && !isCorrect) optionClass = "border-red-500/50 bg-red-500/10";
                              } else if (isSelected) {
                                optionClass = `${phaseColor.border} ${phaseColor.bg}`;
                              }

                              return (
                                <div
                                  key={oi}
                                  className={`p-3 rounded-lg border text-sm transition-all ${optionClass} ${!showResults ? "cursor-pointer" : ""}`}
                                  onClick={() => !showResults && setQuizState((prev) => ({ ...prev, [q.id]: oi }))}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                      isSelected ? "border-current" : "border-muted-foreground/30"
                                    }`}>
                                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-current" />}
                                    </div>
                                    <span>{option}</span>
                                    {showResults && isCorrectOption && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto shrink-0" />}
                                    {showResults && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500 ml-auto shrink-0" />}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Explanation */}
                          <AnimatePresence>
                            {showResults && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="ml-8 p-3 rounded-lg bg-secondary/50 text-sm text-muted-foreground"
                              >
                                <span className="font-semibold text-foreground">Explanation: </span>
                                {q.explanation}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>

                  {!showResults && quizTotal > 0 && (
                    <div className="mt-8 flex justify-end">
                      <Button
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(quizState).length === 0}
                        className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white"
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        Submit Answers
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* VIDEOS TAB */}
          <TabsContent value="videos">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-border/50">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold mb-1">Video Lessons</h3>
                  <p className="text-sm text-muted-foreground mb-6">Curated video resources from top Six Sigma educators.</p>

                  <div className="space-y-4">
                    {activeModule.videos.map((video, vi) => {
                      const isWatched = mp?.videoWatched?.includes(video.youtubeId);
                      return (
                        <motion.div
                          key={vi}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: vi * 0.1 }}
                          className="rounded-xl border border-border/30 overflow-hidden"
                        >
                          <div className="aspect-video bg-black/50 relative">
                            <iframe
                              className="w-full h-full"
                              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="text-sm font-semibold mb-1">{video.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {video.duration}
                              </span>
                              <span>{video.channel}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs ml-auto"
                                onClick={() => markVideoWatched(activeModule.id, video.youtubeId)}
                              >
                                {isWatched ? (
                                  <><CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" /> Watched</>
                                ) : (
                                  "Mark Watched"
                                )}
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}