'use strict';

const mailer = require('nodemailer');

const restler = require('restler');

// const options = require('../../../options');
const configs = require('../../configs').base;

module.exports.sendMail = function () {
  if (this.connection) {
    return this.connection.sendMail.apply(this.connection, arguments);
  }
  throw new Error('Please configure before using.');
};

module.exports.connection = null;

module.exports.init = function (callback) {
  // init mailer
  restler.get(configs.api_url.user + '/api/iams/' + configs.aws.iam.ses)
    .on('complete', (result, response) => {
      if (response && response.statusCode === 200) {
        let iam = result;
        if (!iam) {
          console.warn('No IAM object for mail service.');
        } else {
          this.connection = mailer.createTransport({
            'host': iam.params.host,
            'port': iam.params.port,
            'auth': {
              'user': iam.credentials.accessKeyId,
              'pass': iam.credentials.secretAccessKey,
            },
          });
          console.info('Setup mail service successfully.');
        }
      } else {
        console.warn('Fail to retrieve IAM user for SES.');
      }
      return callback(null);
    });
};
