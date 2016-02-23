#!/usr/bin/env node

/* eslint no-var: 0, prefer-template: 0, func-names:0, prefer-arrow-callback:0 */

var path = require('path');
var fs = require('fs');


var BREAK_RULES_DIR = path.join(__dirname, 'src/rules/break');
var SMOOTH_RULES_DIR = path.join(__dirname, 'src/rules/smooth');
var RULES_INDEX_PATH = path.join(__dirname, 'src/rules/index.js');

var breakRulesIds = fs.readdirSync(BREAK_RULES_DIR).map(function (file) {
  return file.slice(0, -3);
});
var smoothRulesIds = fs.readdirSync(SMOOTH_RULES_DIR).map(function (file) {
  return file.slice(0, -3);
});

// Generate JS code
var rulesIndex = (
'/**\n' +
'  Generated File\n' +
'  Do not manually modify, use `npm run build:genRulesIndex` instead.\n' +
'**/\n\n' +
'export default {\n' +
'  break: {\n' +
breakRulesIds.map(function (id) {
  return '    \'' + id + '\': require(\'./break/' + id + '.js\'),\n';
}).join('') +
'  },\n' +
'  smooth: {\n' +
smoothRulesIds.map(function (id) {
  return '    \'' + id + '\': require(\'./smooth/' + id + '.js\'),\n';
}).join('') +
'  },\n' +
'};\n'
);

fs.writeFileSync(RULES_INDEX_PATH, rulesIndex, 'utf8');
