import forEach from 'lodash.foreach';
import isNumber from 'lodash.isnumber';
import isPlainObject from 'lodash.isplainobject';


const LOG_LEVELS = {
  3: 'errors',
  2: 'warnings',
  1: 'infos',
};

/**
 * @param  {Array<Diff>} diff.breaks
 * @param  {Array<Diff>} diff.smooths
 * @param  {Array<RaxDiff>} diff.unmatchDiffs
 * @param  {String} versionDiff
 * @param  {Object} config.changes
 * @param  {Object} config.rules
 * @return
 * {
 *   errors: {Array>Diff>}
 *   warnings: {Array>Diff>}
 *   infos: {Array>Diff>}
 *   unmatchDiffs: {Array<RawDiff>}
 * }
 * @note Diff: {ruleId: String, message: String}
 */
export default function postProcessDiff({breaks, smooths, unmatchDiffs}, versionDiff = 'unchanged', config) {
  const diff = {
    errors: [],
    warnings: [],
    infos: [],
    unmatchDiffs,
  };

  forEach([
    { changes: breaks, type: 'breaks' },
    { changes: smooths, type: 'smooths' },
  ],
  ({changes, type}) => forEach(changes, change => {
    const ruleConfig = config.rules[change.ruleId];
    const globalConfig = config.changes[type];

    const level = isNumber(ruleConfig) ? ruleConfig
                : isPlainObject(ruleConfig) ? ruleConfig[versionDiff]
                : globalConfig[versionDiff];

    if (LOG_LEVELS[level]) {
      diff[LOG_LEVELS[level]].push(change);
    }
  }));

  return diff;
}
