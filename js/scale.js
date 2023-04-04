const uploadScale = document.querySelector('.img-upload__scale');
const uploadPreview = document.querySelector('.img-upload__preview');
const scaleControlSmaller = uploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadScale.querySelector('.scale__control--bigger');
const scaleControlValue = uploadScale.querySelector('.scale__control--value');

const scaleImg = (value) => {
  uploadPreview.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

const onScaleControlSmaller = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  let newValue = currentValue - 25;
  if (newValue < 25) {
    newValue = 25;
  }
  scaleImg(newValue);
};

const onscaleControlBigger = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  let newValue = currentValue + 25;
  if (newValue > 100) {
    newValue = 100;
  }
  scaleImg(newValue);
};

export const resetScale = () => scaleImg(100);

scaleControlSmaller.addEventListener('click', onScaleControlSmaller);
scaleControlBigger.addEventListener('click', onscaleControlBigger);
