module.exports = (gulp, plugins) => {
  return () => gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./build/assets'))
    .pipe(plugins.reload({stream: true}))
}
