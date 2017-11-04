// util
const gulp = require('gulp')
const gutil = require('gulp-util')
const sourcemaps = require('gulp-sourcemaps')
const notify = require('gulp-notify')
const del = require('del')
const runSequence = require('run-sequence');
// styles
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
// scripts
const browserify = require('browserify')
const uglify = require('gulp-uglify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const wbBuild = require('workbox-build')
// server
const exec = require('child_process').exec
const browserSync = require('browser-sync')
const reload = browserSync.reload

// TODO: setup unit testing for server and components
// TODO: add external config where development localhost port is set

const config = {
  server: 'server/main.js',
  // to run producton build use `gulp build --production`
  production: !!gutil.env.production,
  rootDir: 'src'
}

// Paths to source files
const src = {
  scriptsEntry: 'src/index.js',
  htmlEntry: 'src/index.html',
  scripts: [
    'src/components/**/*.js',
    'src/util/**/*.js'
  ],
  worker: 'src/service_worker.js',
  styles: 'src/styles/**/*.scss',
  assets: 'src/assets/**/*'
}

// Paths to built files destinations
const dest = {
  htmlEntry: 'build',
  scripts: 'build',
  styles: 'build',
  assets: 'build/assets'
}

gulp.task('default', ['build'], () => {
  gulp.start(['server', 'watch', 'browser-sync'])
})

gulp.task('build', () => {
  runSequence('clean', 'assets', 'scripts', 'styles', 'html', 'bundle-sw')
})

gulp.task('clean', () => del('build'))

gulp.task('assets', () => {
  return gulp.src(src.assets)
    .pipe(gulp.dest(dest.assets))
    .pipe(reload({stream: true}))
})

gulp.task('html', () => {
  return gulp.src(src.htmlEntry)
    .pipe(gulp.dest(dest.htmlEntry))
    .pipe(reload({stream: true}))
})

gulp.task('styles', () => {
  return gulp.src(src.styles)
    .pipe(startSourcemapIfNotProduction())
    .pipe(sass({outputStyle: 'compressed'})
      .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: true
    }))
    .pipe(endSourcemapIfNotProduction())
    .pipe(gulp.dest(dest.styles))
    .pipe(reload({stream: true}))
})

gulp.task('scripts', () => {
  const b = browserify(src.scriptsEntry, {debug: true})
    .transform('babelify', {sourceMaps: true})

  return b.bundle()
    .on('error', handleError)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(dest.scripts))
    .pipe(buffer())
    .pipe(startSourcemapIfNotProduction())
    .on('error', handleError)
    .pipe(uglify())
    .on('error', handleError)
    .pipe(endSourcemapIfNotProduction())
    .pipe(gulp.dest(dest.scripts))
    .pipe(reload({stream: true}))
})

gulp.task('server', () => {
  exec(`nodemon ${config.server}`, (err, stdout, stderr) => {
    if (err) throw err
    console.log(stdout)
    console.log(stderr)
  })
})

gulp.task('watch', () => {
  gulp.watch([src.scriptsEntry, ...src.scripts], ['scripts'])
  gulp.watch(src.styles, ['styles'])
  gulp.watch(src.assets, ['assets'])
  gulp.watch(src.htmlEntry, ['html'])
})

gulp.task('browser-sync', () => {
  browserSync({
    proxy: 'localhost:8080'
  })
})

const startSourcemapIfNotProduction = () => {
  return config.production ? gutil.noop() : sourcemaps.init({loadMaps: true})
}

const endSourcemapIfNotProduction = () => {
  return config.production ? gutil.noop() : sourcemaps.write()
}

const handleError = function (...args) {
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args)
  this.emit('end') // Keep gulp from hanging on this task
}

// gulp.task('bundle-sw', () => {});

gulp.task('bundle-sw', () => {
  return wbBuild.generateSW({
    globDirectory: './build',
    swDest: './build/sw.js',
    globPatterns: ['**\/*.{html,js,css,json,ico}'], // eslint-disable-line no-useless-escape
    globIgnores: ['admin.html']

  })
    .then(() => {
      console.log('Service worker generated.')
    })
    .catch((err) => {
      console.log('[ERROR] This happened: ' + err)
    })
})
