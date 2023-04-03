import { readFileSync } from 'node:fs';
import parseData from './parsers.js';
import buildTree from './buildTree.js';
import makeFormatting from './formatters/index.js';

const getType = (filepath) => filepath.split('.').at(-1);
const genDiff = (path1, path2, formatter = 'stylish') => {
  const data1 = parseData(readFileSync(path1), getType(path1));
  const data2 = parseData(readFileSync(path2), getType(path2));
  const tree = buildTree(data1, data2);
  return makeFormatting(tree, formatter);
};

export default genDiff;
