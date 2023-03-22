import _ from 'lodash';

const findStylishStatus = (status) => {
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

const findValue = (item) => {
  const { status, oldValue, newValue } = item;
  switch (status) {
    case 'removed':
    case 'unchanged':
      return oldValue;
    case 'added':
      return newValue;
    default:
      throw new Error(`Unexpected status ${status}`);
  }
};
const stringify = (value, currentDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const countOfSpaces = 4;
    const indentLength = countOfSpaces * depth;
    const currentIndent = ' '.repeat(indentLength);
    const braceIndent = ' '.repeat(indentLength - countOfSpaces);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${braceIndent}}`,
    ].join('\n');
  };

  return iter(value, currentDepth);
};

const makeStylish = (arr) => {
  const iter = (node, depth) => {
    const countOfSpaces = 4;
    const countOfSpecChar = 2;
    const indentLength = (countOfSpaces * depth) - countOfSpecChar;
    const currentIndent = ' '.repeat(indentLength);
    const braceIndent = ' '.repeat(indentLength - countOfSpecChar);

    const lines = node.map((item) => {
      const {
        name, children, status, oldValue, newValue,
      } = item;
      const actualStatus = findStylishStatus(status);
      if (_.has(item, 'children')) {
        return `${currentIndent}${actualStatus}${name}: ${iter(children, depth + 1)}`;
      }
      if (status === 'updated') {
        return `${currentIndent}- ${name}: ${stringify(oldValue, depth + 1)}\n${currentIndent}+ ${name}: ${stringify(newValue, depth + 1)}`;
      }
      const value = findValue(item);
      return `${currentIndent}${actualStatus}${name}: ${stringify(value, depth + 1)}`;
    });
    return ['{', ...lines, `${braceIndent}}`].join('\n');
  };
  return `${iter(arr, 1)}`;
};

export default makeStylish;
