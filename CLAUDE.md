# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR at http://localhost:5173
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

No test runner is configured yet.

## Architecture

This is the frontend of a **monolithic weather application**. It is a **Vite + React 19** project using plain JavaScript (`.jsx`), not TypeScript.

- Entry point: `index.html` → `src/main.jsx` → `src/App.jsx`
- `src/main.jsx` mounts `<App>` into `#root` with React StrictMode
- `src/App.jsx` fetches `/api/weather` from the Spring Boot backend and renders the weather dashboard
- Styles are plain CSS: `src/index.css` (global dark gradient theme), `src/App.css` (weather dashboard — glassmorphism cards, stats grid, forecast strip)
- Static assets served from `public/`; imported assets live in `src/assets/`

In dev mode, `vite.config.js` proxies `/api` requests to `http://localhost:8080` (the backend). In production, the backend serves the compiled `dist/` output directly — no separate Node server.

## ESLint

Uses flat config (`eslint.config.js`). Rules enforced:
- `eslint-plugin-react-hooks` — hooks rules
- `eslint-plugin-react-refresh` — HMR safety
- `no-unused-vars` ignores variables matching `^[A-Z_]` (uppercase/underscore-prefixed)