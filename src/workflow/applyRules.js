import forEach from 'lodash.foreach';


/**
 * @param {Array<RawDiff>} diffs Result of diff module
 * @param {Map} breakRules  map of breaking rules indexed by their id
 * @param {Map} smoothRules map of smooth rules indexed by their id
 * @return {
 *   breaks: Array<Diff>
 *   smooths: Array<Diff>,
 *   unmatchDiffs: Array<RawDiff>
 * }
 * with Diff: {ruleId: String, message: String}
 */
export function applyRules(diffs, breakRules = {}, smoothRules = {}) {
  let breaks = [];
  let smooths = [];
  let unmatchDiffs = [];

  forEach(diffs, diff => {
    let matchRule = false;

    forEach(breakRules, (rule, ruleId) => {
      const ruleResult = rule(diff);
      if (ruleResult) {
        matchRule = true;
        breaks = breaks.concat({
          ruleId,
          message: ruleResult,
        });
        return false;
      }
    });

    if (matchRule) {
      return false;
    }

    forEach(smoothRules, (rule, ruleId) => {
      const ruleResult = rule(diff);
      if (ruleResult) {
        matchRule = true;
        smooths = smooths.concat({
          ruleId,
          message: ruleResult,
        });
        return false;
      }
    });

    if (matchRule) {
      return false;
    }

    unmatchDiffs = unmatchDiffs.concat(diff);
  });

  return {
    breaks,
    smooths,
    unmatchDiffs,
  };
}
