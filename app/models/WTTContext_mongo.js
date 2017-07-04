'use strict';

const MongoDbContext = require('hexin-core/models/MongoDbContext');
const User = require('./User_mongo');
const mongoConnection = require('hexin-core/helpers/Database').getConnection('mongo-db');

class WTTContext extends MongoDbContext {
  constructor() {
    super(mongoConnection);

    this.User = User;
  }
}

module.exports = WTTContext;
