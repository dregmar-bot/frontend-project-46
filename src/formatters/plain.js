import _ from 'lodash';
import { join } from 'path';

const makeValue = (val) => {
  if (_.isObject(val) && val !== null) {
    return '[complex value]';
  }
  return typeof val === 'string' ? `'${val}'` : val;
};

const makePlain = (arr) => {
  const iter = (node, path) => {
    if (!Array.isArray(node)) {
      const {
        name, status, children, oldValue, newValue,
      } = node;
      const currentPath = join(path, name).replace('/', '.');
      if (status === 'added') {
        const value = makeValue(newValue);
        return `Property '${currentPath}' was added with value: ${value}`;
      }
      if (status === 'removed') {
        return `Property '${currentPath}' was removed`;
      }
      if (status === 'updated') {
        const before = makeValue(oldValue);
        const after = makeValue(newValue);
        return `Property '${currentPath}' was updated. From ${before} to ${after}`;
      }
      if (status === 'unchanged') {
        if (_.has(node, 'children')) {
          return iter(children, currentPath);
        }
        const value = oldValue;
        return _.isObject(value) ? iter(value, currentPath) : [];
      }
    }
    const lines = node.flatMap((item) => iter(item, path));
    return lines.join('\n');
  };
  return iter(arr, '');
};

export default makePlain;
