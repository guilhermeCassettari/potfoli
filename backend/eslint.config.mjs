import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
).map(config => ({
    ...config,
    files: ["**/*.{ts}", "**/*.ts"],
})), {
    files: ["**/*.{ts}", "**/*.ts"],

    plugins: {
        "@typescript-eslint": typescriptEslint,
        prettier,
    },

    languageOptions: {
        parser: tsParser,
    },

    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    },
}];
