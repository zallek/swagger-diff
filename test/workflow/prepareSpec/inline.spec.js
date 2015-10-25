import chai from 'chai';
import forEach from 'lodash.foreach';


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
