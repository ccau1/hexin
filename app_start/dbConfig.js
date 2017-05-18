'use strict';

const {AppStartConfig, Database} = require('hexin-core');

module.exports = class ErrorsConfig extends AppStartConfig {
  preInit(appConfig) {
    // dbConfigName is the name given in /configs/base/{NODE_ENV}.json -> db
    const dbConfigName = 'mongo-wttwe-db';
    const dbConfig = Object.assign({}, appConfig.db[dbConfigName], {default: true});
    Database.init(dbConfigName, dbConfig);
  }
};
