import {Info} from './components/trip-Info';
import {Menu, getMenu} from './components/menu';
import {Filter, getFilters} from './components/filters';
import {getMockData} from './data';
import {render, position} from './components/utils';
import {TripController} from './components/trip-controller';
import {Stats} from './components/statistic';


const CARD_COUNT = 3;
const mainInfoContainer = document.querySelector(`.trip-info`);
const controlsContainer = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
const siteTotalCostElement = document.querySelector(`.trip-info__cost-value`);
const mainContainer = document.querySelector(`.page-main .page-body__container`);


export const createEventsArray = (mockData, count) => {
  const eventsArray = [];
  for (let i = 0; i < count; i++) {
    eventsArray.push(mockData());
  }
  eventsArray.map((item, index, array) => array.indexOf(item) === index ? (item.productId = index + 1) : item);
  eventsArray.sort((a, b) => a.start - b.start);

  return eventsArray;
};

const events = createEventsArray(getMockData, CARD_COUNT);

export const totalPrice = (cards) => {
  return cards.reduce((result, item) => {
    return result + item.eventPrice + [...item.type.offers].reduce((sum, element) => {
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
        result.cities.push(item.city.name);
        result.dates.push(item.start);
        return result;
      },
      {cities: [], dates: []}
  );
};

const infoArrays = getInfo(events);

const renderFilters = (mock) => {
  const filters = new Filter(mock);
  render(controlsContainer, filters.getElement(), position.BEFOREEND);
};

const renderTripInfo = () => {
  const tripInfo = new Info(infoArrays.cities, infoArrays.dates);
  render(mainInfoContainer, tripInfo.getElement(), position.AFTERBEGIN);
};

// const getPrice = (eventsArray) => {
//   let cost = 0;
//   for (let event of eventsArray) {
//     cost += event.eventPrice;
//     event.type.offers.filter(({isApplied}) => isApplied).forEach((offer) => {
//       cost += offer.price;
//       console.log(`event.type.offers`, event.type.offers);
//       console.log(`offer.isApplied`, offer.isApplied)
//       console.log(`offer.price`, offer.price)
//     });
//   }
//   return cost;
// };


const tripController = new TripController(tripEvents, events);
tripController.init();

const renderMenu = (mock) => {
  const menu = new Menu(mock);
  const stats = new Stats();
  render(controlsContainer, menu.getElement(), position.AFTERBEGIN);
  render(mainContainer, stats.getElement(), position.BEFOREEND);
  menu.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
    switch (evt.target.innerText) {
      case `Stats`:
        menu.getElement().querySelector(`a:first-of-type`).classList.remove(`trip-tabs__btn--active`);
        menu.getElement().querySelector(`a:last-of-type`).classList.add(`trip-tabs__btn--active`);
        tripController.hide();
        stats.getElement().classList.remove(`visually-hidden`);
        break;
      case `Table`:
        menu.getElement().querySelector(`a:first-of-type`).classList.add(`trip-tabs__btn--active`);
        menu.getElement().querySelector(`a:last-of-type`).classList.remove(`trip-tabs__btn--active`);
        stats.getElement().classList.add(`visually-hidden`);
        tripController.show();
    }
  });
};


renderMenu(getMenu());
renderFilters(getFilters());
renderTripInfo();
// renderStatistic();
//checkTypeofPrice(getPrice(events));
