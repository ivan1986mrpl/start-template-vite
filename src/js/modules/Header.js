class Header {
  selectors = {
    root: '[data-js-header]',
    menu: '[data-js-header-menu]',
    burgerButton: '[data-js-header-burger-button]',
  };

  stateClasses = {
    isActive: 'is-active',
    isLock: 'lock', // is-lock
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.menuElement = this.rootElement.querySelector(this.selectors.menu);
    this.burgerbuttonElement = this.rootElement.querySelector(
      this.selectors.burgerButton,
    );
    this.bindEvents();
  }

  onBurgerbuttonClick = () => {
    this.burgerbuttonElement.classList.toggle(this.stateClasses.isActive);
    this.menuElement.classList.toggle(this.stateClasses.isActive);
    document.body.classList.toggle(this.stateClasses.isLock); // body.lock
  };

  bindEvents() {
    this.burgerbuttonElement.addEventListener(
      'click',
      this.onBurgerbuttonClick,
    );
  }
}
//  1.55
export default Header;
