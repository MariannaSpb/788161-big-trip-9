import {getEventEditeForm} from './form-edit';
import {getTripEventCard} from './trip-event-card';
import {events} from '../data';


export const getTripDay = () => {
  // return events.map((item, index) => {
  return `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${1}</span>
        <time class="day__date" datetime="2019-03-18">${new Date(events[0].schedule.start).toLocaleDateString(`en-US`, {day: `numeric`, month: `short`})}</time>
      </div>
      <ul class="trip-events__list >>>">
        ${getEventEditeForm()}
        ${getTripEventCard()}
      </ul>`;
  // });
};
