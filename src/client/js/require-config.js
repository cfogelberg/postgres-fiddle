require.config({
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: '$.fn.popover'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['jquery', 'underscore', 'backbone'],
      exports: 'Marionette'
    },
    underscore: {
      exports: '_'
    }
  },
  paths: {
    backbone: '../bower_components/backbone/backbone',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
    jquery: '../bower_components/jquery/dist/jquery',
    marionette: '../bower_components/marionette/lib/backbone.marionette',
    text: '../bower_components/requirejs-text/text',
    underscore: '../bower_components/underscore/underscore'
  },
  urlArgs: 'bust=' + (new Date()).getTime() // development only
});
