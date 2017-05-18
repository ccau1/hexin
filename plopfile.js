'use strict';

const path = require('path');
const pluralize = require('pluralize');

const modelGenerator = require('./plopTemplates/model/generator');
const controllerGenerator = require('./plopTemplates/controller/generator');
const serviceGenerator = require('./plopTemplates/service/generator');
const appStartGenerator = require('./plopTemplates/app_start/generator');

module.exports = function (plop) {
  setHelpers(plop);
  setPrompts(plop);
  setGenerators(plop);
};

const setHelpers = function (plop) {
  plop.addHelper('absPath', function (val) {
    return path.resolve(plop.getPlopfilePath(), val);
  });
  plop.addHelper('pluralize', function (val) {
    return pluralize(val, 2);
  });
};

const setPrompts = function (plop) {
  // adding a custom inquirer prompt type
  plop.addPrompt('directory', require('inquirer-directory'));
};

const setGenerators = function (plop) {
  // create your generators here
  plop.setGenerator('Model', {
    description: 'Application Model',
    prompts: modelGenerator.prompts,
    actions: modelGenerator.actions,
  });

  plop.setGenerator('Service', {
    description: 'Application Service',
    prompts: serviceGenerator.prompts,
    actions: serviceGenerator.actions,
  });

  plop.setGenerator('Controller', {
    description: 'Application Controller',
    prompts: controllerGenerator.prompts,
    actions: controllerGenerator.actions,
  });

  plop.setGenerator('MSC', {
    description: 'Application Model, Service & Controller',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name',
        validate: function (value) {
          if ((/.+/).test(value)) { return true; }
          return 'name is required';
        },
      },
      {
        type: 'confirm',
        name: 'wantCrud',
        message: 'Do you want CRUD?',
      },
    ],
    actions: function (data) {
      return [
        ...modelGenerator.actions(data),
        ...serviceGenerator.actions(data),
        ...controllerGenerator.actions(data),
      ];
    },
  });

  plop.setGenerator('App_Start', {
    description: 'Application App_Start',
    prompts: appStartGenerator.prompts,
    actions: appStartGenerator.actions,
  });
};
