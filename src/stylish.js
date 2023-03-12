import _ from 'lodash';
import {
  getStatus, findName, findValue,
} from './utilts.js';

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
        const status = getStatus(item) ?? '  ';
        const name = findName(item);
        const value = findValue(item);
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
