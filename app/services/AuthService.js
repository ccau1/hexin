'use strict';

const {ServiceBase} = require('hexin-core');
const indicative = require('indicative');
const _ = require('lodash');

const jwt = require('jwt-simple');
const moment = require('moment');
const configs = require('../../configs').base;
const bCrypt = require('bcrypt-nodejs');
const MongoGenericRepository = require('hexin-core/repos/MongoGenericRepository');

module.exports = class AuthService extends ServiceBase {
  constructor(context_) {
    super(context_, context_.unitOfWork.UserRepository);
  }

  async verifyPassword(user, password) {
    return await new Promise((resolve, reject) => {
      bCrypt.compare(password, user.password, (error, result) => {
        console.log('verifyPassword', error, result);
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }

  async getHash(password) {
    return await new Promise((resolve, reject) => {
      bCrypt.genSalt(10, (saltErrors, salt) => {
        if (saltErrors) {
          throw new Error(saltErrors);
        }
        bCrypt.hash(password, salt, null, (hashErrors, hash) => {
          if (hashErrors) {
            throw new Error(saltErrors);
          }
          resolve(hash);
        });
      });
    });
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
    const {t, _repo, unitOfWork} = this;

    let user = await _repo.findOne({email: registerObj.email});
    if (user) {
      throw new ValidationError(t('err_member_info_exist', [t('display_email_or_username')]));
    } else {
      const hashedPassword = await this.getHash(registerObj.password);
      let newUser = {
        firstName: registerObj.firstName,
        lastName: registerObj.lastName,
        email: registerObj.email,
        username: registerObj.email,
        password: hashedPassword,
        roles: _repo instanceof MongoGenericRepository ? ['user'] : 'user'
      };
      const savedUser = await _repo.create(newUser);
      await unitOfWork.context.commit();
      return savedUser;
    }
  }

  async forgotPassword(email) {
    const {t, _repo} = this;
    let user = await _repo.findOne({email: email});
    if (!user) {
      throw new ValidationError(t('err_not_exist', [t('display_email_or_username')]));
    } else {
      return user.reset_token;
    }
  }

  async resetPassword(reset_token) {
    const {t, _repo} = this;
    let user = await _repo.findOne({'reset_token.token': reset_token});
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
