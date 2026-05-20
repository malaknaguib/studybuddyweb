# StudyBuddy

## Project
Minimalist productivity web app for students with Pomodoro timer, task tracking, and motivational quotes.

## Tech Stack
- React 19 + Vite
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- No backend — all state in localStorage

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build (outputs to dist/)
- `npm run preview` — preview production build

## Architecture
- Single-page app, no routing
- Components in src/components/
- State managed with React hooks + localStorage
- No external API calls

## Style Rules
- Dark mode only (bg-gray-950 base)
- Glassmorphism cards: bg-white/10 backdrop-blur border border-white/20
- Accent color: violet-500 / violet-400
- Font: system-ui stack
- Mobile-first responsive (sm: breakpoints)

## Constraints
- No backend, no server-side code
- All data persists in localStorage
- Must work on mobile (375px+)
- Tailwind utility classes only — no custom CSS files

## Features
1. **Pomodoro timer** — 25/5 min work/break cycles, auto-switch, session count
2. **Task tracker** — add/complete/delete tasks, persisted to localStorage
3. **Motivational quotes** — static list, random on each page load

## Testing Checklist
- [ ] Timer counts down correctly
- [ ] Timer switches work/break automatically
- [ ] Tasks persist after page refresh
- [ ] App renders correctly on 375px mobile width
