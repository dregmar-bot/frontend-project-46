import _ from 'lodash';
import { getValue, isObject } from './utilts.js';

const buildTree = (obj1, obj2) => {
  const mergedFile = Object.assign(_.cloneDeep(obj1), obj2);
  const keys = _.sortBy(Object.keys(mergedFile));
  return keys.map((key) => {
    const oldValue = getValue(obj1, key);
    const newValue = getValue(obj2, key);
    if (isObject(getValue(obj1, key)) && isObject(getValue(obj2, key))) {
      const children = buildTree(oldValue, newValue);
      return { name: key, status: 'unchanged', children };
    }
    if (_.isEqual(getValue(obj1, key), getValue(obj2, key))) {
      return { name: key, status: 'unchanged', oldValue };
    }
    if (_.has(obj1, key)) {
      if (_.has(obj2, key)) {
        return {
          name: key, status: 'updated', oldValue, newValue,
        };
      }
      return { name: key, status: 'removed', oldValue };
    }
    if (_.has(obj2, key)) {
      return { name: key, status: 'added', newValue };
    }
    throw new Error(`The key ${key} is missing in all objects`);
  });
};

export default buildTree;
