"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLearningStore } from "@/lib/store";
import { Navigation } from "@/components/lss/Navigation";
import { HeroSection } from "@/components/lss/HeroSection";
import { RoadmapSection } from "@/components/lss/RoadmapSection";
import { DMAICSection } from "@/components/lss/DMAICSection";
import { ModuleDetailSection } from "@/components/lss/ModuleDetailSection";
import { ToolsSection } from "@/components/lss/ToolsSection";
import { QuizSection } from "@/components/lss/QuizSection";
import { VideoLibrarySection } from "@/components/lss/VideoLibrarySection";
import { ProgressDashboard } from "@/components/lss/ProgressDashboard";

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
};

export default function Page() {
  const { activeSection, activeModuleId } = useLearningStore();

  const renderSection = () => {
    if (activeModuleId) {
      return <ModuleDetailSection />;
    }

    switch (activeSection) {
      case "home":
        return <HeroSection />;
      case "roadmap":
        return <RoadmapSection />;
      case "dmaic":
        return <DMAICSection />;
      case "tools":
        return <ToolsSection />;
      case "quiz":
        return <QuizSection />;
      case "videos":
        return <VideoLibrarySection />;
      case "progress":
        return <ProgressDashboard />;
      case "modules":
        return <RoadmapSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModuleId || activeSection}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-black text-[10px]">σ</span>
              </div>
              <span>Lean Six Sigma Green & Black Belt IMC Course</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Aligned with ASQ & IASSC Body of Knowledge</span>
              <span className="text-muted-foreground/50">|</span>
              <span>100% Factual Content</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}