/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

function escapeRegExp(stringToGoIntoTheRegex) {
  // eslint-disable-next-line no-useless-escape
  return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function generateURL(input, data) {
  let result = input;
  for (const key in data) {
    const value = data[key];
    const stringToGoIntoTheRegex = escapeRegExp(key);
    const regex = new RegExp(`{{${stringToGoIntoTheRegex}}}`, 'g');
    result = result.replace(regex, value);
  }
  return result.replace(/\{\{[a-zA-Z0-9]+}}/g, '');
}

export function convertToCurrencyFormat(number) {
  const originalStr = `${number.toFixed(2)}`;
  let decimalNumber = Number.parseInt(originalStr.split('.')[0], 10);
  const numberPart = [];
  while (decimalNumber > 0) {
    numberPart.push(parseInt(decimalNumber % 1000, 10));
    decimalNumber = parseInt(decimalNumber / 1000, 10);
  }
  if (numberPart.length === 0) {
    numberPart.push(0);
  }
  const answer = `$${numberPart.reverse().join(',')}.${originalStr.split('.')[1]}`;
  return answer;
}
export function convertToAmountFormat(number) {
  return number;
}
