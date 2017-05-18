'use strict';

const chai = require('chai');
const expect = chai.expect;

const configs = require('../configs');

describe('Test configs', function () {
  it('config file name ', function* () {
    configs.init(process.env.NODE_ENV);

    expect(configs.base).to.not.be.undefined;
  });
});
