'use strict';

const SequelizeGenericRepository = require('hexin-core/repos/SequelizeGenericRepository');

class UserRepo extends SequelizeGenericRepository {
  constructor(ctxt) {
    super(ctxt.User, ctxt);
  }
}

module.exports = UserRepo;
