import { readFileSync } from 'node:fs';
import path from 'path';
import parseFile from './parsers.js';
import buildTree from './buildTree.js';
import makeFormatting from './formatters/index.js';

const getExtension = (filepath) => path.extname(filepath);
const genDiff = (path1, path2, formatter = 'stylish') => {
  const data1 = parseFile(readFileSync(path1), getExtension(path1));
  const data2 = parseFile(readFileSync(path2), getExtension(path2));
  const tree = buildTree(data1, data2);
  return makeFormatting(tree, formatter);
};

export default genDiff;
