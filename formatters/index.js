import makePlain from './plain.js';
import makeStylish from './stylish.js';

const makeFormatting = (tree, formatter) => {
  switch (formatter) {
    case 'stylish':
      return makeStylish(tree);
    case 'plain':
      return makePlain(tree);
    default:
      throw new Error(`Unexpected formatter ${formatter}`);
  }
};

export default makeFormatting;
