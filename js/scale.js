import { SCALE_DEFAULT, MIN_SCALE } from './const.js';

const uploadScale = document.querySelector('.img-upload__scale');
const uploadPreview = document.querySelector('.img-upload__preview');
const scaleControlSmaller = uploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadScale.querySelector('.scale__control--bigger');
const scaleControlValue = uploadScale.querySelector('.scale__control--value');

const scaleImg = (value) => {
  uploadPreview.style.transform = `scale(${value / SCALE_DEFAULT})`;
  scaleControlValue.value = `${value}%`;
};

const onScaleControlSmaller = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  let newValue = currentValue - MIN_SCALE;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImg(newValue);
};

const onscaleControlBigger = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  let newValue = currentValue + MIN_SCALE;
  if (newValue > SCALE_DEFAULT) {
    newValue = SCALE_DEFAULT;
  }
  scaleImg(newValue);
};

export const resetScale = () => scaleImg(SCALE_DEFAULT);

scaleControlSmaller.addEventListener('click', onScaleControlSmaller);
scaleControlBigger.addEventListener('click', onscaleControlBigger);
