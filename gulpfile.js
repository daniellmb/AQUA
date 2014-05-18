/**
 * configure and run AQUA
 */
module.export = require('./')
    .config(require('./aqua.config.json'))
    .init([
      // load project config files
      require('./aqua.node.project.json'),
      require('./aqua.web.project.json'),
      require('./demos/angularjs/aqua.project.json'),
      require('./demos/vanillajs/aqua.project.json')
    ]);
