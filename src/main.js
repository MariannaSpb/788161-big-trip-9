import {getInfoTrip} from './components/trip-Info';
import {getMenu} from './components/menu';
import {getFilters} from './components/filters';
import {getSort} from './components/sort';
import {getTravelPlan} from './components/trip-days';


const mainInfoContainer = document.querySelector(`.trip-info`); // сюда вставим <div class="trip-info__main"> с маршрутом
const controlsContainer = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

// общая фун-я рендеринга
const renderComponents = (getComponents, container, place) => {
  container.insertAdjacentHTML(place, getComponents);
};


renderComponents(getInfoTrip(), mainInfoContainer, `afterbegin`);
renderComponents(getMenu(), controlsContainer, `afterbegin`);
renderComponents(getFilters(), controlsContainer, `beforeend`);
renderComponents(getSort(), tripEvents, `beforeend`);
renderComponents(getTravelPlan(), tripEvents, `beforeend`);
// renderComponents(getSearchArea(), mainContainer);
// renderComponents(getFilterElement(), mainContainer);
// renderComponents(getBoardSortingList(), mainContainer);
