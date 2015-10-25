import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';


export default function inlineParameters(spec) {
  if (!spec.paths) {
    return spec;
  }
  const paths = mapValues(spec.paths, (path) => {
    const globalParameters = path.parameters || [];
    const operations = omit(path, 'parameters');

    return mapValues(operations, (operation) => {
      return {
        ...operation,
        parameters: globalParameters.concat(operation.parameters || []),
      };
    });
  });

  return {
    ...spec,
    paths,
  };
}
