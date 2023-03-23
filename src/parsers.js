import jsYaml from 'js-yaml';

const parseFile = (data, ext) => {
  switch (ext) {
    case ('.json'):
      return JSON.parse(data);
    case ('.yaml'):
    case ('.yml'):
      return jsYaml.load(data);
    default:
      throw new Error(`Unexpected file extension ${ext}`);
  }
};

export default parseFile;
