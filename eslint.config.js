import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactCompiler from "eslint-plugin-react-compiler";
import unusedImports from "eslint-plugin-unused-imports";

// Create a compatibility instance to use configs and plugins from eslintrc
const compat = new FlatCompat();

const config = [
  // Base configurations
  js.configs.recommended,

  // Add Next.js plugin
  ...compat.extends("next/core-web-vitals"),

  // Ignore patterns
  {
    ignores: [
      ".next/**/*",
      "node_modules/**/*",
      "public/**/*",
      "**/*.d.ts",
      "dist/**/*",
      "build/**/*",
      "coverage/**/*",
    ],
  },

  // TypeScript configurations
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      "unused-imports": unusedImports,
      "react-compiler": reactCompiler,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "unused-imports/no-unused-imports": 2,
      "@typescript-eslint/no-non-null-asserted-optional-chain": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "react-hooks/exhaustive-deps": 0,
      "react/display-name": 0,
      "@typescript-eslint/ban-types": 0,
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
      "no-unused-vars": "off", // Turn off base rule as it can report incorrect errors
      "no-undef": "warn", // Downgrade to warning for now
      "react/jsx-key": "warn",
      "no-empty": "warn",
      "no-constant-binary-expression": "warn",
    },
  },

  // Add Next.js specific rules
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    plugins: {
      "@next/next": nextPlugin,
    },
  },
];

export default config;
