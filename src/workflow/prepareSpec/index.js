import deference from './inline';
import inline from './inline';


/**
 * @param  {Object} spec
 * @return {Promise}
 */
export default function prepareSpec(spec) {
  return dereference(spec)
    .then(output => {
      return inline(output);
    });
}
