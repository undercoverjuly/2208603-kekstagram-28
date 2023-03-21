import { isEscape } from './util.js';

const fullSizePicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentLoad = document.querySelector('.comments-loader');

const fullSizePictureDescription = document.querySelector('.social__caption');
const fullSizePictureLikesCount = document.querySelector('.likes-count');
const fullSizePictureCommentsCount = document.querySelector('.comments-count');
const body = document.querySelector('body');

const fullSizePictureOpened = () => {
  fullSizePicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCount.classList.add('hidden');
  commentLoad.classList.add('hidden');
};

const fullSizePictureClosed = () => {
  fullSizePicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentCount.classList.remove('hidden');
  commentLoad.classList.remove('hidden');
};

document.addEventListener('keydown', (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    fullSizePictureClosed();
  }
});

const renderFullSizePicture = ({url, description, likes, comments}) => {
  fullSizePictureOpened();

  fullSizePicture.src = url;
  fullSizePictureDescription.textContent = description;
  fullSizePictureLikesCount.textContent = likes;
  fullSizePictureCommentsCount.textContent = comments.length;
};

export { renderFullSizePicture };
