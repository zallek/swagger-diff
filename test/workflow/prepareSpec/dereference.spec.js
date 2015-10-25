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

  it('must not deference circular definitions', (done) => {
      const input = require(`./dereference/circular-input`);
      dereference(input)
        .catch(err => {
          chai.expect(err).to.be.instanceof(ReferenceError);
          chai.expect(err.message).to.match(/^Circular \$ref pointer found/);
          done();
        });
    });
});
