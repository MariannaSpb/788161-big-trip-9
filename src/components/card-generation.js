import {getTripEventCard} from './trip-event-card';

export const generationCard = (count) => {
  const cardArray = [];
  for (let i = 0; i < count; i++) {
    cardArray.push(getTripEventCard());
  }
  return cardArray.join(` `);
};
