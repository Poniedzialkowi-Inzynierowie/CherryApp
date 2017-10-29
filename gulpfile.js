// util
const gulp = require('gulp');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const del = require('del');
// styles
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
// scripts
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
// server
const exec = require('child_process').exec;

// TODO: add heroku server build to package.json
// TODO: add live browser reload on file change
// TODO: add static analysis tools to project
// TODO: setup unit testing for server and components

const config = {
	server: 'server/main.js',
	// to run producton build use `gulp build --production`
	production: !!gutil.env.production,
};

// Paths to source files
const src = {
	scriptsEntry: 'src/index.js',
	htmlEntry: 'src/index.html',
	scripts: [
		'src/components/**/*.js',
		'src/service_worker.js',
	],
	styles: 'src/styles/**/*.scss',
	assets: 'src/assets/**/*',
};

// Paths to built files destinations
const dest = {
	htmlEntry: 'build',
	scripts: 'build',
	styles: 'build',
	assets: 'build/assets',
};

gulp.task('default', ['build', 'server', 'watch']);

gulp.task('build', ['clean'], () => {
	gulp.start('assets', 'scripts', 'styles', 'html');
});

gulp.task('clean', () => del('build'));

gulp.task('assets', () => {
	return gulp.src(src.assets)
		.pipe(gulp.dest(dest.assets));
});

gulp.task('html', () => {
	return gulp.src(src.htmlEntry)
		.pipe(gulp.dest(dest.htmlEntry));
});

gulp.task('styles', () => {
	return gulp.src(src.styles)
		.pipe(startSourcemapIfNotProduction())
		.pipe(sass({outputStyle: 'compressed'})
			.on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 4 versions'],
			cascade: true,
		}))
		.pipe(endSourcemapIfNotProduction())
		.pipe(gulp.dest(dest.styles));
});

gulp.task('scripts', () => {
	const b = browserify(src.scriptsEntry, {debug: true})
		.transform('babelify', {sourceMaps: true})

	return b.bundle()
			.on('error', handleError)
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(dest.scripts))
		.pipe(buffer())
		.pipe(startSourcemapIfNotProduction())
			.on('error', handleError)
			.pipe(uglify())
			.on('error', handleError)
		.pipe(endSourcemapIfNotProduction())
		.pipe(gulp.dest(dest.scripts))
});

gulp.task('server', () => {
	exec(`node ${config.server}`, (err, stdout, stderr) => {
		console.log(stdout);
		console.log(stderr);
	});
});

gulp.task('watch', () => {
	gulp.watch([src.scriptsEntry, ...src.scripts], ['scripts']);
	gulp.watch(src.styles, ['styles']);
	gulp.watch(src.assets, ['assets']);
	gulp.watch(src.htmlEntry, ['html']);
});

const startSourcemapIfNotProduction = () => {
	return config.production ? gutil.noop() : sourcemaps.init({loadMaps: true});
}

const endSourcemapIfNotProduction = () => {
	return config.production ? gutil.noop() : sourcemaps.write();
}

const handleError = function (...args) {
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}
