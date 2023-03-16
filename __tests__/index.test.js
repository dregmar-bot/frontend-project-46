import {
  test, expect, beforeAll,
} from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

/* eslint-disable */
let __filename;
let __dirname;
let getFixturePath;
const stylishResult = '{\n'
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
const plainResult = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
const jsonResult = '[{"name":"common","children":[{"name":"follow","status":"added","value":false},{"name":"setting1","status":"unchanged","value":"Value 1"},{"name":"setting2","status":"removed","value":200},{"name":"setting3","status":"updated","value":[true,null]},{"name":"setting4","status":"added","value":"blah blah"},{"name":"setting5","status":"added","value":{"key5":"value5"}},{"name":"setting6","children":[{"name":"doge","children":[{"name":"wow","status":"updated","value":["","so much"]}]},{"name":"key","status":"unchanged","value":"value"},{"name":"ops","status":"added","value":"vops"}]}]},{"name":"group1","children":[{"name":"baz","status":"updated","value":["bas","bars"]},{"name":"foo","status":"unchanged","value":"bar"},{"name":"nest","status":"updated","value":[{"key":"value"},"str"]}]},{"name":"group2","status":"removed","value":{"abc":12345,"deep":{"id":45}}},{"name":"group3","status":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

beforeAll(() => {
  __filename = fileURLToPath(import.meta.url);
  __dirname = dirname(__filename);
  getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
});

test('genDiff in 2 jsons to default format', () => {
  const pathToJson1 = getFixturePath('file1.json');
  const pathToJson2 = getFixturePath('file2.json');
  const diff = genDiff(pathToJson1, pathToJson2);
  expect(diff).toStrictEqual(stylishResult);
});
test('genDiff in yml and yaml to stylish format', () => {
  const pathToYml1 = getFixturePath('file1.yml');
  const pathToYml2 = getFixturePath('file2.yaml');
  const diff = genDiff(pathToYml1, pathToYml2, 'stylish');
  expect(diff).toBe(stylishResult);
});
test('genDiff in json and yml to plain format', () => {
  const pathToYml1 = getFixturePath('file1.yml');
  const pathToJson2 = getFixturePath('file2.json');
  const diff = genDiff(pathToYml1, pathToJson2, 'plain');
  expect(diff).toBe(plainResult);
});
test('genDiff in 2 yml to json format', () => {
  const pathToJson1 = getFixturePath('file1.yml');
  const pathToJson2 = getFixturePath('file2.yaml');
  const diff = genDiff(pathToJson1, pathToJson2, 'json');
  expect(diff).toBe(jsonResult);
});
