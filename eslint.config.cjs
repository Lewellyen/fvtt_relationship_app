const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const sveltePlugin = require("eslint-plugin-svelte");
const prettier = require("eslint-plugin-prettier");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        sourceType: "module",

        parserOptions: {
            tsconfigRootDir: __dirname,
        },
    },

    plugins: {
        "@typescript-eslint": typescriptEslint,
        svelte: sveltePlugin,
        prettier,
    },

    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ),

    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-namespace': 'off',
        'linebreak-style': ['error', 'windows'],
    },

    settings: {
        "svelte3/typescript": () => require("typescript"),
        "svelte3/compiler": require("svelte/compiler"),
    },
}, {
    // TypeScript type-aware linting for source files only
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: { parserOptions: { project: ["./tsconfig.json"], tsconfigRootDir: __dirname } }
}, {
    files: ["**/*.svelte"],
    languageOptions: {
        parser: "svelte-eslint-parser",
        parserOptions: {
            extraFileExtensions: [".svelte"],
            parser: tsParser,
            tsconfigRootDir: __dirname,
            project: ["./tsconfig.json"]
        }
    }
}, globalIgnores(["**/*.svelte", "**/dist/", "**/node_modules/", "**/references/", "eslint.config.cjs", ".eslintrc.cjs", "scripts/**", "backup/**"])]); 