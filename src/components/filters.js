import {createElement} from './utils';

export const getFilters = () => ({
  filtersList: [{
    name: `Everything`,
    isChecked: true
  },
  {
    name: `Future`,
    isChecked: false
  },
  {
    name: `Past`,
    isChecked: false
  }
  ]
});


export class Filter {
  constructor({filtersList}) {
    this._filtersList = filtersList;
    this._element = null;
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">
    ${this._filtersList.map((item) =>
    `
      <div class="trip-filters__filter">
        <input id="filter-${item.name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item.name.toLowerCase()}" ${item.isChecked ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${item.name.toLowerCase()}">${item.name}</label>
      </div>
      `).join(``)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `;
  }
}

