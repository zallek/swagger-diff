import chalk from 'chalk';

/**
 * Compute string to output on terminal
 * @param  {Array>Diff>}    options.errors
 * @param  {Array>Diff>}    options.warnings
 * @param  {Array>Diff>}    options.infos
 * @param  {Array<RawDiff>} options.unmatchDiffs
 * @return {String}
 */
export default function ({ errors, warnings, infos, unmatchDiffs }) {
  let output = 'swagger-diff\n';

  const errorColor = errors.length > 0 ? chalk.red : chalk.white;
  output += errorColor(`Errors (${errors.length})\n`);
  if (errors.length > 0) {
    output += errors.map(diff => `${padSpaces(diff.ruleId, 30)}${diff.message}`).join('\n');
    output += '\n';
  }

  const warningColor = warnings.length > 0 ? chalk.yellow : chalk.white;
  output += warningColor(`Warnings (${warnings.length})\n`);
  if (warnings.length > 0) {
    output += warnings.map(diff => `${padSpaces(diff.ruleId, 30)}${diff.message}`).join('\n');
    output += '\n';
  }

  if (infos.length > 0) {
    output += `Infos (${infos.length})\n`;
    output += infos.map(diff => `${padSpaces(diff.ruleId, 30)}${diff.message}`).join('\n');
    output += '\n';
  }

  const unmatchedColor = unmatchDiffs.length > 0 ? chalk.yellow : chalk.white;
  if (unmatchDiffs.length > 0) {
    output += unmatchedColor(`Unmatched diffs (${unmatchDiffs.length})\n`);
    output += unmatchDiffs.map(rawDiff => JSON.stringify(rawDiff)).join('\n');
  }

  return output;
}

function padSpaces(string, length) {
  let output = string;
  for (let i = 0; i < length - string.length; i++) {
    output += ' ';
  }
  return output;
}
