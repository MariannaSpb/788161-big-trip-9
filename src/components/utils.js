export const getRandomElem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};


export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * (max - 0)) + 0;
};
