//Функция для проверки длины строки

const checkStringLength = (string, maxLength) =>
  string.length <= maxLength;

checkStringLength('проверяемая строка', 20);

//Функция для проверки, является ли строка палиндромом

const isPalindrome = (string) => {
  const lowString = string.toLowerCase();
  let reversedString = '';

  for (let i = lowString.length - 1; i >= 0; i--) {
    reversedString += lowString.at(i);
  }
  return lowString === reversedString;
};

isPalindrome ('Строка');

/* Функция, которая принимает строку, извлекает содержащиеся
в ней цифры от 0 до 9 и возвращает их в виде целого
положительного числа
*/

const extractNumber = (string) => {
  let result = '';
  for(let i = 0; i <= string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt (result, 10);
};

extractNumber('2023 год');

/* Функция, которая принимает три параметра: исходную строку,
минимальную длину и строку с добавочными символами — и возвращает
исходную строку, дополненную указанными символами до заданной длины
*/

const myPadStart = (string, minLength, pad) => {
  const actualPad = minLength - string.length;
  if (actualPad <= 0) {
    return string;
  }

  return pad.slice(0, actualPad % pad.length) +
    pad.repeat(actualPad / pad.length) + string;
};

myPadStart('1', 4, 'qwerty');
