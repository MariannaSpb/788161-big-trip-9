import {menu} from '../data';

export const getMenuItem = (arr) => {
  return arr.map((item) => `
    <a class="trip-tabs__btn  ${item.isAdded ? `trip-tabs__btn--active` : ``}" href="#">${item.name}</a>`.trim());
};

export const getMenu = () => {
  return `
  <form class="trip-filters" action="#" method="get">
    ${getMenuItem(menu).join(``)}
  </form>`.trim();
};

