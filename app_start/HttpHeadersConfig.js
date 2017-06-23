'use strict';

const {AppStartConfig} = require('hexin-core');

module.exports = class HttpHeadersConfig extends AppStartConfig {
  init() {
    const {router} = this.appConfig;

    router.use(this.middleware);
  }

  middleware(req, res, next) {
    // TODO:: should not use allow all origins
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  }
};
