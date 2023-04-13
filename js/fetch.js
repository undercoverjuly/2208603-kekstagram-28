import { setFilterClick, showImgFilter, sortByDefault } from './filters.js';
import { showAlert } from './util.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

export const getData = (onSuccess) => {
  fetch(
    `${BASE_URL}${Route.GET_DATA}`
  )
    .then((response) => {
      if (!response.ok) {
        showAlert(`${ErrorText.GET_DATA}`);
      }
      return response.json();
    })
    .then((generateUserPhotoDescription) => {
      onSuccess(generateUserPhotoDescription);
      sortByDefault(generateUserPhotoDescription);
      setFilterClick(generateUserPhotoDescription);
      showImgFilter();
    })
    .catch(() => {
      showAlert(`${ErrorText.GET_DATA}`);
    });
};

export const sendData = (onSuccess, onFailure, body) => {
  fetch(
    `${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFailure(`${ErrorText.SEND_DATA}`);
    }
  })
    .catch(() => {
      onFailure(`${ErrorText.SEND_DATA}`);
    });
};
