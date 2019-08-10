import {getTripDay} from './trip-day';

export const getTravelPlan = () => {
  return `
    <ul class="trip-days">
      ${getTripDay()}
    </ul>`;
}
