// Импорт глобальных переменных среды выполнения (например, window, document для браузера)
import globals from 'globals';

// Импорт утилиты для декларативной конфигурации ESLint
import { defineConfig } from 'eslint/config';

// Импорт плагина Prettier для ESLint — позволяет выводить ошибки форматирования как ESLint-ошибки
import prettierPlugin from 'eslint-plugin-prettier';

// Импорт конфигурации правил Prettier, чтобы отключить конфликтующие правила ESLint
import prettierConfig from 'eslint-config-prettier';

// Импорт парсера Babel для ESLint — нужен, чтобы ESLint понимал современные возможности JS
import babelParser from '@babel/eslint-parser';

// Список путей и файлов, которые должны быть проигнорированы линтером
const ignores = [
  '**/node_modules/**',      // Игнорировать папку с зависимостями
  '**/dist/**',              // Игнорировать финальную сборку
  '**/build/**',             // Игнорировать альтернативную папку сборки
  '**/coverage/**',          // Игнорировать отчёты покрытия
  '**/*.log',                // Игнорировать все .log-файлы
  '**/npm-debug.log*',       // Игнорировать логи npm
  '**/.git/**',              // Игнорировать внутренности Git-репозитория
  '**/.idea/**',             // Игнорировать настройки JetBrains IDE (WebStorm, PhpStorm и т.п.)
  '**/.vscode/**',           // Игнорировать настройки VS Code
  '**/.DS_Store',            // Игнорировать системные файлы macOS
];

// Экспорт конфигурации ESLint с помощью defineConfig
export default defineConfig([
  {
    // Указать, какие файлы проверять (все .js файлы)
    files: ['**/*.js'],

    // Указать, какие файлы игнорировать (из массива выше)
    ignores,

    // Настройки языка (парсинг, глобальные переменные и т.д.)
    languageOptions: {
      parser: babelParser, // Использовать парсер Babel для понимания современного синтаксиса

      parserOptions: {
        requireConfigFile: false, // Не требовать babel.config.js (удобно для простых проектов)
        ecmaVersion: 'latest',    // Использовать самую последнюю версию ECMAScript
        sourceType: 'module',     // Указать, что используется модульный синтаксис (import/export)
      },

      globals: globals.browser, // Установить глобальные переменные браузера (например, window, document)
    },

    // Подключаемые ESLint-плагины
    plugins: {
      prettier: prettierPlugin, // Плагин для интеграции с Prettier
    },

    // Правила, применяемые к файлам
    rules: {
      ...prettierConfig.rules,     // Включить правила Prettier (отключают конфликтующие ESLint-правила)
      'prettier/prettier': 'error', // Превращать нарушения форматирования в ошибки ESLint

      'no-console': 'warn',       // Предупреждать при использовании console.log и других console.*
      eqeqeq: 'warn',             // Предупреждать при использовании == вместо ===
      curly: 'warn',              // Предупреждать при отсутствии фигурных скобок у if, else и т.д.
      'no-else-return': 'warn',   // Предупреждать, если после return используется else

      'comma-dangle': [           // Контролировать наличие запятых в конце списков
        'error',
        {
          arrays: 'always-multiline',     // Обязательно в многострочных массивах
          objects: 'always-multiline',    // Обязательно в многострочных объектах
          imports: 'always-multiline',    // Обязательно в многострочных импортах
          exports: 'always-multiline',    // Обязательно в многострочных экспортных списках
          functions: 'never',             // Запретить запятую после последнего аргумента функции
        },
      ],
    },
  },
]);
