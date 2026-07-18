"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLearningStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import {
  Home, Map, Layers, Activity, Wrench, FlaskConical, Play,
  BarChart3, Menu, X, Sigma,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "roadmap" as const, label: "Roadmap", icon: Map },
  { id: "dmaic" as const, label: "DMAIC", icon: Activity },
  { id: "modules" as const, label: "Modules", icon: Layers, hidden: true },
  { id: "tools" as const, label: "Tools", icon: Wrench },
  { id: "quiz" as const, label: "Quiz", icon: FlaskConical },
  { id: "videos" as const, label: "Videos", icon: Play },
  { id: "progress" as const, label: "Progress", icon: BarChart3 },
];

export function Navigation() {
  const { activeSection, setSection, getProgressPercent, activeModuleId } = useLearningStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = getProgressPercent();

  const visibleNavItems = navItems.filter((n) => !n.hidden);

  return (
    <>
      {/* Desktop top nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-black text-sm">σ</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-sm tracking-tight">LSS Academy</span>
                {activeModuleId && (
                  <span className="text-xs text-muted-foreground ml-2">Module View</span>
                )}
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => setSection(item.id)}
                    className={cn(
                      "px-3 text-sm relative",
                      isActive && "text-emerald-400"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-1.5" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1 right-1 h-0.5 bg-emerald-500 rounded-full"
                      />
                    )}
                  </Button>
                );
              })}
            </nav>

            {/* Right side: progress + mobile toggle */}
            <div className="flex items-center gap-3">
              {/* Mini progress */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{progress}%</span>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/30 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {visibleNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-10",
                        isActive && "bg-emerald-500/10 text-emerald-400"
                      )}
                      onClick={() => { setSection(item.id); setMobileOpen(false); }}
                    >
                      <Icon className="w-4 h-4 mr-2.5" />
                      {item.label}
                    </Button>
                  );
                })}

                {/* Mobile progress */}
                <div className="pt-2 pb-1">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>Progress</span>
                    <span className="text-emerald-400">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}