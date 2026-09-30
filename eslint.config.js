import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: ["dist/**", ".quasar/**", "node_modules/**", "coverage/**"],
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },

    rules: {
      // Nama file mengikuti route (LoginPage, PatientsPage) -> boleh single word
      "vue/multi-word-component-names": "warn",

      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },

  // Harus terakhir: matikan rule format yang bentrok dengan Prettier
  prettier,
];
