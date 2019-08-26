import {getInfoTrip} from './components/trip-Info';
import {getMenu} from './components/menu';
import {getFilters} from './components/filters';
import {getSort} from './components/sort';
import {getMockData, cityList} from './data';
import {getTravelPlan} from './components/trip-day';
import {getTripEventCard} from './components/trip-event-card';
import {getEventEditeForm} from './components/form-edit';

const CARD_COUNT = 4;
const mainInfoContainer = document.querySelector(`.trip-info`);
const controlsContainer = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const renderComponents = (getComponents, container, place) => {
  container.insertAdjacentHTML(place, getComponents);
};

// массив объектов
export const events = new Array(CARD_COUNT).fill(``).map(getMockData).sort((a, b) => a.schedule.start - b.schedule.start);




console.log(`dates2`, new Date(events[0].schedule.start).toDateString());

// export const totalPrice = () => {
//   return events.reduce((result, item) => {
//     // console.log(`item`, item) // один объект данных
//     return result + item.eventPrice + [...item.offer].reduce((sum, element) => {
//       // console.log(`element`, element) // один объект priceType
//       return sum + element.price;
//     }, 0);
//   }, 0);
// };

const siteTotalCostElement = document.querySelector(`.trip-info__cost-value`);
const totalPrice = (cards) => {
  let cost = 0;
  for (let card of cards) {
    cost += card.eventPrice;
    card.offer.filter((item) => item.isAdded).forEach((item) => {
      cost += item.price;
    });
  }
  return cost;
};
const checkTypeofPrice = (num) => {
  if (typeof (num) === `number`) {
    siteTotalCostElement.textContent = num;
  }
};


const cities = events.reduce((result, item) => result.concat(item.city), []);
const dates = events.reduce((result, item) => result.concat(item.schedule.start), []);

renderComponents(getInfoTrip(cities, dates), mainInfoContainer, `afterbegin`);
renderComponents(getMenu(), controlsContainer, `afterbegin`);
renderComponents(getFilters(), controlsContainer, `beforeend`);
renderComponents(getSort(), tripEvents, `beforeend`);
renderComponents(getTravelPlan(events), tripEvents, `beforeend`);
checkTypeofPrice(totalPrice(events));
