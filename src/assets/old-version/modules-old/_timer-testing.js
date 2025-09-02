export default function initCountdown({
  selector,
  to,
  endMessage = 'Time is up!',
  lang = 'en',
  leadingZero = true,
  hideDaysIfZero = true,
} = {}) {
  const decCache = [];
  const decCases = [2, 0, 1, 1, 1, 2];

  const languageMap = {
    ru: {
      day: ['день', 'дня', 'дней'],
      hour: ['час', 'часа', 'часов'],
      minute: ['минута', 'минуты', 'минут'],
      second: ['секунда', 'секунды', 'секунд'],
    },
    ua: {
      day: ['день', 'дні', 'днів'],
      hour: ['година', 'години', 'годин'],
      minute: ['хвилина', 'хвилини', 'хвилин'],
      second: ['секунда', 'секунди', 'секунд'],
    },
    en: {
      day: ['day', 'days', 'days'],
      hour: ['hour', 'hours', 'hours'],
      minute: ['minute', 'minutes', 'minutes'],
      second: ['second', 'seconds', 'seconds'],
    },
  };

  function decOfNum(number, titles) {
    if (!decCache[number]) {
      decCache[number] =
        number % 100 > 4 && number % 100 < 20
          ? 2
          : decCases[Math.min(number % 10, 5)];
    }
    return titles[decCache[number]];
  }

  function pad(num) {
    return leadingZero && num < 10 ? '0' + num : num;
  }

  if (!selector || !to) {
    console.error('[Countdown] selector or "to" parameter is missing.');
    return;
  }

  const roots = document.querySelectorAll(selector);
  if (roots.length === 0) {
    console.warn(`[Countdown] No elements found for selector: "${selector}"`);
    return;
  }

  let toDate;
  if (typeof to === 'string') {
    toDate = new Date(to);
    if (isNaN(toDate)) {
      console.error(`[Countdown] Invalid date string: ${to}`);
      return;
    }
  } else if (typeof to === 'number') {
    toDate = new Date(Date.now() + to * 1000);
  } else {
    console.error(`[Countdown] Invalid type of "to": must be string or number`);
    return;
  }

  const currentLang =
    lang && languageMap[lang]
      ? lang
      : languageMap[document.documentElement.lang.toLowerCase()]
        ? document.documentElement.lang.toLowerCase()
        : 'en';

  const dictionary = languageMap[currentLang];

  const timer = setInterval(update, 1000);

  function update() {
    const now = new Date();
    const total = Math.floor((toDate - now) / 1000);

    if (total <= 0) {
      clearInterval(timer);
      roots.forEach((el) => (el.textContent = endMessage));
      return;
    }

    const time = {
      days: Math.floor(total / 86400),
      hours: Math.floor((total % 86400) / 3600),
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60,
    };

    roots.forEach((root) => {
      for (const [unit, titles] of Object.entries(dictionary)) {
        const value = time[unit + (unit === 'day' ? 's' : '')];
        const block = root.querySelector(`.${unit}s`);
        if (!block) {
          continue;
        }

        const num = block.querySelector('.num');
        const name = block.querySelector('.name');

        if (hideDaysIfZero && unit === 'day' && value <= 0) {
          block.style.display = 'none';
          continue;
        }

        if (block.style.display === 'none') {
          block.style.display = '';
        }

        if (num) {
          num.textContent = pad(value);
        }
        if (name) {
          name.textContent = decOfNum(value, titles);
        }
      }
    });
  }

  update();

  return {
    stop() {
      clearInterval(timer);
    },
  };
}

// До конкретной даты
// initCountdown({
//   selector: '.countdown',
//   to: '3 Sep 2025 18:00:00',
//   endMessage: 'Время вышло!',
// });

// На 5 минут
// initCountdown({
//   selector: '.countdown',
//   to: 300, // секунд
//   endMessage: 'Done!',
//   lang: 'en',
// });

// На украинском + без нуля перед цифрами
// initCountdown({
//   selector: '.countdown',
//   to: 600,
//   lang: 'ua',
//   leadingZero: false,
// });
