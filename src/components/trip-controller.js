import {Day} from './trip-day';
import {TripDays} from './trip-days';
import {render, position} from './utils';
import {NoPoints} from './event-message';
import {EditEvent} from './form-edit';
import {Event} from './trip-event-card';
import {Sort} from './sort';


export class TripController {
  constructor(container, events) {
    this._container = container; // trip-events
    this._events = events;
    this._dates = this._getUniqueDates();
    this._tripDays = new TripDays(); // "trip-days"
    this._day = new Day(this._dates); // (`.trip-events__list`)
    this._noPoints = new NoPoints();
    this._sort = new Sort();
  }


  _getUniqueDates() {
    let dates = new Set();
    this._events.sort((a, b) => a.schedule.start - b.schedule.start).map((item) => dates.add(new Date(item.schedule.start).toDateString()));
    const dateArray = Array.from(dates);
    return dateArray;
  }

  init() {
    render(this._container, this._sort.getElement(), position.AFTERBEGIN);
    render(this._container, this._tripDays.getElement(), position.BEFOREEND);
    render(this._tripDays.getElement(), this._day.getElement(), position.AFTERBEGIN);

    this._sort.getElement()
    .addEventListener(`click`, (evt) => this._onSortClick(evt));

    this._events.forEach((mock) => this._renderEvent(mock));

    if (this._events.length === 0) {
      render(this._container, this._noPoints.getElement(), position.BEFOREEND);
      const sortContainer = this._container.querySelector(`.trip-events__trip-sort`);
      const daysContainer = this._container.querySelector(`.trip-days`);
      sortContainer.remove();
      daysContainer.remove();
      return;
    }

  }


  _renderDayList() {
    const cardEventsByDate = this._events.reduce((day, event) => {
      if (day[event.schedule.start]) {
        day[event.schedule.start].push(event);
      } else {
        day[event.schedule.start] = [event];
      }
      // return day;
    }, {});
    // Массив перечислений собственных свойств объекта с парами [key, value]
    Object.entries(cardEventsByDate).forEach(([date, events]) => {
      const sortedEvents = events.slice().sort((a, b) => a.schedule.start - b.schedule.start); // сделали массив отсортированным

    });
  }
  // console.log(`day`, cardEventsByDate); // { date: [{event}]}

  _onSortClick(evt) {

    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    document.querySelector(`.trip-events__list`).innerHTML = ``;
    document.querySelector(`#sort-day`).classList.add(`visually-hidden`);



    switch (evt.target.dataset.sortType) {
      case `time`:
        const sortedByTime = this._events.slice().sort((a, b) => b.schedule.duration - a.schedule.duration);
        sortedByTime.forEach((mock) => this._renderEvent(mock));
        break;
      case `price`:
        const sortedByPrice = this._events.slice().sort((a, b) => b.eventPrice - a.eventPrice);
        sortedByPrice.forEach((mock) => this._renderEvent(mock));
        break;
      case `event`:
        document.querySelector(`#sort-day`).classList.remove(`visually-hidden`);
        this._events.forEach((mock) => this._renderEvent(mock));
        break;
    }
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
