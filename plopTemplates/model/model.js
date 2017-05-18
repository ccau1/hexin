'use strict';

const mongoose = require('hexin-core/helpers/Database').getConnection();
const Schema = mongoose.Schema;

const $1Schema = new Schema({

}, {collection: '$2'});

// Execute before each model.save() call
$1Schema.pre('save', function (callback) {
  return this;
});

// Export the Mongoose model
module.exports = mongoose.model('$1', $1Schema);
