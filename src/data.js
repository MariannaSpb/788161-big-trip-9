import {getRandomElem} from './components/utils';
import {getRandomBoolean} from './components/utils';


const OFFER_COUNT = 2;
const DESCRIPTION_COUNT = 3;

const sentence = `orem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;


const randomOffer = (offers, count) => {
  const randomElem = Math.floor(Math.random() * offers.length);
  return offers.slice(randomElem, randomElem + count);
};


export const randomCity = (cityArr, count) => {
  const randomElem = Math.floor(Math.random() * cityArr.length);
  return cityArr.slice(randomElem, randomElem + count);
};


const priceType = [
  {type: `Add luggage`, price: 10, isAdded: true},
  {type: `Switch to comfort class`, price: 150, isAdded: true},
  {type: `Add meal`, price: 2, isAdded: true},
  {type: `Choose seats`, price: 9, isAdded: true}
];

const splitText = (str, count) => {
  const text = str.split(`.`);
  const randomElem = Math.floor(Math.random() * text.length);
  return text.slice(randomElem, randomElem + count);
};


const priceList = [
  20,
  160,
  50,
  10,
];

const eventType = [`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`
];


export const cityList = [
  `Saint-Petersburg`,
  `Moscow`,
  `Vitebsk`,
  `Barcelona`,
  `Helsinki`,
];

export const timeCalc = (seconds) => {
  let diff; // остаток от деления

  let days = seconds / 86400; // количество дней

  diff = seconds %= 86400;

  let hours = diff / 3600; // количество часов

  diff = seconds %= 3600;

  let mins = diff / 60;

  days = +Math.trunc(days).toString().padStart(2, `0`);
  hours = +Math.trunc(hours).toString().padStart(2, `0`);
  mins = +Math.trunc(mins).toString().padStart(2, `0`);

  if (days) {
    return `${days}D ${hours}H ${mins}M`;
  }

  if (!days && hours) {
    return `${hours}H ${mins}M`;
  }

  return `${mins}M`;
};


export const getMockData = () => ({
  description: splitText(sentence, DESCRIPTION_COUNT),
  city: getRandomElem(cityList),
  schedule: {
    start: Date.now() + (Math.random() * 7) * 24 * 60 * 60 * 1000,
    duration: (Math.random() * 2) * 24 * 60 * 60 * 1000,

  },
  eventPrice: getRandomElem(priceList),
  offer: randomOffer(priceType, OFFER_COUNT),
  icon: getRandomElem(eventType),
  isFavorite: getRandomBoolean(),
  get getTitle() {
    switch (this.icon) {
      case `taxi`:
        return `taxi`;
      case `bus`:
        return `Bus to`;
      case `train`:
        return `Train to`;
      case `ship`:
        return `Ship to`;
      case `transport`:
        return `Transport to`;
      case `drive`:
        return `Drive to`;
      case `flight`:
        return `Flight to`;
      case `check-in`:
        return `Check into hotel`;
      case `sightseeing`:
        return `Sightseeing in`;
      case `restaurant`:
        return `Restaurant in`;
      default:
        return ``;
    }
  },
  picture(count) {
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(`http://picsum.photos/300/150?r=${Math.random()}`);
    }
    return arr;
  },
});

