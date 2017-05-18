'use strict';

module.exports.prompts = [
  {
    type: 'input',
    name: 'name',
    message: 'Config name',
    validate: function (value) {
      if ((/.+/).test(value)) { return true; }
      return 'name is required';
    },
  },
  {
    type: 'list',
    name: 'addPosition',
    message: 'Where to add Config in index.js?',
    choices: ['Top', 'Bottom'],
  },
];

module.exports.actions = function (data) {
  const {addPosition} = data;
  let actions = [];

  actions.push({
    type: 'add',
    path: 'app_start/{{camelCase name}}Config.js',
    templateFile: 'plopTemplates/app_start/appConfig.js',
  });

  actions.push({
    type: 'modify',
    path: 'app_start/{{camelCase name}}Config.js',
    pattern: /\$1/g,
    template: '{{pascalCase name}}',
  });

  const indexHandleStr = 'this.handle(new {{pascalCase name}}(appConfig));';
  if (addPosition === 'Top') {
    // add to top
    actions.push({
      type: 'modify',
      path: 'app_start/index.js',
      pattern: /(\/\/ HANDLE BEGIN.+?(?=\n))/g,
      template: '$1\r\n    ' + indexHandleStr + '\r',
    });
  } else {
    // add to bottom
    actions.push({
      type: 'modify',
      path: 'app_start/index.js',
      pattern: /(\/\/ HANDLE END.+?(?=\n))/g,
      template: indexHandleStr + '\r\n    $1\r',
    });
  }

  actions.push({
    type: 'modify',
    path: 'app_start/index.js',
    pattern: /(\nmodule\.exports = )/g,
    template: 'const {{pascalCase name}} = require(\'./{{camelCase name}}Config\');\r\n$1',
  });


  // TODO:: add to beginning or end of index?

  return actions;
};
