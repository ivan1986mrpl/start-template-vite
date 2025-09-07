'use strict';

import { scrollUp } from './modules/scrollUp';
import Header from './modules/Header';
// import { DateUpdater } from './modules/DateUpdater';
import { counterAnimation } from './modules/counterAnimation';

window.addEventListener('DOMContentLoaded', () => {
  scrollUp();
  new Header();
  // new DateUpdater('.date', { useIntl: false, lang: 'ru' });
  counterAnimation();
});
