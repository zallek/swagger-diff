import compose from '../../utils/compose';
import dereference from './dereference';
import inlineGlobals from './inlineGlobals';
import inlineParameters from './inlineParameters';


/**
 * @param  {Object} spec
 * @return {Promise}
 */
export default function prepareSpec(spec) {
  return dereference(spec)
    .then(dereferencedSpec => {
      return compose(
        inlineGlobals,
        inlineParameters
      )(dereferencedSpec);
    });
}
