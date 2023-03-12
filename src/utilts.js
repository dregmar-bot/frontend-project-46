import _ from 'lodash';
import path from 'path';

const getStatus = (item) => item.status ?? '  ';
const getValue = (obj, key) => obj[key];
const isObject = (value) => _.isObjectLike(value) && !Array.isArray(value);
const getExtension = (filepath) => path.extname(filepath);
const findName = (obj) => {
  if (_.has(obj, 'name')) {
    return getValue(obj, 'name');
  }
  const [key] = Object.keys(obj);
  return key;
};
const findValue = (obj) => {
  if (_.has(obj, 'value')) {
    return getValue(obj, 'value');
  }
  if (_.has(obj, 'children')) {
    return getValue(obj, 'children');
  }
  const [value] = Object.values(obj);
  return value;
};

export {
  getStatus, getValue, getExtension, isObject, findName, findValue,
};
