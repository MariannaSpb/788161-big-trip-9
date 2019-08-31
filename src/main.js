import {Info} from './components/trip-Info';
import {Event} from './components/trip-event-card';
import {EditEvent} from './components/form-edit';
import {Menu, getMenu} from './components/menu';
import {Filter, getFilters} from './components/filters';
import {Sort} from './components/sort';
import {getMockData} from './data';
import {render, position} from './components/utils';
import {Day} from './components/trip-day';
import {TripDays} from './components/trip-days';
import {EventMessage} from './components/event-message';


const CARD_COUNT = 4;
const mainInfoContainer = document.querySelector(`.trip-info`);
const controlsContainer = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
const siteTotalCostElement = document.querySelector(`.trip-info__cost-value`);


const events = new Array(CARD_COUNT).fill(``).map(getMockData).sort((a, b) => a.schedule.start - b.schedule.start);

events.map((item, index, array) => array.indexOf(item) === index ? (item.productId = index + 1) : item);


export const totalPrice = (cards) => {
  return cards.reduce((result, item) => {
    return result + item.eventPrice + [...item.offer].reduce((sum, element) => {
      return sum + element.price;
    }, 0);
  }, 0);
};

const checkTypeofPrice = (num) => {
  if (typeof (num) === `number`) {
    siteTotalCostElement.textContent = num;
  }
};


const getInfo = (array) => {
  return array.reduce(
      (result, item) => {
        result.cities.push(item.city);
        result.dates.push(item.schedule.start);
        return result;
      },
      {cities: [], dates: []}
  );
};

const infoArrays = getInfo(events);


const renderEvent = (mock) => {
  const event = new Event(mock);
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

  const editForm = new EditEvent(mock);
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
};


const renderMenu = (mock) => {
  const menu = new Menu(mock);
  render(controlsContainer, menu.getElement(), position.AFTERBEGIN);
};
const renderFilters = (mock) => {
  const filters = new Filter(mock);
  render(controlsContainer, filters.getElement(), position.BEFOREEND);
};

const renderTripInfo = () => {
  const tripInfo = new Info(infoArrays.cities, infoArrays.dates);
  render(mainInfoContainer, tripInfo.getElement(), position.AFTERBEGIN);
};

const renderSort = () => {
  const sort = new Sort();
  render(tripEvents, sort.getElement(), position.AFTERBEGIN);
};

const renderDaysList = () => {
  const tripDays = new TripDays();
  render(tripEvents, tripDays.getElement(), position.BEFOREEND);
};

const renderEventMessage = () => {
  const message = new EventMessage();
  render(tripEvents, message.getElement(), position.BEFOREEND);
};

renderSort();
renderMenu(getMenu());
renderFilters(getFilters());
renderTripInfo();
renderDaysList();
checkTypeofPrice(totalPrice(events));
renderEventMessage();

const daysContainer = document.querySelector(`.trip-days`);
const renderDay = (mock) => {
  const days = new Day(mock);
  render(daysContainer, days.getElement(), position.BEFOREEND);
};

renderDay(events);

if (!tripEvents.contains(daysContainer)) {
  renderEventMessage();
}

const eventContainer = document.querySelector(`.trip-events__list`);
events.forEach((mock) => renderEvent(mock));

