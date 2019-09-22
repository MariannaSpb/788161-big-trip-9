import {Filter} from './filters.js';
import {render, position} from './utils';
import moment from 'moment';


export class FiltersController {
  constructor(container, events, onFilterSwitch) {
    this._container = container;
    this._filter = new Filter();
    this._events = events;
    // this._events = [];
    this._onFilterSwitch = onFilterSwitch;
    this.create();
  }


  create() {
    // this._events = events;
    this._filter.getElement().querySelectorAll(`.trip-filters__filter-label`).forEach((element) => {
      element.addEventListener(`click`, (evt) => {
        const newEvents = this._onClickFilter(evt);
        this._onFilterSwitch(newEvents);
      });
    });
    render(this._container, this._filter.getElement(), position.AFTERBEGIN);
  }

  updateData(events) {
    this._events = events;
    this._filter.getElement().querySelector(`#filter-everything`).checked = true;
  }

  _onClickFilter(evt) {
    let newEvents = [];
    switch (evt.target.textContent) {
      case `Everything`:
        newEvents = this._events;
        // console.log(`Everything`, newEvents)
        break;
      case `Future`:
        newEvents = this._events.filter(({
          start
        }) => moment(start).isAfter(moment(), `day`));
        // console.log(`future`, newEvents)
        break;
      case `Past`:
        newEvents = this._events.filter(({
          start
        }) => moment(start).isBefore(moment(), `day`));
        // console.log(`Past`, newEvents)
        break;
    }

    return newEvents;
  }
}
