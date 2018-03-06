/*******************************
          Build Task
*******************************/

var
    gulp = require('gulp'),

    // node dependencies
    console = require('better-console'),
    fs = require('fs'),

    // gulp dependencies
    chmod = require('gulp-chmod'),
    flatten = require('gulp-flatten'),
    gulpif = require('gulp-if'),
    plumber = require('gulp-plumber'),
    print = require('gulp-print'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),

    // config
    config = require('../semantic-ui/tasks/config/user'),
    tasks = require('../semantic-ui/tasks/config/tasks'),
    install = require('../semantic-ui/tasks/config/project/install'),

    // shorthand
    globs = config.globs,
    assets = config.paths.assets,
    output = config.paths.output,
    source = config.paths.source,

    banner = tasks.banner,
    comments = tasks.regExp.comments,
    log = tasks.log,
    settings = tasks.settings;

module.exports = function(callback) {

    console.info('Building custom javascript');

    // copy source javascript
    gulp.src('definitions/**/*.js')
        .pipe(plumber())
        .pipe(flatten())
        .pipe(replace(comments.license.in, comments.license.out))
        .pipe(gulp.dest('dist/custom-components'))
        .pipe(gulpif(config.hasPermission, chmod(config.permission)))
        .pipe(print(log.created))
        .pipe(uglify(settings.uglify))
        .pipe(rename(settings.rename.minJS))
        .pipe(gulp.dest('dist/custom-components'))
        .pipe(gulpif(config.hasPermission, chmod(config.permission)))
        .pipe(print(log.created))
        .on('end', function() {
            gulp.start('package compressed custom js');
            gulp.start('package uncompressed custom js');
            callback();
        });
};
