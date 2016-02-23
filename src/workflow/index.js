/* eslint no-param-reassign:0 */

import deepDiff from 'deep-diff';
import semver from 'semver';

import getConfig from './getConfig';
import prepareSpec from './prepareSpec';
import applyRules from './applyRules';
import postProcessDiff from './postProcessDiff';
import rules from '../rules';


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

  config = getConfig(config);
  return Promise.all([
    prepareSpec(oldSpec),
    prepareSpec(newSpec),
  ])
  .then(([prepOldSpec, prepNewSpec]) => {
    debug('specs perpared');

    let versionDiff;
    if (prepOldSpec.info && prepNewSpec.info) {
      const oldVersion = prepOldSpec.info.version;
      const newVersion = prepNewSpec.info.version;
      if (!semver.valid(oldVersion) || !semver.valid(newVersion)) {
        debug('one swagger file version is not semver compliant => ignore version comparison');
      } else {
        versionDiff = semver.diff(oldVersion, newVersion);
        if (versionDiff === null) {
          versionDiff = 'unchanged';
        }
      }
      prepOldSpec.info.version = null;
      prepNewSpec.info.version = null;
    }

    debug('versionDiff', versionDiff);

    const rawDiffs = deepDiff(prepOldSpec, prepNewSpec);
    debug('rawDiffs', rawDiffs);

    const changes = applyRules(rawDiffs, rules.break, rules.smooth);
    debug('changes', changes);

    const diffs = config.skipDiffPostProcessing ? changes
                : postProcessDiff(changes, versionDiff, config);
    debug('diffs', diffs);

    return diffs;
  });
}
