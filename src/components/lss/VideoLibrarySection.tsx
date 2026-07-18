"use client";

import { motion } from "framer-motion";
import { modules, phaseColors } from "@/lib/course-data";
import { useLearningStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, ExternalLink, BookOpen, BarChart3 } from "lucide-react";
import { useState } from "react";

export function VideoLibrarySection() {
  const { moduleProgress, markVideoWatched, setModule } = useLearningStore();
  const [filter, setFilter] = useState<"all" | "green" | "black">("all");

  const allVideos = modules
    .filter((m) => filter === "all" || m.belt === filter)
    .flatMap((m) =>
      m.videos.map((v) => ({
        ...v,
        moduleId: m.id,
        moduleTitle: m.shortTitle,
        modulePhase: m.phase,
        moduleBelt: m.belt,
        isWatched: moduleProgress[m.id]?.videoWatched?.includes(v.youtubeId) || false,
      }))
    );

  const watchedCount = allVideos.filter((v) => v.isWatched).length;

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            Video <span className="text-rose-400">Library</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Curated video lessons from top Six Sigma educators including Lean Six Sigma Academy, Quality Gurus, Simplilearn, and Khan Academy.
          </p>
          <div className="flex items-center justify-center gap-3 mb-2">
            {(["all", "green", "black"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setFilter(b)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === b ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {b === "all" ? "All" : b === "green" ? "Green Belt" : "Black Belt"}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{watchedCount}/{allVideos.length} videos watched</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {allVideos.map((video, i) => {
            const pc = phaseColors[video.modulePhase];
            return (
              <motion.div
                key={`${video.youtubeId}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.5) }}
              >
                <Card className="border-border/50 overflow-hidden group hover:border-border transition-all h-full flex flex-col">
                  <div className="aspect-video bg-black/30 relative">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                    {video.isWatched && (
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Watched
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <h4 className="text-sm font-semibold mb-2 line-clamp-2">{video.title}</h4>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                        <span>·</span>
                        <span>{video.channel}</span>
                      </div>
                      <button
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
                        onClick={() => setModule(video.moduleId)}
                      >
                        Go to Module →
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={`text-[10px] ${pc?.bg} ${pc?.text} ${pc?.border}`}>
                        {video.modulePhase}
                      </Badge>
                      <Badge variant="outline" className={`text-[10px] ${
                        video.moduleBelt === "green" ? "border-emerald-500/40 text-emerald-400" : "border-zinc-500/40 text-zinc-300"
                      }`}>
                        {video.moduleBelt} belt
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}