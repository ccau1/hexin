'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jwt-simple');
const co = require('co');
const {AppStartConfig, HandleError} = require('hexin-core');

module.exports = class AuthConfig extends AppStartConfig {
  preInit(appConfig) {
    const {app} = appConfig;
    app.use(passport.initialize());
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });
  }
  init() {
    const User = new require('../app/models/User');
    const {appConfig} = this;
    const {router} = appConfig;

    router.use((req, res, next) => {
      console.log('auth middleware');
      if (req.headers.authorization) {
        let parts = req.headers.authorization.split(' ');
        console.log('wha');
        if (/^Bearer$/i.test(parts[0])) {
          try {
            console.log('baba');
            const token = jwt.decode(parts[1], appConfig.secret);

            User.findOne({_id: token.sub}, (errors, user) => {
              if (user) {
                req.current_user = user;
              }
              next();
            });
          } catch (e) {
            console.log('auth middleware next');
            next();
            // return res.status(401).json({message: 'Unauthorized'});
          }
        }
      } else {
        next();
      }
      return null;
    });

    // declare password strategy
    passport.use('local', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    }, (req, username, password, callback) => {
      const {t} = req.locale;

      co(function* () {
        const user = yield User.findOne({$or: [{name: username}, {email: username}]}).exec();
        if (!user) {
          throw new HandleError({_error: [t('err_find_no_result', ['users'])]}, 400);
        }
        if (yield user.verifyPassword(password)) {
          callback(null, user, 'Login successfully.');
        } else {
          throw new HandleError({_error: [t('err_member_password_invalid')]}, 400);
        }
      })
      .catch(errors => {
        return callback(errors, false, errors);
      });
    }));
  }
};
