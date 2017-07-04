'use strict';

const {Config} = require('hexin-core');

module.exports.env = process.env.NODE_ENV || 'development';
module.exports.base = undefined;
module.exports.__global__ = {};

module.exports.init = function (env) {
  const baseSettings = {
    NODE_ENV: env || this.env
  };

  // if base is already set, don't fetch again
  this.base = this.base || Object.assign({}, Config.get('base', this.env || env), baseSettings);
};
