/**
 * @see https://stylelint.io/user-guide/configure/
 * @type {import('stylelint').Config}
 */
// Указание типа для автоподсказки в редакторе (TypeScript JSDoc) и ссылка на документацию

export default {
  // Список файлов и папок, которые будут проигнорированы Stylelint'ом
  ignoreFiles: [
    '**/node_modules/**',     // Зависимости
    '**/dist/**',             // Сборка проекта
    '**/build/**',            // Альтернативная сборочная папка
    '**/coverage/**',         // Результаты покрытия тестами
    '**/*.log',               // Лог-файлы
    '**/npm-debug.log*',      // Логи npm
    '**/.git/**',             // Git-папка
    '**/.idea/**',            // Настройки WebStorm/PhpStorm
    '**/.vscode/**',          // Настройки VS Code
    '**/.DS_Store',           // Системный файл macOS
  ],

  // Уровень по умолчанию — предупреждение, а не ошибка
  defaultSeverity: 'warning',

  // Расширяем базовую SCSS-конфигурацию (включает множество стандартных правил)
  extends: ['stylelint-config-standard-scss'],

  // Подключаемые плагины
  plugins: [
    'stylelint-scss',                  // Плагин для SCSS-специфичных правил
    'stylelint-order',                // Плагин для упорядочивания свойств
    'stylelint-selector-bem-pattern', // Проверка соответствия классов BEM-стилю
  ],

  // Основные правила Stylelint
  rules: {
    // Кавычки вокруг названий шрифтов: всегда, кроме ключевых слов
    'font-family-name-quotes': 'always-unless-keyword',

    // Цвета должны быть в полной шестнадцатеричной форме (#ffffff, не #fff)
    'color-hex-length': 'long',

    // Отключение некоторых новых CSS-функций, если не используются
    'color-function-alias-notation': null,
    'color-function-notation': null,
    'alpha-value-notation': null,

    // Отключение проверки пустых строк перед кастомными переменными
    'custom-property-empty-line-before': null,

    // Отключение проверки паттерна для имен кастомных переменных
    'custom-property-pattern': null,

    // Отключение проверки паттерна имен классов (заменяется на BEM-плагин)
    'selector-class-pattern': null,

    // Определяем порядок секций: сначала переменные, потом декларации
    'order/order': ['custom-properties', 'declarations'],

    // Настройка порядка CSS-свойств
    'order/properties-order': [
      // *** Группировка по логическим блокам ***
      'content',
      'appearance',
      'order', // flex/grid/position/order
      'flex',
      'flex-grow',
      'flex-shrink',
      'flex-basis',
      'grid-area',
      'grid-column',
      'grid-column-start',
      'grid-column-end',
      'grid-row',
      'grid-row-start',
      'grid-row-end',
      'align-self',
      'justify-self',

      // Позиционирование
      'position',
      'z-index',
      'inset',
      'top',
      'right',
      'bottom',
      'left',

      // Прокрутка и поведение
      'overflow',
      'overflow-x',
      'overflow-y',
      'overscroll-behavior',

      // Отображение и layout
      'display',
      'grid',
      'grid-template',
      'grid-template-rows',
      'grid-template-columns',
      'grid-template-areas',
      'grid-auto-columns',
      'grid-auto-rows',
      'grid-auto-flow',
      'flex-direction',
      'flex-wrap',
      'justify-content',
      'align-items',
      'align-content',
      'float',
      'clear',
      'column-count',
      'break-inside',
      'break-before',
      'break-after',
      'gap',
      'row-gap',
      'column-gap',

      // Размеры
      'box-sizing',
      'aspect-ratio',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',

      // Внешние отступы
      'margin',
      'margin-block',
      'margin-inline',
      'margin-top',
      'margin-bottom',
      'margin-left',
      'margin-right',

      // Внутренние отступы
      'padding',
      'padding-block',
      'padding-inline',
      'padding-top',
      'padding-bottom',
      'padding-left',
      'padding-right',

      // Шрифты и текст
      'font',
      'font-family',
      'font-size',
      'font-weight',
      'font-style',
      'font-variant',
      'font-size-adjust',
      'font-stretch',
      'line-height',
      'letter-spacing',
      'white-space',
      'overflow-wrap',
      'hyphens',
      'text-align',
      'text-decoration',
      'text-transform',
      'text-indent',
      'text-overflow',
      'color',

      // Фоновое оформление
      'background',
      'background-image',
      'background-position',
      'background-position-x',
      'background-position-y',
      'background-size',
      'background-repeat',
      'background-attachment',
      'background-origin',
      'background-clip',
      'background-color',
      'object-fit',

      // Границы
      'border',
      'border-block',
      'border-inline',
      'border-width',
      'border-style',
      'border-color',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-radius',

      // Обводка
      'outline',
      'outline-color',
      'outline-style',
      'outline-width',
      'outline-offset',

      // Тени
      'box-shadow',
      'filter',

      // Списки
      'list-style',
      'list-style-position',
      'list-style-type',
      'list-style-image',
      'counter-set',
      'counter-reset',
      'counter-increment',

      // Таблицы
      'border-collapse',
      'border-spacing',
      'empty-cells',

      // Прочие визуальные
      'visibility',
      'opacity',
      'cursor',
      'clip',
      'clip-path',

      // Анимации и переходы
      'transition',
      'transition-behavior',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'transform-origin',
      'transform',
      'rotate',
      'scale',
      'translate',
      'animation',
      'animation-name',
      'animation-duration',
      'animation-timing-function',
      'animation-delay',
      'animation-iteration-count',
      'animation-direction',
      'animation-fill-mode',
      'animation-play-state',
      'animation-timeline',
      'animation-range',
      'animation-range-start',
      'animation-range-end',
      'resize',

      // Специальные свойства
      'pointer-events',
      'user-select',

      // SVG-свойства
      'fill',
      'stroke',
      'stroke-width',
      'stroke-linecap',
      'stroke-dasharray',
      'stroke-dashoffset',
    ],

    // Настройка BEM-валидации классов
    'plugin/selector-bem-pattern': {
      preset: 'bem', // Использовать стандартный шаблон BEM
    },

    // Отключаем проверку специфичности (например, когда элемент переопределяется позже)
    'no-descending-specificity': null,

    // Принудительно использовать нижний регистр в значениях, кроме перечисленных исключений
    'value-keyword-case': [
      'lower',
      {
        ignoreKeywords: ['currentColor'], // currentColor — исключение
      },
    ],

    // Предупреждение, если CSS/SCSS-файл пустой
    'no-empty-source': [true, { severity: 'warning' }],

    // Отключение некоторых SCSS-специфичных проверок
    'scss/dollar-variable-pattern': null,            // Шаблон именования переменных ($var)
    'scss/dollar-variable-empty-line-before': null,  // Пустая строка перед переменными
    'scss/operator-no-newline-before': null,         // Перенос до оператора
    'scss/operator-no-newline-after': null,          // Перенос после оператора
  },
};
