import {timeCalc} from '../data';
import {createOffer} from './offer';
import {formatTime, createElement} from './utils';

export class Event {
  constructor({icon, getTitle, city, eventPrice, offer, schedule: {start, duration}}) {
    this._icon = icon;
    this._getTitle = getTitle;
    this._city = city;
    this._start = start;
    this._duration = duration;
    this._eventPrice = eventPrice;
    this._offer = offer;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${this._icon}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${this._getTitle} ${this._city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=""2019-03-18T10:30"">${formatTime(this._start)}</time>
          —
          <time class="event__end-time" datetime=""2019-03-18T10:30"">${formatTime(this._start + this._duration)}</time>
        </p>
        <p class="event__duration">${timeCalc(this._duration / 1000)}</p>
      </div>

      <p class="event__price">
        €&nbsp;<span class="event__price-value">${this._eventPrice}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createOffer(this._offer).join(``)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
  }
}

