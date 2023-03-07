import { readFileSync } from 'node:fs';
import _ from 'lodash';


const findDiff = (path1, path2) => {
  const json1 = JSON.parse(readFileSync(path1));
  const json2 = JSON.parse(readFileSync(path2));
  const mergedJson = Object.assign(_.cloneDeep(json1), json2);
  const keys = _.sortBy(Object.keys(mergedJson));
  const preparedString = keys.reduce((acc, key) => {
    const addString = (wantedKey, module = '') => {
      switch (module) {
        case '+':
          acc += `
  + ${key}: ${json2[key]}`;
          break
        case '-':
          acc += `
  - ${key}: ${json1[key]}`;
          break
        case '':
          acc += `
    ${key}: ${json1[key]}`;
          break
        default:
         throw new Error(`Unexpected module ${module}`);
      }
    }
    if (_.has(json1, key)) {
      if (json1[key] === json2[key]) {
        addString(key)
        return acc;
      }
      addString(key, '-');
    }
    if (_.has(json2, key)) {
      addString(key, '+');
    }
    return acc
  }, '');
  return `{ ${preparedString} 
}`;
}


export default findDiff;
