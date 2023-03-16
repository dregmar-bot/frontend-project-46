import _ from 'lodash';
import path from 'path';

const getStatus = (obj) => obj.status ?? 'unchanged';
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
const findValue = (item) => {
  if (isObject(item)) {
    if (_.has(item, 'value')) {
      return getValue(item, 'value');
    }
    if (_.has(item, 'children')) {
      return getValue(item, 'children');
    }
    const [value] = Object.values(item);
    return value;
  }
  return typeof item === 'string' ? `'${item}'` : item;
};

export {
  getStatus, getValue, getExtension, isObject,
  findName, findValue,
};
