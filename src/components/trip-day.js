import {formatDayMonth} from './utils';
import {AbstractComponent} from './abstract';


export class Day extends AbstractComponent {
  constructor(events, dates) {
    super();
    this._dates = dates;
    this._events = events;
  }

  getTemplate() {
    return `${this._dates.map((date, count) => `<li class="trip-days__item  day">
<div class="day__info">
  <span class="day__counter">${count}</span>
  <time class="day__date" datetime="${formatDayMonth(date).slice(0, 10)}">${date.slice(4, 10)}</time>
</div>
<ul class="trip-events__list">${this._events.map(() => `<li class="trip-events__item"></li>`).join(``)}
</ul>
</li>`).join(``)}`;
  }
}



// return `${this._dates.map((date, count) => `<li class="trip-days__item  day">
// <div class="day__info">
//   <span class="day__counter">${count + 1}</span>
//   <time class="day__date" datetime="${formatDayMonth(date).slice(0, 10)}">${date.slice(4, 10)}</time>
// </div>
// <ul class="trip-events__list">${this._events.map(() => `<li class="trip-events__item"></li>`)}
// </ul>
// </li>`).join(``)}`;



// return `${this._dates.map((date, count) => `<li class="trip-days__item  day">
// <div class="day__info">
//   <span class="day__counter">${count + 1}</span>
//    <time class="day__date" datetime="${formatDayMonth(date).slice(0, 10)}">${date.slice(4, 10)}</time>
// </div>
// <ul class="trip-events__list">
//   ${this._events.map(() => `<li class="trip-events__item"></li>`).join(``)}
// </ul>
// </li>`).join(``)}`;
