import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';
import pick from 'lodash.pick';
import zipObject from 'lodash.zipobject';

import { PATHS_KEY, OPERATION_KEYS, GLOBAL_KEYS } from '../../constants';


export default function inlineGlobals(spec) {
  const paths = mapValues(spec[PATHS_KEY], path => {
    const operations = mapValues(pick(path, OPERATION_KEYS), operation => {
      return {
        ...operation,
        ...zipObject(
          GLOBAL_KEYS,
          GLOBAL_KEYS.map(key => operation[key] || spec[key] || [])
        ),
      };
    });

    return {
      ...path,
      ...operations,
    };
  });

  return {
    ...omit(spec, GLOBAL_KEYS),
    [PATHS_KEY]: paths,
  };
}
