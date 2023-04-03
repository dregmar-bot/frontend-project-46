import _ from 'lodash';

const findStylishStatus = (status) => {
  switch (status) {
    case 'added':
      return '+ ';
    case 'removed':
      return '- ';
    case 'nested':
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
      throw new Error(`Cannot find value for status ${status}`);
  }
};
const stringify = (value, currentDepth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const countOfSpaces = 4;
  const indentLength = countOfSpaces * currentDepth;
  const currentIndent = ' '.repeat(indentLength);
  const braceIndent = ' '.repeat(indentLength - countOfSpaces);
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, currentDepth + 1)}`);

  return [
    '{',
    ...lines,
    `${braceIndent}}`,
  ].join('\n');
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
      switch (status) {
        case 'nested':
          return `${currentIndent}${actualStatus}${name}: ${iter(children, depth + 1)}`;
        case 'updated':
          return `${currentIndent}- ${name}: ${stringify(oldValue, depth + 1)}\n${currentIndent}+ ${name}: ${stringify(newValue, depth + 1)}`;
        default:
          return `${currentIndent}${actualStatus}${name}: ${stringify(findValue(item), depth + 1)}`;
      }
    });
    return ['{', ...lines, `${braceIndent}}`].join('\n');
  };
  return `${iter(arr, 1)}`;
};

export default makeStylish;
