'use strict';

require('app-module-path').addPath(__dirname);
const configs = require('./configs');
const AppStart = require('./app_start');

// set options in config folder based on NODE_ENV
configs.init(process.env.NODE_ENV);
// configs.init('local');

// trigger app_start calls
(new AppStart(configs.base)).init();
