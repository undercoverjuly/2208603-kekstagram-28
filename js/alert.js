import { onUploadClose } from './form.js';
import { isEscape } from './util.js';

const elementBody = document.querySelector('body');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successButton = document.querySelector('.success__button');
const errorButton = document.querySelector('.error__button');

const successElement = successMessage.cloneNode(true);
const errorElement = errorMessage.cloneNode(true);


const onSuccessKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    if (successElement) {
      document.querySelector('.success').remove();
    }
  }
};
const onErrorKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    if (errorElement) {
      document.querySelector('.error').remove();
      document.addEventListener('keydown', onUploadClose);
    }
  }
};

const onSuccessClick = (evt) => {
  if (evt.target === successElement) {
    document.querySelector('.success').remove();
    document.removeEventListener('click', onSuccessClick);
    document.removeEventListener('keydown', onSuccessKeydown);
  }
};

const onErrorClick = (evt) => {
  if (evt.target === errorElement) {
    document.querySelector('.error').remove();
    document.removeEventListener('click', onErrorClick);
    document.removeEventListener('keydown', onErrorKeydown);
    document.addEventListener('keydown', onUploadClose);
  }
};

const onSuccessButtonClick = () => {
  if (successElement) {
    document.querySelector('.success').remove();
  }
};

const onErrorButtonClick = () => {
  if (errorElement) {
    document.querySelector('.error').remove();
  }
};

export const showSuccessMessage = () => {
  elementBody.append(successElement);
  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessClick);
};

export const showErrorMessage = () => {
  elementBody.append(errorElement);
  document.removeEventListener('keydown', onUploadClose);
  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorClick);
};

// successButton.addEventListener('click', onSuccessButtonClick);
// errorButton.addEventListener('click', onErrorButtonClick);
