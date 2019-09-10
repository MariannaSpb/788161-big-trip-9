import {Day} from './trip-day';
import {TripDays} from './trip-days';
import {render, position, formatDateCount, unrender} from './utils';
import {NoPoints} from './event-message';
import {Sort} from './sort';
import {PointController} from './point-controller';


export class TripController {
  constructor(container, events) {
    this._container = container; // trip-events
    this._events = events;
    this._tripDays = new TripDays(); // "trip-days"
    this._noPoints = new NoPoints();
    this._sort = new Sort();
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
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

    this._getPrice(this._events);

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

  _renderEvent(container, mock) {
    const pointController = new PointController(container, mock, this._onDataChange, this._onChangeView);
    this._subscriptions.push(pointController.setDefaultView.bind(pointController));
  }

  _renderDayList() {
  // перерендер
    this._clearDayList();
    render(this._container, this._tripDays.getElement(), position.BEFOREEND);

    document.querySelector(`#sort-day`).classList.remove(`visually-hidden`);
    const cardEventsByDate = this._events.reduce((day, event) => {
      const time = formatDateCount(event.start);
      if (!day[time]) {
        day[time] = [];
      }
      day[time].push(event);


      return day;
    }, {});
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
        const sortedByTime = this._events.slice().sort((a, b) => (b.end - b.start) - (a.end - a.start));
        // console.log(`b.end`, (parseInt((this.duration - this.duration), 10)));
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

  _onDataChange(newData, oldData) {
    this._events[this._events.findIndex((it) => it === oldData)] = newData;
    this._renderDayList();
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _renderEventMessage() {
    const message = new NoPoints();
    render(this._tripEvents, message.getElement(), position.BEFOREEND);
  }

  _clearDayList() {
    unrender(this._tripDays.getElement());
    this._tripDays.removeElement();
  }


  _getPrice(eventsArray) {
    const totalPrice = eventsArray.map(({eventPrice}) => eventPrice).reduce((sum, current) => {
      return sum + current;
    }, 0);
    const allOffersPrice = eventsArray.map(({type}) => type.offers); // собрали все
    const appliedOffers = allOffersPrice.map((item) => item.filter(({isApplied}) => isApplied)); // собрали трушные
    const offersPrices = appliedOffers.map((items) => items.map((item) => item.price));
    const offersPricesTotalCount = offersPrices.map((prices) => prices.reduce((sum, current) => {
      return sum + current;
    }, 0));
    const sum = offersPricesTotalCount.reduce((sumCount, current) => {
      return sumCount + current;
    }, 0);
    const result = totalPrice + sum;
    const costContainer = document.querySelector(`.trip-info__cost-value`);
    costContainer.innerHTML = result;
  }

}
