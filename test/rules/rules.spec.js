import chai from 'chai';
import fs from 'fs';
import forEach from 'lodash.foreach';
import requireAll from 'require-all';
import path from 'path';

import swaggerDiff from '../../src/index';
import { BREAK_RULES_DIR, SMOOTH_RULES_DIR } from '../../src/constants';
const breakRules = requireAll(BREAK_RULES_DIR);
const smootRules = requireAll(SMOOTH_RULES_DIR);


describe('Rules', () => {
  describe('Break', () => {
    forEach(breakRules, (rule, ruleId) => {
      describe(ruleId, () => {
        const dirname = path.join(__dirname, 'break', ruleId);
        if (!fs.existsSync(dirname)) {
          it('should be tested');
          return;
        }
        const outputs = requireAll({
          dirname,
          filter: /(\d+)-output\.json$/,
        });
        forEach(outputs, (output, testId) => {
          it('Test ' + testId, (done) => {
            const oldSpec = require(`./break/${ruleId}/${testId}-old`);
            const newSpec = require(`./break/${ruleId}/${testId}-new`);
            swaggerDiff(oldSpec, newSpec, {skipDiffPostProcessing: true})
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
