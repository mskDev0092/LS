"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { modules, phaseColors } from "@/lib/course-data";
import { useLearningStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, CheckCircle2, XCircle, RotateCcw, ArrowRight, Sparkles } from "lucide-react";

export function QuizSection() {
  const { quizBelt, startQuiz, quizScore, quizTotal, quizResults, submitQuizResult, resetQuiz } = useLearningStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [started, setStarted] = useState(false);

  const questions = useMemo(() => {
    let qs = modules.flatMap((m) => m.quizQuestions);
    if (quizBelt !== "all") qs = qs.filter((q) => q.difficulty === quizBelt);
    return qs.sort(() => Math.random() - 0.5);
  }, [quizBelt, started]);

  const handleStart = (belt: "green" | "black" | "all") => {
    startQuiz(belt);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setStarted(true);
  };

  const handleAnswer = (index: number) => {
    if (showAnswer) return;
    setSelectedAnswer(index);
    setShowAnswer(true);
    const q = questions[currentQuestion];
    if (q) {
      submitQuizResult(q.id, index, index === q.correctIndex);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    resetQuiz();
  };

  const q = questions[currentQuestion];
  const isFinished = currentQuestion >= questions.length - 1 && showAnswer;
  const percent = quizTotal > 0 ? Math.round((quizScore / quizTotal) * 100) : 0;
  const isCorrect = selectedAnswer === q?.correctIndex;

  if (!started) {
    return (
      <section className="py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
              Practice <span className="text-amber-400">Assessments</span>
            </h2>
            <p className="text-muted-foreground">Test your knowledge with practice questions aligned to ASQ and IASSC certification exams.</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { belt: "green" as const, label: "Green Belt", count: modules.flatMap((m) => m.quizQuestions).filter((q) => q.difficulty === "green").length, color: "emerald" },
              { belt: "black" as const, label: "Black Belt", count: modules.flatMap((m) => m.quizQuestions).filter((q) => q.difficulty === "black").length, color: "zinc" },
              { belt: "all" as const, label: "Full Course", count: modules.flatMap((m) => m.quizQuestions).length, color: "violet" },
            ].map((item, i) => (
              <motion.div
                key={item.belt}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-border/50 hover:shadow-lg transition-all h-full cursor-pointer group"
                  onClick={() => handleStart(item.belt)}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Trophy className={`w-10 h-10 mb-3 ${item.color === "emerald" ? "text-emerald-500" : item.color === "zinc" ? "text-zinc-400" : "text-violet-400"}`} />
                    <h3 className="font-bold text-lg mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.count} Questions</p>
                    <Button
                      variant="outline"
                      className={`w-full group-hover:border-current transition-colors ${
                        item.color === "emerald" ? "text-emerald-400 group-hover:border-emerald-500/50" :
                        item.color === "zinc" ? "text-zinc-400 group-hover:border-zinc-500/50" :
                        "text-violet-400 group-hover:border-violet-500/50"
                      }`}
                    >
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
        {/* Quiz header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={handleRestart} className="text-muted-foreground">
            <RotateCcw className="w-4 h-4 mr-1" />
            Exit Quiz
          </Button>
          <div className="text-sm text-muted-foreground">
            {currentQuestion + 1} / {questions.length} · Score: {quizScore}/{quizTotal}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-secondary mb-8 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
            style={{ width: `${((currentQuestion + (showAnswer ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>

        {!isFinished ? (
          <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card className="border-border/50">
              <CardContent className="p-6 sm:p-8">
                <Badge variant="outline" className={`mb-4 text-xs ${phaseColors[q.phase]?.bg || ""} ${phaseColors[q.phase]?.text || ""} ${phaseColors[q.phase]?.border || ""}`}>
                  {q.topic} · {q.difficulty === "green" ? "Green Belt" : "Black Belt"}
                </Badge>

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
                      <div
                        key={oi}
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
                          {isCorrect ? "Correct! " : "Incorrect. "}
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
          /* Results */
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

                <div className="text-6xl font-black mb-2" style={{
                  color: percent >= 80 ? "#34d399" : percent >= 60 ? "#fbbf24" : "#f87171"
                }}>
                  {percent}%
                </div>
                <p className="text-muted-foreground mb-6">
                  {quizScore} out of {quizTotal} questions correct
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto">
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
                </div>

                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={handleRestart}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={() => handleRestart()}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white"
                  >
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