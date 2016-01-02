import foreach from 'lodash.foreach';
import mapValues from 'lodash.mapvalues';
import pick from 'lodash.pick';

import { PATHS_KEY, OPERATION_KEYS, PARAMETERS_KEY } from '../../constants';


export default function inlineParameters(spec) {
  if (!spec[PATHS_KEY]) {
    return spec;
  }
  const paths = mapValues(spec[PATHS_KEY], path => {
    return mapValues(pick(path, OPERATION_KEYS), operation => {
      const parameters = {};
      foreach(operation[PARAMETERS_KEY], parameter => {
        parameters[parameter.name] = parameter;
      });
      return {
        ...operation,
        [PARAMETERS_KEY]: parameters,
      };
    });
  });

  return {
    ...spec,
    [PATHS_KEY]: paths,
  };
}
