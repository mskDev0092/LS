import { create } from "zustand";
import { persist } from "zustand/middleware";
import { modules } from "./course-data";

interface ModuleProgress {
  completed: boolean;
  quizScore: number | null;
  quizAnswers: Record<string, number>;
  videoWatched: string[];
  lastAccessed: string | null;
}

interface LearningState {
  // Module progress
  moduleProgress: Record<string, ModuleProgress>;
  // Current view
  activeSection: "home" | "roadmap" | "modules" | "dmaic" | "tools" | "quiz" | "videos" | "progress";
  activeModuleId: string | null;
  activeBelt: "all" | "green" | "black";
  // Quiz state
  quizBelt: "green" | "black" | "all";
  quizScore: number;
  quizTotal: number;
  quizResults: { questionId: string; selectedAnswer: number; correct: boolean }[];
  // Actions
  setSection: (section: LearningState["activeSection"]) => void;
  setModule: (moduleId: string | null) => void;
  setBelt: (belt: LearningState["activeBelt"]) => void;
  markModuleComplete: (moduleId: string) => void;
  saveQuizAnswer: (moduleId: string, questionId: string, answerIndex: number) => void;
  markVideoWatched: (moduleId: string, videoId: string) => void;
  startQuiz: (belt: "green" | "black" | "all") => void;
  submitQuizResult: (questionId: string, selectedAnswer: number, correct: boolean) => void;
  resetQuiz: () => void;
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

      setSection: (section) => set({ activeSection: section, activeModuleId: null }),
      setModule: (moduleId) => set({ activeModuleId: moduleId, activeSection: "modules" }),
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

      startQuiz: (belt) =>
        set({ quizBelt: belt, quizScore: 0, quizTotal: 0, quizResults: [] }),

      submitQuizResult: (questionId, selectedAnswer, correct) =>
        set((state) => ({
          quizResults: [...state.quizResults, { questionId, selectedAnswer, correct }],
          quizScore: state.quizScore + (correct ? 1 : 0),
          quizTotal: state.quizTotal + 1,
        })),

      resetQuiz: () => set({ quizBelt: "green", quizScore: 0, quizTotal: 0, quizResults: [] }),

      getCompletedCount: () => Object.values(get().moduleProgress).filter((p) => p.completed).length,

      getTotalModules: () => {
        return modules.length;
      },

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