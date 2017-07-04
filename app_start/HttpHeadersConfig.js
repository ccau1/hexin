'use strict';

const {AppStartConfig} = require('hexin-core');

module.exports = class HttpHeadersConfig extends AppStartConfig {
  init(next) {
    const {router} = this.appConfig;

    router.use(this.middleware);
    next();
  }

  middleware(req, res, next) {
    // TODO:: should not use allow all origins
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercepts OPTIONS method
    if (req.method === 'OPTIONS') {
      // respond with 200
      res.send(200);
    } else {
      // move on
      next();
    }
  }
};
