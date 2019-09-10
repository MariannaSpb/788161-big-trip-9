import {getRandomElem} from './components/utils';
import {getRandomBoolean} from './components/utils';

export const OFFER_COUNT = 2;

const PICTURE_COUNT = 3;


export const randomOffer = (offers, count) => {
  const randomElem = Math.floor(Math.random() * offers.length);
  return offers.slice(randomElem, randomElem + count);
};


export const randomCity = (cityArr, count) => {
  const randomElem = Math.floor(Math.random() * cityArr.length);
  return cityArr.slice(randomElem, randomElem + count);
};


export const priceType = [
  {type: `Add luggage`, price: 10, isAdded: true},
  {type: `Switch to comfort class`, price: 150, isAdded: true},
  {type: `Add meal`, price: 2, isAdded: true},
  {type: `Choose seats`, price: 9, isAdded: true}
];


export const priceList = [
  20,
  160,
  50,
  10,
];

export const eventType = [`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`
];


export const cities = [{
  name: `Moscow`,
  description: `Moscow is the major political, economic, cultural, and scientific center of Russia and Eastern Europe, as well as the largest city (both by population and by area) entirely on the European continent.`,
  pictures: new Array(PICTURE_COUNT).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
},
{
  name: `Helsinki`,
  description: `Helsinki is the capital and most populous city of Finland. Located on the shore of the Gulf of Finland.`,
  pictures: new Array(PICTURE_COUNT).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
},
{
  name: `Barcelona`,
  description: `Barcelona is the second largest city in Spain and the capital of Autonomous Community of Catalonia.`,
  pictures: new Array(PICTURE_COUNT).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
},
{
  name: `Vitebsk`,
  description: `Vitebsk is one of the most ancient Slavonic cities, a major industrial hub, a city of developed industry, science and culture.`,
  pictures: new Array(PICTURE_COUNT).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
},
{
  name: `Saint-Petersburg`,
  description: `Saint-Petersburg my lovely city.Situated on the Neva River, at the head of the Gulf of Finland on the Baltic Sea.`,
  pictures: new Array(PICTURE_COUNT).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
}];

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


export const getDuration = (duration) => {
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? `0` + hours : hours;
  minutes = (minutes < 10) ? `0` + minutes : minutes;

  return `${parseInt(hours, 10) ? `${hours}H` : ``} ${parseInt(minutes, 10) ? `${minutes}M` : ``}`.trim();
};

export const types = [{
  id: `taxi`,
  title: `Taxi`,
  placeholder: `to`,
  offers: [{
    id: `taxi-1`,
    title: `Choose taxi`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }]
},
{
  id: `bus`,
  title: `Bus`,
  placeholder: `to`,
  offers: [{
    id: `bus-seat`,
    title: `Choose seats`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `bus-meal`,
    title: `Add meal`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }]
},
{
  id: `train`,
  title: `Train`,
  placeholder: `to`,
  offers: [{
    id: `train-luggage`,
    title: `Add luggage`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `train-class`,
    title: `Switch to comfort class`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `train-meal`,
    title: `Add meal`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `train-seat`,
    title: `Choose seats`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }]
},
{
  id: `flight`,
  title: `Flight`,
  placeholder: `to`,
  offers: [{
    id: `flight-seat`,
    title: `Choose seats`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `flight-meal`,
    title: `Choose meal`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `flight-luggage`,
    title: `Add luggage`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }]
},
{
  id: `ship`,
  title: `Ship`,
  placeholder: `to`,
  offers: []
},
{
  id: `check-in`,
  title: `Check-in`,
  placeholder: `in`,
  offers: [{
    id: `check-in-room`,
    title: `Change room`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `check-in-late`,
    title: `Late check-in`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }]
},
{
  id: `transport`,
  title: `Transport`,
  placeholder: `to`,
  offers: []
},
{
  id: `drive`,
  title: `Drive`,
  placeholder: `to`,
  offers: []
},
{
  id: `sightseeing`,
  title: `Sightseeing`,
  placeholder: `in`,
  offers: []
},
{
  id: `restaurant`,
  title: `Restaurant`,
  placeholder: `in`,
  offers: [{
    id: `restaurant-table`,
    title: `Reserve table`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }, {
    id: `restaurant-order`,
    title: `Pre order`,
    price: 10 + Math.floor(Math.random() * 10),
    isApplied: Boolean(Math.round(Math.random()))
  }]
}
];

export const getMockData = () => ({
  type: types[Math.floor(Math.random() * 10)],
  city: cities[Math.floor(Math.random() * 5)],
  start: Date.now() - (Math.random() * 2) * 24 * 60 * 60 * 1000,
  end: Date.now() + (Math.random() * 2) * 24 * 60 * 60 * 1000,
  eventPrice: getRandomElem(priceList),
  icon: getRandomElem(eventType),
  isFavorite: getRandomBoolean(),
  productId: ``,
  picture(count) {
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(`http://picsum.photos/300/150?r=${Math.random()}`);
    }
    return arr;
  },
});
