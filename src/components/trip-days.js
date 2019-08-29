import {createElement} from './utils';
// import {Day} from './trip-day';

export class TripDays {
  constructor() {
    this._element = null;
    // this._day = new Day(eventsArray);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<ul class="trip-days">

        </ul>`;
  }
}
