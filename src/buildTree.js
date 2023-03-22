import _ from 'lodash';
import { getValue, isObjectExceptArray } from './utilts.js';

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.uniq([...keys1, ...keys2]));
  return keys.map((key) => {
    const oldValue = getValue(obj1, key);
    const newValue = getValue(obj2, key);
    if (isObjectExceptArray(getValue(obj1, key)) && isObjectExceptArray(getValue(obj2, key))) {
      const children = buildTree(oldValue, newValue);
      return { name: key, status: 'unchanged', children };
    }
    if (_.isEqual(getValue(obj1, key), getValue(obj2, key))) {
      return { name: key, status: 'unchanged', oldValue };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return {
        name: key, status: 'updated', oldValue, newValue,
      };
    }
    if (_.has(obj1, key)) {
      return { name: key, status: 'removed', oldValue };
    }
    if (_.has(obj2, key)) {
      return { name: key, status: 'added', newValue };
    }
    throw new Error(`The key ${key} is missing in all objects`);
  });
};

export default buildTree;
