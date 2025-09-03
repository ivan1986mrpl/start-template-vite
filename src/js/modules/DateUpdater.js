class DateUpdater {
  constructor(selector = '.date', options = {}) {
    this.selector = selector;

    // Язык, локаль и тип форматирования
    this.lang = options.lang || document.documentElement.lang || 'en';
    this.locale = options.locale || navigator.language || 'en-US';
    this.useIntl = options.useIntl || false;

    // Дни недели
    this.days = {
      ru: [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
      ],
      en: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      uk: [
        'Неділя',
        'Понеділок',
        'Вівторок',
        'Середа',
        'Четвер',
        'П’ятниця',
        'Субота',
      ],
    };

    // Месяцы
    this.months = {
      ru: [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
      ],
      en: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      uk: [
        'Січня',
        'Лютого',
        'Березня',
        'Квітня',
        'Травня',
        'Червня',
        'Липня',
        'Серпня',
        'Вересня',
        'Жовтня',
        'Листопада',
        'Грудня',
      ],
    };

    // Intl форматтер
    if (this.useIntl) {
      try {
        this.formatter = new Intl.DateTimeFormat(this.locale, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
      } catch (e) {
        // console.warn(
        //   `DateUpdater: invalid locale '${this.locale}', falling back to 'en-US'.`,
        // );
        this.formatter = new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
      }
    }

    this.start();
  }

  addLeadingZero(num) {
    return String(num).padStart(2, '0');
  }

  formatCustomDate(date) {
    const days = this.days[this.lang] || this.days.en;
    const months = this.months[this.lang] || this.months.en;

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = this.addLeadingZero(date.getDate());
    const year = date.getFullYear();
    const hours = this.addLeadingZero(date.getHours());
    const minutes = this.addLeadingZero(date.getMinutes());
    const seconds = this.addLeadingZero(date.getSeconds());

    // Подпись в зависимости от языка
    let label;
    switch (this.lang) {
      case 'ru':
        label = 'Дата';
        break;
      case 'uk':
        label = 'Дата';
        break;
      default:
        label = 'Date';
    }

    return `${label}: ${day} ${monthName} ${year} ${hours}:${minutes}:${seconds} ${dayName}`;
  }

  formatDate(date) {
    return this.useIntl
      ? this.formatter.format(date)
      : this.formatCustomDate(date);
  }

  updateDate() {
    const element = document.querySelector(this.selector);
    if (!element) {
      // console.warn(
      //   `DateUpdater: элемент с селектором '${this.selector}' не найден.`,
      // );
      return;
    }

    const now = new Date();
    element.innerHTML = this.formatDate(now);
  }

  start() {
    this.updateDate();
    this.intervalId = setInterval(() => this.updateDate(), 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

export { DateUpdater };

// Кастомное ручное форматирование по языку страницы
// const updater = new DateUpdater();
// Пример вывода при <html lang="ru">:  Дата: 03 Сентября 2025 17:35:12 Среда
// Пример вывода при <html lang="uk">:  Дата: 03 Вересня 2025 17:35:12 Середа
// Пример вывода при <html lang="en">:  Date: 03 Sep 2025 17:35:12 Wednesday

// Использовать Intl.DateTimeFormat с русской локалью
// const updater = new DateUpdater('.date', {
//   useIntl: true,
//   locale: 'ru-RU',
// });
// Выведет: среда, 03 сентября 2025 г., 17:35:12

// Использовать Intl.DateTimeFormat с английской локалью
// const updater = new DateUpdater('.date', {
//   useIntl: true,
//   locale: 'en-US',
// });
// Выведет: Wednesday, September 03, 2025, 17:35:12

// Использовать Intl.DateTimeFormat с украинской локалью
// const updater = new DateUpdater('.date', {
//   useIntl: true,
//   locale: 'uk-UA',
// });
// Выведет: середа, 03 вересня 2025 р., 17:35:12

// Автоматическое определение языка/локали по <html lang="">
// Не передавай ни lang, ни locale
// const updater = new DateUpdater('.date', {
//   useIntl: true,
// });

// Остановка обновления даты
// updater.stop();
