module.exports = (gulp, plugins) => {
  return plugins.watcher('./src/style.scss')
    .pipe(plugins.sourcemaps.init())

    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .on('error', plugins.handleError)

    .pipe(plugins.autoprefix({browsers: ['last 4 versions'], cascade: true}))

    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./build'))
}
