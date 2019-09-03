import {AbstractComponent} from './abstract';

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


export class Menu extends AbstractComponent {
  constructor({menuList}) {
    super();
    this._menuList = menuList;
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
