import jsYaml from 'js-yaml';

const parseFile = (file, ext) => {
  let parse;
  switch (ext) {
    case ('.json'):
      parse = JSON.parse;
      break;
    case ('.yaml' || '.yml'):
      parse = jsYaml.load;
      break;
    case ('.yml'):
      parse = jsYaml.load;
      break;
    default:
      throw new Error(`Unexpected file extension ${ext}`);
  }
  return parse(file);
};

export default parseFile;
