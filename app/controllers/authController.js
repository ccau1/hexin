'use strict';

const co = require('co');

const passport = require('passport');
const moment = require('moment');
const {ControllerBase} = require('hexin-core');

// Service
const AuthService = new require('../services/AuthService');

module.exports = class AuthController extends ControllerBase {
  constructor(app) {
    super(app, 'auth', AuthService);
  }

  renderRoutes(router) {
    const {authorize} = this;

    /**
    * @api {post} /auth/logout Logout user
    * @apiName Logout
    * @apiGroup auth
    *
    */
    router.get('/logout', function* (req, res, next) {
      // TODO:: implement logout logic

      res.json({});
    });

    /**
    * @api {post} /auth/login Get user token with credentials
    * @apiName Login
    * @apiGroup auth
    *
    * @apiParam {String} username User's Username/Email
    * @apiParam {String} password User's Password
    *
    * @apiSuccess {String} id ID of the User.
    * @apiSuccess {String} name  Name of the User.
    * @apiSuccess {String} email  Email of the User.
    * @apiSuccess {String} status  Status of the User.
    * @apiSuccess {String} token  Token of the User.
    */
    router.post('/token', passport.authenticate('local'), (req, res, next) => {
      const {m} = req;
      const {user} = req._passport.session;

      let token = m.generateJwtToken('member', user._id, {expire: moment.utc().unix() + 172800});
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        token: token
      });
    });

    /**
    * @api {post} /auth/register Register new user
    * @apiName Register
    * @apiGroup auth
    *
    * @apiParam {String} firstName First Name
    * @apiParam {String} lastName Last Name
    * @apiParam {String} email E-mail Address
    * @apiParam {String} password Password
    * @apiParam {String} confirmpassword Confirm Password
    *
    * @apiSuccess {String} firstName First Name
    * @apiSuccess {String} lastName Last Name
    * @apiSuccess {String} email E-mail Address
    * @apiSuccess {String} password Password
    * @apiSuccess {String} confirmpassword Confirm Password
    */
    router.post('/register', function* (req, res, next) {
      const {m} = req;
      const result = yield m.createUser(req.body);

      res.send(result);
    });

    /**
    * @api {get} /auth/user Get current user
    * @apiName Get Current User
    * @apiGroup auth
    *
    *
    * @apiSuccess {Object} user User
    */
    router.get('/user', authorize(), function* (req, res, next) {
      const {current_user} = req;
      res.send({
        _id: current_user._id,
        firstName: current_user.firstName,
        lastName: current_user.lastName,
        email: current_user.email,
        roles: current_user.roles
      });
    });

    /**
    * @api {post} /auth/forgot-password Forgot password
    * @apiName Forgot Password
    * @apiGroup auth
    *
    * @apiParam {String} email User's e-mail address
    *
    * @apiSuccess {String} reset_token  Token to call reset_password
    */
    router.post('/forgot-password', authorize(), function* (req, res, next) {
      const {m} = req;
      const result = yield m.forgotPassword(req.body.email);
      res.send(result);
    });

    /**
    * @api {post} /auth/reset-password Reset password
    * @apiName Reset Password
    * @apiGroup auth
    *
    * @apiParam {String} reset_token Reset token provided to user from email
    *
    */
    router.post('/reset-password', authorize(), function* (req, res, next) {
      const {m} = req;
      const result = yield m.resetPassword(req.body.reset_token);
      res.status(204).send(result);
    });
  }
};
