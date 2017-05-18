'use strict';

const {AppStartBase} = require('hexin-core');

const BodyParser = require('./bodyParserConfig');
const Controllers = require('./controllersConfig');
const Db = require('./dbConfig');
const Errors = require('./errorsConfig');
const FiveBeans = require('./fiveBeansConfig');
const Indicatives = require('./indicativesConfig');
const Locale = require('./localeConfig');
const Logger = require('./loggerConfig');
const PublicPath = require('./publicPathConfig');
const Auth = require('./authConfig');
const RequirePath = require('./requirePathConfig');
const Router = require('./routerConfig');
const ServerStart = require('./serverStartConfig');
const HttpHeaders = require('./httpHeadersConfig');
const Views = require('./viewsConfig');

module.exports = class AppStart extends AppStartBase {

  setConfig(appConfig) {
    //    port
    appConfig.port = process.env.PORT || 8280;
    //    title of the app
    appConfig.title = 'WTT API';
    //    base URL for all routes (ex. /api)
    appConfig.baseUrl = '/api';
  }

  setHandlers(appConfig) {
    // handlers will be called in the order sorted here
    this.handle(new RequirePath(appConfig));
    this.handle(new Db(appConfig));
    this.handle(new Router(appConfig));
    this.handle(new HttpHeaders(appConfig)); // TODO:: TEMPORARY CORS, FIX IT
    this.handle(new Views(appConfig));
    this.handle(new PublicPath(appConfig));
    this.handle(new Logger(appConfig));
    this.handle(new FiveBeans(appConfig));
    this.handle(new Indicatives(appConfig));
    this.handle(new BodyParser(appConfig));
    this.handle(new Locale(appConfig));
    this.handle(new Auth(appConfig));
    this.handle(new Controllers(appConfig));
    this.handle(new Errors(appConfig));
    this.handle(new ServerStart(appConfig));
  }
};
