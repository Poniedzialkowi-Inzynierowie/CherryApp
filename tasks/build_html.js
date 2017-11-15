module.exports = (gulp, plugins) =>
  plugins.watcher('./src/index.html')
    .pipe(gulp.dest('./build'))
