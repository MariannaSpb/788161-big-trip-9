import {getEventEditeForm} from './form-edit';
import {getTripEventCard} from './trip-event-card';
import {events} from '../data';

const renderForm = (forms, count) => {
  const randomElem = Math.floor(Math.random() * forms.length);
  return forms.slice(randomElem, randomElem + count);
};

export const getTripDay = () => {
  return events.map((item, index) => {
    return `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="2019-03-18">${new Date(item.schedule.start).toLocaleDateString(`en-US`, {day: `2-digit`, month: `short`})}</time>
      </div>
      <ul class="trip-events__list">
      ${index === 0 ? renderForm(getEventEditeForm(), 1) : ``}
      ${getTripEventCard().join(``)}
      </ul>`;
  });
};

