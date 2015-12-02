import deepDiff from 'deep-diff';
import requireAll from 'require-all';
import semver from 'semver';

import getConfig from './getConfig';
import prepareSpec from './prepareSpec';
import applyRules from './applyRules';
import postProcessDiff from './postProcessDiff';
import { BREAK_RULES_DIR, SMOOTH_RULES_DIR } from '../constants';


const breakRules = requireAll(BREAK_RULES_DIR);
const smoothRules = requireAll(SMOOTH_RULES_DIR);

/**
 * @param  {string|object} oldSpec - The file path of the old Swagger spec; or a Swagger object.
 * @param  {string|object} newSpec - The file path of the new Swagger spec; or a Swagger object.
 * @param  {string|object} config  - The file path of the config file or the config file
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
  const debug = require('debug')('swagger-diff:workflow');
  debug('start');

  config = getConfig(config); // eslint-disable-line no-param-reassign
  return Promise.all([
    prepareSpec(oldSpec),
    prepareSpec(newSpec),
  ])
  .then(([prepOldSpec, prepNewSpec]) => {
    debug('specs perpared');

    let versionDiff;
    if (prepOldSpec.info && prepOldSpec.info.version && prepNewSpec.info && prepNewSpec.info.version) {
      versionDiff = semver.diff(prepOldSpec.info.version, prepNewSpec.info.version);
      if (versionDiff === null) {
        versionDiff = 'unchanged';
      }
      prepOldSpec.info.version = null;
      prepNewSpec.info.version = null;
    }
    debug('versionDiff', versionDiff);

    const rawDiffs = deepDiff(prepOldSpec, prepNewSpec);
    debug('rawDiffs', rawDiffs);

    const changes = applyRules(rawDiffs, breakRules, smoothRules);
    debug('changes', changes);

    const diffs = config.skipDiffPostProcessing ? changes : postProcessDiff(changes, versionDiff, config);
    debug('diffs', diffs);

    return diffs;
  });
}
