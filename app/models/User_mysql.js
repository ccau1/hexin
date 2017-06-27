'use strict';

const sequelize = require('hexin-core/helpers/Database').getConnection('mysql-db');
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
  // does not need to define primary key, _id is defined here to sync with mongo structure
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roles: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    roles: 'user|admin',
    firstName: 'ba',
    lastName: 'ba',
    username: 'ba@ba.ba',
    email: 'ba@ba.ba',
    password: '$2a$10$R.zg1Dgt.CAW6Iv.fPoNiujvwhL0t4htPrJEvTGLWWHX0CkFuNHFi'
  });
});

module.exports = User;
