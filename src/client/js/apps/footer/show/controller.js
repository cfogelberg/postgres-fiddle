define(function(require) {
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/footer/show/controller');
  logger.trace('require:lambda - enter');

  PF.module('FooterApp.Show', function(Show, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module:FooterApp.Show - enter');
    Show.controller = {
      show_footer: function() {
        logger.trace('FooterApp.Show.controller.show_footer - enter');
        var Views = require('js/apps/footer/show/views');
        var view = new Views.Footer();
        PF.region_footer.show(view);
        logger.trace('FooterApp.Show.controller.show_footer - exit');
      }
    };
    logger.trace('PF.module:FooterApp.Show - exit');
  });

  logger.trace('require:lambda - exit');
  return PF.FooterApp.Show.controller;
});