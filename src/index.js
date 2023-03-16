import { readFileSync } from 'node:fs';
import _ from 'lodash';
import parseFile from './parsers.js';
import { getValue, isObject, getExtension } from './utilts.js';
import makeFormatting from '../formatters/index.js';

const genDiff = (path1, path2, formatter = 'stylish') => {
  const file1 = parseFile(readFileSync(path1), getExtension(path1));
  const file2 = parseFile(readFileSync(path2), getExtension(path2));
  const prepareTree = (obj1, obj2) => {
    const mergedFile = Object.assign(_.cloneDeep(obj1), obj2);
    const keys = _.sortBy(Object.keys(mergedFile));
    return keys.reduce((acc, key) => {
      const newAcc = acc;
      if (isObject(getValue(obj1, key)) && isObject(getValue(obj2, key))) {
        const children = prepareTree(getValue(obj1, key), getValue(obj2, key));
        newAcc.push({ name: key, children });
      } else if (_.isEqual(getValue(obj1, key), getValue(obj2, key))) {
        const value = getValue(obj1, key);
        newAcc.push({ name: key, status: 'unchanged', value });
      } else {
        if (_.has(obj1, key)) {
          if (_.has(obj2, key)) {
            const value = [getValue(obj1, key), getValue(obj2, key)];
            newAcc.push({ name: key, status: 'updated', value });
            return newAcc;
          }
          const value = getValue(obj1, key);
          newAcc.push({ name: key, status: 'removed', value });
        }
        if (_.has(obj2, key)) {
          const value = getValue(obj2, key);
          newAcc.push({ name: key, status: 'added', value });
        }
      }
      return newAcc;
    }, []);
  };
  const tree = prepareTree(file1, file2);
  return makeFormatting(tree, formatter);
};

export default genDiff;
