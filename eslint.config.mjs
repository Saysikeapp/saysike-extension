// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginSecurity from "eslint-plugin-security";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginTestingLibrary from "eslint-plugin-testing-library";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/.wxt/**",
      "**/storybook-static/**",
      "**/.storybook/**",
      "**/node_modules/**",
    ],
  },

  // Base rules for all files
  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      pluginSecurity.configs.recommended,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      parserOptions: {
        projectService: {
          // Allow config files (.mjs, postcss.config.js etc.) that aren't in tsconfig
          allowDefaultProject: [
            "*.mjs",
            "*.config.js",
            "src/lib/ui/postcss.config.cjs",
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Test files
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      "@typescript-eslint/unbound-method": "off",
    },
  },

  // Frontend (extension + ui)
  {
    files: ["src/**/*.{ts,tsx}"],
    // Note: this used to target apps/** and packages/ui/** (monorepo paths)
    // but this is a flat project — all source is under src/
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "@tanstack/query": pluginQuery,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginQuery.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off", // TypeScript handles prop type checking
    },
  },

  // React Testing Library
  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    plugins: {
      "testing-library": pluginTestingLibrary,
    },
    rules: {
      ...pluginTestingLibrary.configs.react.rules,
    },
  },

  // Global rule overrides
  {
    rules: {
      "no-console": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "prefer-destructuring": ["error", { object: true, array: false }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
    },
  },

  // Entrypoints (background/content/popup scripts) — console is intentional
  {
    files: ["src/entrypoints/**/*.{ts,tsx}"],
    rules: {
      "no-console": "off",
    },
  },

  // Storybook
  {
    files: ["**/*.stories.{ts,tsx}", "**/*.stories.mdx"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-console": "off",
    },
  },
);
