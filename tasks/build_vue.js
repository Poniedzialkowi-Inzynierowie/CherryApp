var vueify = require('gulp-vueify');

module.exports = (gulp, plugins) => {

  return gulp.src('components/**/*.vue')
    .pipe(vueify())
    .pipe(gulp.dest('./dist'))
}
