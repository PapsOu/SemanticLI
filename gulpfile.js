/*******************************
            Set-up
*******************************/

var gulp = require('gulp-help')(require('gulp')),
    rename = require('gulp-rename'),

    // read user config to know what task to load
    config = require('./semantic-ui/tasks/config/user'),

    // watch for file changes and build
    watch = require('./semantic-ui/tasks/watch'),

    // build all files
    build = require('./semantic-ui/tasks/build'),
    buildJS = require('./semantic-ui/tasks/build/javascript'),
    buildCSS = require('./semantic-ui/tasks/build/css'),
    buildAssets = require('./semantic-ui/tasks/build/assets'),

    // utility tasks
    clean = require('./semantic-ui/tasks/clean'),
    version = require('./semantic-ui/tasks/version'),

    // install tasks
    install = require('./semantic-ui/tasks/install'),
    checkInstall = require('./semantic-ui/tasks/check-install'),

    // docs tasks
    serveDocs = require('./semantic-ui/tasks/docs/serve'),
    buildDocs = require('./semantic-ui/tasks/docs/build'),

    // rtl
    buildRTL = require('./semantic-ui/tasks/rtl/build'),
    watchRTL = require('./semantic-ui/tasks/rtl/watch');

/*******************************
             Tasks
*******************************/

gulp.task('default', false, ['check-install']);

gulp.task('watch', 'Watch for site/theme changes', watch);

gulp.task('cp', 'Move config to semantic ui', function() {
    return gulp.src('librinfo.theme.config').pipe(rename('theme.config')).pipe(gulp.dest('./semantic-ui/src'));
});

gulp.task('cp-dark', 'Move config to semantic ui', function() {
    return gulp.src('librinfo-dark.theme.config').pipe(rename('theme.config')).pipe(gulp.dest('./semantic-ui/src'));
});

gulp.task('build', 'Builds all files from source', build);
gulp.task('build-javascript', 'Builds all javascript from source', buildJS);
gulp.task('build-css', 'Builds all css from source', buildCSS);
gulp.task('build-assets', 'Copies all assets from source', buildAssets);

gulp.task('build-dark', 'Build LI dark theme', ['cp-dark', 'build'], function() {
    gulp.src('dist/semantic.css').pipe(rename('semantic-superhero.css')).pipe(gulp.dest('./dist'));
    gulp.src('dist/semantic.min.css').pipe(rename('semantic-superhero.min.css')).pipe(gulp.dest('./dist'));
});
gulp.task('build-default', 'Build LI default theme', ['cp', 'build'], function() {
    gulp.src('dist/semantic.css').pipe(rename('semantic-librinfo.css')).pipe(gulp.dest('./dist'));
    gulp.src('dist/semantic.min.css').pipe(rename('semantic-librinfo.min.css')).pipe(gulp.dest('./dist'));
});

gulp.task('clean', 'Clean dist folder', clean);
gulp.task('version', 'Displays current version of Semantic', version);

gulp.task('install', 'Runs set-up', install);
gulp.task('check-install', 'Displays current version of Semantic', checkInstall);

/*--------------
      Docs
---------------*/

/*
  Lets you serve files to a local documentation instance
  https://github.com/Semantic-Org/Semantic-UI-Docs/
*/

gulp.task('serve-docs', 'Serve file changes to SUI Docs', serveDocs);
gulp.task('build-docs', 'Build all files and add to SUI Docs', buildDocs);

/*--------------
      RTL
---------------*/

if (config.rtl) {
    gulp.task('watch-rtl', 'Watch files as RTL', watchRTL);
    gulp.task('build-rtl', 'Build all files as RTL', buildRTL);
}

/* Admin Tasks */
if (config.admin) {
    require('./semantic-ui/tasks/collections/admin')(gulp);
}
