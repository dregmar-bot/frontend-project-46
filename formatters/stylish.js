import _ from 'lodash';
import {
  findName, findValue, getStatus,
} from '../src/utilts.js';

const findStylishStatus = (obj) => {
  const status = getStatus(obj);
  switch (status) {
    case 'added':
      return '+ ';
    case 'removed':
      return '- ';
    case 'unchanged':
      return '  ';
    case 'updated':
      return '-+';
    default:
      throw new Error(`Unexpected status ${status}`);
  }
};

const makeStylish = (arr) => {
  const iter = (node, depth) => {
    const countOfSpaces = 4;
    const countOfSpecChar = 2;
    const indentLength = (countOfSpaces * depth) - countOfSpecChar;
    const currentIndent = ' '.repeat(indentLength);
    const braceIndent = ' '.repeat(indentLength - countOfSpecChar);
    if (!_.isObject(node) || node === null) {
      return String(node);
    }
    let lines;
    if (Array.isArray(node)) {
      lines = node.map((item) => {
        const status = findStylishStatus(item);
        const name = findName(item);
        const value = findValue(item);
        if (status === '-+') {
          const val1 = value[0];
          const val2 = value[1];
          return `${currentIndent}- ${name}: ${iter(val1, depth + 1)}\n${currentIndent}+ ${name}: ${iter(val2, depth + 1)}`;
        }
        return `${currentIndent}${status}${name}: ${iter(value, depth + 1)}`;
      });
    } else {
      const entries = Object.entries(node);
      lines = entries.map(([key, val]) => {
        const status = '  ';
        return `${currentIndent}${status}${key}: ${iter(val, depth + 1)}`;
      });
    }
    return ['{', ...lines, `${braceIndent}}`].join('\n');
  };
  return `${iter(arr, 1)}`;
};

export default makeStylish;
