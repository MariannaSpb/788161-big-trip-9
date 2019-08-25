// import {events} from '../main';
import {formatDayMonth, formatDayMonthShort} from './utils';

// export const cities = events.reduce((result, item) => result.concat(item.city), []);
// export const dates = events.reduce((result, item) => result.concat(item.schedule.start), []);
// const dateSort = dates.sort((a, b) => a - b);

export const getInfoTrip = (cities, dates) => {
  const dateSort = dates.sort((a, b) => a - b);
  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${cities.length > 2 ? `${cities[0]} — ... — ${cities[cities.length - 1]}` : `${cities.join(`—`)}`}</h1>
    <p class="trip-info__dates">${dates.length > 2 ? `${formatDayMonth(dateSort[0])} — ${formatDayMonthShort(dates[dates.length - 1])}` : `${dates.join(`—`)}
    `}</p>
  </div>`;
};
