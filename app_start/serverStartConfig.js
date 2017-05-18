'use strict';

const {AppStartConfig} = require('hexin-core');

module.exports = class ServerStartConfig extends AppStartConfig {
  init() {
    const {app, port, title} = this.appConfig;

    // START THE SERVER
    app.listen(port);
    console.warn('Create ' + title + ' server on port ' + port);
  }
};
