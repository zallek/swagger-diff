import chai from 'chai';
import forEach from 'lodash.foreach';


describe('Prepare Spec', () => {
  const tests = {
    inlineGlobals: [
      'must inline every definition',
      'must not modify specific definition',
      'must work when no global definition',
      'must work when no specific definition',
      'must create an empty definition array if no definition',
      'must not remove others properties',
    ],
    inlineParameters: [
      'must inline every definition',
      'must merge definitions',
      'must work when no global definition',
      'must work when no specific definition',
      'must create an empty definition array if no definition',
      'must not remove others properties',
    ],
    indexParameters: [
      'must index every definition',
      'must work when no definition',
    ],
    inlineRequiredProperties: [
      'must inline params properties',
      'must inline definitions properties',
      'must inline definitions properties deeply',
    ],
  };

  forEach(tests, (moduleTests, moduleName) => {
    const module = require(`../../../src/workflow/prepareSpec/${moduleName}`);
    describe(moduleName, () => {
      moduleTests.forEach((test, i) => {
        it(test, () => {
          const input = require(`./${moduleName}/${i}-input`);
          const expectedOutput = require(`./${moduleName}/${i}-output`);
          chai.expect(module(input)).to.deep.equal(expectedOutput);
        });
      });
    });
  });
});
