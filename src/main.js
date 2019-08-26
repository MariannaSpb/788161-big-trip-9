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

export const events = new Array(CARD_COUNT).fill(``).map(getMockData).sort((a, b) => a.schedule.start - b.schedule.start);


export const totalPrice = (cards) => {
  return cards.reduce((result, item) => {
    // console.log(`item`, item) // один объект данных
    return result + item.eventPrice + [...item.offer].reduce((sum, element) => {
      // console.log(`element`, element) // один объект priceType
      return sum + element.price;
    }, 0);
  }, 0);
};


const checkTypeofPrice = (num) => {
  if (typeof (num) === `number`) {
    siteTotalCostElement.textContent = num;
  }
};


// const cities = events.reduce((result, item) => result.concat(item.city), []);
// const dates = events.reduce((result, item) => result.concat(item.schedule.start), []);

const getInfo = () => {
  return events.reduce(
      (result, item) => {
        result.cities.push(item.city);
        result.dates.push(item.schedule.start);
        return result;
      },
      {cities: [], dates: []}
  );
};
console.log(`data`, getInfo());
const objOfArrays = getInfo();


// renderComponents(getInfoTrip(cities, dates), mainInfoContainer, `afterbegin`);
renderComponents(getInfoTrip(objOfArrays.cities, objOfArrays.dates), mainInfoContainer, `afterbegin`);

renderComponents(getMenu(), controlsContainer, `afterbegin`);
renderComponents(getFilters(), controlsContainer, `beforeend`);
renderComponents(getSort(), tripEvents, `beforeend`);
renderComponents(getTravelPlan(events), tripEvents, `beforeend`);
checkTypeofPrice(totalPrice(events));
