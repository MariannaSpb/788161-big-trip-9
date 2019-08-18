import {timeCalc, getEventArray} from '../data';
import {createOffer} from './offer';

const CARD_COUNT = 3;
// const events = getEventArray(CARD_COUNT);
export const getTripEventCard = () => {
  return getEventArray(CARD_COUNT).map((item) => {
    return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${item.icon}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${item.getTitle} ${item.city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=""2019-03-18T10:30"">${new Date(item.schedule.start).toLocaleTimeString()}</time>
          —
          <time class="event__end-time" datetime=""2019-03-18T10:30"">${new Date(item.schedule.start + item.schedule.duration).toLocaleTimeString()}</time>
        </p>
        <p class="event__duration">${timeCalc(item.schedule.duration / 1000)}</p>
      </div>

      <p class="event__price">
        €&nbsp;<span class="event__price-value">${item.eventPrice}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createOffer(item.offer).join(``)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
  });
};
