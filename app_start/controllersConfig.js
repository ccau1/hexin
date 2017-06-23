'use strict';

const {AppStartConfig} = require('hexin-core');
const fs = require('fs');
const path = require('path');

module.exports = class ControllersConfig extends AppStartConfig {
  init() {
    let controllers = [];
    this.handleControllers(path.join(__dirname, '../app/controllers'), controllers)
    .then(cc => {
      let controllersWithoutServiceClass = controllers.filter(c => !Object.keys(c.ctrl).length);
      if (controllersWithoutServiceClass.length) {
        console.warn('## following controllers does not have a proper service class:\n', controllersWithoutServiceClass.map(c => c.name));
      }
    });
  }

  handleControllers(dir, controllers = []) {
    const {router} = this.appConfig;
    let promises = [];

    fs.readdirSync(dir).forEach(file => {
      const fileFullPath = dir + '/' + file;
      if (fs.statSync(fileFullPath).isDirectory()) {
        promises.push(this.handleControllers(fileFullPath, controllers));
      } else if (file.split('.').pop() === 'js' && !/^_.*$/.test(file)) {
        const controller = require(fileFullPath);
        promises.push(
          controllers.push({
            ctrl: new controller(router),
            name: file.replace(/\.[^/.]+$/, ''),
            file: file,
            path: dir,
            fullPath: fileFullPath
          })
        );
      }
    });

    return Promise.all(promises);
  }
};
