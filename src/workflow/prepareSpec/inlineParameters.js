import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';
import pick from 'lodash.pick';

import { OPERATION_KEYS, PARAMETERS_KEY } from '../../constants';


export default function inlineParameters(spec) {
  if (!spec.paths) {
    return spec;
  }
  const paths = mapValues(spec.paths, path => {
    const globalParameters = path[PARAMETERS_KEY] || [];
    const operations = mapValues(pick(path, OPERATION_KEYS), operation => {
      return {
        ...operation,
        [PARAMETERS_KEY]: globalParameters.concat(operation[PARAMETERS_KEY] || []),
      };
    });

    return {
      ...omit(path, PARAMETERS_KEY),
      ...operations,
    };
  });

  return {
    ...spec,
    paths,
  };
}
