/** * @see https://prettier.io/docs/configuration * @type {import('prettier').Config} */
export default {
  semi: true, //  Всегда ставить точку с запятой
  singleQuote: true, //  Использовать одинарные кавычки вместо двойных
  tabWidth: 2,
  endOfLine: 'lf',
  trailingComma: 'es5', //  Добавляет запятые в объектах и массивах (ES5+)
  bracketSpacing: true, //  Пробелы между скобками объектов: { foo: bar }
  arrowParens: 'always', //  Всегда ставить скобки у стрелочных функций
};
