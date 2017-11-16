module.exports = (gulp, releaseStage) => {
	const task = {
		_cleaner: require('del'),
		_builder: require('gulp-vueify2'),
		_cacher: require('gulp-sw-cache'),
		_watcher: require('gulp-watch'),

		/* gulp-watch have some problem with running same task in the row and so
		for now it's not switched on by default due to his blocking behavior */
		_watch: (path) => releaseStage
			? gulp.src(path)
			: this._watcher(path),

		// ------------------------------------------------------

		clear:
			this._cleaner('./build'),
		build:
			this._watch('src/main.js')
				.pipe(this._builder())
				.pipe(gulp.dest('./build')),
		copy:
			this._watch('src/main.js')
				.pipe(gulp.dest('./build')),
		cache:
			this._watch('./build/*')
				.pipe(this._cacher({exclude: 'admin.html'}))
				.pipe(gulp.dest('./build'))
	}
	return gulp.series(task.clear)
}
