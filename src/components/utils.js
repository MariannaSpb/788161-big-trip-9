export const getRandomElem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};


export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * (max - 0)) + 0;
};


export const formatDate = (date) => {
  date = new Date(date);

  const day = [
    date.getDate(),
    `0${date.getMonth() + 1}`,
    date
      .getFullYear()
      .toString()
      .slice(-2)
  ];

console.log(day)
  return `${day.join(`/`)}`;
};
