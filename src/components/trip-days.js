import {getTripDay} from './trip-day';
import {events} from '../data';


export const getTravelPlan = () => {
  return `
    <ul class="trip-days">
      ${getTripDay(3, events).join(``)}
    </ul>`;
};
