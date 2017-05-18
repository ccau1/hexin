'use strict';

module.exports.prompts = [
  {
    type: 'input',
    name: 'name',
    message: 'Service name',
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
];

module.exports.actions = function (data) {
  const {wantCrud} = data;
  // other vals: name

  let actions = [];

  actions.push({
    type: 'add',
    path: 'app/services/{{pascalCase name}}Service.js',
    templateFile: 'plopTemplates/service/service.js',
  });

  actions.push({
    type: 'modify',
    path: 'app/services/{{pascalCase name}}Service.js',
    pattern: /\$1/g,
    template: wantCrud ? 'ServiceCrudBase' : 'ServiceBase',
  });

  actions.push({
    type: 'modify',
    path: 'app/services/{{pascalCase name}}Service.js',
    pattern: /\$2/g,
    template: '{{pascalCase name}}',
  });

  return actions;
};
