import {formatDayMonth, formatDayMonthShort, createElement} from './utils';


export class Info {
  constructor(cities, dates) {
    this._cities = cities;
    this._dates = dates;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<div class="trip-info__main">
    <h1 class="trip-info__title">${this._cities.length > 2 ? `${this._cities[0]} — ... — ${this._cities[this._cities.length - 1]}` : `${this._cities.join(`—`)}`}</h1>
    <p class="trip-info__dates">${this._dates.length > 2 ? `${formatDayMonth(this._dates[0])} — ${formatDayMonthShort(this._dates[this._dates.length - 1])}` : `${this._dates.join(`—`)}
    `}</p>
  </div>`;
  }
}
