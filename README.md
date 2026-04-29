# Saysike Browser Extension

[Saysike](https://saysike.com) is an open-source browser extension aiming to be the best online shopping tool while being transparent & maintaining integrity.

It offers you coupon codes while browsing, with plans to implement price comparisons, history & tracking in the near future.

Currently available on Chrome, Brave, and Edge through the Chrome Web Store: https://chromewebstore.google.com/detail/saysike/pgokhihamcfcdlfamkdcjbfmipgaddlf and waiting on approval by Firefox.

## Project Structure

TBD

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.3.8

### Environment variables

You can copy `.env.sample` to `.env`

### Install

```bash
bun install
```

### Dev (extension)

Chromium:

```bash
bun dev
```

Firefox:

```bash
bun dev:firefox
```

Then load the `.output/chrome-mv3-dev` or `.output/firefox-mv3-dev` directory as an unpacked extension in your browser.

### Build

Chromium:

```bash
bun build
```

Firefox:

```bash
bun build:firefox
```

Then load the `.output/chrome-mv3` or `.output/firefox-mv3` directory as an unpacked extension in your browser.

### Type check

```bash
bun check-types
```

### Lint

```bash
bun lint
bun lint:fix
```

### Tests

```bash
bun run test          # run once
bun run test:watch    # watch mode
bun run test:coverage # coverage report
```

> **Note:** use `bun run test`, not `bun test`. The latter invokes Bun's native test runner, which is incompatible with the Vitest-based test setup (see [Architecture decisions](#architecture-decisions) below).

### Storybook (UI components)

```bash
bun storybook
```

## Tech Stack

| Area                      | Technology        |
| ------------------------- | ----------------- |
| Runtime & Package manager | Bun 1.3.8         |
| Extension framework       | WXT               |
| UI                        | React 19          |
| Styling                   | Tailwind CSS v4   |
| Data fetching             | TanStack Query v5 |
| Auth (client)             | better-auth       |
| Schemas                   | Zod v4            |
| Testing                   | Vitest + MSW      |

## Architecture decisions

### Vitest over Bun's native test runner

Although Bun is the project's runtime and package manager, the test suite uses **Vitest** (`bun run test`) rather than Bun's built-in runner (`bun test`). Three technical constraints drive this:

1. **`import.meta.env.WXT_*` variables** — WXT bakes these into the bundle at Vite build time. Vitest runs inside the same Vite pipeline, so it can stub them with `vi.stubEnv()`. Bun's runner has no knowledge of Vite's transform layer and sees every `import.meta.env.*` as `undefined`.

2. **MSW network interception** — `msw/node` patches Node's undici-based `fetch`. Bun ships its own native fetch implementation that MSW's interceptors do not hook into, causing requests to either fail or leak to the network.

3. **Module mocking** — Vitest hoists `vi.mock()` calls to the top of the module graph at transform time, which is how mocking background scripts and utility modules works here. Bun's `mock.module()` has different semantics and would require a full rewrite of every mock.

Vitest also runs in ~1 s for the full suite because it reuses the Vite transform cache, so there is no meaningful speed trade-off.

## Contributing

TBD - feel free to raise issues or submit PRs until I set up a clear guideline.

## License

MIT
