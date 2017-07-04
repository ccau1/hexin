'use strict';

const {AppStartConfig} = require('hexin-core');

module.exports = class UnitOfWorkConfig extends AppStartConfig {
  init(next) {
    const {router} = this.appConfig;
    router.use(this.middleware.bind(this));
    this.WTTContext = require('../app/models/WTTContext_mysql');
    this.UnitOfWork = require('../app/repos/_unitOfWork');
    next();
  }

  middleware(req, res, next) {
    const {UnitOfWork, WTTContext} = this;
    if (!req.unitOfWork) {
      req.unitOfWork = new UnitOfWork(new WTTContext());
      req.unitOfWork.init().then(result => {
        next();
      });
    }
    res.on('finish', () => {
      if (req.unitOfWork && req.unitOfWork.context && req.unitOfWork.context.commit) {
        req.unitOfWork.context.commit(false);
      }
    });
  }
};
