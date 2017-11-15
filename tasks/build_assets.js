module.exports = (gulp, plugins) =>
  plugins.watcher('./src/assets/**/*')
    .pipe(gulp.dest('./build/assets'))
