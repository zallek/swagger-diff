import diff from 'diff';
import requireAll from 'require-all';
import semver from 'semver';

import getConfig from './getConfig';
import prepareSwaggerSpec from './prepareSwaggerSpec';
import applyRules from './applyRules';
import postProcessDiff from './postProcessDiff';
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
 * @param  {string|object} oldSpec - The file path of the old Swagger spec; or a Swagger object.
 * @param  {string|object} newSpec - The file path of the new Swagger spec; or a Swagger object.
 * @param  {string|objec}  config - The file path of the config file or the config file
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
  config = getConfig(config); // eslint-disable-line no-param-reassign
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
