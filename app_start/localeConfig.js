'use strict';

const path = require('path');
const {AppStartConfig} = require('hexin-core');
const {Locale} = require('hexin-core/helpers');

module.exports = class LocaleConfig extends AppStartConfig {
  preInit(appConfig) {
    appConfig.localeSettings = {
      default: 'en',
      path: path.dirname(require.main.filename) + '/locales',
      accept: {
        zh_HK: ['zh_HK'],
        zh_CN: ['zh_CN'],
        en: ['en-us', 'en-au', 'en-bz', 'en-zw', 'en-gb', 'en-tt', 'en-za', 'en-ph', 'en-nz', 'en-jm', 'en-ie', 'en-ca'],
      },
    };
  }

  init() {
    const {router} = this.appConfig;
    router.use(this.middleware.bind(this));
  }

  middleware(req, res, next) {
    const {appConfig} = this;
    let locale = new Locale(appConfig.localeSettings);

    // example acceptLanguage: en;q=1,tc,sc;q=3 (q defaults to 1)
    let acceptLanguage = req.headers['accept-language'];
    if (acceptLanguage) {
      let languages = [];
      let acceptLanguages = acceptLanguage.split(',');
      for (let i = 0; i < acceptLanguages.length; i++) {
        let parts = acceptLanguages[i].split(';');
        let qValue = 1;
        for (let p = 0; p < parts.length; p++) {
          let part = parts[p].split('=');
          if (part[0] === 'q' && !isNaN(part[1])) {
            qValue = Number(part[1]);
            break;
          }
        }
        languages.push({code: parts[0], q: qValue});
      }
      if (languages.length) {
        languages.sort(function (a, b) {
          return b.q - a.q;
        });

        languages.find(lang => locale.isValidLanguageCode(lang.code) && locale.setCurrentLanguage(lang.code));
      }
    }
    req.locale = locale;
    next();
  }
};
