import {events} from '../data';

export const cities = events.reduce((result, item) => result.concat(item.city), []);

export const getInfoTrip = () => {
  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${cities.length > 3 ? `${cities[0]} — ... — ${cities[cities.length - 1]}` : `${cities.join(`—`)}`}</h1>

  <p class="trip-info__dates">${new Date(Date.now() + Math.floor(Math.random()) * 24 * 60 * 60 * 1000).toLocaleDateString(`en-US`, {day: `numeric`, month: `short`})}</p>
</div>`;
};

