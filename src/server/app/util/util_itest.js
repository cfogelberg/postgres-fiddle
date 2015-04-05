// Allow statements that are not assignments or function calls (e.g. should statements)
/* jshint -W030 */

'use strict';

var should = require('should');

var test_lib = require('test/lib');

describe('app/util - exported functions', function() {
  /**
   * Map of module name to the number of functions that module exports
   * @type {Object}
   */
  var num_funcs = {};

  it('app/util/logger/index', function() {
    var name = 'app/util/logger/index';
    var module = require(name);
    num_funcs[name] = 0;
    module.get.should.be.a.function;
    num_funcs[name]++;
    module.get_log4js.should.be.a.function;
    num_funcs[name]++;
  });

  /** Sequelize object has .sq object field for Sequelize and a .pr object field for all the models - no funcs */
  it('app/util/pr/index', function() {
    var name = 'app/util/pr/index';
    num_funcs[name] = 0;
  });

  /** Sequelize model module export is a function, not an object with functions - rely on Sequelize tests - no funcs */
  it('app/util/pr/entry', function() {
    var name = 'app/util/pr/entry';
    num_funcs[name] = 0;
  });

  // This test must be last in its suite
  it('tests check for all expected exported functions', function() {
    var js_files = test_lib.js_app_files_in_dir('./src/server/app/util/').filter(function(filename) {
      // Filter out all files called router.js - they are Express Router objects and these tests do not check them
      return !/.*\/router.js/.test(filename);
    });
    js_files.forEach(function(js_file) {
      var req_path = js_file.replace(/\.\/src\/server\//, '').replace(/\.js$/, '');
      should(num_funcs[req_path]).not.be.type('undefined', req_path + ' exports not checked');
      if(num_funcs[req_path]) {
        var nf_tested = num_funcs[req_path];
        var nf_in_module = test_lib.num_func_in_module(req_path);
        nf_tested.should.equal(nf_in_module,
          req_path + ' only ' + nf_tested + ' of ' + nf_in_module + ' functions checked');
      }
    });
  });
});
