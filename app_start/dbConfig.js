'use strict';

const {AppStartConfig, Database} = require('hexin-core');

module.exports = class ErrorsConfig extends AppStartConfig {
  preInit(appConfig) {
    const appDbNames = Object.keys(appConfig.db);
    if (appDbNames.length) {
      appDbNames.forEach(dbName => {
        Database.init(dbName, appConfig.db[dbName]);
      });

      // if no defaults were set, set it to the first appDbName
      if (!Database.getConnection()) {
        Database.setDefault(appDbNames[0]);
      }
    }
  }
};
