import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';//https://www.npmjs.com/package/postcss-pxtorem

export default {
  plugins: [
    autoprefixer(),
    pxtorem({  // Используем pxtorem как функцию с конфигурацией
      rootValue: 16,
      propList: ["*"], // Преобразовывать все свойства
      selectorBlackList: [], // Селекторы, которые нужно исключить из преобразования
      replace: true, // Заменять px на rem
      mediaQuery: true, // Преобразовывать px внутри media queries
      minPixelValue: 0, // Минимальное значение px для преобразования
    })
  ]
};