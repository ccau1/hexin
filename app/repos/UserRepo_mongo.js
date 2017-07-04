'use strict';

const MongoGenericRepository = require('hexin-core/repos/MongoGenericRepository');

class UserRepo extends MongoGenericRepository {
  constructor(ctxt) {
    super(ctxt.User, ctxt);
  }
}

module.exports = UserRepo;
