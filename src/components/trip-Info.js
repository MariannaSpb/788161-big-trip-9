// import {formatDayMonth, formatDayMonthShort} from './utils';
import {AbstractComponent} from './abstract';
import moment from 'moment';


export class Info extends AbstractComponent {
  constructor(cities, dates) {
    super();
    this._cities = cities;
    this._dates = dates;
  }

  getTemplate() {
    return `<div class="trip-info__main">
    <h1 class="trip-info__title">${this._cities.length > 2 ? `${this._cities[0]} — ... — ${this._cities[this._cities.length - 1]}` : `${this._cities.join(`—`)}`}</h1>
    <p class="trip-info__dates">${this._dates.length > 2 ? `${moment(this._dates[0]).format(`MMM D`)} — ${moment(this._dates[this._dates.length - 1]).format(`D`)}` : `${moment(this._dates).join(`—`)}
    `}</p>
  </div>`;
  }
}

