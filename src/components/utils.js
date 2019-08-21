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

  return `${day.join(`/`)}`;
};


export const formatDayMonth = (date) => {
  date = new Date(date);
  return `${new Date(date).toLocaleDateString(`en-US`, {day: `2-digit`, month: `short`})}`;
};

export const formatDayMonthShort = (date) => {
  date = new Date(date);
  return `${new Date(date).toLocaleDateString(`en-US`, {day: `2-digit`})}`;
};

export const formatTime = (time) => {
  time = new Date(time);
  return `${new Date(time).toLocaleTimeString([], {hour: `2-digit`, minute: `2-digit`})}`;
};


