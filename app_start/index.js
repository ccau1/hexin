'use strict';

const {AppStartBase} = require('hexin-core');

const {
  BodyParserConfig: BodyParser,
  DbConfig: Db,
  LoggerConfig: Logger,
  ErrorsConfig: Errors,
  ServerStartConfig: ServerStart,
  RouterConfig: Router
} = require('hexin-core/app_start');

// const {FiveBeans} = require('hexin-core/app_start');
// const Mailer = require('hexin-core/app_start/configs/MailerConfig');
// const Redis = require('hexin-core/app_start/configs/RedisConfig');

const Auth = require('./AuthConfig');
const Controllers = require('./ControllersConfig');
const HttpHeaders = require('./HttpHeadersConfig');
const Indicatives = require('./IndicativesConfig');
const Locale = require('./LocaleConfig');
const PublicPath = require('./PublicPathConfig');
const Views = require('./ViewsConfig');

module.exports = class AppStart extends AppStartBase {

  setConfig(appConfig) {

  }

  setHandlers(appConfig) {
    // Note: handlers will be called in the order sorted here

    // HANDLE BEGIN :: (Don't remove this line)
    this.handle(new Db(appConfig));
    this.handle(new Router(appConfig));
    this.handle(new HttpHeaders(appConfig));
    this.handle(new Views(appConfig));
    this.handle(new PublicPath(appConfig));
    this.handle(new Logger(appConfig));
    // this.handle(new Mailer(appConfig)); // Access from require('hexin-core/Mailer').client
    // this.handle(new FiveBeans(appConfig)); // Access from require('hexin-core/FiveBeans').client
    // this.handle(new Redis(appConfig)); // Access from require('hexin-core/Redis').client
    this.handle(new Indicatives(appConfig));
    this.handle(new BodyParser(appConfig));
    this.handle(new Locale(appConfig));
    this.handle(new Auth(appConfig));
    this.handle(new Controllers(appConfig));
    this.handle(new Errors(appConfig));
    this.handle(new ServerStart(appConfig));
    // HANDLE END :: (Don't remove this line)
  }
};
