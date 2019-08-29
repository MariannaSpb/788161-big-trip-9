import {cityList} from '../data';
import {formatDate, formatTime, createElement} from './utils';


const calculatePrice = (price, offer) => {
  let costs = offer.filter((offerItem) => offerItem.isAdded).map((it) => it.price);
  for (let cost of costs) {
    price += cost;
  }
  return price;
};

export class EditEvent {
  constructor({icon, getTitle, description, city, eventPrice, offer, picture, productId, schedule: {start, duration}}) {
    this._icon = icon;
    this._getTitle = getTitle;
    this._description = description;
    this._city = city;
    this._start = start;
    this._duration = duration;
    this._eventPrice = eventPrice;
    this._picture = picture;
    this._offer = offer;
    this._productId = productId;
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
    <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${this._productId}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${this._icon}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${this._productId}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-${this._productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${this._productId}">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-${this._productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-${this._productId}">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-${this._productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-${this._productId}">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-${this._productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-${this._productId}">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-${this._productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-${this._productId}">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-${this._productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-${this._productId}">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-${this._productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-${this._productId}">Flight</label>
              </div>
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              <div class="event__type-item">
                <input id="event-type-check-in-${this._productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${this._productId}">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-${this._productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${this._productId}">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-${this._productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${this._productId}">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${this._productId}">
          ${this._getTitle}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${this._productId}" type="text" name="event-destination" value=${this._city} list="destination-list-${this._productId}">
          <datalist id="destination-list-${this._productId}">
            ${cityList.map((cityItem) => `<option value="${cityItem}"></option>
              `).join(``)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${this._productId}">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-${this._productId}" type="text" name="event-start-time" value='${formatDate(this._start) + ` ` + formatTime(this._start)}'>
          —
          <label class="visually-hidden" for="event-end-time-${this._productId}">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-${this._productId}" type="text" name="event-end-time" value='${formatDate(this._start) + ` ` + formatTime(this._start + this._duration)}'>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${this._productId}">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-${this._productId}" type="text" name="event-price" value="${calculatePrice(this._eventPrice, this._offer)}">
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

        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${this._productId}" type="checkbox" name="event-offer-luggage" checked="">
              <label class="event__offer-label" for="event-offer-luggage-${this._productId}">
                <span class="event__offer-title">Add luggage</span>
                +
                €&nbsp;<span class="event__offer-price">30</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${this._productId}" type="checkbox" name="event-offer-comfort" checked="">
              <label class="event__offer-label" for="event-offer-comfort-${this._productId}">
                <span class="event__offer-title">Switch to comfort class</span>
                +
                €&nbsp;<span class="event__offer-price">100</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-${this._productId}" type="checkbox" name="event-offer-meal">
              <label class="event__offer-label" for="event-offer-meal-${this._productId}">
                <span class="event__offer-title">Add meal</span>
                +
                €&nbsp;<span class="event__offer-price">15</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-${this._productId}" type="checkbox" name="event-offer-seats">
              <label class="event__offer-label" for="event-offer-seats-${this._productId}">
                <span class="event__offer-title">Choose seats</span>
                +
                €&nbsp;<span class="event__offer-price">5</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-${this._productId}" type="checkbox" name="event-offer-train">
              <label class="event__offer-label" for="event-offer-train-${this._productId}">
                <span class="event__offer-title">Travel by train</span>
                +
                €&nbsp;<span class="event__offer-price">40</span>
              </label>
            </div>
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${this._description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
    ${this._picture(5).map((elem) => {
    return `<img class="event__photo" src=${elem} alt="Event photo">`;
  })}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;

  }
}

// export const getEventEditeForm = ({icon, city, eventPrice, offer, description, getTitle, picture, schedule: {start, duration}, productId}) => {
//   return `<li class="trip-events__item">
//     <form class="event  event--edit" action="#" method="post">
//       <header class="event__header">
//         <div class="event__type-wrapper">
//           <label class="event__type  event__type-btn" for="event-type-toggle-${productId}">
//             <span class="visually-hidden">Choose event type</span>
//             <img class="event__type-icon" width="17" height="17" src="img/icons/${icon}.png" alt="Event type icon">
//           </label>
//           <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${productId}" type="checkbox">

//           <div class="event__type-list">
//             <fieldset class="event__type-group">
//               <legend class="visually-hidden">Transfer</legend>

//               <div class="event__type-item">
//                 <input id="event-type-taxi-${productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
//                 <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${productId}">Taxi</label>
//               </div>

//               <div class="event__type-item">
//                 <input id="event-type-bus-${productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
//                 <label class="event__type-label  event__type-label--bus" for="event-type-bus-${productId}">Bus</label>
//               </div>

//               <div class="event__type-item">
//                 <input id="event-type-train-${productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
//                 <label class="event__type-label  event__type-label--train" for="event-type-train-${productId}">Train</label>
//               </div>

//               <div class="event__type-item">
//                 <input id="event-type-ship-${productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
//                 <label class="event__type-label  event__type-label--ship" for="event-type-ship-${productId}">Ship</label>
//               </div>

//               <div class="event__type-item">
//                 <input id="event-type-transport-${productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
//                 <label class="event__type-label  event__type-label--transport" for="event-type-transport-${productId}">Transport</label>
//               </div>

//               <div class="event__type-item">
//                 <input id="event-type-drive-${productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
//                 <label class="event__type-label  event__type-label--drive" for="event-type-drive-${productId}">Drive</label>
//               </div>

//               <div class="event__type-item">
//                 <input id="event-type-flight-${productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
//                 <label class="event__type-label  event__type-label--flight" for="event-type-flight-${productId}">Flight</label>
//               </div>
//             </fieldset>

//             <fieldset class="event__type-group">
//               <legend class="visually-hidden">Activity</legend>

//               <div class="event__type-item">
//                 <input id="event-type-check-in-${productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
//                 <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${productId}">Check-in</label>
//               </div>

//               <div class="event__type-item">
//                 <input id="event-type-sightseeing-${productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
//                 <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${productId}">Sightseeing</label>
//               </div>

//               <div class="event__type-item">
//                 <input id="event-type-restaurant-${productId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
//                 <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${productId}">Restaurant</label>
//               </div>
//             </fieldset>
//           </div>
//         </div>

//         <div class="event__field-group  event__field-group--destination">
//           <label class="event__label  event__type-output" for="event-destination-${productId}">
//           ${getTitle}
//           </label>
//           <input class="event__input  event__input--destination" id="event-destination-${productId}" type="text" name="event-destination" value=${city} list="destination-list-${productId}">
//           <datalist id="destination-list-${productId}">
//             ${cityList.map((cityItem) => `<option value="${cityItem}"></option>
//               `).join(``)}
//           </datalist>
//         </div>

//         <div class="event__field-group  event__field-group--time">
//           <label class="visually-hidden" for="event-start-time-${productId}">
//             From
//           </label>
//           <input class="event__input  event__input--time" id="event-start-time-${productId}" type="text" name="event-start-time" value='${formatDate(start) + ` ` + formatTime(start)}'>
//           —
//           <label class="visually-hidden" for="event-end-time-${productId}">
//             To
//           </label>
//           <input class="event__input  event__input--time" id="event-end-time-${productId}" type="text" name="event-end-time" value='${formatDate(start) + ` ` + formatTime(start + duration)}'>
//         </div>

//         <div class="event__field-group  event__field-group--price">
//           <label class="event__label" for="event-price-${productId}">
//             <span class="visually-hidden">Price</span>
//             €
//           </label>
//           <input class="event__input  event__input--price" id="event-price-${productId}" type="text" name="event-price" value="${calculatePrice(eventPrice, offer)}">
//         </div>

//         <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
//         <button class="event__reset-btn" type="reset">Delete</button>

//         <input id="event-favorite-${productId}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked="">
//         <label class="event__favorite-btn" for="event-favorite-${productId}">
//           <span class="visually-hidden">Add to favorite</span>
//           <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
//             <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
//           </svg>
//         </label>

//         <button class="event__rollup-btn" type="button">
//           <span class="visually-hidden">Open event</span>
//         </button>
//       </header>

//       <section class="event__details">

//         <section class="event__section  event__section--offers">
//           <h3 class="event__section-title  event__section-title--offers">Offers</h3>

//           <div class="event__available-offers">
//             <div class="event__offer-selector">
//               <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${productId}" type="checkbox" name="event-offer-luggage" checked="">
//               <label class="event__offer-label" for="event-offer-luggage-${productId}">
//                 <span class="event__offer-title">Add luggage</span>
//                 +
//                 €&nbsp;<span class="event__offer-price">30</span>
//               </label>
//             </div>

//             <div class="event__offer-selector">
//               <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${productId}" type="checkbox" name="event-offer-comfort" checked="">
//               <label class="event__offer-label" for="event-offer-comfort-${productId}">
//                 <span class="event__offer-title">Switch to comfort class</span>
//                 +
//                 €&nbsp;<span class="event__offer-price">100</span>
//               </label>
//             </div>

//             <div class="event__offer-selector">
//               <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-${productId}" type="checkbox" name="event-offer-meal">
//               <label class="event__offer-label" for="event-offer-meal-${productId}">
//                 <span class="event__offer-title">Add meal</span>
//                 +
//                 €&nbsp;<span class="event__offer-price">15</span>
//               </label>
//             </div>

//             <div class="event__offer-selector">
//               <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-${productId}" type="checkbox" name="event-offer-seats">
//               <label class="event__offer-label" for="event-offer-seats-${productId}">
//                 <span class="event__offer-title">Choose seats</span>
//                 +
//                 €&nbsp;<span class="event__offer-price">5</span>
//               </label>
//             </div>

//             <div class="event__offer-selector">
//               <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-${productId}" type="checkbox" name="event-offer-train">
//               <label class="event__offer-label" for="event-offer-train-${productId}">
//                 <span class="event__offer-title">Travel by train</span>
//                 +
//                 €&nbsp;<span class="event__offer-price">40</span>
//               </label>
//             </div>
//           </div>
//         </section>

//         <section class="event__section  event__section--destination">
//           <h3 class="event__section-title  event__section-title--destination">Destination</h3>
//           <p class="event__destination-description">${description}</p>

//           <div class="event__photos-container">
//             <div class="event__photos-tape">
//     ${picture(5).map((elem) => {
//     return `<img class="event__photo" src=${elem} alt="Event photo">`;
//   })}
//             </div>
//           </div>
//         </section>
//       </section>
//     </form>
//   </li>`;
// };


