export const createOffer = (offersArray) => {
  return offersArray.map((offer) => `<li class="event__offer">
  <span class="event__offer-title">${offer.type}</span>
  +
  €&nbsp;<span class="event__offer-price">${offer.price}</span>
  </li>`);
};
