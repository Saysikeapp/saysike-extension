# Saysike Browser Extension

Open-source browser extension that automatically surfaces coupon codes, price comparisons, and price drop alerts while you shop.

Currently available on Chrome, Brave, and Edge though the Chrome Web Store: https://chromewebstore.google.com/detail/saysike/pgokhihamcfcdlfamkdcjbfmipgaddlf

## Project Structure

```
apps/
  extension/        # WXT browser extension (Chrome/Brave/Edge)
packages/
  ui/               # Shared component library (@saysike/ui)
  utils/            # Shared utility functions (@saysike/utils)
  http/             # HTTP client (@saysike/http)
  schemas/          # Zod API schemas (@saysike/schemas)
  tailwind-config/  # Shared Tailwind CSS config (@saysike/tailwind-config)
  tsconfig/         # Shared TypeScript config (@saysike/tsconfig)
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.3.8+
- Node.js 22+

### Install

```bash
bun install
```

### Dev (extension)

```bash
bun dev
```

Then load the `apps/extension/.output/chrome-mv3` directory as an unpacked extension in Chrome/Brave.

### Build

```bash
bun build
```

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

| Area                 | Technology        |
| -------------------- | ----------------- |
| Main package manager | Bun 1.3.8         |
| Extension framework  | WXT               |
| UI                   | React 19          |
| Styling              | Tailwind CSS v4   |
| Data fetching        | TanStack Query v5 |
| Auth (client)        | better-auth       |
| Schemas              | Zod v4            |
| Monorepo             | Bun workspaces    |

## Contributing

This extension is fully open source. Contributions are welcome — please open an issue or PR.

## License

MIT
