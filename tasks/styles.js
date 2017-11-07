module.exports = (gulp, plugins) => {
	return () => {
		gulp.src('./src/style.scss')
			.pipe(plugins.sourcemapDevelopment.start())
			.pipe(plugins.sass({outputStyle: 'compressed'}))
				.on('error', plugins.handleError)
			.pipe(plugins.autoprefix({
				browsers: ['last 4 versions'],
				cascade: true
			}))
			.pipe(plugins.sourcemapDevelopment.end())
			.pipe(gulp.dest('./build'))
			.pipe(plugins.reload({stream: true}))
	}
}
