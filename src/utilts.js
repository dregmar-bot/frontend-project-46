import _ from 'lodash';

const getValue = (obj, key) => obj[key];
const isObjectExceptArray = (value) => _.isObjectLike(value) && !Array.isArray(value);

export {
  getValue, isObjectExceptArray,
};
