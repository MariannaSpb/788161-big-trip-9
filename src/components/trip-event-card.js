import {getMockData} from '../data';


export const getTripEventCard = ({icon, timeEnd, timeStart, differenceTime, eventPrice, title, offer: {price, type}} = getMockData()) => {
  return `<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src=${icon} alt="Event type icon">
    </div>
    <h3 class="event__title">${title}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${timeStart}</time>
        —
        <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd}</time>
      </p>
      <p class="event__duration">${differenceTime}H</p>
    </div>

    <p class="event__price">
      €&nbsp;<span class="event__price-value">${eventPrice}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      <li class="event__offer">
        <span class="event__offer-title">${type}</span>
        +
        €&nbsp;<span class="event__offer-price">${price}</span>
       </li>
    </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};
// 1H 30M
