const del = require('del')
const gulp = require('gulp')
const gutil = require('gulp-util')
const runSync = require('run-sequence')
const notify = require('gulp-notify').onError
const plugins = require('gulp-load-plugins')()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

plugins.browserify = require('browserify')
plugins.uglify = require('gulp-uglify')
plugins.buffer = require('vinyl-buffer')
plugins.source = require('vinyl-source-stream')

plugins.sass = require('gulp-sass')
plugins.autoprefix = require('gulp-autoprefixer')
plugins.sourcemaps = require('gulp-sourcemaps')

plugins.workbox = require('workbox-build')

plugins.exec = require('child_process').exec

plugins.browSync = require('browser-sync')
plugins.reload = plugins.browSync.reload;

plugins.sourcemapDevelopment = {
  start:  () => process.env.stage == "Nightly" ? gutil.noop() : plugins.sourcemaps.init({loadMaps: true}),
  end:    () => process.env.stage == "Nightly" ? gutil.noop() : plugins.sourcemaps.write()
}

plugins.handleError = (...args) => {
  notify({
    title: 'Compile Error',
    message: '<%= error.message %>'
    }).apply(this, args)
}

function getTask(task) { return require('./tasks/' + task)(gulp, plugins) }

// TODO: setup unit testing for server and components
// TODO: add external config where development localhost port is set
// FIXME: 'scripts' and 'assets' tasks don't respect synchronouse execution

gulp.task('clear_build_folder', () => del('./build'))
gulp.task('clear_ssl_files', () => del('./server/ca.key'))

gulp.task('html', getTask('html'));
gulp.task('assets', getTask('assets'));
gulp.task('styles', getTask('styles'));
gulp.task('scripts', getTask('scripts'));
gulp.task('bundle_sw', getTask('sw_builder'));

// gulp.task('gen_key', getTask('gen_central_auth_cert_key'));
// gulp.task('gen_cert', getTask('gen_server_cert_key'));
// gulp.task('validate_gened_ssl_files', getTask('test_ssl_files'));
gulp.task('run_server', getTask('run_server'));

gulp.task('build', () => { runSync(
  'clear_build_folder',         // removes directory with previous build
  ['html', 'assets',             // copies '*.html' and 'assets/*' files to build_dir
  'styles', 'scripts'],           // builds styles and scripts and puts them in build_dir
  'bundle_sw'                   // generates service worker and puts it to build_dir
)});

gulp.task('watch', () => {
  gulp.watch('./src/index.html', ['html']);
  gulp.watch('./src/assets/**/*', ['assets']);
  gulp.watch('./src/styles/**/*.scss', ['styles']);
  gulp.watch(['./src/index.js', './src/components/**/*.js'], ['scripts']);
});

gulp.task('server', () => { runSync(
//  'clear_ssl_files',            // removes previously generated certificate and key
//  ['gen_key', 'gen_cert'],      // generates new key and certificate
//  'validate_gened_ssl_files',   // runs auto test for generated ssl_files (env.build=nightly)
  'run_server'                  // runs server after ssl-files have been generated
)});

gulp.task('browser-sync', () => {
  plugins.browSync({
    proxy: 'localhost:8080',
    port: '3000'
  })
});

gulp.task('default', () => { runSync(
  'build', 'watch',
  'server', 'browser-sync'
)});

