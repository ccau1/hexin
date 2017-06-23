'use strict';

const mongoose = require('hexin-core/helpers/Database').getConnection();

const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const bCrypt = require('bcrypt-nodejs');
// const {generateToken} = require('hexin-core/helpers/Token');

const UserSchema = new Schema({
  roles: [String],
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, minLength: 8, required: true},
  contractGroupId: [{type: SchemaTypes.ObjectId, required: true, ref: 'ContractGroup'}],
}, {collection: 'users'});

// Execute before each user.save() call
UserSchema.pre('save', function (callback) {
  let currentUser = this;

  // if (this.isNew) {
  //   currentUser.reset_token.token = generateToken();
  //   currentUser.reset_token.expired_at = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  // }

  // Break out if the password hasn't changed
  if (!currentUser.isModified('password')) {
    return callback();
  }

  // Password changed so we need to hash it
  return bCrypt.genSalt(10, function (saltErrors, salt) {
    if (saltErrors) {
      return callback(saltErrors);
    }

    return bCrypt.hash(currentUser.password, salt, null, function (hashErrors, hash) {
      if (hashErrors) {
        return callback(hashErrors);
      }

      currentUser.password = hash;
      return callback();
    });
  });
});

UserSchema.methods.verifyPassword = function (password) {
  return new Promise((resolve, reject) => {
    bCrypt.compare(password, this.password, (error, isMatch) => {
      if (error) {
        return reject(error);
      }
      return resolve(isMatch);
    });
  });
};
// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
