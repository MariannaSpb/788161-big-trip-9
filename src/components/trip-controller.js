import {Day} from './trip-day';
import {TripDays} from './trip-days';
import {render, position, formatDateCount, unrender, Mode} from './utils';
import {NoPoints} from './event-message';
import {Sort} from './sort';
import {PointController} from './point-controller';
// import moment from 'moment';

export class TripController {
  constructor(container, onDataChange) {
    this._container = container; // trip-events
    // this._events = events;
    this._events = [];
    this._tripDays = new TripDays(); // "trip-days"
    this._noPoints = new NoPoints();
    this._sort = new Sort();
    this._subscriptions = [];
    this._creatingEvent = null;
    this._activateaddEventBtn = this._activateaddEventBtn.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onDataChangeMain = onDataChange;
    this._addEventBtn = document.querySelector(`.trip-main__event-add-btn`);

    this._addEventBtn.addEventListener(`click`, () => {
      this.createEvent();
    });
  }


  hide() {
    this._container.classList.add(`visually-hidden`);
  }

  show(events) {
    if (events && events !== this._events) {
      this._setEvents(events);
      this._container.classList.remove(`visually-hidden`);
    } else {
      this._container.classList.remove(`visually-hidden`);
    }
  }

  _setEvents(events) {
    this._events = events;
    this._subscriptions = [];
    this._activateaddEventBtn();
    this._getPrice(this._events);
    this._renderCards(this._events);
  }


  _renderCards(events) {
    this._container.innerHTML = ``;
    this._clearDayList();
    if (events.length) {
      render(this._container, this._sort.getElement(), position.BEFOREEND);
      // render(this._container, this._tripDays.getElement(), position.BEFOREEND);
      this._renderDayList(events);
    } else {
      this._renderEmptyMessage();
    }
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortClick(evt, events));
  }

  onFilterSwitch(events) {
    this._renderCards(events);
  }


  createEvent() {
    // if (this._creatingEvent) {
    //   return;
    // }
    const defaultEvent = {
      type: {
        id: `flight`,
        title: `Flight`,
        placeholder: `to`,
      },
      city: {},
      start: new Date(),
      end: new Date(),
      eventPrice: ``,
      productId: ``,
      isFavorite: false
    };

    this._creatingEvent = new PointController(this._container, defaultEvent, Mode.ADDING, this._onDataChange, this._onChangeView, this._activateaddEventBtn);

    render(this._container, this._sort.getElement(), position.AFTERBEGIN);
    this._addEventBtn.setAttribute(`disabled`, `disabled`);
    document.querySelector(`.event__rollup-btn`).remove();
  }

  _renderEvent(container, mock) {
    const pointController = new PointController(container, mock, Mode.DEFAULT, this._onDataChange, this._onChangeView, this._activateaddEventBtn);
    this._subscriptions.push(pointController.setDefaultView.bind(pointController));
  }

  _renderDayList(events) {
  // перерендер
    this._clearDayList();
    render(this._container, this._tripDays.getElement(), position.BEFOREEND);
    document.querySelector(`#sort-day`).classList.remove(`visually-hidden`);

    const cardEventsByDate = events.reduce((day, event) => {
    //   if (day[moment(event.start).format(`MM-DD-YYYY`)]) {
    //     day[moment(event.start).format(`MM-DD-YYYY`)].push(event);
    //   } else {
    //     day[moment(event.start).format(`MM-DD-YYYY`)] = [event];
    //   }

      //   return day;
      // }, {});
      const time = formatDateCount(event.start);
      if (!day[time]) {
        day[time] = [];
      }
      day[time].push(event);


      return day;
    }, {});
    Object.entries(cardEventsByDate)
    .sort(([a], [b]) => a - b)
    .forEach(([date, eventsItem], index) => {
      this._rendeEventList(eventsItem, date, index);
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


  _onSortClick(evt, events) {

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

        sortedByTime.forEach((mock) => this._renderEvent(eventContainer, mock));
        break;
      case `price`:
        const sortedByPrice = this._events.slice().sort((a, b) => a.eventPrice - b.eventPrice);
        sortedByPrice.forEach((mock) => this._renderEvent(eventContainer, mock));
        break;
      case `event`:
        document.querySelector(`.trip-days`).innerHTML = ``;
        this._renderDayList(events);
        break;
    }
  }


  _onDataChange(newData, oldData) {
    const index = this._events.findIndex((event) => event === oldData);
    if (newData === null && oldData === null) {
      this._creatingEvent = null;
    }

    if (newData === null) {
      this._events = [...this._events.slice(0, index), ...this._events.slice(index + 1)];
    } else if (oldData === null) {
      this._events = [newData, ...this._events];
    } else {
      this._events[index] = newData;
    }
    if (this._events.length) {
      render(this._container, this._sort.getElement(), position.BEFOREEND);
      this._noPoints.getElement().remove();
      // this._renderDayList(events);
    } else {
      this._renderEmptyMessage();
    }

    this._setEvents(this._events);
    this._onDataChangeMain(this._events);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _activateaddEventBtn() {
    this._addEventBtn.removeAttribute(`disabled`);
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
    const costContainer = document.querySelector(`.trip-info__cost-value`);
    const totalPrice = eventsArray.map(({eventPrice}) => eventPrice).reduce((sum, current) => {
      return sum + current;
    }, 0);
    const allOffers = eventsArray.map(({type}) => type.offers); // собрали все
    const checkedOffers = allOffers.map((item) => item.filter(({isApplied}) => isApplied)); // собрали трушные
    const offersPrices = checkedOffers.map((items) => items.map((item) => item.price));
    const offersPricesTotalCount = offersPrices.map((prices) => prices.reduce((sum, current) => {
      return sum + current;
    }, 0));
    const sum = offersPricesTotalCount.reduce((sumCount, current) => {
      return sumCount + current;
    }, 0);
    const result = totalPrice + sum;
    costContainer.innerHTML = result;
  }

  _renderEmptyMessage() {
    render(this._container, this._noPoints.getElement(), position.BEFOREEND);
    return;
  }

}
