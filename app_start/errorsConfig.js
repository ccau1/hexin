'use strict';

const {AppStartConfig} = require('hexin-core');

module.exports = class ErrorsConfig extends AppStartConfig {
  init() {
    const {router} = this.appConfig;
    router.use(function (error, req, res, next) {
      req.log('error', error.stack);

      if (error.status) {
        return res.status(error.status).json(error.message);
      }

      return res.status(500).json({'message': 'internal server error'});
    });
  }

  middleware(error, req, res, next) {
    req.log('error', error.stack);

    if (error.status) {
      return res.status(error.status).json(error.message);
    }

    return res.status(500).json({'message': 'internal server error'});
  }
};
