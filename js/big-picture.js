import { isEscape } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img img');
const bigPictureDescription = document.querySelector('.social__caption');
const bigPictureLikesCount = document.querySelector('.likes-count');
const bigPictureCommentsElement = document.querySelector('.social__comments');
const bigPictureCommentsCount = document.querySelector('.comments-count');
const bigPictureCommentLoad = document.querySelector('.comments-loader');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');

export const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  bigPictureCloseElement.removeEventListener('keydown');
  bigPictureCloseElement.removeEventListener('click');
};

const onClose = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

export const openBigPicture = (post) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCommentLoad.classList.add('hidden');
  bigPictureCommentsCount.classList.add('hidden');

  bigPictureImage.src = post.url;
  bigPictureDescription.textContent = post.description;
  bigPictureLikesCount.textContent = post.likes;

  const bigPictureCommentElement = document.querySelector('.social__comment').cloneNode(true);

  while(bigPictureCommentsElement.firstChild) {
    bigPictureCommentsElement.removeChild(bigPictureCommentsElement.firstChild);
  }

  post.comments.forEach((comment) => {
    const commentElement = bigPictureCommentElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    bigPictureCommentsElement.append(commentElement);
  });

  bigPictureCloseElement.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', onClose);
};
