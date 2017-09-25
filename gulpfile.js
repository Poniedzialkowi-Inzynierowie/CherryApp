var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var html2pug = require('gulp-html2jade');
var del = require('del');

// ------------------------------------------------------------------------- //

var paths = {
	styles:		'src/main.sass',
	scripts:	['src/static/jQuery.js', 'src/scripts/*.js', 'src/app.js'],
	images:		'src/static/images/*',
	templates:	'src/static/templates/*.jade',
	html:		'src/html/*.html'
};

// ------------------------------------------------------------------------- //

gulp.task('clean_styles', function(){
	return del('build/static/main.css');
});
gulp.task('clean_scripts', function(){
	return del('build/static/app.js');
});
gulp.task('clean_images', function(){
	return del('build/static/images');
});
gulp.task('clean_templates', function(){
	return del('build/static/templates');
});

// ------------------------------------------------------------------------- //
// FEXME: Add sourcemaps to sass, and js files

gulp.task('styles', ['clean_styles'], function(){
	return gulp.src(paths.styles)
	.pipe(sass({outputStyle: 'compressed'})
		.on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 4 versions'],
		cascade: true
	}))
	.pipe(gulp.dest('build/static'));
});
gulp.task('scripts', ['clean_scripts'], function() {
// Minify and copy all JavaScript files
// FIXME: pass files to `uglify()`
	return gulp.src(paths.scripts)
	.pipe(concat('app.js'))
	.pipe(gulp.dest('build/static/'));
});
gulp.task('images', ['clean_images'], function() {
// Copy all static images
	return gulp.src(paths.images)
	.pipe(gulp.dest('build/static/images'));
});
gulp.task('templates', ['clean_templates'], function() {
// TODO: check output and refactor process if nedeed
	return gulp.src(paths.templates)
	.pipe(pug())
	.pipe(gulp.dest('build/static/templates'));
});

// ------------------------------------------------------------------------- //

gulp.task('html2pug', function() {
// For lazyness; it will convert your stupid html
	return gulp.src(paths.html)
	.pipe(html2pug({nspaces:4,tabs:true}))
	.pipe(gulp.dest('src/html/parsed'));
});

// ------------------------------------------------------------------------- //

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(	paths.styles,		['styles']		);
  gulp.watch(	paths.scripts,		['scripts']		);
  gulp.watch(	paths.images,		['images']		);
  gulp.watch(	paths.templates,	['templates']	);
});

// ------------------------------------------------------------------------- //

// The `default` task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'build']);

// The `build` task moves and compiles files to end folder;
// (called when you run `gulp build` from cli)
gulp.task('build', ['styles', 'scripts', 'images', 'templates']);

// The `clean` task removes files from end folder;
// (called when you run `gulp clean` from cli)
gulp.task('clean',[ 'clean_styles','clean_scripts', 'clean_images', 'clean_templates']);
