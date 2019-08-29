import {formatDayMonth, formatDayMonthShort} from './utils';

export const getInfoTrip = (cities, dates) => {
  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${cities.length > 2 ? `${cities[0]} — ... — ${cities[cities.length - 1]}` : `${cities.join(`—`)}`}</h1>
    <p class="trip-info__dates">${dates.length > 2 ? `${formatDayMonth(dates[0])} — ${formatDayMonthShort(dates[dates.length - 1])}` : `${dates.join(`—`)}
    `}</p>
  </div>`;
};
