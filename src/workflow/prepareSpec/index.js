import dereference from './dereference';
import inlineGlobals from './inlineGlobals';
import inlineParameters from './inlineParameters';
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

      let specs = inlineGlobals(dereferencedSpec);
      debug('globals inlined');

      specs = inlineParameters(dereferencedSpec);
      debug('parameters inlined');

      return specs;
    });
}
