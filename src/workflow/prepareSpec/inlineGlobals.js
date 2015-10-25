import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';


const GLOBAL_KEYS = ['consumes', 'produces', 'schemes', 'security'];

export default function inlineGlobals(spec) {
  const paths = mapValues(spec.paths, (path) => {
    return mapValues(path, (operation, operationKey) => {
      if (operationKey === 'parameters') {
        return operation;
      }
      GLOBAL_KEYS.forEach(key => {
        operation[key] = operation[key] || spec[key] || [];
      });
      return operation;
    });
  });

  return {
    ...omit(spec, GLOBAL_KEYS),
    paths,
  };
}
