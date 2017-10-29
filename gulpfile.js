const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const exec = require('child_process').exec;
const del = require('del');
const notify = require('gulp-notify');


const src = {
	serverEntry: 'server/main.js',
	scriptsEntry: 'src/index.js',
	scripts: [
		'src/components/**/*.js',
	],
	worker: 'src/service_worker.js',
	styles: 'src/styles/index.scss',
	assets: 'src/assets/**/*',
}

const dest = {
	scripts: 'build',
	worker: 'build',
	styles: 'build',
	assets: 'build/assets',
}

gulp.task('clean_scripts', () => del(dest.scripts));

gulp.task('clean_styles', () => del(dest.styles));

gulp.task('clean_assets', () => del(dest.assets));

gulp.task('assets', ['clean_assets'], () => {
	return gulp.src(src.assets)
		.pipe(gulp.dest(dest.assets));
})

gulp.task('server', () => {
	exec(`node ${src.serverEntry}`, (err, stdout, stderr) => {
		console.log(stdout);
		console.log(stderr);
	});
});

gulp.task('scripts', ['clean_scripts'], () => {
	const b = browserify(src.scriptsEntry, {debug: true})
		.transform('babelify', {sourceMaps: true})

	return b.bundle()
			.on('error', handleError)
		.pipe(source('bundle.min.js'))
		.pipe(gulp.dest(dest.scripts))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
			.on('error', handleError)
			//.pipe(uglify())
			.on('error', handleError)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dest.scripts))
});

gulp.task('styles', ['clean_styles'], () => {
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

// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch(	paths.scripts,		['scripts']	);
	gulp.watch(	paths.styles,		['styles']	);
	gulp.watch(	paths.images,		['images']	);
});

// The `default` task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'build', 'server']);

// The `build` task moves and compiles files to end folder;
// (called when you run `gulp build` from cli)
gulp.task('build', ['scripts', 'styles', 'images']);

// The `clean` task removes files from end folder;
// (called when you run `gulp clean` from cli)
gulp.task('clean', [
	'clean_scripts',
	'clean_styles',
	'clean_images',
]);

const handleError = function (...args) {
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}
