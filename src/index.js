import { readFileSync } from 'node:fs';
import _ from 'lodash';
import path from 'path';
import parseFile from './parsers.js';

const getValue = (obj, key) => obj[key];
const addDataToString = (actualStr, obj1, obj2, wantedKey, module = '') => {
  let newStr = actualStr;
  switch (module) {
    case '+':
      newStr += `\n + ${wantedKey}: ${getValue(obj2, wantedKey)}`;
      break;
    case '-':
      newStr += `\n - ${wantedKey}: ${getValue(obj1, wantedKey)}`;
      break;
    case '':
      newStr += `\n   ${wantedKey}: ${getValue(obj1, wantedKey)}`;
      break;
    default:
      throw new Error(`Unexpected module ${module}`);
  }
  return newStr;
};
const getExtension = (filepath) => path.extname(filepath);

const findDiff = (path1, path2) => {
  const file1 = parseFile(readFileSync(path1), getExtension(path1));
  const file2 = parseFile(readFileSync(path2), getExtension(path2));
  const mergedFile = Object.assign(_.cloneDeep(file1), file2);
  const keys = _.sortBy(Object.keys(mergedFile));
  const preparedString = keys.reduce((acc, key) => {
    let newAcc = acc;
    if (_.has(file1, key)) {
      if (file1[key] === file2[key]) {
        newAcc = addDataToString(newAcc, file1, file2, key);
        return newAcc;
      }
      newAcc = addDataToString(newAcc, file1, file2, key, '-');
    }
    if (_.has(file2, key)) {
      newAcc = addDataToString(newAcc, file1, file2, key, '+');
    }
    return newAcc;
  }, '');
  return `{${preparedString}\n}`;
};

export default findDiff;
