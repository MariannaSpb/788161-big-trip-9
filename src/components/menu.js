import {createElement} from './utils';

export const getMenu = () => ({
  menuList: [{
    name: `Table`,
    isActive: true
  },
  {
    name: `Stats`,
    isActive: false
  }
  ]
});


export class Menu {
  constructor({menuList}) {
    this._menuList = menuList;
    this._element = null;
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${this._menuList.map((item) => `
    <a class="trip-tabs__btn ${item.isActive ? `trip-tabs__btn--active` : ``}" href="#">${item.name}</a>
    `).join(``)}
    </nav>
  `;
  }
}
