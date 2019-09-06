import {Day} from './trip-day';
import {TripDays} from './trip-days';
import {render, position, formatDateCount} from './utils';
import {NoPoints} from './event-message';
import {EditEvent} from './form-edit';
import {Event} from './trip-event-card';
import {Sort} from './sort';


export class TripController {
  constructor(container, events) {
    this._container = container; // trip-events
    this._events = events;
    this._tripDays = new TripDays(); // "trip-days"
    this._noPoints = new NoPoints();
    this._sort = new Sort();
  }


  _getUniqueDates() {
    let dates = new Set();
    this._events.sort((a, b) => a.schedule.start - b.schedule.start).map((item) => dates.add(new Date(item.schedule.start).toDateString()));
    const dateArray = Array.from(dates);
    // console.log(`dateArray`, dateArray) ["Fri Sep 06 2019", "Sun Sep 08 2019", "Mon Sep 09 2019", "Wed Sep 11 2019", "Thu Sep 12 2019"]
    return dateArray;
  }

  init() {
    render(this._container, this._sort.getElement(), position.AFTERBEGIN);
    render(this._container, this._tripDays.getElement(), position.BEFOREEND);

    this._sort.getElement()
    .addEventListener(`click`, (evt) => this._onSortClick(evt));
    this._renderDayList();

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
    document.querySelector(`#sort-day`).classList.remove(`visually-hidden`);
    const cardEventsByDate = this._events.reduce((day, event) => {
      const time = formatDateCount(event.schedule.start);
      if (!day[time]) {
        day[time] = [];
      }
      day[time].push(event);


      return day;
    }, {});
    // Массив перечислений собственных свойств объекта с парами [key, value]
    Object.entries(cardEventsByDate)
    .sort(([a], [b]) => a - b)
    .forEach(([date, events], index) => {
      this._rendeEventList(events, date, index);
    });
  }


  _rendeEventList(events, data, index) {
    const day = new Day(events, data, index);
    events.forEach((event, i) => {
      const eventsContainer = day.getElement().querySelectorAll(`.trip-events__item`)[i];
      this._renderEvent(eventsContainer, event);
    });
    render(this._tripDays.getElement(), day.getElement(), position.BEFOREEND);
  }

  _onSortClick(evt) {

    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    document.querySelectorAll(`.trip-events__list`).forEach((item) =>{
      item.innerHTML = ``;
    });
    document.querySelector(`#sort-day`).classList.add(`visually-hidden`);

    document.querySelectorAll(`.day__counter`).forEach((item) => {
      item.classList.add(`visually-hidden`);
    });
    document.querySelectorAll(`.day__date`).forEach((item) => {
      item.classList.add(`visually-hidden`);
    });
    const eventContainer = document.querySelector(`.trip-events__list`);

    switch (evt.target.dataset.sortType) {
      case `time`:
        const sortedByTime = this._events.slice().sort((a, b) => b.schedule.duration - a.schedule.duration);
        sortedByTime.forEach((mock) => this._renderEvent(eventContainer, mock));
        break;
      case `price`:
        const sortedByPrice = this._events.slice().sort((a, b) => b.eventPrice - a.eventPrice);
        sortedByPrice.forEach((mock) => this._renderEvent(eventContainer, mock));
        break;
      case `event`:
        document.querySelector(`.trip-days`).innerHTML = ``;
        this._renderDayList();
        break;
    }
  }


  _renderEvent(container, mock) {
    const event = new Event(mock);
    const editForm = new EditEvent(mock);
    // const eventContainer = document.querySelector(`.trip-events__list`);
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        container.replaceChild(event.getElement(), editForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    event.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        container.replaceChild(editForm.getElement(), event.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    editForm.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      container.replaceChild(event.getElement(), editForm.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    editForm.getElement()
    .querySelector(`form`)
    .addEventListener(`submit`, () => {
      container.replaceChild(event.getElement(), editForm.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    render(container, event.getElement(), position.BEFOREEND);
  }

  _renderEventMessage() {
    const message = new NoPoints();
    render(this._tripEvents, message.getElement(), position.BEFOREEND);
  }

}
