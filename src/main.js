import {Info} from './components/trip-Info';
import {Menu, getMenu} from './components/menu';
import {getMockData} from './data';
import {render, position} from './components/utils';
import {TripController} from './components/trip-controller';
import {FiltersController} from './components/filter-controller';
// import {Stats} from './components/statistic';
import {StatisticsController} from './components/statistic-controller';


const CARD_COUNT = 7;
const mainInfoContainer = document.querySelector(`.trip-info`);
const controlsContainer = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
// const siteTotalCostElement = document.querySelector(`.trip-info__cost-value`);
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

let events = createEventsArray(getMockData, CARD_COUNT);

export const totalPrice = (cards) => {
  return cards.reduce((result, item) => {
    return result + item.eventPrice + [...item.type.offers].reduce((sum, element) => {
      return sum + element.price;
    }, 0);
  }, 0);
};

// const checkTypeofPrice = (num) => {
//   if (typeof (num) === `number`) {
//     siteTotalCostElement.textContent = num;
//   }
// };


const getInfo = (array) => {
  return array.reduce(
      (result, item) => {
        result.cities.push(item.city.name);
        result.dates.sort();
        result.dates.push(item.start);
        // console.log(`result.dates`, result.dates);
        // console.log(`item`, item.start);
        return result;
      },
      {cities: [], dates: []}
  );
};

const infoArrays = getInfo(events);
// console.log(`infoArrays`, infoArrays)
// infoArrays.sort((a, b) => a.start - b.start);

// const renderFilters = () => {
//   const filters = new Filter();
//   render(controlsContainer, filters.getElement(), position.BEFOREEND);
// };

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

const onDataChange = (newCards) => {
  events = newCards;
  filtersController.updateData(events);
};

const onFilterSwitch = (eventsArr) => {
  tripController.onFilterSwitch(eventsArr);
  tripController.show();
};

const tripController = new TripController(tripEvents, onDataChange);
tripController.show(events);


const statisticsController = new StatisticsController(mainContainer, events);
const filtersController = new FiltersController(controlsContainer, events, onFilterSwitch);

const renderMenu = (mock) => {
  const menu = new Menu(mock);
  statisticsController.hide();

  render(controlsContainer, menu.getElement(), position.AFTERBEGIN);
  // render(mainContainer, stats.getElement(), position.BEFOREEND);
  menu.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
    switch (evt.target.innerText) {
      case `Stats`:
        menu.getElement().querySelector(`a:first-of-type`).classList.remove(`trip-tabs__btn--active`);
        menu.getElement().querySelector(`a:last-of-type`).classList.add(`trip-tabs__btn--active`);
        statisticsController.show(events);
        tripController.hide();
        break;
      case `Table`:
        menu.getElement().querySelector(`a:first-of-type`).classList.add(`trip-tabs__btn--active`);
        menu.getElement().querySelector(`a:last-of-type`).classList.remove(`trip-tabs__btn--active`);
        tripController.show();
        statisticsController.hide();
    }
  });
};

renderMenu(getMenu());
// renderFilters();
renderTripInfo();
// renderStatistic();
// checkTypeofPrice(getPrice(events));
// addEventBtn.addEventListener(`click`, () => {
//   tripController.show(events);
//   addEventBtn.removeAttribute(`disabled`);
// });

