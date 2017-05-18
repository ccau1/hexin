'use strict';

const {AppStartConfig} = require('hexin-core');
const appModulePath = require('app-module-path');

module.exports = class RequirePathConfig extends AppStartConfig {
  init() {
    appModulePath.addPath(__dirname + '/app');
  }
};
