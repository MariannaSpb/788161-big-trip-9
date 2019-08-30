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
  return `${new Date(date).toLocaleDateString(`en-GB`, {year: `2-digit`, day: `2-digit`, month: `2-digit`})}`;
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


export const position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const removeElement = (targ) => {
  if (targ._element) {
    targ._element = null;
  }
};

export const render = (container, element, place) => {
  switch (place) {
    case position.AFTERBEGIN:
      container.prepend(element);
      break;
    case position.BEFOREEND:
      container.append(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
    removeElement(element);
  }
};
