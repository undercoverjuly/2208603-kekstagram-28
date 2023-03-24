import { openBigPicture } from './big-picture.js';

const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const createThumbnail = (picture) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = picture.url;
  thumbnail.querySelector('.picture__img').alt = picture.description;
  thumbnail.querySelector('.picture__comments').textContent = picture.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = picture.likes;
  thumbnail.dataset.thumbnailId = picture.id;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(picture);
  });

  return thumbnail;
};

export const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });
  document.querySelector('.pictures').appendChild(fragment);
};
