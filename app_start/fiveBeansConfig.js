'use strict';

const {AppStartConfig} = require('hexin-core');
const FiveBeans = require('hexin-core/helpers/FiveBeans');

module.exports = class FiveBeansConfig extends AppStartConfig {
  init() {
    const {beanstalkd} = this.appConfig;

    FiveBeans.connect(beanstalkd, function (err) {
      if (err) {
        console.warn('Fail to connect to beanstalk server.');
        process.exit(1);
      }
    });
  }
};
