'use strict';

module.exports.prompts = [
  {
    type: 'input',
    name: 'name',
    message: 'Controller name',
    validate: function (value) {
      if ((/.+/).test(value)) { return true; }
      return 'name is required';
    },
  },
  // {
  //   type: 'input',
  //   name: 'routeName',
  //   message: 'API route name',
  //   validate: function (value) {
  //     if ((/.+/).test(value)) { return true; }
  //     return 'route name is required';
  //   },
  // },
  {
    type: 'confirm',
    name: 'wantCrud',
    message: 'Do you want CRUD?',
  },
  // have/not have service? service name?
];

module.exports.actions = function (data) {
  const {wantCrud} = data;
  // other vals: name

  let actions = [];

  actions.push({
    type: 'add',
    path: 'app/controllers/{{pascalCase name}}Controller.js',
    templateFile: 'plopTemplates/controller/controller.js',
  });

  actions.push({
    type: 'modify',
    path: 'app/controllers/{{pascalCase name}}Controller.js',
    pattern: /\$1/g,
    template: wantCrud ? 'ControllerCrudBase' : 'ControllerBase',
  });

  actions.push({
    type: 'modify',
    path: 'app/controllers/{{pascalCase name}}Controller.js',
    pattern: /\$2/g,
    template: '{{pascalCase name}}',
  });

  actions.push({
    type: 'modify',
    path: 'app/controllers/{{pascalCase name}}Controller.js',
    pattern: /\$3/g,
    template: '{{kebabCase (pluralize name)}}',
  });

  return actions;
};
