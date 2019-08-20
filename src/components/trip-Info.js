import {events} from '../data';

export const cities = events.reduce((result, item) => result.concat(item.city), []);
export const dates = events.reduce((result, item) => result.concat(item.schedule.start), []);

export const getInfoTrip = () => {
  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${cities.length > 2 ? `${cities[0]} — ... — ${cities[cities.length - 1]}` : `${cities.join(`—`)}`}</h1>

  <p class="trip-info__dates">${dates.length > 2 ? `${new Date(events[0].schedule.date).toLocaleDateString(`en-US`, {day: `numeric`, month: `short`})} — ...${new Date(dates[dates.length - 1]).toLocaleDateString(`en-US`, {day: `numeric`, month: `short`})}` : `${dates.join(`—`)}`}</p>
</div>`;
};


