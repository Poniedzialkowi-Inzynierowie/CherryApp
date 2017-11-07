module.exports = (gulp, plugins) => {
  return () => gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'))
    .pipe(plugins.reload({stream: true}))
}
