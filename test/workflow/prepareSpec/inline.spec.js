import chai from 'chai';
import forEach from 'lodash.foreach';

import * as inline from '../../../src/workflow/prepareSpec/inline';


describe('PrepareSwaggerSpec: inline', () => {
  const tests = {
    inlineParameters: [
      'must inline every definition',
      'must not remove others pameters',
      'must work when no global paramters',
      'must work when no specific paramters',
      'must create an empty pamameters array if no paramters',
    ],
  };

  forEach(tests, (functionTests, functionName) => {
    describe(functionName, () => {
      functionTests.forEach((test, i) => {
        it(test, () => {
          const input = require(`./${functionName}/${i}-input`);
          const expectedOutput = require(`./${functionName}/${i}-output`);
          chai.expect(inline[functionName](input)).to.deep.equal(expectedOutput);
        });
      });
    });
  });
});
