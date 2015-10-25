import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';
import pick from 'lodash.pick';
import zipObject from 'lodash.zipobject';

import { OPERATION_KEYS, GLOBAL_KEYS } from '../../constants';


export default function inlineGlobals(spec) {
  const paths = mapValues(spec.paths, path => {
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
    paths,
  };
}
