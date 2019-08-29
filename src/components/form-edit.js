import {cityList} from '../data';
import {formatDate, formatTime} from './utils';


const calculatePrice = (price, offer) => {
  let costs = offer.filter((offerItem) => offerItem.isAdded).map((it) => it.price);
  for (let cost of costs) {
    price += cost;
  }
  return price;
};

export const getEventEditeForm = ({icon, city, eventPrice, offer, description, getTitle, picture, schedule: {start, duration}}, index = 1) => {
  return `<li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${index}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${icon}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${index}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${index}">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-${index}">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-${index}">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-${index}">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-${index}">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-${index}">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-${index}">Flight</label>
              </div>
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              <div class="event__type-item">
                <input id="event-type-check-in-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${index}">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${index}">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${index}">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${index}">
          ${getTitle}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${index}" type="text" name="event-destination" value=${city} list="destination-list-${index}">
          <datalist id="destination-list-${index}">
            ${cityList.map((cityItem) => `<option value="${cityItem}"></option>
              `).join(``)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${index}">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-${index}" type="text" name="event-start-time" value='${formatDate(start) + ` ` + formatTime(start)}'>
          —
          <label class="visually-hidden" for="event-end-time-${index}">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-${index}" type="text" name="event-end-time" value='${formatDate(start) + ` ` + formatTime(start + duration)}'>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${index}">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-${index}" type="text" name="event-price" value="${calculatePrice(eventPrice, offer)}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-${index}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked="">
        <label class="event__favorite-btn" for="event-favorite-${index}">
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

        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index}" type="checkbox" name="event-offer-luggage" checked="">
              <label class="event__offer-label" for="event-offer-luggage-${index}">
                <span class="event__offer-title">Add luggage</span>
                +
                €&nbsp;<span class="event__offer-price">30</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${index}" type="checkbox" name="event-offer-comfort" checked="">
              <label class="event__offer-label" for="event-offer-comfort-${index}">
                <span class="event__offer-title">Switch to comfort class</span>
                +
                €&nbsp;<span class="event__offer-price">100</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-${index}" type="checkbox" name="event-offer-meal">
              <label class="event__offer-label" for="event-offer-meal-${index}">
                <span class="event__offer-title">Add meal</span>
                +
                €&nbsp;<span class="event__offer-price">15</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-${index}" type="checkbox" name="event-offer-seats">
              <label class="event__offer-label" for="event-offer-seats-${index}">
                <span class="event__offer-title">Choose seats</span>
                +
                €&nbsp;<span class="event__offer-price">5</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-${index}" type="checkbox" name="event-offer-train">
              <label class="event__offer-label" for="event-offer-train-${index}">
                <span class="event__offer-title">Travel by train</span>
                +
                €&nbsp;<span class="event__offer-price">40</span>
              </label>
            </div>
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
    ${picture(5).map((elem) => {
    return `<img class="event__photo" src=${elem} alt="Event photo">`;
  })}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;
};


