import _ from 'lodash';

const getValue = (obj, key) => obj[key];
const isObject = (value) => _.isObjectLike(value) && !Array.isArray(value);
const findValue = (item) => {
  const { status, oldValue, newValue } = item;
  switch (status) {
    case 'removed':
    case 'unchanged':
      return oldValue;
    case 'added':
      return newValue;
    default:
      throw new Error(`Unexpected status ${status}`);
  }
};

export {
  getValue, isObject, findValue,
};
