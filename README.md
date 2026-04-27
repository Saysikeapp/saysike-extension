# Saysike Browser Extension

[Saysike](https://saysike.com) is an open-source browser extension aiming to be the best online shopping tool while being transparent & maintaining integrity.

It offers you coupon codes while browsing, with plans to implement price comparisons, history & tracking in the near future.

Currently available on Chrome, Brave, and Edge though the Chrome Web Store: https://chromewebstore.google.com/detail/saysike/pgokhihamcfcdlfamkdcjbfmipgaddlf and waiting on approval by Firefox.

## Project Structure

TBD

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.3.8

### Environment variables

You can copy `.env.sample` to `.env.local` & `.env.production`

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

Then load the `.output/chrome-mv3-dev`or `.output.firefox-mv3-dev` directory as an unpacked extension in your browser.

### Build

Chromium:

```bash
bun build
```

Firefox:

```bash
bun build:firefox
```

Then load the `.output/chrome-mv3`or `.output.firefox-mv3` directory as an unpacked extension in your browser.

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
bun test
```

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

## Contributing

TBD - feel free to raise issues or submit PRs until I set up a clear guidline.

## License

MIT
