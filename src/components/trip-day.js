import {getEventEditeForm} from './form-edit';
import {generationCard} from './card-generation';

const CARD_COUNT = 3;

export const getTripDay = () => {
  return `
  <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">1</span>
      <time class="day__date" datetime="2019-03-18">MAR 18</time>
    </div>
    <ul class="trip-events__list">
      ${getEventEditeForm()}
      ${generationCard(CARD_COUNT)}
    </ul>`;
};
