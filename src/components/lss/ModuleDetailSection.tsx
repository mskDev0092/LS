"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modules, phaseColors, type Module } from "@/lib/course-data";
import { useLearningStore } from "@/lib/store";
import { VideoPlayer } from "./VideoPlayer";
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
  Gauge, Brain, Cuboid, Workflow, Users, PenTool, Maximize2,
  Timer, EyeOff,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Target, Ruler, FlaskConical, Beaker, Lightbulb, Activity,
  Search, FileText, GitBranch, MessageSquare, BarChart3,
  Gauge, Brain, Cuboid, Workflow, Users, PenTool
};

export function ModuleDetailSection() {
  const {
    activeModuleId, setSection, moduleProgress, saveQuizAnswer,
    markModuleComplete, getModuleProgress, toggleVideoWatched,
    setActiveVideo, videoResumePositions,
  } = useLearningStore();
  const [activeTab, setActiveTab] = useState("content");
  const [quizState, setQuizState] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  // Quiz timer state
  const QUIZ_TIME_PER_QUESTION = 60;
  const [quizTimeLeft, setQuizTimeLeft] = useState(0);
  const [quizTimerActive, setQuizTimerActive] = useState(false);
  const [quizTabHidden, setQuizTabHidden] = useState(false);
  const quizTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeModule = useMemo(() => modules.find((m) => m.id === activeModuleId), [activeModuleId]);
  const mp = activeModuleId ? getModuleProgress(activeModuleId) : null;
  const phaseColor = activeModule ? phaseColors[activeModule.phase] : phaseColors.define;
  const Icon = activeModule ? (iconMap[activeModule.icon] || BookOpen) : BookOpen;

  const quizScore = activeModule ? activeModule.quizQuestions.filter((q) => quizState[q.id] === q.correctIndex).length : 0;
  const quizTotal = activeModule ? activeModule.quizQuestions.length : 0;
  const quizPercent = quizTotal > 0 ? Math.round((quizScore / quizTotal) * 100) : 0;

  // Quiz timer
  const clearQuizTimer = useCallback(() => {
    if (quizTimerRef.current) { clearInterval(quizTimerRef.current); quizTimerRef.current = null; }
  }, []);

  const startQuizTimer = useCallback((seconds: number) => {
    clearQuizTimer();
    setQuizTimeLeft(seconds);
    setQuizTimerActive(true);
    quizTimerRef.current = setInterval(() => {
      setQuizTimeLeft((prev) => {
        if (prev <= 1) { clearQuizTimer(); setQuizTimerActive(false); return 0; }
        return prev - 1;
      });
    }, 1000);
  }, [clearQuizTimer]);

  // Auto-submit when quiz timer hits 0
  useEffect(() => {
    if (quizTimeLeft === 0 && quizTimerActive && !showResults && activeTab === "quiz" && activeModule) {
      handleQuizSubmit();
    }
  }, [quizTimeLeft, quizTimerActive, showResults, activeTab]);

  // Focus detection for quiz timer
  useEffect(() => {
    const onVis = () => {
      if (document.hidden && quizTimerActive) {
        setQuizTabHidden(true);
      } else if (!document.hidden && quizTimerActive && !showResults) {
        setQuizTabHidden(false);
        startQuizTimer(quizTimeLeft); // Reset timer on refocus
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [quizTimerActive, quizTimeLeft, showResults, startQuizTimer]);

  // Start/reset quiz timer when switching to quiz tab
  useEffect(() => {
    if (activeTab === "quiz" && !showResults && quizTotal > 0 && !quizTimerActive) {
      startQuizTimer(quizTotal * QUIZ_TIME_PER_QUESTION);
    }
    if (activeTab !== "quiz") {
      clearQuizTimer();
      setQuizTimerActive(false);
    }
  }, [activeTab, showResults, quizTotal]);

  // Cleanup
  useEffect(() => clearQuizTimer, [clearQuizTimer]);

  if (!activeModule) return null;

  const handleQuizSubmit = () => {
    clearQuizTimer();
    setQuizTimerActive(false);
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
    clearQuizTimer();
    setQuizTimerActive(false);
  };

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
                  {/* Focus lost warning */}
                  <AnimatePresence>
                    {quizTabHidden && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
                        <EyeOff className="w-5 h-5 text-amber-400 shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-amber-400">Focus lost — timer will reset</p>
                          <p className="text-xs text-muted-foreground">Stay on this tab to continue the quiz.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">Knowledge Check</h3>
                      <p className="text-sm text-muted-foreground">{quizTotal} questions · {activeModule.belt} belt level</p>
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

                  {/* Quiz timer */}
                  {!showResults && quizTimerActive && (
                    <div className="mb-6 space-y-2">
                      <div className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                        quizTimeLeft <= 30 ? "bg-red-500/10 border-red-500/30" :
                        quizTimeLeft <= 60 ? "bg-amber-500/10 border-amber-500/30" :
                        "bg-emerald-500/10 border-emerald-500/30"
                      }`}>
                        <div className="flex items-center gap-2">
                          <Timer className={`w-4 h-4 ${
                            quizTimeLeft <= 30 ? "text-red-400" : quizTimeLeft <= 60 ? "text-amber-400" : "text-emerald-400"
                          }`} />
                          <span className={`text-sm font-mono font-bold ${
                            quizTimeLeft <= 30 ? "text-red-400" : quizTimeLeft <= 60 ? "text-amber-400" : "text-emerald-400"
                          }`}>
                            {Math.floor(quizTimeLeft / 60)}:{(quizTimeLeft % 60).toString().padStart(2, "0")}
                          </span>
                          {quizTimeLeft <= 30 && quizTimeLeft > 0 && (
                            <span className="text-[10px] text-red-400/70 animate-pulse">Hurry up!</span>
                          )}
                          {quizTimeLeft === 0 && <span className="text-[10px] text-red-400">Time's up!</span>}
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {QUIZ_TIME_PER_QUESTION}s per question
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className="h-full rounded-full transition-colors"
                          style={{ backgroundColor: quizTimeLeft <= 30 ? "#ef4444" : quizTimeLeft <= 60 ? "#f59e0b" : "#22c55e" }}
                          animate={{ width: `${(quizTimeLeft / (quizTotal * QUIZ_TIME_PER_QUESTION)) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  )}

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
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold">Video Lessons</h3>
                      <p className="text-sm text-muted-foreground">Curated video resources from top Six Sigma educators.</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {mp?.videoWatched?.length || 0}/{activeModule.videos.length} watched
                    </div>
                  </div>

                  {/* First video - large player */}
                  {activeModule.videos.length > 0 && (
                    <div className="mb-6">
                      <VideoPlayer
                        key={activeModule.videos[0].youtubeId}
                        youtubeId={activeModule.videos[0].youtubeId}
                        moduleId={activeModule.id}
                        title={activeModule.videos[0].title}
                      />
                      <div className="mt-3 flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-semibold">{activeModule.videos[0].title}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Clock className="w-3 h-3" />
                            {activeModule.videos[0].duration}
                            <span className="text-muted-foreground/30">·</span>
                            {activeModule.videos[0].channel}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveVideo(activeModule.videos[0].youtubeId, activeModule.id)}
                          className="shrink-0 gap-1.5"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Full View</span>
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Remaining videos */}
                  {activeModule.videos.length > 1 && (
                    <>
                      <Separator className="mb-6" />
                      <div className="space-y-3">
                        {activeModule.videos.slice(1).map((video, vi) => {
                          const isWatched = mp?.videoWatched?.includes(video.youtubeId);
                          const vProgress = mp?.videoProgress?.[video.youtubeId] || 0;
                          return (
                            <motion.button
                              key={vi}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: vi * 0.05 }}
                              onClick={() => setActiveVideo(video.youtubeId, activeModule.id)}
                              className="w-full text-left rounded-xl border border-border/30 overflow-hidden hover:border-border/60 transition-all group flex gap-4 p-3"
                            >
                              {/* Thumbnail */}
                              <div className="relative w-40 sm:w-48 aspect-video rounded-lg overflow-hidden bg-secondary shrink-0">
                                <img
                                  src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                                    <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                                  </div>
                                </div>
                                {isWatched && (
                                  <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                    <CheckCircle2 className="w-2.5 h-2.5" />
                                    Done
                                  </div>
                                )}
                                {!isWatched && vProgress > 0 && (
                                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/40">
                                    <div className="h-full bg-rose-500" style={{ width: `${vProgress}%` }} />
                                  </div>
                                )}
                                <div className="absolute bottom-1 right-1 bg-black/80 text-[9px] text-white/90 px-1 py-0.5 rounded font-mono">
                                  {video.duration}
                                </div>
                              </div>

                              <div className="flex-1 min-w-0 py-1">
                                <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-rose-400 transition-colors mb-1">
                                  {video.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  {video.duration}
                                  <span className="text-muted-foreground/30">·</span>
                                  {video.channel}
                                </div>
                                {vProgress > 0 && !isWatched && (
                                  <div className="mt-2 flex items-center gap-2">
                                    <div className="h-1 flex-1 max-w-[120px] rounded-full bg-secondary overflow-hidden">
                                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${vProgress}%` }} />
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">{Math.round(vProgress)}%</span>
                                  </div>
                                )}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* Open in full view */}
                  <div className="mt-6 flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (activeModule.videos.length > 0) {
                          setActiveVideo(activeModule.videos[0].youtubeId, activeModule.id);
                        }
                      }}
                      className="gap-1.5"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      Open in Full Player View
                    </Button>
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