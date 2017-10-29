// util
const gulp = require('gulp');
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

// TODO: add conditional builds to disable sourcemaps in production
// TODO: add heroku server build to package.json

// Paths to source files
const src = {
	serverEntry: 'server/main.js',
	scriptsEntry: 'src/index.js',
	htmlEntry: 'src/index.html',
	scripts: [
		'src/components/**/*.js',
		'src/service_worker.js',
	],
	styles: 'src/styles/**/*.scss',
	assets: 'src/assets/**/*',
}

// Paths to built files destinations
const dest = {
	htmlEntry: 'build',
	scripts: 'build',
	styles: 'build/style.min.css',
	assets: 'build/assets',
}

gulp.task('default', ['build', 'server', 'watch']);

gulp.task('build', ['scripts', 'styles', 'assets', 'html']);

gulp.task('clean', () => del('build'));

gulp.task('assets', ['clean_assets'], () => {
	return gulp.src(src.assets)
		.pipe(gulp.dest(dest.assets));
})

gulp.task('clean_assets', () => del(dest.assets));

gulp.task('html', () => {
	return gulp.src(src.htmlEntry)
		.pipe(gulp.dest(dest.htmlEntry));
})

gulp.task('styles', ['clean'], () => {
	return gulp.src(src.styles)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'})
			.on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 4 versions'],
			cascade: true,
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dest.styles));
});

gulp.task('scripts', ['clean'], () => {
	const b = browserify(src.scriptsEntry, {debug: true})
		.transform('babelify', {sourceMaps: true})

	return b.bundle()
			.on('error', handleError)
		.pipe(source('bundle.min.js'))
		.pipe(gulp.dest(dest.scripts))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
			.on('error', handleError)
			.pipe(uglify())
			.on('error', handleError)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dest.scripts))
});

gulp.task('server', () => {
	exec(`node ${src.serverEntry}`, (err, stdout, stderr) => {
		console.log(stdout);
		console.log(stderr);
	});
});

gulp.task('watch', () => {
	gulp.watch([src.scriptsEntry, ...src.scripts], ['scripts']);
	gulp.watch(src.styles, ['styles']);
	gulp.watch(src.assets, ['assets']);
});

const handleError = function (...args) {
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}
