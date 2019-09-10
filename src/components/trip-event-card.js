import {getDuration} from '../data';
import {AbstractComponent} from './abstract';
import moment from 'moment';

export class Event extends AbstractComponent {
  constructor({type, city, eventPrice, start, end}) {
    super();
    this._type = type;
    this._offers = this._type.offers;
    this._city = city.name;
    this._start = start;
    this._end = end;
    this._duration = this._end - this._start;
    this._eventPrice = eventPrice;
    this._description = city.description;
  }


  getTemplate() {
    return `
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type.id}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${this._type.title} ${this._type.placeholder} ${this._city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=""2019-03-18T10:30"">${moment(this._start).format(`HH:mm`)}</time>
          —
          <time class="event__end-time" datetime=""2019-03-18T10:30"">${moment(this._end).format(`HH:mm`)}</time>
        </p>
        <p class="event__duration">${getDuration(this._duration)}</p>
      </div>

      <p class="event__price">
        €&nbsp;<span class="event__price-value">${this._eventPrice}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      ${this._offers.length ? `
        ${`<ul class="event__selected-offers">
          ${this._offers.filter(({isApplied}) => isApplied).map(({title, price: amount}, i) => i < 2 ? `
          <li class="event__offer">
            <span class="event__offer-title">${title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${amount}</span>
          </li>
          ` : ``).join(``)}
        </ul>`}` : ``}
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`.trim();
  }
}

