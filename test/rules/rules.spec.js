import chai from 'chai';
import fs from 'fs';
import forEach from 'lodash.foreach';
import path from 'path';
import requireAll from 'require-all';

import swaggerDiff from '../../src/index';
import allRules from '../../src/rules';


const RULES_TYPES = [
  {
    label: 'Break Rules',
    rules: allRules.break,
    testFolder: 'break',
  },
  {
    label: 'Smooth Rules',
    rules: allRules.smooth,
    testFolder: 'smooth',
  },
];

RULES_TYPES.forEach(({ label, rules, testFolder }) => {
  describe(label, () => {
    forEach(rules, (rule, ruleId) => {
      describe(ruleId, () => {
        const dirname = path.join(__dirname, testFolder, ruleId);
        if (!fs.existsSync(dirname)) {
          it('should be tested');
          return;
        }
        const outputs = requireAll({
          dirname,
          filter: /(\d+)-output\.json$/,
        });
        forEach(outputs, (output, testId) => {
          it(`Test ${testId}`, (done) => {
            const oldSpec = require(`./${testFolder}/${ruleId}/${testId}-old`);
            const newSpec = require(`./${testFolder}/${ruleId}/${testId}-new`);
            swaggerDiff(oldSpec, newSpec, { skipDiffPostProcessing: true })
              .then(diff => {
                chai.expect(diff).to.deep.equal(output);
                done();
              })
              .catch(err => done(err));
          });
        });
      });
    });
  });
});
