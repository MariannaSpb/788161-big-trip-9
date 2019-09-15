import {cities, types} from '../data';
import {unrender, position} from './utils';
import {AbstractComponent} from './abstract';
import moment from 'moment';


export class EditEvent extends AbstractComponent {
  constructor({type, city, eventPrice, productId, start, end}) {
    super();
    this._type = type;
    this._offers = this._type.offers;
    this._picture = city.pictures;
    this._description = city.description;
    this._city = city.name;
    this._start = start;
    this._end = end;
    this._eventPrice = eventPrice;
    // this._offer = offer;
    this._productId = productId;

    this._subscribeOnEvents();
  }

  // _calcPrice() {
  //   let costs = this._offers.filter((offerItem) => {
  //     return offerItem.isApplied;
  //   }).map((it) => it.price);
  //   for (let cost of costs) {
  //     // console.log(`offerItem`, offerItem)
  //     this._eventPrice = parseInt(cost, 10) + parseInt(this._eventPrice, 10);
  //   }
  //   return this._eventPrice;
  // }


  _chooseType() {
    this.getElement()
    .querySelectorAll(`.event__type-group`).forEach((element) => {
      element.addEventListener(`click`, (evt) => {
        if (evt.target.value) {
          const type = types[types.findIndex((it) => it.id === evt.target.value)];
          this.getElement().querySelector(`.event__label`).innerHTML = `${type.title} ${type.placeholder}`;
          this.getElement().querySelector(`.event__type-icon`).src = `img/icons/${type.id}.png`;
          const offersContainer = this.getElement().querySelector(`.event__section--offers`);
          const offersHTML = `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
            ${type.offers.map(({id, title, price}) => `
              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}"
                type="checkbox" name="event-offer-${id}">
                <label class="event__offer-label" for="event-offer-${id}">
                  <span class="event__offer-title">${title}</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">${price}</span>
                </label>
              </div>`).join(``)}
            </div>
          </section>`;
          if (type.offers.length) {
            if (offersContainer) {
              offersContainer.innerHTML = offersHTML;
            } else {
              this.getElement().querySelector(`.event__details`).insertAdjacentHTML(position.AFTERBEGIN, offersHTML);
            }
          } else {
            unrender(offersContainer);
          }
        }
      });
    });
  }


  getTemplate() {
    return `<li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post" name="edit">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${this._type.id}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${types.filter((type) => type.placeholder === `to`).map(({id, title}) => `
                <div class="event__type-item">
                  <input id="event-type-${id}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${id}"
                  ${this._type.id === id ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--${id}" for="event-type-${id}-1">${title}</label>
                </div>
              `).join(``)}
            </fieldset>
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${types.filter((type) => type.placeholder === `in`).map(({id, title}) => `
                <div class="event__type-item">
                  <input id="event-type-${id}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${id}"
                  ${this._type.id === id ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--${id}" for="event-type-${id}-1">${title}</label>
                </div>
              `).join(``)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${this._productId}">
          ${this._type.title} ${this._type.placeholder}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${this._productId}" type="text" name="event-destination" value=${this._city} list="destination-list-${this._productId}">
          <datalist id="destination-list-${this._productId}">
          ${cities.map(({name}) => `
          <option value="${name}"></option>
        `).join(``)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${this._productId}">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-${this._productId}" type="text" name="event-start-time" value='${moment(this._start).format(`DD/MM/YY HH:mm`)}'>
          —
          <label class="visually-hidden" for="event-end-time-${this._productId}">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-${this._productId}" type="text" name="event-end-time" value='${moment(this._end).format(`DD/MM/YY HH:mm`)}'>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${this._productId}">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-${this._productId}" type="text" name="event-price" value="${this._eventPrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-${this._productId}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked="">
        <label class="event__favorite-btn" for="event-favorite-${this._productId}">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
      ${this._offers.length ? `
        ${`<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${this._offers.map(({id, title, price: amount, isApplied}) => `
                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}"
                    type="checkbox" name="event-offer-${id}"
                    ${isApplied ? `checked` : ``}>
                    <label class="event__offer-label" for="event-offer-${id}">
                      <span class="event__offer-title">${title}</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">${amount}</span>
                    </label>
                  </div>`).join(``)}
              </div>
            </section>`}` : ``}
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${this._description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
    ${this._picture.map((elem) => `<img class="event__photo" src=${elem} alt="Event photo">`).join(``)}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`.trim();

  }

  _subscribeOnEvents() {
    this._chooseType();
    // this._calcPrice();
  }
}

