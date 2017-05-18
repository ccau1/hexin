'use strict';

module.exports.prompts = [
  {
    type: 'input',
    name: 'name',
    message: 'Model name',
    validate: function (value) {
      if ((/.+/).test(value)) { return true; }
      return 'name is required';
    },
  },
];

module.exports.actions = function (data) {
  return [
    {
      type: 'add',
      path: 'app/models/{{pascalCase name}}.js',
      templateFile: 'plopTemplates/model/model.js',
    },
    {
      type: 'modify',
      path: 'app/models/{{pascalCase name}}.js',
      pattern: /\$1/g,
      template: '{{pascalCase name}}',
    },
    {
      type: 'modify',
      path: 'app/models/{{pascalCase name}}.js',
      pattern: /\$2/g,
      template: '{{camelCase (pluralize name)}}',
    },
  ];
};
