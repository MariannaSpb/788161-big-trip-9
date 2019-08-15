import {getMockData} from '../data';
import {createOffer} from './offer';
// import {getRandomElem} from './components/utils';

export const getTripEventCard = ({icon, getTitle, timeEnd, timeStart, duration, eventPrice, city, offer} = getMockData()) => {
  return `<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${icon}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${getTitle} ${city}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${timeStart}</time>
        —
        <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd}</time>
      </p>
      <p class="event__duration">${duration}H</p>
    </div>

    <p class="event__price">
      €&nbsp;<span class="event__price-value">${eventPrice}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createOffer(offer).join(``)}
    </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

