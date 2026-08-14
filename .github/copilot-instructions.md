# Copilot Instructions — Saysike Browser Extension

## Project Overview

Saysike is a browser extension that surfaces coupon codes, price comparisons, and price drop alerts for shoppers.

## Key Technologies

| Area                      | Technology                            |
| ------------------------- | ------------------------------------- |
| Runtime / package manager | Bun 1.3.8                             |
| Extension framework       | WXT 0.20.x (MV3)                      |
| UI                        | React 19                              |
| Styling                   | Tailwind CSS v4                       |
| Auth                      | better-auth (client-side)             |
| Data fetching             | TanStack Query v5                     |
| Forms                     | react-hook-form                       |
| Type safety               | TypeScript (strict)                   |
| Lint                      | ESLint 9 flat config                  |
| Formatting                | Prettier (printWidth: 80, semi: true) |
| Versioning                | release-please + conventional commits |

## Commands

```bash
# Dev (Chrome MV3)
bun run dev

# Dev (Firefox)
bun run dev:firefox

# Type-check
bun run check-types

# Lint
bun run lint
bun run lint:fix

# Build
bun run build

# Storybook (ui lib)
bun run storybook
```

## Path Aliases

Defined in `wxt.config.ts` via `vite.resolve.alias` and reflected in `tsconfig.json`:

## WXT-Specific Notes

- `browser.*` APIs (tabs, runtime, etc.) are globally available via WXT — no import needed.
- `defineBackground()`, `defineContentScript()`, `defineConfig()` etc. are WXT auto-imports — no import needed.
- `import.meta.env.WXT_*` env vars are typed as `any` by WXT. Always use the `env()` or `assertEnv()` helper from `src/lib/utils/env.ts` to read env vars with proper typing and error handling.
- The extension `version` in the manifest is automatically read from `package.json` — do not set it manually in `wxt.config.ts`.

## Environment Variables

Defined in `.env.local` (dev) and `.env.production`. These are typed and accessed via the `env()` or `assertEnv()` helper from `src/lib/utils/env.ts`:

- `WXT_BASE_SERVER_URI` — backend API base URL (server-side)
- `WXT_BASE_CLIENT_URI` — backend base URL (client-side, no `/api`)

## Styling Rules

- Use Tailwind utility classes throughout.
- **Always use `cn()` from `@saysike/ui` for conditional or merged classnames** — never string template literals.
- CSS design tokens live in `src/lib/tailwind-config/variables.css`.
- Key tokens: `--saysike-blue-primary`, `--surface-primary`, `--surface-secondary`, `--surface-tertiary`, `--text-primary`, `--text-secondary`, `--text-tertiary`, `--border-color`, `--success-color`, `--danger-color`.

## Code Style & Conventions

- **TypeScript strict** — no implicit `any`.
- **Named exports** preferred for components; no default exports except where required.
- **React**: functional components only.
- **Unused variables**: prefix with `_` to suppress the `no-unused-vars` error (e.g., `_setView`, `_copied`). This is enforced via `varsIgnorePattern`/`argsIgnorePattern: "^_"` in ESLint.
- **No `console.*`** in `src/` except inside `src/entrypoints/` (background/content/popup), where logging is intentional.
- **No `eslint-disable`** comments without a clear reason.
- Messages between popup and background use `browser.runtime.sendMessage`. The type is `BrowserMessageRequest` from `@/lib/utils/browserAPI`.

## Git & Versioning

- **Commitlint** enforces [Conventional Commits](https://www.conventionalcommits.org/) via `.husky/commit-msg`.
- **Husky pre-push** runs `check-types`, `lint`, and `build` locally before any push.
- **release-please** creates a Release PR automatically on push to `main` — but only when commits include `feat:`, `fix:`, or `perf:` types. `chore:` and `ci:` commits do **not** trigger a version bump.
- Merging the Release PR tags the commit and creates a GitHub Release, which triggers `publish.yml`.

## `@saysike/ui` — Component Library

Vendored inside `src/lib/ui/src/`. Storybook config is at `src/lib/ui/.storybook/`.

### Icon usage

```tsx
import { Icon } from "@saysike/ui";
<Icon size={10} src="color/label.svg" />;
```

### Backend calls

Backend API calls should be made via the `@saysike/http` client, which wraps `fetch` with built-in auth and error handling. API schemas are defined in `@saysike/schemas` using Zod for validation and TypeScript types.

The available endpoints are defined in lib/schemas/src/api.ts. Do not modify these as they rely on an externally managed API.
