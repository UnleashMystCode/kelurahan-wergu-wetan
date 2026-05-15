import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "app/generated/**",
  ]),
  // ── Custom rule overrides ──────────────────────────────────────
  {
    rules: {
      // Server Actions menggunakan catch (e: any) sebagai pola standar
      // untuk error handling — downgrade dari error ke warning
      "@typescript-eslint/no-explicit-any": "warn",
      // Variabel 'e' di catch block yang tidak dipakai (catch-all) — warn saja
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_|^e$",
        },
      ],
      // React tidak perlu diimport secara eksplisit di Next.js 13+
      "react/react-in-jsx-scope": "off",
    },
  },
]);

export default eslintConfig;
