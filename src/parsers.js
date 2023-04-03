import jsYaml from 'js-yaml';

const parseData = (data, type) => {
  switch (type) {
    case ('json'):
      return JSON.parse(data);
    case ('yaml'):
    case ('yml'):
      return jsYaml.load(data);
    default:
      throw new Error(`Unexpected type of file ${type}`);
  }
};

export default parseData;
