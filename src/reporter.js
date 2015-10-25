
/**
 * Compute string to output on terminal
 * @param  {Array>Diff>}    options.errors
 * @param  {Array>Diff>}    options.warnings
 * @param  {Array>Diff>}    options.infos
 * @param  {Array<RawDiff>} options.unmatchDiffs
 * @return {String}
 */
export default function({errors, warnings, infos, unmatchDiffs}) {
  let output = '';
  if (errors.length > 0) {
    output += 'ERRORS\n' + errors.map(diff => `${diff.message}\t\t${diff.ruleId}`).join('\n') + '\n';
  }
  if (warnings.length > 0) {
    output += 'WARNINGS\n' + warnings.map(diff => `${diff.message}\t\t${diff.ruleId}`).join('\n') + '\n';
  }
  if (infos.length > 0) {
    output += 'INFOS\n' + infos.map(diff => `${diff.message}\t\t${diff.ruleId}`).join('\n') + '\n';
  }
  if (unmatchDiffs.length > 0) {
    output += 'UNMATCHED DIFFS\n' + unmatchDiffs.map(rawDiff => JSON.stringify(rawDiff)).join('\n');
  }
}
