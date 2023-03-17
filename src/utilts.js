import _ from 'lodash';

const getValue = (obj, key) => obj[key];
const isObject = (value) => _.isObjectLike(value) && !Array.isArray(value);
const findValue = (item) => {
  const { status, oldValue, newValue } = item;
  switch (status) {
    case 'removed':
      return oldValue;
    case 'added':
      return newValue;
    case 'unchanged':
      return oldValue;
    default:
      throw new Error(`Unexpected status ${status}`);
  }
};

export {
  getValue, isObject, findValue,
};
