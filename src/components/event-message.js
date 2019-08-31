// import {createElement} from './utils';
import {AbstractComponent} from './abstract';

export class NoPoints extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }
}
