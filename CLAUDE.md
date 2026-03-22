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

This is a **Vite + React 19** project using plain JavaScript (`.jsx`), not TypeScript.

- Entry point: `index.html` → `src/main.jsx` → `src/App.jsx`
- `src/main.jsx` mounts `<App>` into `#root` with React StrictMode
- Styles are plain CSS: `src/index.css` (global), `src/App.css` (component-scoped)
- Static assets served from `public/` (e.g., `icons.svg`, `favicon.svg`)
- Imported assets (e.g., images, SVGs) live in `src/assets/`

## ESLint

Uses flat config (`eslint.config.js`). Rules enforced:
- `eslint-plugin-react-hooks` — hooks rules
- `eslint-plugin-react-refresh` — HMR safety
- `no-unused-vars` ignores variables matching `^[A-Z_]` (uppercase/underscore-prefixed)