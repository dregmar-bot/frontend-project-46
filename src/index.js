import { readFileSync } from 'node:fs';
import _ from 'lodash';

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

const findDiff = (path1, path2) => {
  const json1 = JSON.parse(readFileSync(path1));
  const json2 = JSON.parse(readFileSync(path2));
  const mergedJson = Object.assign(_.cloneDeep(json1), json2);
  const keys = _.sortBy(Object.keys(mergedJson));
  const preparedString = keys.reduce((acc, key) => {
    let newAcc = acc;
    if (_.has(json1, key)) {
      if (json1[key] === json2[key]) {
        newAcc = addDataToString(newAcc, json1, json2, key);
        return newAcc;
      }
      newAcc = addDataToString(newAcc, json1, json2, key, '-');
    }
    if (_.has(json2, key)) {
      newAcc = addDataToString(newAcc, json1, json2, key, '+');
    }
    return newAcc;
  }, '');
  return `{${preparedString}\n}`;
};

export default findDiff;
