
/*
 * grunt-replace
 *
 * Copyright (c) 2016 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/grunt-replace/blob/master/LICENSE-MIT
 */

'use strict';

// dependencies
var endOfLine = require('os').EOL;

var assert = require('assert');
var grunt = require('grunt');
var path = require('path');
var exec = require('child_process').exec;

// test

describe('grunt-replace', function() {

  var expect;
  var result;

  it('should replace simple key with value',
    function(done) {
      expect = 'value' + endOfLine;
      result = grunt.file.read('tmp/simple.txt');
      assert.equal(result, expect);
      done();
    }
  );

  it('should verbose when "silent" is false',
    function(done) {
      exec('grunt replace:verbose', {
        cwd: path.join(__dirname, '..')
      }, function(error, stdout) {
        assert.notEqual(stdout.indexOf('1 replacement in 1 file.'), -1);
        done();
      });
    }
  );

  it('should warn when no matches exist',
    function(done) {
      exec('grunt replace:warning', {
        cwd: path.join(__dirname, '..')
      }, function(error, stdout) {
        assert.equal(stdout.indexOf('Warning: Unable to match 1 pattern'), -1);
        done();
      });
    }
  );

  it('should fail when no matches exist and "pedantic" is true',
    function(done) {
      exec('grunt replace:fail', {
        cwd: path.join(__dirname, '..')
      }, function(error, stdout) {
        assert.equal(error.code, 6);
        assert.notEqual(stdout.indexOf('Warning: Unable to match 1 pattern'),
          -1);
        done();
      });
    }
  );

  // built-in

  it('should replace using built-in replacement (__SOURCE_FILE__)',
    function(done) {
      expect = 'test/fixtures/built-in_source_file.txt'+ endOfLine;
      result = grunt.file.read('tmp/built-in_source_file.txt');
      assert.equal(result, expect);
      done();
    }
  );

  it('should replace using built-in replacement (__SOURCE_PATH__)',
    function(done) {
      expect = 'test/fixtures' + endOfLine;
      result = grunt.file.read('tmp/built-in_source_path.txt');
      assert.equal(result, expect);
      done();
    }
  );

  it('should replace using built-in replacement (__SOURCE_FILENAME__)',
    function(done) {
      expect = 'built-in_source_filename.txt' + endOfLine;
      result = grunt.file.read('tmp/built-in_source_filename.txt');
      assert.equal(result, expect);
      done();
    }
  );

  it('should replace using built-in replacement (__TARGET_FILE__)',
    function(done) {
      expect = 'tmp/built-in_target_file.txt' + endOfLine;
      result = grunt.file.read('tmp/built-in_target_file.txt');
      assert.equal(result, expect);
      done();
    }
  );

  it('should replace using built-in replacement (__TARGET_PATH__)',
    function(done) {
      expect = 'tmp' + endOfLine;
      result = grunt.file.read('tmp/built-in_target_path.txt');
      assert.equal(result, expect);
      done();
    }
  );

  it('should replace using built-in replacement (__TARGET_FILENAME__)',
    function(done) {
      expect = 'built-in_target_filename.txt' + endOfLine;
      result = grunt.file.read('tmp/built-in_target_filename.txt');
      assert.equal(result, expect);
      done();
    }
  );

});
