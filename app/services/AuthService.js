'use strict';

const {ServiceBase} = require('hexin-core');
const indicative = require('indicative');
const _ = require('lodash');

const jwt = require('jwt-simple');
const moment = require('moment');
const configs = require('../../configs').base;

// Models
const User = new require('../models/User');


module.exports = class AuthService extends ServiceBase {
  constructor(context_) {
    super(context_, User);
  }

  generateJwtToken(type, _id, opts) {
    let token = jwt.encode({
      iss: configs.host,
      sub: _id,
      exp: opts || (moment.utc().unix() + 172800),
      type: type
    }, configs.secret);
    return token;
  }

  async createUser(registerObj) {
    const {t} = this;

    let user = await User.findOne({email: registerObj.email}).exec();
    if (user) {
      throw new ValidationError(t('err_member_info_exist', [t('display_email_or_username')]));
    } else {
      const newUser = new User({
        firstName: registerObj.firstName,
        lastName: registerObj.lastName,
        email: registerObj.email,
        password: registerObj.password
      });
      return await newUser.save();
    }
  }

  async forgotPassword(email) {
    const {t} = this;
    let user = await User.findOne({email: email}).exec();
    if (!user) {
      throw new ValidationError(t('err_not_exist', [t('display_email_or_username')]));
    } else {
      return user.reset_token;
    }
  }

  async resetPassword(reset_token) {
    const {t} = this;
    let user = await User.findOne({'reset_token.token': reset_token});
    if (!user) {
      throw new ValidationError(t('err_reset_token_expired'));
    }
    return user;
  }

  async validate(obj) {
    const {t} = this;
    const rule = {
      firstName: 'required',
      lastName: 'required',
      email: 'required|email',
      password: 'required|min:6|max:10',
      confirmPassword: 'required|same:password'
    };
    const message = {
      required: t('msg_validation_required'),
      email: t('err_email_invalid'),
      'password.min': t('err_member_password_validation_6_10_digits'),
      same: t('err_member_password_not_match')
    };

    return await indicative.validateAll(obj, rule, message);
  }
};
