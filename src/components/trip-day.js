import {formatDayMonth} from './utils';
import {AbstractComponent} from './abstract';


export class Day extends AbstractComponent {
  constructor(dates) {
    super();
    this._dates = dates;
  }

  getTemplate() {
    return `${this._dates.map((date, count) => `<li class="trip-days__item  day">
<div class="day__info">
  <span class="day__counter">${count + 1}</span>
   <time class="day__date" datetime="${formatDayMonth(date).slice(0, 10)}">${date.slice(4, 10)}</time>
</div>
<ul class="trip-events__list">

</ul>
</li>`).join(``)}`;
  }
}
