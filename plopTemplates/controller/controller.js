'use strict';

const {$1} = require('hexin-core');

// Service
const $2Service = new require('../services/$2Service');

module.exports = class $2Controller extends $1 {
  constructor(app) {
    super(app, '$3', $2Service);
  }

  renderRoutes(router) {
    // const {authorize} = this;

  }
};
