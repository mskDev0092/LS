import { create } from "zustand";
import { persist } from "zustand/middleware";
import { modules } from "./course-data";

interface Bookmark {
  videoId: string;
  time: number;
  label: string;
  createdAt: string;
}

interface ModuleProgress {
  completed: boolean;
  quizScore: number | null;
  quizAnswers: Record<string, number>;
  videoWatched: string[];
  videoProgress: Record<string, number>;
  lastAccessed: string | null;
}

interface LearningState {
  moduleProgress: Record<string, ModuleProgress>;
  activeSection: "home" | "roadmap" | "modules" | "dmaic" | "tools" | "quiz" | "videos" | "progress";
  activeModuleId: string | null;
  activeBelt: "all" | "green" | "black";
  quizBelt: "green" | "black" | "all";
  quizScore: number;
  quizTotal: number;
  quizResults: { questionId: string; selectedAnswer: number; correct: boolean }[];

  // Video player state
  activeVideoId: string | null;
  activeVideoModuleId: string | null;
  playbackSpeed: number;
  bookmarks: Bookmark[];
  videoResumePositions: Record<string, number>;

  // Actions
  setSection: (section: LearningState["activeSection"]) => void;
  setModule: (moduleId: string | null) => void;
  setBelt: (belt: LearningState["activeBelt"]) => void;
  markModuleComplete: (moduleId: string) => void;
  saveQuizAnswer: (moduleId: string, questionId: string, answerIndex: number) => void;
  markVideoWatched: (moduleId: string, videoId: string) => void;
  toggleVideoWatched: (moduleId: string, videoId: string) => void;
  updateVideoProgress: (moduleId: string, videoId: string, progress: number) => void;
  startQuiz: (belt: "green" | "black" | "all") => void;
  submitQuizResult: (questionId: string, selectedAnswer: number, correct: boolean) => void;
  resetQuiz: () => void;
  clearAllProgress: () => void;

  // Video player actions
  setActiveVideo: (videoId: string | null, moduleId: string | null) => void;
  setPlaybackSpeed: (speed: number) => void;
  addBookmark: (videoId: string, time: number, label: string) => void;
  removeBookmark: (videoId: string, time: number) => void;
  saveResumePosition: (videoId: string, position: number) => void;
  getResumePosition: (videoId: string) => number;

  // Computed
  getCompletedCount: () => number;
  getTotalModules: () => number;
  getProgressPercent: () => number;
  getModuleProgress: (moduleId: string) => ModuleProgress;
}

const defaultModuleProgress: ModuleProgress = {
  completed: false,
  quizScore: null,
  quizAnswers: {},
  videoWatched: [],
  videoProgress: {},
  lastAccessed: null,
};

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      moduleProgress: {},
      activeSection: "home",
      activeModuleId: null,
      activeBelt: "all",
      quizBelt: "green",
      quizScore: 0,
      quizTotal: 0,
      quizResults: [],
      activeVideoId: null,
      activeVideoModuleId: null,
      playbackSpeed: 1,
      bookmarks: [],
      videoResumePositions: {},

      setSection: (section) => set({ activeSection: section, activeModuleId: null, activeVideoId: null, activeVideoModuleId: null }),
      setModule: (moduleId) => set({ activeModuleId: moduleId, activeSection: "modules", activeVideoId: null, activeVideoModuleId: null }),
      setBelt: (belt) => set({ activeBelt: belt }),

      markModuleComplete: (moduleId) =>
        set((state) => ({
          moduleProgress: {
            ...state.moduleProgress,
            [moduleId]: {
              ...defaultModuleProgress,
              ...state.moduleProgress[moduleId],
              completed: true,
              lastAccessed: new Date().toISOString(),
            },
          },
        })),

      saveQuizAnswer: (moduleId, questionId, answerIndex) =>
        set((state) => ({
          moduleProgress: {
            ...state.moduleProgress,
            [moduleId]: {
              ...defaultModuleProgress,
              ...state.moduleProgress[moduleId],
              quizAnswers: {
                ...state.moduleProgress[moduleId]?.quizAnswers,
                [questionId]: answerIndex,
              },
              lastAccessed: new Date().toISOString(),
            },
          },
        })),

      markVideoWatched: (moduleId, videoId) =>
        set((state) => {
          const existing = state.moduleProgress[moduleId];
          const watched = existing?.videoWatched || [];
          if (watched.includes(videoId)) return state;
          return {
            moduleProgress: {
              ...state.moduleProgress,
              [moduleId]: {
                ...defaultModuleProgress,
                ...existing,
                videoWatched: [...watched, videoId],
                lastAccessed: new Date().toISOString(),
              },
            },
          };
        }),

      toggleVideoWatched: (moduleId, videoId) =>
        set((state) => {
          const existing = state.moduleProgress[moduleId] || { ...defaultModuleProgress };
          const watched = existing.videoWatched || [];
          const isWatched = watched.includes(videoId);
          const newWatched = isWatched
            ? watched.filter((id) => id !== videoId)
            : [...watched, videoId];
          return {
            moduleProgress: {
              ...state.moduleProgress,
              [moduleId]: {
                ...defaultModuleProgress,
                ...existing,
                videoWatched: newWatched,
                lastAccessed: new Date().toISOString(),
              },
            },
          };
        }),

      updateVideoProgress: (moduleId, videoId, progress) =>
        set((state) => {
          const existing = state.moduleProgress[moduleId] || { ...defaultModuleProgress };
          const prevProgress = existing.videoProgress?.[videoId] || 0;
          const newProgress = Math.max(progress, prevProgress);
          const watched = existing.videoWatched || [];
          const autoComplete = newProgress >= 90 && !watched.includes(videoId);
          return {
            moduleProgress: {
              ...state.moduleProgress,
              [moduleId]: {
                ...defaultModuleProgress,
                ...existing,
                videoProgress: {
                  ...existing.videoProgress,
                  [videoId]: newProgress,
                },
                videoWatched: autoComplete ? [...watched, videoId] : watched,
                lastAccessed: new Date().toISOString(),
              },
            },
          };
        }),

      startQuiz: (belt) =>
        set({ quizBelt: belt, quizScore: 0, quizTotal: 0, quizResults: [] }),

      submitQuizResult: (questionId, selectedAnswer, correct) =>
        set((state) => ({
          quizResults: [...state.quizResults, { questionId, selectedAnswer, correct }],
          quizScore: state.quizScore + (correct ? 1 : 0),
          quizTotal: state.quizTotal + 1,
        })),

      resetQuiz: () => set({ quizBelt: "green", quizScore: 0, quizTotal: 0, quizResults: [] }),

      clearAllProgress: () =>
        set({
          moduleProgress: {},
          quizScore: 0,
          quizTotal: 0,
          quizResults: [],
          bookmarks: [],
          videoResumePositions: {},
        }),

      // Video player actions
      setActiveVideo: (videoId, moduleId) => set({ activeVideoId: videoId, activeVideoModuleId: moduleId }),

      setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),

      addBookmark: (videoId, time, label) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, { videoId, time, label, createdAt: new Date().toISOString() }],
        })),

      removeBookmark: (videoId, time) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => !(b.videoId === videoId && b.time === time)),
        })),

      saveResumePosition: (videoId, position) =>
        set((state) => ({
          videoResumePositions: { ...state.videoResumePositions, [videoId]: position },
        })),

      getResumePosition: (videoId) => get().videoResumePositions[videoId] || 0,

      getCompletedCount: () => Object.values(get().moduleProgress).filter((p) => p.completed).length,

      getTotalModules: () => modules.length,

      getProgressPercent: () => {
        const total = modules.length;
        if (total === 0) return 0;
        const completed = Object.values(get().moduleProgress).filter((p) => p.completed).length;
        return Math.round((completed / total) * 100);
      },

      getModuleProgress: (moduleId) => ({
        ...defaultModuleProgress,
        ...get().moduleProgress[moduleId],
      }),
    }),
    {
      name: "lss-learning-progress",
    }
  )
);
