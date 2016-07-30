import forEach from 'lodash.foreach';
import extend from 'extend';


/**
 * @param {Array<RawDiff>} diffs Result of diff module
 * @param {Map} breakRules  map of breaking rules indexed by their id
 * @param {Map} smoothRules map of smooth rules indexed by their id
 * @return {
 *   breaks: Array<Diff>
 *   smooths: Array<Diff>,
 *   unmatchDiffs: Array<RawDiff>
 * }
 * @note Diff: {ruleId: String, message: String}
 */
export default function applyRules(diffs, breakRules = {}, smoothRules = {}) {
  let breaks = [];
  let smooths = [];
  let unmatchDiffs = [];

  forEach(diffs, diff => {
    let matchRule = false;

    forEach(breakRules, (rule, ruleId) => {
      const ruleResult = rule(diff);
      if (ruleResult) {
        matchRule = true;
        const ruleMessage = { ruleId };
        extend(ruleMessage, ruleResult);
        breaks = breaks.concat(ruleMessage);
        return false; // break
      }
      return true;
    });

    if (matchRule) {
      return true; // continue
    }

    forEach(smoothRules, (rule, ruleId) => {
      const ruleResult = rule(diff);
      if (ruleResult) {
        matchRule = true;
        const ruleMessage = { ruleId };
        extend(ruleMessage, ruleResult);
        smooths = smooths.concat(ruleMessage);
        return false; // break
      }
      return true;
    });

    if (matchRule) {
      return true; // continue
    }

    unmatchDiffs = unmatchDiffs.concat(diff);
    return true;
  });

  return {
    breaks,
    smooths,
    unmatchDiffs,
  };
}
