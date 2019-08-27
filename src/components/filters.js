const filters = [
  {name: `Everything`, isChecked: true},
  {name: `Future`, isChecked: false},
  {name: `Past`, isChecked: false},
];


export const getFilter = (filtersArray) => {
  return filtersArray.map((filterItem) => `
    <div class="trip-filters__filter">
        <input id="filter-${filterItem.name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterItem.name.toLowerCase()}" ${filterItem.isChecked ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${filterItem.name.toLowerCase()}">${filterItem.name}</label>
    </div>`.trim());
};

export const getFilters = () => {
  return `
  <form class="trip-filters" action="#" method="get">
    ${getFilter(filters).join(``)}
  </form>`.trim();
};

