import { resetScale } from './scale.js';
import { isEscape } from './util.js';
import { changeEffects } from './slider.js';
import { sendData } from './fetch.js';
import { showErrorMessage, showSuccessMessage } from './alert.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOpen = document.querySelector('.img-upload__overlay');
const uploadClose = document.querySelector('.img-upload__cancel');
const uploadFile = document.querySelector('.img-upload__input');
const HASHTAG_ERROR = 'Неправильно заполнены хештеги';
const HASHTAG_VALID = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');
const submitButton = document.querySelector('.img-upload__submit');
const effectsPreviewElements = document.querySelectorAll('.effects__preview');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const closeUploadForm = () => {
  resetScale();
  uploadForm.reset();
  pristine.reset();
  changeEffects();
  uploadOpen.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

export const onUploadClose = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeUploadForm();
    document.removeEventListener('keydown', onUploadClose);
  }
};

uploadClose.addEventListener('click', closeUploadForm);

const openUpLoadForm = (evt) => {
  const reader = new FileReader();
  reader.readAsDataURL(evt.target.files[0]);
  reader.addEventListener('load', () => {
    imgUploadPreview.src = reader.result;
    effectsPreviewElements.forEach((element) => {
      element.style.backgroundImage = `url(${reader.result})`;
    });
  });

  uploadOpen.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadClose);
};

uploadFile.addEventListener('input', openUpLoadForm);

const onKeyPressListener = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

textDescription.addEventListener('keydown', onKeyPressListener);
textHashtags.addEventListener('keydown', onKeyPressListener);

const isTagValid = (tag) => HASHTAG_VALID.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isTagValid);
};

pristine.addValidator(
  textHashtags,
  validateTags,
  HASHTAG_ERROR
);

textHashtags.addEventListener('input', () => {
  if (pristine.validate()){
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled','disabled');
  }
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовываю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onSuccess = () => {
  showSuccessMessage();
  unblockSubmitButton();
  closeUploadForm();
};

const onFailure = () => {
  showErrorMessage();
  unblockSubmitButton();
  closeUploadForm();
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(onSuccess, onFailure, new FormData(evt.target));
  }
});
