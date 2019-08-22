import {events} from './data';
import {getInfoTrip} from './components/trip-Info';
import {getMenu} from './components/menu';
import {getFilters} from './components/filters';
import {getSort} from './components/sort';
import {getTravelPlan} from './components/trip-days';


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

const totalPrice = () => {
  return events.reduce((result, item) => {
    return result + item.eventPrice + [...item.offer].reduce((sum, element) => {
      return sum + element.price;
    }, 0);
  }, 0);
};

document.querySelector(`.trip-info__cost-value`).innerText = totalPrice();
document.querySelector(`#event-price-1`).value = totalPrice();


