import dereference from './dereference';
import indexParameters from './indexParameters';
import inlineGlobals from './inlineGlobals';
import inlineParameters from './inlineParameters';
import inlineRequiredProperties from './inlineRequiredProperties';
import path from 'path';


/**
 * @param  {string|object} spec
 * @return {Promise}
 */
export default function prepareSpec(spec) {
  const debug = require('debug')('swagger-diff:workflow:prepareSpec');

  debug('start');
  if (typeof spec === 'string' && !path.isAbsolute(spec)) {
    spec = path.resolve(process.cwd(), spec); // eslint-disable-line no-param-reassign
  }

  return dereference(spec)
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
