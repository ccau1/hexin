'use strict';

const mongoose = require('hexin-core/helpers/Database').getConnection();

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  roles: [String],
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, minLength: 8, required: true}
}, {collection: 'users'});

// Execute before each user.save() call
UserSchema.pre('save', function (callback) {
  callback();
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
