import { isEscape } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img img');
const bigPictureDescription = document.querySelector('.social__caption');
const bigPictureLikesCount = document.querySelector('.likes-count');
const bigPictureCommentsElement = document.querySelector('.social__comments');
const bigPictureCommentsCount = document.querySelector('.social__comment-count');
const bigPictureCommentLoad = document.querySelector('.comments-loader');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');

export const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onClose = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

bigPictureCloseElement.removeEventListener('keydown', onClose);
bigPictureCloseElement.removeEventListener('click', onClose);

export const openBigPicture = (picture) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImage.src = picture.url;
  bigPictureDescription.textContent = picture.description;
  bigPictureLikesCount.textContent = picture.likes;

  const bigPictureCommentElement = document.querySelector('.social__comment').cloneNode(true);

  while(bigPictureCommentsElement.firstChild) {
    bigPictureCommentsElement.removeChild(bigPictureCommentsElement.firstChild);
  }

  let loadingComments = 0;
  const COMMENTS_PER_PORTION = 5;

  const renderComments = () => {

    while(bigPictureCommentsElement.firstChild) {
      bigPictureCommentsElement.removeChild(bigPictureCommentsElement.firstChild);
    }
    loadingComments += COMMENTS_PER_PORTION;

    const commentsToShow = Math.min(picture.comments.length, loadingComments);

    picture.comments.forEach((comment, index) => {
      if (index < commentsToShow) {
        const commentElement = bigPictureCommentElement.cloneNode(true);
        commentElement.querySelector('.social__picture').src = comment.avatar;
        commentElement.querySelector('.social__picture').alt = comment.name;
        commentElement.querySelector('.social__text').textContent = comment.message;

        bigPictureCommentsCount.textContent = `${commentsToShow} из ${picture.comments.length} комментариев`;

        if (loadingComments >= picture.comments.length) {
          bigPictureCommentLoad.classList.add('hidden');
          loadingComments = picture.comments.length;
          bigPictureCommentLoad.removeEventListener('click', renderComments);
        } else {
          bigPictureCommentLoad.classList.remove('hidden');
          bigPictureCommentLoad.addEventListener('click', renderComments);
        }
        bigPictureCommentsElement.append(commentElement);
      }
    });
  };

  renderComments();

  bigPictureCloseElement.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', onClose);
};
