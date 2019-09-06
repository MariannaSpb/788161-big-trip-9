import {formatDayMonth} from './utils';
import {AbstractComponent} from './abstract';


export class Day extends AbstractComponent {
  constructor(events, data, index) {
    super();
    this._data = data;
    this._events = events;
    this._index = index;
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
<div class="day__info">
  <span class="day__counter">${this._index + 1}</span>
  <time class="day__date" datetime="${formatDayMonth(this._data, 10)}">${formatDayMonth(this._data, 10)}</time>
</div>
<ul class="trip-events__list">${this._events.map(() => `<li class="trip-events__item"></li>`).join(``)}
</ul>
</li>`;
  }
}
