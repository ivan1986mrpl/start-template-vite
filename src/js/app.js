'use strict';

import { scrollUp } from './modules/scrollUp';
import Header from './modules/Header';
import { DateUpdater } from './modules/DateUpdater';

window.addEventListener('DOMContentLoaded', () => {
  scrollUp();
  new Header();
  new DateUpdater();
});
