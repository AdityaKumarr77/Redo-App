# 🔁 ReDo - Spaced Repetition for Coding Problems

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Storage-localStorage-green?style=for-the-badge" alt="Local Storage" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <b>Master DSA and Competitive Programming problems without forgetting them.</b><br/>
  Log a solved problem, and ReDo schedules intelligent revision intervals based on spaced repetition.
</p>

---

## 🌟 Why ReDo?

Solving hundreds of LeetCode or Codeforces problems is useless if you forget the key pattern weeks later. ReDo implements an active spaced-repetition revision schedule so tricky dynamic programming patterns, graph traversals, and corner cases stay permanently sharp in your memory.

### 🧠 The Spaced Repetition Formula
Whenever you log a solved problem, ReDo queues it up for review at increasing scientific intervals:

```
[Solved Day 0] ──> Day 1 ──> Day 3 ──> Day 7 ──> Day 14 ──> Day 30 ──> 🏆 [Mastered]
                     │         │         │          │          │
                     └── If Stuck / Forgotten? Resets to Tomorrow (Day 1)
```

- **Remembered**: Advances to the next interval (Stage 1 ➔ 5).
- **Forgot / Stuck**: Resets back to Stage 0 so you review it again tomorrow.
- **Stage 5**: Marked as **Mastered**!

---

## ✨ Features

- 📅 **Today's Due Queue**: Quick dashboard displaying problems that need revision today, plus an upcoming schedule breakdown.
- ⚡ **1-Click Review Tracking**: Mark problems as "Remembered" or "Got Stuck" with instant stage recalculation.
- 🌐 **Multi-Platform Support**: Built-in tags for **LeetCode**, **Codeforces**, **CodeChef**, **AtCoder**, and custom platforms.
- 🏷️ **Tags & Personal Notes**: Organize problems by topic (`dp`, `graphs`, `trees`, `binary-search`, etc.) and save key takeaways or corner cases.
- 📊 **Insights & Heatmaps**:
  - Current & longest revision streaks.
  - 12-week GitHub-style revision activity heatmap.
  - Topic-based difficulty breakdown & stuck rate analytics.
- 💾 **Local-First & Private**:
  - No database or backend required.
  - All data is securely preserved in your browser's `localStorage`.
  - Full **JSON Export & Import** for seamless backups and device transfers.

---


## 📖 App Navigation

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | **Today** | Review cards due for today, schedule stats, and quick actions. |
| `/library` | **Library** | Searchable catalog of all saved problems, filter by tag/platform/status, and JSON backup controls. |
| `/add` | **Add Problem** | Form to log new problems with difficulty, link, tags, and notes. |
| `/insights` | **Insights** | Visual progress tracking, revision streaks, and topic mastery analytics. |

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Styling**: Modern Vanilla CSS with dark/light themes, custom CSS variables, and glassmorphism accents.
- **State Management**: React Context + Hooks with `localStorage` synchronization.

---

## 📂 Project Structure

```text
redo-app/
├── index.html              # HTML entry point
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
└── src/
    ├── main.tsx            # App bootstrap
    ├── App.tsx             # Root routing layout
    ├── index.css           # Global design tokens and styles
    ├── types.ts            # Type definitions (Problem, Review, Platform, etc.)
    ├── schedule.ts         # Spaced repetition interval algorithm
    ├── dates.ts            # Date formatting and arithmetic helpers
    ├── store.tsx           # React Context state with localStorage persistence
    ├── sample.ts           # Pre-loaded starter problems
    ├── components/
    │   ├── Layout.tsx      # Main application layout wrapper
    │   ├── Navbar.tsx      # Top navigation header
    │   ├── Footer.tsx      # App footer
    │   ├── ProblemCard.tsx # Problem card with action controls
    │   └── Bubbles.tsx     # Visual background decoration
    └── pages/
        ├── Today.tsx       # Today's revision queue
        ├── Library.tsx     # Searchable problems list + Import/Export
        ├── Add.tsx         # Add problem form
        ├── Insights.tsx    # Heatmap & analytics dashboard
        └── NotFound.tsx    # 404 fallback page
```

---

Developer:- Aditya Own this project.


---

## 📄 License

This project is licensed under the MIT License - feel free to use and modify for your personal learning.
