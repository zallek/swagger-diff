/* eslint no-param-reassign:0 */

import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';
import pick from 'lodash.pick';

import { PATHS_KEY, OPERATION_KEYS, PARAMETERS_KEY } from '../../constants';


export default function inlineParameters(spec) {
  if (!spec[PATHS_KEY]) {
    return spec;
  }
  const paths = mapValues(spec[PATHS_KEY], path => {
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
    [PATHS_KEY]: paths,
  };
}
