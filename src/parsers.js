import jsYaml from 'js-yaml';

const parseFile = (file, ext) => {
  switch (ext) {
    case ('.json'):
      return JSON.parse(file);
    case ('.yaml'):
    case ('.yml'):
      return jsYaml.load(file);
    default:
      throw new Error(`Unexpected file extension ${ext}`);
  }
};

export default parseFile;
