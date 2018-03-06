module.exports = function(gulp) {

    var
        // node dependencies
        fs         = require('fs'),
        chmod      = require('gulp-chmod'),
        concat     = require('gulp-concat'),
        concatCSS  = require('gulp-concat-css'),
        clone      = require('gulp-clone'),
        dedupe     = require('gulp-dedupe'),
        gulpif     = require('gulp-if'),
        header     = require('gulp-header'),
        less       = require('gulp-less'),
        minifyCSS  = require('gulp-clean-css'),
        plumber    = require('gulp-plumber'),
        print      = require('gulp-print'),
        rename     = require('gulp-rename'),
        replace    = require('gulp-replace'),
        uglify     = require('gulp-uglify'),

        // user config
        config = require('./../semantic-ui/tasks/config/user'),
        docsConfig = require('./../semantic-ui/tasks/config/docs'),

        // install config
        tasks = require('./../semantic-ui/tasks/config/tasks'),
        release = require('./../semantic-ui/tasks/config/project/release'),

        // shorthand
        globs = config.globs,
        assets = config.paths.assets,
        output = config.paths.output,

        banner = tasks.banner,
        filenames = tasks.filenames,
        log = tasks.log,
        settings = tasks.settings;

    gulp.task('package uncompressed custom js', function() {
        return gulp.src(['dist/custom-components/**/*.js', '!dist/custom-components/**/*.min.js'])
            .pipe(plumber())
            .pipe(dedupe())
            .pipe(replace(assets.uncompressed, assets.packaged))
            .pipe(concat(filenames.concatenatedJS))
            .pipe(rename('semantic-custom.js'))
            .pipe(gulpif(config.hasPermission, chmod(config.permission)))
            .pipe(gulp.dest('dist'))
            .pipe(print(log.created));
    });

    gulp.task('package compressed custom js', function() {
        return gulp.src('dist/custom-components/**/*.min.js')
            .pipe(plumber())
            .pipe(dedupe())
            .pipe(replace(assets.uncompressed, assets.packaged))
            .pipe(concat(filenames.concatenatedMinifiedJS))
            .pipe(uglify(settings.concatUglify))
            .pipe(rename('semantic-custom.min.js'))
            .pipe(gulpif(config.hasPermission, chmod(config.permission)))
            .pipe(gulp.dest('dist'))
            .pipe(print(log.created));
    });

};
