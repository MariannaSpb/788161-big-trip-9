import {forms, points} from '../data';

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
          <time class="day__date" datetime="2019-03-18">${new Date(obj[i].schedule.start).toLocaleDateString(`en-US`, {day: `2-digit`, month: `short`})}</time>
        </div>
        <ul class="trip-events__list">
        ${i === 0 ? forms.join(``) : ``}
        ${points.join(``)}
        </ul>`);
  }
  return days;
};

