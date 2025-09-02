function scrollUp({
  parent = document.body,
  offset = 300,
  maxWidth = 1600,
  scrollUpClass = 'scroll-up',
  scrollUpPathClass = 'scroll-up__path',
} = {}) {
  if (!parent || !(parent instanceof Element)) {
    // действительно ли переменная parent является DOM-элементом
    // console.warn('[scrollUp]: Неверный родительский элемент');
    return;
  }

  // Создание кнопки
  const button = document.createElement('button');
  button.className = scrollUpClass;
  button.setAttribute('aria-label', 'scroll to top');
  button.setAttribute('title', 'scroll to top');

  // Создание SVG внутри кнопки
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.classList.add(`${scrollUpClass}__svg`);
  svg.setAttribute('viewBox', '-2 -2 52 52');

  const path = document.createElementNS(svgNS, 'path');
  path.classList.add(scrollUpPathClass);
  path.setAttribute('d', 'M 24,0 a24,24 0 0,1 0,48 a24,24 0 0,1 0,-48');

  svg.appendChild(path);
  button.appendChild(svg);
  parent.appendChild(button);

  // Логика кнопки
  const scrollUp = button;
  const scrollUpSvgPath = path;

  const pathLength = scrollUpSvgPath.getTotalLength();
  scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

  const getTop = () => window.scrollY || document.documentElement.scrollTop;

  const updateDashOffset = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const dashOffset = pathLength - (getTop() * pathLength) / height;
    scrollUpSvgPath.style.strokeDashoffset = dashOffset;
  };

  const toggleVisibility = () => {
    const scrolled = getTop();
    const width = window.innerWidth;

    updateDashOffset();

    if (scrolled > offset && width <= maxWidth) {
      scrollUp.classList.add(`${scrollUpClass}--active`);
    } else {
      scrollUp.classList.remove(`${scrollUpClass}--active`);
    }
  };

  window.addEventListener('scroll', toggleVisibility);
  window.addEventListener('resize', toggleVisibility);

  scrollUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  toggleVisibility();
}

export { scrollUp };

// scrollUp({
//   parent: document.querySelector('.wrapper'),
//   offset: 200,
//   maxWidth: 1200,
// });

/* 
<button class="scroll-up" aria-label="scroll to top">
  <svg class="scroll-up__svg" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 52 52">
    <path class="scroll-up__path" d="M 24,0 a24,24 0 0,1 0,48 a24,24 0 0,1 0,-48" />
  </svg>
</button>
*/
