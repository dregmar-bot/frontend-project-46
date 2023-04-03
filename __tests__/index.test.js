import {
  test, expect,
} from '@jest/globals';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import parseData from '../src/parsers.js';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const typeOfResultFixtures = 'json';
const jsonResult = parseData(readFileSync(getFixturePath('jsonResult.json')), typeOfResultFixtures);
const stylishResult = parseData(readFileSync(getFixturePath('stylishResult.json')), typeOfResultFixtures);
const plainResult = parseData(readFileSync(getFixturePath('plainResult.json')), typeOfResultFixtures);

test.each([
  {
    name1: 'file1.json', name2: 'file2.json', result: stylishResult, formatter: 'stylish',
  },
  {
    name1: 'file1.yml', name2: 'file2.yaml', result: stylishResult, formatter: 'default',
  },
  {
    name1: 'file1.yml', name2: 'file2.json', result: plainResult, formatter: 'plain',
  },
  {
    name1: 'file1.yml', name2: 'file2.yaml', result: jsonResult, formatter: 'json',
  },
])('diff between $name1 and $name2 in $formatter format', ({
  name1, name2, result, formatter,
}) => {
  const path1 = getFixturePath(name1);
  const path2 = getFixturePath(name2);
  const diff = formatter === 'default' ? genDiff(path1, path2) : genDiff(path1, path2, formatter);
  expect(diff).toStrictEqual(result);
});
