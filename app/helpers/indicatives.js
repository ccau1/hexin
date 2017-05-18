'use strict';

const indicative = require('indicative');
const objectID = require('mongodb').ObjectID;

exports.init = () => {
  exports.initRules();
};

exports.initRules = () => {
  indicative.extend('validId', function (data, field, message, args, get) {
    return new Promise(function (resolve, reject) {
      // get value of field under validation
      const fieldValue = get(data, field);

      // resolve if value does not exists, value existence
      // should be taken care by required rule.
      if (!fieldValue) {
        return resolve('validation skipped');
      }

      // check if field is valid
      if (objectID.isValid(fieldValue)) {
        resolve('valid ID');
      } else {
        reject('ID must be in proper format');
      }
      return true;
    });
  }, 'ID must be in proper format');

  indicative.sanitizor.extend('default', (value, options) => {
    return value || options[0];
  });
};
