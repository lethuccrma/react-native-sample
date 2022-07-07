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
  return parseFloat(number.toFixed(2)).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
export function convertToAmountFormat(number) {
  return number.toFixed(2);
}
