import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
    {
        files: ["**/*.ts", "**/*.tsx"],
        ignores: ["**/*.d.ts"],
        languageOptions: {
            parser: typescriptEslintParser,
        },
        plugins: {
            "@typescript-eslint": typescriptEslint,
            prettier: prettier,
        },
        rules: {
            ...typescriptEslint.configs.recommended.rules,
            ...prettierConfig.rules,
            "prettier/prettier": "error",
        },
    },
];
