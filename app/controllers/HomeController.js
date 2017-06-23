'use strict';

const fs = require('fs');
const {ControllerBase} = require('hexin-core');

module.exports = class HomeController extends ControllerBase {
  constructor(app) {
    super(app, '');
  }

  renderRoutes(router) {
    router.get('/', async (req, res) => {
      res.render(
        'index',
        {});
    });

    router.get('/health', async (req, res) => {
      res.end('health check okay');
    });

    router.get('/docs', async (req, res) => {
      fs.readFile(__dirname + '/../../doc/index.html', 'utf8', function (err, text) {
        res.send(text);
      });
    });
  }
};
