import {filters} from '../data';

const newFilters = Array.from(filters); // ["Everything", "Future", "Past"]

// создаем один фильтр
export const getFilter = (filtersArray) => {
  return filtersArray.map((filterItem) => `
    <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked="">
        <label class="trip-filters__filter-label" for="filter-everything">${filterItem}</label>
    </div>`.trim());
};

// создаем контейнер с др фильтрами
export const getFilters = () => {
  return `
  <form class="trip-filters" action="#" method="get">
    ${getFilter(newFilters).join(``)}
  </form>`.trim();
};

