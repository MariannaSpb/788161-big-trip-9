import {getInfoTrip} from './components/trip-Info';
import {getMenu} from './components/menu';
import {getFilters} from './components/filters';
import {getSort} from './components/sort';
import {getTravelPlan} from './components/trip-days';
import {getMockData} from  './data';


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

