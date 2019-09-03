import {Day} from './trip-day';
import {TripDays} from './trip-days';
import {render, position} from './utils';
import {NoPoints} from './event-message';
import {EditEvent} from './form-edit';
import {Event} from './trip-event-card';


export class TripController {
  constructor(container, events) {
    this._container = container; // trip-events
    this._events = events;
    this._dates = this._getUniqueDates();
    this._tripDays = new TripDays(); // "trip-days"
    this._day = new Day(this._dates); // (`.trip-events__list`)
    this._noPoints = new NoPoints();
  }


  _getUniqueDates() {
    let dates = new Set();
    this._events.sort((a, b) => a.schedule.start - b.schedule.start).map((item) => dates.add(new Date(item.schedule.start).toDateString()));
    const dateArray = Array.from(dates);
    return dateArray;
  }

  init() {
    if (this._events.length === 0) {
      const sortContainer = this._container.querySelector(`.trip-events__trip-sort`);
      render(this._container, this._noPoints.getElement(), position.BEFOREEND);
      sortContainer.remove();
      return;
    }

    render(this._container, this._tripDays.getElement(), position.BEFOREEND);
    render(this._tripDays.getElement(), this._day.getElement(), position.AFTERBEGIN);

    this._events.forEach((mock) => this._renderEvent(mock));

  }

  _renderEvent(mock) {
    const event = new Event(mock);
    const editForm = new EditEvent(mock);
    const eventContainer = document.querySelector(`.trip-events__list`);
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        eventContainer.replaceChild(event.getElement(), editForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    event.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        eventContainer.replaceChild(editForm.getElement(), event.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    editForm.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      eventContainer.replaceChild(event.getElement(), editForm.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    editForm.getElement()
    .querySelector(`form`)
    .addEventListener(`submit`, () => {
      eventContainer.replaceChild(event.getElement(), editForm.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    render(eventContainer, event.getElement(), position.BEFOREEND);
  }

  _renderEventMessage() {
    const message = new NoPoints();
    render(this._tripEvents, message.getElement(), position.BEFOREEND);
  }

}
