/**
 * configure and run AQUA
 */
module.export = require('./')
  .config(require('./aqua.config'))
  .init([
      // load project config files
      require('./aqua.node.project'),
      require('./aqua.web.project'),
      require('./demos/angularjs/aqua.project'),
      require('./demos/vanillajs/aqua.project')
    ]);
