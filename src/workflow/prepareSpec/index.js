import dereference from './dereference';
import inlineGlobals from './inlineGlobals';
import inlineParameters from './inlineParameters';


/**
 * @param  {Object} spec
 * @return {Promise}
 */
export default function prepareSpec(spec) {
  const debug = require('debug')('swagger-diff:workflow:prepareSpec');

  debug('start');
  return dereference(spec)
    .then(dereferencedSpec => {
      debug('dereferenced');

      let specs = inlineGlobals(dereferencedSpec);
      debug('globals inlined');

      specs = inlineParameters(dereferencedSpec);
      debug('parameters inlined');

      return specs;
    });
}
