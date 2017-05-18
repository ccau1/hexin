'use strict';

const {AppStartConfig, Database} = require('hexin-core');

module.exports = class ErrorsConfig extends AppStartConfig {
  preInit(appConfig) {
    const dbName = 'mongo-wttwe-db';
    const dbConfig = Object.assign({}, appConfig.db[dbName], {default: true});
    Database.init(dbName, dbConfig);
  }
};
