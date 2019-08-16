import {getMockData} from '../data';
export const getInfoTrip = ({city} = getMockData()) => {
  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${city} — ... — ${city}</h1>

  <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;21</p>
</div>`;
};
// import {getMockData} from '../data';


// export const getInfo = ({city} = getMockData()) => {
//   return `
//   <h1 class="trip-info__title">${city} — ... — ${city}</h1>
//   <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;21</p>`.trim();
// };


// export const getInfoTrip = () => {
//   return `<div class="trip-info__main">
//   <h1 class="trip-info__title">Amsterdam — ... — Amsterdam</h1>

//   <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;21</p>
// </div>`;
// };
