import diff from 'diff';
import requireAll from 'require-all';
import semver from 'semver';

import applyRules from './applyRules';
import postProcessDiff from './postProcessDiff';
import prepareSwaggerSpec from './prepareSwaggerSpec';
import { BREAK_RULES_DIR, SMOOTH_RULES_DIR } from '../constants';


const breakRules = requireAll({
  dirname: BREAK_RULES_DIR,
  filter: /\.js$/,
});
const smoothRules = requireAll({
  dirname: SMOOTH_RULES_DIR,
  filter: /\.js$/,
});

/**
 * @param  {SwaggerSpec Object} oldSpec
 * @param  {SwaggerSpec Object} newSpec
 * @param  {Object} config
 * @return {Promise}
 * Promise returns the following obejct
 * {
 *   errors: {Array>Diff>}
 *   warnings: {Array>Diff>}
 *   infos: {Array>Diff>}
 *   unmatchDiffs: {Array<RawDiff>}
 * }
 */
export default function swaggerDiff(oldSpec, newSpec, config) {
  Promise.all(
    prepareSwaggerSpec(oldSpec),
    prepareSwaggerSpec(newSpec)
  )
  .then(([preparedOldSpec, preparedNewSpec]) => {
    const versionDiff = semver.diff(preparedOldSpec.infos.version, preparedNewSpec.infos.version);
    preparedOldSpec.infos.version = null;
    preparedNewSpec.infos.version = null;

    const rawDiffs = diff(preparedOldSpec, preparedNewSpec);
    const diffs = applyRules(rawDiffs, breakRules, smoothRules);
    return postProcessDiff(diffs, versionDiff, config);
  });
}
