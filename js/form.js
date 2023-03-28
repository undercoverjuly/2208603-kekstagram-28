import { isEscape } from './util.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadOpen = document.querySelector('.img-upload__overlay');
const uploadClose = document.querySelector('.img-upload__cancel');
const uploadFile = document.querySelector('#upload-file');
const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');


// export const validateForm = () => {
//   const pristine = new Pristine(uploadForm, {
//     classTo: 'img-upload__field-wrapper',
//     errorTextParent: 'img-upload__field-wrapper',
//     errorTextClass: 'img-upload__error-text',
//   });
// };

const closeUploadForm = () => {
  uploadForm.reset();
  // pristine.reset();
  uploadOpen.classList.add('hidden');
  document.removeEventListener('keydown');
  document.body.classList.remove('modal-open');
};

const onUploadClose = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

textDescription.addEventListener('keydown', onUploadClose);
textHashtags.addEventListener('keydown', onUploadClose);

const openUpLoadForm = () => {
  uploadOpen.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadClose);
};

uploadClose.addEventListener('click', closeUploadForm);
uploadFile.addEventListener('change', openUpLoadForm);

uploadForm.addEventListener('click', (evt) => {
  evt.preventDefault();
  openUpLoadForm();
});

uploadClose.addEventListener('click', closeUploadForm);
uploadForm.addEventListener('submit', openUpLoadForm);
