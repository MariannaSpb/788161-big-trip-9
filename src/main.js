import {Info} from './components/trip-Info';
import {Menu, getMenu} from './components/menu';
import {Filter, getFilters} from './components/filters';
import {getMockData} from './data';
import {render, position} from './components/utils';
import {TripController} from './components/trip-controller';


const CARD_COUNT = 3;
const mainInfoContainer = document.querySelector(`.trip-info`);
const controlsContainer = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
const siteTotalCostElement = document.querySelector(`.trip-info__cost-value`);


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

renderMenu(getMenu());
renderFilters(getFilters());
renderTripInfo();
checkTypeofPrice(totalPrice(events));

const tripController = new TripController(tripEvents, events);
tripController.init();
