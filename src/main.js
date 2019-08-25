import {getInfoTrip} from './components/trip-Info';
import {getMenu} from './components/menu';
import {getFilters} from './components/filters';
import {getSort} from './components/sort';
import {getMockData} from './data';
import {getTravelPlan} from './components/trip-days';
import {getTripEventCard} from './components/trip-event-card';
import {getEventEditeForm} from './components/form-edit';

const CARD_COUNT = 3;
const mainInfoContainer = document.querySelector(`.trip-info`);
const controlsContainer = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const renderComponents = (getComponents, container, place) => {
  container.insertAdjacentHTML(place, getComponents);
};

// массив объектов
export const events = new Array(CARD_COUNT).fill(``).map(getMockData).sort((a, b) => a.schedule.start - b.schedule.start);

export const getPoints = (count) => {
  let points = [];

  for (let i = 0; i < count; i++) {
    points.push(getTripEventCard(events[i]));
  }
  return points;
};

export const getForms = (count) => {
  let forms = [];

  for (let i = 0; i < count; i++) {
    forms.push(getEventEditeForm(events[i]));
  }

  return forms;
};

export const points = getPoints(3); // массив из трёх ивентов с версткой
export const forms = getForms(1);


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
const totalPrice = (cards, element) => {
  let cost = 0;
  for (let card of cards) {
    cost += card.eventPrice;
    card.offer.filter((item) => item.isAdded).forEach((item) => {
      cost += item.price;
    });
  }
  element.textContent = cost;
};
totalPrice(events, siteTotalCostElement);

const cities = events.reduce((result, item) => result.concat(item.city), []);
const dates = events.reduce((result, item) => result.concat(item.schedule.start), []);

renderComponents(getInfoTrip(cities, dates), mainInfoContainer, `afterbegin`);
renderComponents(getMenu(), controlsContainer, `afterbegin`);
renderComponents(getFilters(), controlsContainer, `beforeend`);
renderComponents(getSort(), tripEvents, `beforeend`);
renderComponents(getTravelPlan(events), tripEvents, `beforeend`);


