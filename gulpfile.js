var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var html2pug = require('gulp-html2jade');
var exec = require('child_process').exec;
var del = require('del');

// ------------------------------------------------------------------------- //

var paths = {
	json:		'src/static/json',
	templates:	'src/static/templates/*.pug',
	scripts:	['src/static/app.js', 'src/static/scripts/*.js'],
	styles:		'src/static/main.sass',
	images:		'src/static/images/*',
	html_to_pug:	'src/html/*.html'
};

// ------------------------------------------------------------------------- //

gulp.task('clean_json', function(){
	return del('build/static/*.json');
});

gulp.task('clean_templates', function(){
	return del('build/static/templates');
});

gulp.task('clean_scripts', function(){
	return del('build/static/app.js');
});

gulp.task('clean_styles', function(){
	return del('build/static/main.css');
});

gulp.task('clean_images', function(){
	return del('build/static/images');
});

gulp.task('clean_html_to_pug', function(){
	return del('build/static/templates');
});

// ------------------------------------------------------------------------- //

gulp.task('server', function(){
	exec('node src/server.js', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
	});
});

// ------------------------------------------------------------------------- //
// FEXME: Add sourcemaps to sass, and js files

gulp.task('json', function() {
	return gulp.src(paths.json)
	.pipe(gulp.dest('build/static/json'));
});

gulp.task('templates', ['clean_templates'], function() {
	return gulp.src(paths.templates)
	.pipe(pug())
	.pipe(gulp.dest('build/static/templates'));
});

gulp.task('scripts', ['clean_scripts'], function() {
// Minify and copy all JavaScript files
// FIXME: pass files to `uglify()`
	return gulp.src(paths.scripts)
	.pipe(concat('app.js'))
	.pipe(gulp.dest('build/static'));
});

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

gulp.task('images', ['clean_images'], function() {
// Copy all static images
	return gulp.src(paths.images)
	.pipe(gulp.dest('build/static/images'));
});

// ------------------------------------------------------------------------- //

gulp.task('html_to_pug', function() {
// For lazyness; it will convert your stupid html
	return gulp.src(paths.html_to_pug)
	.pipe(html2pug({nspaces:4,tabs:true}))
	.pipe(gulp.dest('src/pug_raw'));
});

// ------------------------------------------------------------------------- //

// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch(	paths.json,		['json']	);
	gulp.watch(	paths.templates,	['templates']	);
	gulp.watch(	paths.scripts,		['scripts']	);
	gulp.watch(	paths.styles,		['styles']	);
	gulp.watch(	paths.images,		['images']	);
});

// ------------------------------------------------------------------------- //

// The `default` task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'build', 'server']);

// The `build` task moves and compiles files to end folder;
// (called when you run `gulp build` from cli)
gulp.task('build', ['json', 'templates',  'scripts', 'styles', 'images']);

// The `clean` task removes files from end folder;
// (called when you run `gulp clean` from cli)
gulp.task('clean', [
	'clean_json', 'clean_templates',
	'clean_scripts', 'clean_styles',
	'clean_images'
]);
