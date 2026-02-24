import eslintJsPlugin from '@eslint/js';
import eslintPrettierRecommendedPlugin from 'eslint-plugin-prettier/recommended';
import eslintSimpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import eslintPluginToml from 'eslint-plugin-toml';
import eslintYamlPlugin from 'eslint-plugin-yml';
import globals from 'globals';
import eslintJsonParser from 'jsonc-eslint-parser';
import eslintTypescriptPlugin from 'typescript-eslint';

// eslint basic config
const eslintConfigs = [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: { ...globals.nodeBuiltin }
        },
        rules: {
            eqeqeq: ['error', 'always'],
            'no-restricted-syntax': ['error', 'ExportDefaultDeclaration'],
            'no-restricted-exports': [
                'error',
                { restrictedNamedExports: ['default'] }
            ]
        }
    }
];

// additional configs (DO_NOT_REMOVE:@soop-nx/core:initializer:common-root:eslint-config)
// js config
const jsConfigs = [eslintJsPlugin.configs.recommended];

// typescript config
const typescriptAllowFiles = ['**/*.ts', '**/*.tsx'];
const typescriptRecommendedConfigs =
    eslintTypescriptPlugin.configs.recommended.map((config) => ({
        files: typescriptAllowFiles,
        ...config
    }));
const typescriptConfigs = [
    ...eslintTypescriptPlugin.config(...typescriptRecommendedConfigs),
    {
        files: typescriptAllowFiles,
        rules: {
            '@typescript-eslint/no-empty-interface': [
                'error',
                { allowSingleExtends: true }
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-unused-expressions': ['error', {}]
        }
    }
];

// simple import sort config
const simpleImportSortConfigs = [
    {
        plugins: {
            'simple-import-sort': eslintSimpleImportSortPlugin
        },
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error'
        }
    }
];

// prettier config
const prettierConfigs = [
    eslintPrettierRecommendedPlugin,
    { rules: { 'prettier/prettier': 'error' } }
];

// json config
const jsonConfigs = [
    {
        files: ['**/*.json', '**/*.json5', '**/.lintstagedrc', '**/.swcrc'],
        languageOptions: { parser: eslintJsonParser },
        rules: { 'prettier/prettier': ['error', { tabWidth: 2 }] }
    }
];

// yaml config
const yamlConfigs = [
    ...eslintYamlPlugin.configs['flat/standard'],
    ...eslintYamlPlugin.configs['flat/prettier'],
    {
        files: ['**/*.yml', '**/*.yaml'],
        rules: {
            'prettier/prettier': ['error', { tabWidth: 2 }],
            'yml/no-empty-document': [0]
        }
    }
];

// toml config
const tomlConfigs = [
    ...eslintPluginToml.configs['flat/standard'],
    {
        files: ['**/*.toml'],
        rules: {
            'prettier/prettier': 0
        }
    }
];

// eslint-disable-next-line no-restricted-syntax
export default [
    ...eslintConfigs,
    // additional configs (DO_NOT_REMOVE:@soop-nx/core:initializer:common-root:eslint-config-list)
    ...jsConfigs,
    ...typescriptConfigs,
    ...simpleImportSortConfigs,
    ...prettierConfigs,
    ...jsonConfigs,
    ...yamlConfigs,
    ...tomlConfigs
];
