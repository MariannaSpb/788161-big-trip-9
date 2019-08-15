import {getRandomElem} from './components/utils';
import {getRandomBoolean} from './components/utils';
import {getRandomNumber} from './components/utils';

const CARD_COUNT = 5;
const OFFER_COUNT = 2;
const DESCRIPTION_COUNT = 3;


const sentence = `orem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const offerList = [
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`,
];

const randomOffer = (offers, count) => {
  const randomElem = Math.floor(Math.random() * offers.length);
  return offers.slice(randomElem, randomElem + count);
};

// для прайса
const priceType = [
  {type: `Add luggage`, price: 10},
  {type: `Switch to comfort class`, price: 150},
  {type: `Add meal`, price: 2}
];

const getPriceObj = (arr) => {
  return arr.reduce((res, item) => {
    res[item.name] = item.value;
    return res;
  }, {});
};


const splitText = (str, count) => {
  const text = str.split(`.`);
  const randomElem = Math.floor(Math.random() * text.length);
  return text.slice(randomElem, randomElem + count);
};


const priceList = [
  `20`,
  `160`,
  `50`,
  `10`,
];

const eventType = [`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`
];

const titles = [
  `Taxi to airport`,
  `Flight to Geneva`,
  `Drive to Chamonix`,
  `Check into hotel`,
];
console.log(titles.includes(titles.join(``).substr(4)));

// const newArr = [];
// [].forEach((item) => {
//   if (titles[item].substr(0, 5) === (eventType[item])) {
//     return eventType[item];
//   }
//   return newArr.push(eventType[item]);
// });

// console.log(newArr);

// const check = (arr1, arr2) => {
//   return arr2.filter((item) => arr1.includes(item.indexOf(5)));
// };
const date = new Date();

const msInDay = 86400000;
const msInHour = 3600000;
const msInMinute = 60000;
const dateInMs = +date;
const days = Math.floor(Math.random() * 30) * msInDay;
const hours = Math.floor(Math.random() * 24) * msInHour;
const minutes = Math.floor(Math.random() * 60) * msInMinute;

const timeIn = dateInMs + days + hours + minutes;
const timeOut = timeIn + hours + minutes;

const dateIn = new Date(timeIn);
const dateOut = new Date(timeOut);

const hoursRel = () => {
  return Math.floor((timeOut - timeIn) / msInHour);
};

export const getMockData = () => ({
  title: getRandomElem(titles),
  desctiption: splitText(sentence, DESCRIPTION_COUNT),
  city: [
    `Saint-Petersburg`,
    `Moscow`,
    `Vitebsk`,
    `Barcelona`,
    `Helsinki`,
  ][Math.floor(Math.random() * 5)],
  timeStart: (`0` + dateIn.getHours()).slice(-2) +
 `:` +
 (`0` + dateIn.getMinutes()).slice(-2),

  timeEnd: (`0` + dateOut.getHours()).slice(-2) +
 `:` +
 (`0` + dateOut.getMinutes()).slice(-2),
  differenceTime: hoursRel(),
  eventPrice: getRandomElem(priceList),
  picture: `http://picsum.photos/300/150?r=${Math.random()}`,
  offer: getRandomElem(priceType),
  //icon: getRandomElem(eventType),
  icon: `img/icons/${getRandomElem(eventType)}.png`,
});

const eventCards = new Array(CARD_COUNT).fill(``).map(() => getMockData());

console.log(eventCards);

