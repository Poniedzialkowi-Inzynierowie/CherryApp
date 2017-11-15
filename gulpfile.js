const del = require('del')
const gulp = require('gulp')
const gnop = require('gulp-nop')
const notify = require('gulp-notify').onError
const plugins = require('gulp-load-plugins')()
const webserver = require('gulp-webserver')

/* gulp-watch have some problem with runing same task in the row and so
   for now it's not switched on by default due to his blocking behavior */
plugins.watcher = (path) =>
  process.env.NODE_ENV === 'production'
    ? gulp.src(path)
    /*: require('gulp-watch')(path)*/
    :gulp.src(path)

plugins.sass = require('gulp-sass')
plugins.autoprefix = require('gulp-autoprefixer')
plugins.browserify = require('gulp-browserify')
plugins.rename = require('gulp-rename')

plugins.handleError = (...args) => {
  notify({title: 'Compile Error', message: '<%= error.message %>'})
    .apply(this, args)
}

plugins.uglify = (path) =>
  process.env.NODE_ENV === 'production' ? require('gulp-uglify')() : gnop()

plugins.sourcemaps = {
  init: () => process.env.NODE_ENV === 'production' ? gnop()
    : require('gulp-sourcemaps').init({loadMaps: true}),
  write: () => process.env.NODE_ENV === 'production' ? gnop()
    : require('gulp-sourcemaps').write()
}

// TODO: setup unit testing for server and components
// TODO: add external config where development localhost port is set

function getTask (task) { return require('./tasks/' + task)(gulp, plugins) }

function clearBuildFolder () { return del('./build') }
function html () { return getTask('build_html') }
function assets () { return getTask('build_assets') }
function styles () { return getTask('build_styles') }
function scripts () { return getTask('build_scripts') }
function bundleSw () { return getTask('generate_sw') }

gulp.task('build', gulp.series(
  clearBuildFolder, gulp.parallel(html, assets, styles, scripts)
))

gulp.task('server', () => process.env.NODE_ENV === 'production'
  // for the time being, there is no `./server/main` file
  ? require('child_process').exec('./server/main')
  // so keep in mind that this server is only for development purposes
  : gulp.src('./build').pipe(webserver({
    livereload: true, open: true
    // middleware: (req, res) => { console.log(req.originalUrl) }
  }))
)

gulp.task('default', gulp.series('build', bundleSw, 'server'))
