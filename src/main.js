import {getInfoTrip} from './components/trip-Info';
import {getMenu} from './components/menu';
import {getFilters} from './components/filters';
import {getSort} from './components/sort';
import {getTravelPlan} from './components/trip-days';
// import {getMockData} from './data';
// const CARD_COUNT = 3;


const mainInfoContainer = document.querySelector(`.trip-info`);
const controlsContainer = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const renderComponents = (getComponents, container, place) => {
  container.insertAdjacentHTML(place, getComponents);
};

renderComponents(getInfoTrip(), mainInfoContainer, `afterbegin`);
renderComponents(getMenu(), controlsContainer, `afterbegin`);
renderComponents(getFilters(), controlsContainer, `beforeend`);
renderComponents(getSort(), tripEvents, `beforeend`);
renderComponents(getTravelPlan(), tripEvents, `beforeend`);

// const renderTasks = (container, count) => {
//   container.insertAdjacentHTML(`beforeend`, new Array(count)
//     .fill(``)
//     .map(getMockData)
//     .map(getTripEventCard)
//     .join(``));
// };


// const totalPrice = ARRAY.reduce((item, result) =>item + result.eventPrice, 0);
// console.log(totalPrice);
// document.querySelector(`.trip-info__cost-value`).innerText = totalPrice;
