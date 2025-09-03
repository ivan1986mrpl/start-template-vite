'use strict';

import { scrollUp } from './modules/scrollUp';
import Header from './modules/Header';

window.addEventListener('DOMContentLoaded', () => {
  scrollUp();
  new Header();
});
