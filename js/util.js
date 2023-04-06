import { ALERT_SHOW_TIME } from './const.js';

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export const isEscape = (evt) => evt.key === 'Escape';

export const showAlert = (message) => {
  const alertBlock = document.createElement('div');
  alertBlock.style.zIndex = 100;
  alertBlock.style.position = 'absolute';
  alertBlock.style.top = 0;
  alertBlock.style.left = 0;
  alertBlock.style.right = 0;
  alertBlock.style.padding = '10px 3px';
  alertBlock.style.fontSize = '26px';
  alertBlock.style.textAlign = 'center';
  alertBlock.style.backgroundColor = 'red';

  alertBlock.textContent = message;

  document.body.append(alertBlock);

  setTimeout(() => {
    alertBlock.remove();
  }, ALERT_SHOW_TIME);
};
