'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jwt-simple');
const {AppStartConfig} = require('hexin-core');

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
    const {userRepository: User} = new require('../app/repos/unitOfWork');
    const AuthService = require('../app/services/AuthService');
    const {appConfig} = this;
    const {router} = appConfig;

    router.use(async (req, res, next) => {
      if (req.headers.authorization) {
        let parts = req.headers.authorization.split(' ');
        if (/^Bearer$/i.test(parts[0])) {
          const token = jwt.decode(parts[1], appConfig.secret);
          let user = null;
          try {
            user = await User.findOne({_id: token.sub});
            if (user) {
              req.current_user = user;
            }
            next();
          } catch (err) {
            next();
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
      passReqToCallback: true
    }, async (req, username, password, callback) => {
      const {t} = req.locale;
      const authService = new AuthService(req);

      // co(async () => {
      console.log('abc', username);
      const user = await User.findOne({$or: [{username: username}, {email: username}]});
      console.log('user', user);
      // console.log('auth', password, await authService.verifyPassword(user, password));
      if (!user) {
        throw new ValidationError(t('err_find_no_result', ['users']));
      }
      if (await authService.verifyPassword(user, password)) {
        callback(null, user, 'Login successfully.');
      } else {
        throw new ValidationError(t('err_member_password_invalid'));
      }
      // })
      // .catch(errors => {
      //   return callback(errors, false, errors);
      // });
    }));
  }
};
