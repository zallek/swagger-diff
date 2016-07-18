/* eslint no-param-reassign:0 */

import forEach from 'lodash.foreach';
import isObject from 'lodash.isobject';

import { PROPERTIES_KEY } from '../../constants';

/**
 * @warning mutate spec
 */
export default function inlineRequiredProperties(spec) {
  forEach(spec, child => {
    if (isObject(child)) {
      inlineRequiredProperties(child);
    }
  });

  if (spec.type === 'object' && spec.required && Array.isArray(spec.required)) {
    spec.required.forEach(requiredProperty => {
      spec[PROPERTIES_KEY][requiredProperty].required = true;
    });
    delete spec.required;
  }

  return spec;
}
