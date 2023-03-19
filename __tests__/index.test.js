import {
  test, expect, beforeAll,
} from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';
import stylishResult from '../__fixtures__/stylishResult.js';
import plainResult from '../__fixtures__/plainResult.js';
import jsonResult from '../__fixtures__/jsonResult.js';

/* eslint-disable */
let __filename;
let __dirname;
let getFixturePath;


beforeAll(() => {
  __filename = fileURLToPath(import.meta.url);
  __dirname = dirname(__filename);
  getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
});

test.each([
    { a: 'file1.json', b: 'file2.json', res: stylishResult, form: 'stylish' },
    { a: 'file1.yml', b: 'file2.yaml', res: stylishResult, form: 'stylish' },
    { a: 'file1.yml', b: 'file2.json', res: plainResult, form: 'plain'},
    { a: 'file1.yml', b: 'file2.yaml', res: jsonResult, form: 'json'},
])('diff between $a and $b in $form format', ({ a, b, res, form = 'stylish' }) => {
  const path1 = getFixturePath(a);
  const path2 = getFixturePath(b);
  const diff = genDiff(path1, path2, form);
  expect(diff).toStrictEqual(res);
})
