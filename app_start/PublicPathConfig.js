'use strict';

const {AppStartConfig} = require('hexin-core');
const express = require('express');

module.exports = class PublicPathConfig extends AppStartConfig {
  init(next) {
    const {app} = this.appConfig;
    app.use(express.static('public'));
    next();
  }
};
