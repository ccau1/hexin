'use strict';

const SequelizeDbContext = require('hexin-core/models/SequelizeDbContext');
const User = require('./User_mysql');
const sequelizeConnection = require('hexin-core/helpers/Database').getConnection('mysql-db');

class WTTContext extends SequelizeDbContext {
  constructor() {
    super(sequelizeConnection);

    this.User = User;
  }
}

module.exports = WTTContext;
