import {getInfoTrip} from './components/trip-Info';
import {getMenu} from './components/menu';
import {getFilters} from './components/filters';
import {getSort} from './components/sort';
import {getMockData} from './data';
import {getTravelPlan} from './components/trip-day';


const CARD_COUNT = 4;
const mainInfoContainer = document.querySelector(`.trip-info`);
const controlsContainer = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
const siteTotalCostElement = document.querySelector(`.trip-info__cost-value`);
const renderComponents = (getComponents, container, place) => {
  container.insertAdjacentHTML(place, getComponents);
};

const events = new Array(CARD_COUNT).fill(``).map(getMockData).sort((a, b) => a.schedule.start - b.schedule.start);

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

renderComponents(getInfoTrip(infoArrays.cities, infoArrays.dates), mainInfoContainer, `afterbegin`);

renderComponents(getMenu(), controlsContainer, `afterbegin`);
renderComponents(getFilters(), controlsContainer, `beforeend`);
renderComponents(getSort(), tripEvents, `beforeend`);
renderComponents(getTravelPlan(events), tripEvents, `beforeend`);
checkTypeofPrice(totalPrice(events));
