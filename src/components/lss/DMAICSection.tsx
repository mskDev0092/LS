"use client";

import { motion } from "framer-motion";
import { dmaicPhases, modules, phaseColors } from "@/lib/course-data";
import { useLearningStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Circle, ArrowRight, Target, Ruler, FlaskConical, Lightbulb, Activity } from "lucide-react";

const phaseIcons: Record<string, React.ElementType> = {
  define: Target,
  measure: Ruler,
  analyze: FlaskConical,
  improve: Lightbulb,
  control: Activity,
};

export function DMAICSection() {
  const { moduleProgress, setModule } = useLearningStore();

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            The <span className="text-cyan-400">DMAIC</span> Methodology
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The five-phase structured problem-solving framework at the heart of every Six Sigma project. Click into each phase to explore its tools, objectives, and deliverables.
          </p>
        </motion.div>

        {/* DMAIC Phase Cards */}
        <div className="grid gap-4 sm:gap-6 mb-12">
          {dmaicPhases.map((phase, index) => {
            const Icon = phaseIcons[phase.id] || Target;
            const phaseModules = modules.filter((m) => m.phase === phase.id);
            const completedCount = phaseModules.filter((m) => moduleProgress[m.id]?.completed).length;

            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <Card className={`border-border/50 overflow-hidden hover:shadow-lg transition-all group ${phase.color.bg}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      {/* Phase letter */}
                      <motion.div
                        className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-black"
                        style={{ backgroundColor: `${phase.color.accent}15`, color: phase.color.accent }}
                        whileHover={{ scale: 1.05, rotate: -3 }}
                      >
                        {phase.letter}
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-xl sm:text-2xl font-black">{phase.name}</CardTitle>
                          {phaseModules.length > 0 && (
                            <Badge variant="outline" className="text-xs border-border/50">
                              {completedCount}/{phaseModules.length} modules
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground">{phase.description}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="objectives" className="border-border/30">
                        <AccordionTrigger className="text-sm font-semibold py-2 hover:no-underline">
                          Objectives
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="grid sm:grid-cols-2 gap-2">
                            {phase.objectives.map((obj, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <ArrowRight className={`w-4 h-4 mt-0.5 shrink-0`} style={{ color: phase.color.accent }} />
                                {obj}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="deliverables" className="border-border/30">
                        <AccordionTrigger className="text-sm font-semibold py-2 hover:no-underline">
                          Key Deliverables
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-wrap gap-2">
                            {phase.keyDeliverables.map((d, i) => (
                              <Badge key={i} variant="outline" className="text-xs border-border/40">
                                {d}
                              </Badge>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="modules" className="border-border/30">
                        <AccordionTrigger className="text-sm font-semibold py-2 hover:no-underline">
                          Course Modules
                        </AccordionTrigger>
                        <AccordionContent>
                          {phaseModules.length === 0 ? (
                            <p className="text-sm text-muted-foreground/60">No dedicated modules for this phase. Concepts are integrated throughout the curriculum.</p>
                          ) : (
                            <div className="space-y-2">
                              {phaseModules.map((mod) => {
                                const isComplete = moduleProgress[mod.id]?.completed;
                                return (
                                  <div
                                    key={mod.id}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-border/30 hover:border-border/60 cursor-pointer transition-all hover:bg-secondary/30"
                                    onClick={() => setModule(mod.id)}
                                  >
                                    {isComplete ? (
                                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                    ) : (
                                      <Circle className="w-5 h-5 text-muted-foreground/40 shrink-0" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium">{mod.shortTitle}</p>
                                      <p className="text-xs text-muted-foreground">{mod.duration} · {mod.keyTopics.length} topics</p>
                                    </div>
                                    <Icon className="w-4 h-4 shrink-0" style={{ color: phase.color.accent }} />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* DMAIC Flow Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="border-border/30 bg-card/50">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-center text-lg font-bold mb-6">DMAIC Problem-Solving Flow</h3>
              <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto pb-2">
                {dmaicPhases.map((phase, i) => (
                  <div key={phase.id} className="flex items-center gap-1 sm:gap-2 shrink-0">
                    <div
                      className="flex flex-col items-center gap-2 px-3 sm:px-5 py-3 sm:py-4 rounded-xl border-2 min-w-[80px] sm:min-w-[100px]"
                      style={{ borderColor: `${phase.color.accent}40`, backgroundColor: `${phase.color.accent}08` }}
                    >
                      <span className="text-2xl sm:text-3xl font-black" style={{ color: phase.color.accent }}>{phase.letter}</span>
                      <span className="text-xs sm:text-sm font-semibold" style={{ color: phase.color.accent }}>{phase.name}</span>
                    </div>
                    {i < dmaicPhases.length - 1 && (
                      <div className="flex items-center text-muted-foreground/40">
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}