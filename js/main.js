const NAMES = [
  'Андрей',
  'Иван',
  'Мария',
  'Екатерина',
  'Артём',
  'Юлия',
  'Александр',
  'Пётр',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Если смогу, я сделаю это. Конец истории.',
  'Смейтесь как только умеете, любите столько, сколько живете.',
  'Помните: вы единственный человек, который может наполнить ваш мир солнечным светом.',
  'Я полностью уверена, что я — диснеевская принцесса, которую еще не придумали.',
  'Не позволяйте кому-то затушить ваши искры только потому, что их свет сияет в чьих-то глазах.',
  'Делайте в вашей жизни то, что меньше заставляет вас смотреть в свой телефон.',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const URL_ARRAY = Array.from({length: 6}, (_, index) => index + 1);

const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const createComment = () => ({
  description: getRandomArrayElement(DESCRIPTIONS),
  commentId: getRandomNumber(1, 25),
  avatar: `img/avatar-${getRandomArrayElement(URL_ARRAY)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  commenter: getRandomArrayElement(NAMES),
  likes: getRandomNumber(15, 200),
});

createComment();

const similarPosts = Array.from({length: 25}, createComment);

console.log(similarPosts);
