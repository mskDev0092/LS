"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { sigmaLevelData } from "@/lib/course-data";
import { useLearningStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Trophy, Play, BookOpen, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { useRef } from "react";

export function HeroSection() {
  const setSection = useLearningStore((s) => s.setSection);
  const getProgressPercent = useLearningStore((s) => s.getProgressPercent);
  const progress = getProgressPercent();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-emerald-500/20 blur-[120px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-cyan-500/15 blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-[150px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Sigma symbol animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.2, bounce: 0.4 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 mb-8 shadow-lg shadow-emerald-500/25"
        >
          <span className="text-5xl font-bold text-white">σ</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-4"
        >
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Lean Six Sigma
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-3 font-light"
        >
          Green Belt & Black Belt Complete IMC Course
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {[
            { label: "13 Modules", icon: BookOpen },
            { label: "40+ Video Lessons", icon: Play },
            { label: "50+ Quiz Questions", icon: Trophy },
            { label: "Expert Level", icon: Sparkles },
          ].map((item, i) => (
            <Badge key={i} variant="outline" className="px-4 py-2 text-sm border-emerald-500/30 text-emerald-400 bg-emerald-500/5">
              <item.icon className="w-4 h-4 mr-2" />
              {item.label}
            </Badge>
          ))}
        </motion.div>

        {progress > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 max-w-md mx-auto"
          >
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Overall Progress</span>
              <span className="text-emerald-400 font-semibold">{progress}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={() => setSection("roadmap")}
            className="px-8 py-6 text-lg bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg shadow-emerald-500/25 rounded-xl"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setSection("dmaic")}
            className="px-8 py-6 text-lg border-border/50 rounded-xl"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Explore DMAIC
          </Button>
        </motion.div>

        {/* Sigma level visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20"
        >
          <Card className="border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Sigma Level → Defect Rate → Yield</h3>
              <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {sigmaLevelData.map((item, i) => (
                  <motion.div
                    key={item.sigma}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
                    className={`text-center p-2 sm:p-3 rounded-xl border transition-all hover:scale-105 ${
                      item.sigma === 6
                        ? "border-emerald-500/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                        : "border-border/30 bg-secondary/30"
                    }`}
                  >
                    <div className={`text-2xl sm:text-3xl font-black ${item.sigma === 6 ? "text-emerald-400" : "text-muted-foreground"}`}>
                      {item.cplabel}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1 font-mono">
                      {item.dpmo < 10 ? item.dpmo : Math.round(item.dpmo).toLocaleString()} DPMO
                    </div>
                    <div className="text-xs text-muted-foreground/70 mt-0.5">
                      {item.yield < 100 ? `${item.yield}%` : `${item.yield}%`} yield
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronRight className="w-6 h-6 text-muted-foreground/50 rotate-90" />
      </motion.div>
    </section>
  );
}