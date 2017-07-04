'use strict';

const {AppStartConfig} = require('hexin-core');
const indicatives = require('../app/helpers/indicatives');

module.exports = class IndicativesConfig extends AppStartConfig {
  init(next) {
    // init custom indicatives
    indicatives.init();
    next();
  }
};
