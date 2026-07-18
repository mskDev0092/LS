# LSS Academy — Lean Six Sigma Green & Black Belt

Interactive learning platform for Lean Six Sigma Green Belt and Black Belt certification, aligned with **ASQ** and **IASSC** Body of Knowledge.

## Features

### Custom Video Player
- YouTube IFrame API player with fully custom controls (all native controls hidden)
- **Actual watch-time tracking** — progress only increases during real playback, not by seeking
- Playback speed (0.5x – 2x), volume slider, fullscreen, bookmarks
- Keyboard shortcuts (`Space`, `←/→`, `F`, `M`, `J/L`, `↑/↓`)
- Auto-mark watched at 90% actual viewed, resume from last position
- Focus detection — pauses when tab loses focus
- Video library with thumbnails, "Continue Watching" section, playlist sidebar

### Timed Assessments
- 45-second per-question timer with color-coded states (green → amber → red)
- Auto-submit on expiry with explanation feedback
- Focus/visibility detection — tab switches reset the timer with a warning banner
- Per-belt filtering: Green Belt, Black Belt, or Full Course
- Module-embedded quizzes with total countdown timer (60s/question)

### Course Content
- **13 modules** across DMAIC phases (Define, Measure, Analyze, Improve, Control)
- **50+ quiz questions** with detailed explanations
- **40+ curated videos** from top Six Sigma educators
- **74+ tools** reference library categorized by phase
- 13-milestone learning path with progressive unlocking
- Interactive DMAIC methodology explorer

### Progress Tracking
- Per-module progress (content, quiz score, video watch status)
- Sigma-level gamification (1σ – 6σ based on completion)
- All progress persisted in localStorage
- Dashboard with per-belt and per-phase breakdowns

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (standalone mode) |
| Language | TypeScript 5 |
| UI | React 19, shadcn/ui (New York), Radix UI |
| Styling | Tailwind CSS 4, oklch color system |
| State | Zustand 5 with localStorage persistence |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Charts | Recharts 2 |
| Package Manager | Bun |

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) runtime

### Install & Run

```bash
# Install dependencies
bun install

# Development server (port 3000)
bun run dev

# Production build
bun run build

# Production server
bun run start
```

### With Caddy (optional reverse proxy)

```bash
caddy run --config Caddyfile
# Serves on port 81, proxies to localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # SPA entry with client-side routing
│   ├── layout.tsx            # Root layout (Geist fonts, dark mode)
│   └── globals.css           # Theme, scrollbar, volume slider styles
├── components/
│   ├── lss/                  # Application components
│   │   ├── VideoPlayer.tsx       # Custom YouTube player with IFrame API
│   │   ├── VideoDetailPage.tsx   # Full player view with playlist sidebar
│   │   ├── VideoLibrarySection.tsx
│   │   ├── QuizSection.tsx       # Timed quiz with focus detection
│   │   ├── ModuleDetailSection.tsx
│   │   ├── ProgressDashboard.tsx
│   │   ├── RoadmapSection.tsx
│   │   ├── DMAICSection.tsx
│   │   ├── ToolsSection.tsx
│   │   ├── HeroSection.tsx
│   │   └── Navigation.tsx
│   └── ui/                   # 48 shadcn/ui components
└── lib/
    ├── course-data.ts        # All course content (modules, quizzes, videos, tools)
    ├── store.ts              # Zustand store with all state + actions
    └── utils.ts              # cn() utility
```

## Video Player Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` / `K` | Play / Pause |
| `→` / `L` | Skip forward 10s |
| `←` / `J` | Skip back 10s |
| `↑` | Volume up |
| `↓` | Volume down |
| `F` | Toggle fullscreen |
| `M` | Toggle mute |
| `N` | Next video |
| `P` | Previous video |

## Course Structure

### Green Belt (12 modules, ~34 hours)
| Phase | Modules |
|-------|---------|
| Define | Six Sigma Fundamentals, VOC & CTQ, Project Charter, SIPOC & Process Maps |
| Measure | MSA / Gage R&R, Statistics Fundamentals, Process Capability |
| Analyze | Hypothesis Testing, Root Cause Analysis & FMEA |
| Improve | DOE Basics, Solution Selection |
| Control | SPC & Control Charts |

### Black Belt (5 modules, ~23 hours)
| Phase | Modules |
|-------|---------|
| Advanced | Advanced Statistics, Advanced DOE, DFSS & DMADV |
| Lean | Advanced Lean Tools & Value Stream Mapping |
| Leadership | Change Management & Leadership |

## Environment Variables

```env
DATABASE_URL=file:/path/to/custom.db   # Optional (Prisma, not actively used)
```

No API keys required. All course data is bundled client-side. Progress is stored in browser localStorage.

## License

Educational use. Course content aligned with ASQ & IASSC Body of Knowledge.
