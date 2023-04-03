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
    const lines = node.flatMap((item) => {
      const {
        name, status, children, oldValue, newValue,
      } = item;
      const currentPath = join(path, name).replace('/', '.');
      switch (status) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${makeValue(newValue)}`;
        case 'removed':
          return `Property '${currentPath}' was removed`;
        case 'updated':
          return `Property '${currentPath}' was updated. From ${makeValue(oldValue)} to ${makeValue(newValue)}`;
        case 'nested':
          return iter(children, currentPath);
        case 'unchanged':
          return _.isObject(oldValue) ? iter(oldValue, currentPath) : [];
        default:
          throw new Error(`Unexpected status ${status}`);
      }
    });
    return lines.join('\n');
  };
  return iter(arr, '');
};

export default makePlain;
