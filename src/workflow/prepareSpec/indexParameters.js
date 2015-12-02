import foreach from 'lodash.foreach';
import mapValues from 'lodash.mapvalues';
import pick from 'lodash.pick';

import { OPERATION_KEYS, PARAMETERS_KEY } from '../../constants';


export default function inlineParameters(spec) {
  if (!spec.paths) {
    return spec;
  }
  const paths = mapValues(spec.paths, path => {
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
    paths,
  };
}
