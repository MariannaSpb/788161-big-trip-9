import {getTripDay} from './trip-day';



export const getTravelPlan = (obj) => {
  return `
    <ul class="trip-days">
      ${getTripDay(3, obj).join(``)}
    </ul>`;
};
