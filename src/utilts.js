import _ from 'lodash';

const getValue = (obj, key) => obj[key];
const isObject = (value) => _.isObjectLike(value) && !Array.isArray(value);

export {
  getValue, isObject,
};
