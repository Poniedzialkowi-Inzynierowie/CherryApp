module.exports = (gulp, plugins) => {
  return plugins.watcher('src/index.js')
    .pipe(plugins.browserify({
      debug: process.env.NODE_ENV !== 'production',
      transform: 'babelify'
    }))
    .pipe(plugins.rename('bundle.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./build'))
}
