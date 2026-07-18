"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modules, phaseColors } from "@/lib/course-data";
import { useLearningStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy, CheckCircle2, XCircle, RotateCcw, ArrowRight,
  Sparkles, Clock, EyeOff, AlertTriangle, Timer,
} from "lucide-react";

const QUESTION_TIME_SECONDS = 45;
const WARNING_THRESHOLD = 10;
const CRITICAL_THRESHOLD = 5;

function formatTimer(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function QuizSection() {
  const { quizBelt, startQuiz, quizScore, quizTotal, quizResults, submitQuizResult, resetQuiz } = useLearningStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [started, setStarted] = useState(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_SECONDS);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [tabHidden, setTabHidden] = useState(false);
  const [focusLostCount, setFocusLostCount] = useState(0);
  const [autoSubmitted, setAutoSubmitted] = useState(false);

  const questions = useMemo(() => {
    let qs = modules.flatMap((m) =>
      m.quizQuestions.map((q) => ({ ...q, phase: m.phase }))
    );
    if (quizBelt !== "all") qs = qs.filter((q) => q.difficulty === quizBelt);
    return qs.sort(() => Math.random() - 0.5);
  }, [quizBelt, started]);

  const q = questions[currentQuestion];
  const isFinished = currentQuestion >= questions.length - 1 && showAnswer;
  const percent = quizTotal > 0 ? Math.round((quizScore / quizTotal) * 100) : 0;
  const isCorrect = selectedAnswer === q?.correctIndex;

  // --- Timer logic ---
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    setTimeLeft(QUESTION_TIME_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (timeLeft === 0 && started && !showAnswer && !isFinished && q) {
      setAutoSubmitted(true);
      if (selectedAnswer !== null) {
        submitQuizResult(q.id, selectedAnswer, selectedAnswer === q.correctIndex);
      } else {
        submitQuizResult(q.id, -1, false);
      }
      setShowAnswer(true);
    }
  }, [timeLeft, started, showAnswer, isFinished, q, selectedAnswer, submitQuizResult]);

  // Start timer when question changes
  useEffect(() => {
    if (started && !showAnswer && !isFinished) {
      startTimer();
    }
    return clearTimer;
  }, [currentQuestion, started, showAnswer, isFinished, startTimer, clearTimer]);

  // Focus / visibility detection — reset timer on tab switch
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && started && !showAnswer && !isFinished) {
        setTabHidden(true);
      } else if (!document.hidden && started && !showAnswer && !isFinished) {
        setTabHidden(false);
        setFocusLostCount((c) => c + 1);
        startTimer(); // Reset timer on refocus
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [started, showAnswer, isFinished, startTimer]);

  // --- Handlers ---
  const handleStart = (belt: "green" | "black" | "all") => {
    startQuiz(belt);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setStarted(true);
    setTimeLeft(QUESTION_TIME_SECONDS);
    setFocusLostCount(0);
    setAutoSubmitted(false);
  };

  const handleAnswer = (index: number) => {
    if (showAnswer) return;
    clearTimer();
    setSelectedAnswer(index);
    setShowAnswer(true);
    setAutoSubmitted(false);
    if (q) submitQuizResult(q.id, index, index === q.correctIndex);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setAutoSubmitted(false);
      setTimeLeft(QUESTION_TIME_SECONDS);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeLeft(QUESTION_TIME_SECONDS);
    setFocusLostCount(0);
    setAutoSubmitted(false);
    clearTimer();
    resetQuiz();
  };

  // Cleanup timer on unmount
  useEffect(() => clearTimer, [clearTimer]);

  // --- Timer visual state ---
  const timerPct = (timeLeft / QUESTION_TIME_SECONDS) * 100;
  const timerColor =
    timeLeft <= CRITICAL_THRESHOLD ? "#ef4444" :
    timeLeft <= WARNING_THRESHOLD ? "#f59e0b" : "#22c55e";
  const timerBg =
    timeLeft <= CRITICAL_THRESHOLD ? "bg-red-500/10 border-red-500/30" :
    timeLeft <= WARNING_THRESHOLD ? "bg-amber-500/10 border-amber-500/30" : "bg-emerald-500/10 border-emerald-500/30";
  const timerTextColor =
    timeLeft <= CRITICAL_THRESHOLD ? "text-red-400" :
    timeLeft <= WARNING_THRESHOLD ? "text-amber-400" : "text-emerald-400";

  if (!started) {
    return (
      <section className="py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
              Practice <span className="text-amber-400">Assessments</span>
            </h2>
            <p className="text-muted-foreground">Test your knowledge with timed practice questions aligned to ASQ and IASSC certification exams.</p>
            <div className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground/70 bg-secondary/50 rounded-lg px-3 py-1.5">
              <Timer className="w-3.5 h-3.5 text-amber-400" />
              {QUESTION_TIME_SECONDS} seconds per question · Tab switches reset the timer
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { belt: "green" as const, label: "Green Belt", count: modules.flatMap((m) => m.quizQuestions).filter((q) => q.difficulty === "green").length, color: "emerald" },
              { belt: "black" as const, label: "Black Belt", count: modules.flatMap((m) => m.quizQuestions).filter((q) => q.difficulty === "black").length, color: "zinc" },
              { belt: "all" as const, label: "Full Course", count: modules.flatMap((m) => m.quizQuestions).length, color: "violet" },
            ].map((item, i) => (
              <motion.div key={item.belt} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="border-border/50 hover:shadow-lg transition-all h-full cursor-pointer group" onClick={() => handleStart(item.belt)}>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Trophy className={`w-10 h-10 mb-3 ${item.color === "emerald" ? "text-emerald-500" : item.color === "zinc" ? "text-zinc-400" : "text-violet-400"}`} />
                    <h3 className="font-bold text-lg mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.count} Questions</p>
                    <Button variant="outline" className={`w-full group-hover:border-current transition-colors ${
                      item.color === "emerald" ? "text-emerald-400 group-hover:border-emerald-500/50" :
                      item.color === "zinc" ? "text-zinc-400 group-hover:border-zinc-500/50" :
                      "text-violet-400 group-hover:border-violet-500/50"
                    }`}>
                      Start Quiz <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Focus lost warning */}
        <AnimatePresence>
          {tabHidden && (
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

        {/* Quiz header */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={handleRestart} className="text-muted-foreground">
            <RotateCcw className="w-4 h-4 mr-1" />
            Exit Quiz
          </Button>
          <div className="flex items-center gap-4">
            {focusLostCount > 0 && (
              <span className="text-[10px] text-amber-400/70 flex items-center gap-1">
                <EyeOff className="w-3 h-3" />
                {focusLostCount} reset{focusLostCount > 1 ? "s" : ""}
              </span>
            )}
            <div className="text-sm text-muted-foreground">
              {currentQuestion + 1} / {questions.length} · Score: {quizScore}/{quizTotal}
            </div>
          </div>
        </div>

        {/* Timer + Progress bar */}
        <div className="mb-8 space-y-2">
          {/* Timer */}
          <div className={`flex items-center justify-between p-2 rounded-lg border transition-all ${timerBg}`}>
            <div className="flex items-center gap-2">
              <Timer className={`w-4 h-4 ${timerTextColor}`} />
              <span className={`text-sm font-mono font-bold ${timerTextColor}`}>
                {formatTimer(timeLeft)}
              </span>
              {timeLeft <= WARNING_THRESHOLD && timeLeft > CRITICAL_THRESHOLD && (
                <span className="text-[10px] text-amber-400/70">Hurry up!</span>
              )}
              {timeLeft <= CRITICAL_THRESHOLD && timeLeft > 0 && (
                <span className="text-[10px] text-red-400/70 animate-pulse">Time almost up!</span>
              )}
              {timeLeft === 0 && (
                <span className="text-[10px] text-red-400">Time's up!</span>
              )}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {QUESTION_TIME_SECONDS}s per question
            </div>
          </div>
          {/* Timer bar */}
          <div className="h-1 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full transition-colors"
              style={{ backgroundColor: timerColor }}
              animate={{ width: `${timerPct}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question progress */}
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
              style={{ width: `${((currentQuestion + (showAnswer ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {!isFinished ? (
          <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card className="border-border/50">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className={`text-xs ${phaseColors[q.phase]?.bg || ""} ${phaseColors[q.phase]?.text || ""} ${phaseColors[q.phase]?.border || ""}`}>
                    {q.topic}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {q.difficulty === "green" ? "Green Belt" : "Black Belt"}
                  </Badge>
                  {autoSubmitted && (
                    <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-400 bg-amber-500/10">
                      <Timer className="w-2.5 h-2.5 mr-1" />
                      Auto-submitted
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-bold mb-6">{q.question}</h3>

                <div className="space-y-3">
                  {q.options.map((option, oi) => {
                    const isSelected = selectedAnswer === oi;
                    const isCorrectOption = oi === q.correctIndex;

                    let cls = "border-border/30 hover:border-border/60 cursor-pointer";
                    if (showAnswer) {
                      if (isCorrectOption) cls = "border-emerald-500/50 bg-emerald-500/10";
                      else if (isSelected && !isCorrect) cls = "border-red-500/50 bg-red-500/10";
                      else cls = "border-border/20 opacity-60";
                    } else if (isSelected) {
                      cls = "border-amber-500/50 bg-amber-500/10";
                    }

                    return (
                      <div key={oi}
                        className={`p-4 rounded-xl border text-sm transition-all ${cls} ${!showAnswer ? "cursor-pointer" : ""}`}
                        onClick={() => !showAnswer && handleAnswer(oi)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="shrink-0 w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold">
                            {String.fromCharCode(65 + oi)}
                          </span>
                          <span className="flex-1">{option}</span>
                          {showAnswer && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                          {showAnswer && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {showAnswer && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                    <div className={`p-4 rounded-xl ${isCorrect ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">
                          {autoSubmitted ? "Time's up! " : isCorrect ? "Correct! " : "Incorrect. "}
                        </span>
                        {q.explanation}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button onClick={handleNext} className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white">
                        {currentQuestion < questions.length - 1 ? (
                          <>Next Question <ArrowRight className="w-4 h-4 ml-1" /></>
                        ) : (
                          <>View Results <Trophy className="w-4 h-4 ml-1" /></>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="border-border/50">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  {percent >= 80 ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                      <Sparkles className="w-16 h-16 mx-auto text-amber-400 mb-4" />
                      <h3 className="text-2xl font-black">Excellent Work!</h3>
                    </motion.div>
                  ) : percent >= 60 ? (
                    <>
                      <Trophy className="w-16 h-16 mx-auto text-amber-500 mb-4" />
                      <h3 className="text-2xl font-black">Good Effort!</h3>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-2xl font-black">Keep Practicing!</h3>
                    </>
                  )}
                </div>

                <div className="text-6xl font-black mb-2" style={{ color: percent >= 80 ? "#34d399" : percent >= 60 ? "#fbbf24" : "#f87171" }}>
                  {percent}%
                </div>
                <p className="text-muted-foreground mb-6">
                  {quizScore} out of {quizTotal} questions correct
                </p>

                <div className="grid grid-cols-4 gap-3 mb-8 max-w-md mx-auto">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-2xl font-black text-emerald-400">{quizResults.filter(r => r.correct).length}</div>
                    <div className="text-xs text-muted-foreground">Correct</div>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="text-2xl font-black text-red-400">{quizResults.filter(r => !r.correct).length}</div>
                    <div className="text-xs text-muted-foreground">Incorrect</div>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary border border-border/30">
                    <div className="text-2xl font-black">{quizTotal}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="text-2xl font-black text-amber-400">{focusLostCount}</div>
                    <div className="text-xs text-muted-foreground">Resets</div>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={handleRestart}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  <Button onClick={handleRestart}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white">
                    <Trophy className="w-4 h-4 mr-2" />
                    New Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
