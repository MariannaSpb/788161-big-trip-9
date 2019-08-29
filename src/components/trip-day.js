import {formatDayMonth, createElement} from './utils';


const getDates = (eventsArray) => {
  let dates = new Set();
  eventsArray.sort((a, b) => a.schedule.start - b.schedule.start).map((item) => dates.add(new Date(item.schedule.start).toDateString()));
  const dateArray = Array.from(dates);
  return dateArray;
  // return dates;
};


export class Day {
  constructor(eventsArray) {
    this._eventsArray = eventsArray;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return getDates((this._eventsArray)).map((date, index) => `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${index + 1}</span>
                 <time class="day__date" datetime="${formatDayMonth(date).slice(0, 10)}">${date.slice(4, 10)}</time>
              </div>
              <ul class="trip-events__list">

              </ul>
            </li>`).join(``);
  }
}

