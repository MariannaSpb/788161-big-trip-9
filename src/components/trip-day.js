import {forms, points} from '../main';
// import {getRandomElem} from './utils';
import {formatDayMonth} from './utils';


// const renderForm = (forms, count) => {
//   const randomElem = Math.floor(Math.random() * forms.length);
//   return forms.slice(randomElem, randomElem + count);
// };

export const getTripDay = (count, obj) => {
  const days = [];
  for (let i = 0; i < count; i++) {
    days.push(`
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${i + 1}</span>
          <time class="day__date" datetime="2019-03-18">${formatDayMonth(obj[i].schedule.start)}</time>
        </div>
        <ul class="trip-events__list">
        ${i === 0 ? forms.join(``) : ``}
        ${points.join(``)}
        </ul>`);
  }
  return days;
};

//  ${points.join(``)}
