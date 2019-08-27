import {formatDayMonth} from './utils';
import {getTripEventCard} from "./trip-event-card";
import {getEventEditeForm} from "./form-edit";

const getDates = (eventsArray) => {
  let dates = new Set();
  eventsArray.sort((a, b) => a.schedule.start - b.schedule.start).map((item) => dates.add(new Date(item.schedule.start).toDateString()));
  return dates;
};

export const getTravelPlan = (eventsArray) => `<ul class="trip-days">
      ${Array.from(getDates(eventsArray)).map((date, index) =>`<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${index + 1}</span>
                 <time class="day__date" datetime="${formatDayMonth(date).slice(0, 10)}">${date.slice(4, 10)}</time>
              </div>
              <ul class="trip-events__list">
                 ${new Date(eventsArray[0].schedule.start).toDateString() === date ? getEventEditeForm(eventsArray[0]) : `` }
                 ${eventsArray.slice(1).filter((item) => new Date(item.schedule.start).toDateString() === date).map(getTripEventCard).join(``)}
              </ul>
            </li>
                `).join(``)}
        </ul>`.trim();

