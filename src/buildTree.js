import _ from 'lodash';

const getValue = (obj, key) => obj[key];
const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.uniq([...keys1, ...keys2]));
  return keys.map((key) => {
    const oldValue = getValue(obj1, key);
    const newValue = getValue(obj2, key);
    if (_.isPlainObject(getValue(obj1, key)) && _.isPlainObject(getValue(obj2, key))) {
      const children = buildTree(oldValue, newValue);
      return { name: key, status: 'nested', children };
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
    return { name: key, status: 'added', newValue };
  });
};

export default buildTree;
