import compose from '../../utils/compose';
import dereference from './dereference';
import inlineParameters from './inlineParameters';


/**
 * @param  {Object} spec
 * @return {Promise}
 */
export default function prepareSpec(spec) {
  return dereference(spec)
    .then(dereferencedSpec => {
      return compose(
        inlineParameters,
        inlineSecurity,
        inlineSchemes,
        inlineConsumes,
        inlineProduces
      )(dereferencedSpec);
    });
}
