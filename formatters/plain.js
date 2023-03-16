import _ from 'lodash';
import { join } from 'path';
import {
  findName, findValue, getStatus,
} from '../src/utilts.js';

const makeValue = (val) => {
  if (_.isObject(val) && val !== null) {
    return '[complex value]';
  }
  return typeof val === 'string' ? `'${val}'` : val;
};

const makePlain = (arr) => {
  const iter = (node, path) => {
    if (!Array.isArray(node)) {
      const status = getStatus(node);
      const name = findName(node);
      const currentPath = join(path, name).replace('/', '.');
      if (status === 'added') {
        const value = makeValue(findValue(node));
        return `Property '${currentPath}' was added with value: ${value}`;
      }
      if (status === 'removed') {
        return `Property '${currentPath}' was removed`;
      }
      if (status === 'updated') {
        const first = findValue(node)[0];
        const second = findValue(node)[1];
        const value1 = makeValue(first);
        const value2 = makeValue(second);
        return `Property '${currentPath}' was updated. From ${value1} to ${value2}`;
      }
      if (status === 'unchanged') {
        const value = findValue(node);
        return _.isObject(value) ? iter(value, currentPath) : [];
      }
    }
    const lines = node.flatMap((item) => iter(item, path));
    return lines.join('\n');
  };
  return iter(arr, '');
};

export default makePlain;
