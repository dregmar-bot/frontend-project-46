import {
  test, expect, beforeAll, beforeEach,
} from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import findDiff from '../src/index.js';

let __filename;
let __dirname;
let getFixturePath;
let result;

beforeAll(() => {
  __filename = fileURLToPath(import.meta.url);
  __dirname = dirname(__filename);
  getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
});
beforeEach(() => {
  result = '{\n'
    + '    common: {\n'
    + '      + follow: false\n'
    + '        setting1: Value 1\n'
    + '      - setting2: 200\n'
    + '      - setting3: true\n'
    + '      + setting3: null\n'
    + '      + setting4: blah blah\n'
    + '      + setting5: {\n'
    + '            key5: value5\n'
    + '        }\n'
    + '        setting6: {\n'
    + '            doge: {\n'
    + '              - wow: \n'
    + '              + wow: so much\n'
    + '            }\n'
    + '            key: value\n'
    + '          + ops: vops\n'
    + '        }\n'
    + '    }\n'
    + '    group1: {\n'
    + '      - baz: bas\n'
    + '      + baz: bars\n'
    + '        foo: bar\n'
    + '      - nest: {\n'
    + '            key: value\n'
    + '        }\n'
    + '      + nest: str\n'
    + '    }\n'
    + '  - group2: {\n'
    + '        abc: 12345\n'
    + '        deep: {\n'
    + '            id: 45\n'
    + '        }\n'
    + '    }\n'
    + '  + group3: {\n'
    + '        deep: {\n'
    + '            id: {\n'
    + '                number: 45\n'
    + '            }\n'
    + '        }\n'
    + '        fee: 100500\n'
    + '    }\n'
    + '}';
});

test('findDiff in 2 jsons', () => {
  const pathToJson1 = getFixturePath('file1.json');
  const pathToJson2 = getFixturePath('file2.json');
  const diff = findDiff(pathToJson1, pathToJson2);
  expect(diff).toStrictEqual(result);
});
test('findDiff in yml and yaml', () => {
  const pathToYml1 = getFixturePath('file1.yml');
  const pathToYml2 = getFixturePath('file2.yaml');
  const diff = findDiff(pathToYml1, pathToYml2);
  expect(diff).toBe(result);
});
test('findDiff in yml and json', () => {
  const pathToYml1 = getFixturePath('file1.yml');
  const pathToJson2 = getFixturePath('file2.json');
  const diff = findDiff(pathToYml1, pathToJson2);
  expect(diff).toBe(result);
});
