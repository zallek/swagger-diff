import chai from 'chai';

import dereference from '../../../src/workflow/prepareSpec/dereference';


describe('PrepareSwaggerSpec: dereference', () => {
  const tests = [
    'must deference every definition',
  ];

  tests.forEach((test, i) => {
    it(test, (done) => {
      const input = require(`./dereference/${i}-input`);
      const expectedOutput = require(`./dereference/${i}-output`);
      dereference(input)
        .then(output => {
          chai.expect(output).to.deep.equal(expectedOutput);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
