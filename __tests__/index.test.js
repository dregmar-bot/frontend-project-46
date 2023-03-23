import {
  test, expect,
} from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';
import stylishResult from '../__fixtures__/stylishResult.js';
import plainResult from '../__fixtures__/plainResult.js';
import jsonResult from '../__fixtures__/jsonResult.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test.each([
  {
    name1: 'file1.json', name2: 'file2.json', result: stylishResult, formatter: 'stylish',
  },
  {
    name1: 'file1.yml', name2: 'file2.yaml', result: stylishResult,
  },
  {
    name1: 'file1.yml', name2: 'file2.json', result: plainResult, formatter: 'plain',
  },
  {
    name1: 'file1.yml', name2: 'file2.yaml', result: jsonResult, formatter: 'json',
  },
])('diff between $name1 and $name2 in $formatter format', ({
  name1, name2, result, formatter = 'stylish',
}) => {
  const path1 = getFixturePath(name1);
  const path2 = getFixturePath(name2);
  const diff = genDiff(path1, path2, formatter);
  expect(diff).toStrictEqual(result);
});
