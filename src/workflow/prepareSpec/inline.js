import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';

import compose from '../../utils/compose';


export default function inline(spec) {
  return compose(
    inlineParameters,
    inlineSecurity,
    inlineSchemes,
    inlineConsumes,
    inlineProduces
  )(spec);
}

export function inlineParameters(spec) {
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

export function inlineSecurity(spec) {
  return spec;
}

export function inlineSchemes(spec) {
  return spec;
}

export function inlineConsumes(spec) {
  return spec;
}

export function inlineProduces(spec) {
  return spec;
}
