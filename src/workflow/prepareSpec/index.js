import dereference from './dereference';
import indexParameters from './indexParameters';
import inlineGlobals from './inlineGlobals';
import inlineParameters from './inlineParameters';
import inlineRequiredProperties from './inlineRequiredProperties';
import isPlainObject from 'lodash.isplainobject';
import path from 'path';


/**
 * @param  {string|object} spec
 * @return {Promise}
 */
export default function prepareSpec(spec) {
  const debug = require('debug')('swagger-diff:workflow:prepareSpec');

  debug('start');

  let specRef;
  if (isPlainObject(spec)) {
    specRef = spec;
  } else if (isUrl(spec)) {
    specRef = spec;
  } else if (!process.browser && typeof spec === 'string') {
    specRef = spec;
    if (!path.isAbsolute(specRef)) {
      specRef = path.resolve(process.cwd(), specRef);
    }
  } else {
    throw new Error('Incorrect spec, only URL or object are supported in browser');
  }

  return dereference(specRef)
    .then(dereferencedSpec => {
      debug('dereferenced');
      let specs = dereferencedSpec;

      specs = inlineGlobals(specs);
      debug('globals inlined');

      specs = inlineParameters(specs);
      debug('parameters inlined');

      specs = indexParameters(specs);
      debug('parameters indexed');

      specs = inlineRequiredProperties(specs);
      debug('required properties inlined');

      return specs;
    });
}

function isUrl(str) {
  return typeof str === 'string' && str.indexOf('http') === 0;
}
