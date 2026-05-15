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
          caughtErrorsIgnorePattern: "^_|^e$|^error$",
        },
      ],

      // Karakter kutip (") dalam teks JSX — valid di konten bahasa Indonesia
      // Contoh: "Selamat Datang" di dalam JSX text node
      "react/no-unescaped-entities": "off",

      // Pattern setState dalam useEffect valid di banyak kasus (data fetching, init)
      // Next.js App Router menggunakan pola ini secara sah
      "react-hooks/exhaustive-deps": "warn",

      // setState di dalam useEffect adalah pattern valid untuk sync state dengan props
      // Contoh: useEffect(() => { if (isActive) setIsOpen(true) }, [isActive])
      "react-hooks/set-state-in-effect": "off",

      // new Date().toLocaleDateString() di JSX adalah valid di client components
      // False positive dari react-hooks/purity rule
      "react-hooks/purity": "off",

      // React tidak perlu diimport secara eksplisit di Next.js 13+
      "react/react-in-jsx-scope": "off",
    },
  },
]);

export default eslintConfig;
