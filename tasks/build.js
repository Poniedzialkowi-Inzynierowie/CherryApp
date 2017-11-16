module.exports = (gulp, releaseStage) => {
	const task = {
		_cleaner: require('del'),
		_builder: require('gulp-vueify2'),
		_cacher: require('gulp-sw-cache'),
		_watcher: require('gulp-watch'),

		_watch: (path) => releaseStage
			? gulp.src(path)
			: this._watcher(path),

		// ------------------------------------------------------

		clear: () =>
			this._cleaner('./build'),
		build: () => {
			return this._watch('src/main.js')
				.pipe(this._builder())
				.pipe(gulp.dest('./build'))
		},
		copy: () => {
			return this._watch('src/main.js')
				.pipe(gulp.dest('./build'))
		},
		cache: () => {
			return this._watch('./build/*')
				.pipe(this._cacher({exclude: 'admin.html'}))
				.pipe(gulp.dest('./build'))
		}
	}
	return gulp.series(task.clear)
}
