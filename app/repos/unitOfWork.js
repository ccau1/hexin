'use strict';

// const MongoGenericRepository = require('hexin-core/repos/MongoGenericRepository');
const SequelizeGenericRepository = require('hexin-core/repos/SequelizeGenericRepository');
// const mongoConnection = require('hexin-core/helpers/Database').getConnection();
const sequelizeConnection = require('hexin-core/helpers/Database').getConnection('mysql-db');
// const User = require('../models/User_mongo');
const User = require('../models/User_mysql');

// const userRepository = new MongoGenericRepository(mongoConnection, User);
const userRepository = new SequelizeGenericRepository(sequelizeConnection, User);

module.exports = {
  userRepository
};
