module.exports = (gulp, plugins) =>
  plugins.watcher('./index.html')
    .pipe(gulp.dest('./build'))
