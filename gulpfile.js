const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const exec = require('child_process').exec;
const del = require('del');


const src = {
	serverEntry: 'server/main.js',
	scriptsEntry: 'src/index.js',
	scripts: 'src/**/*.js',
	worker: 'src/service_worker.js',
	styles: 'src/styles/index.scss',
	assets: 'src/assets/*',
	images: 'src/assets/images',
	icons: 'src/assets/icons',
}

const dest = {
	scripts: 'build',
	worker: 'build',
	styles: 'build',
	assets: 'build/assets',
	images: 'build/assets/images',
	icons: 'build/assets/icons',
}

gulp.task('clean_scripts', () =>del(`${dest.scripts}/bundle.js`));

gulp.task('clean_styles', () => del(`${dest.styles}/style.css`));

gulp.task('clean_images', () => del(dest.images));

gulp.task('server', () => {
	exec(`node ${src.serverEntry}`, (err, stdout, stderr) => {
		console.log(stdout);
		console.log(stderr);
	});
});

// FIXME: Add sourcemaps to sass, and js files

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
	'clean_scripts', 'clean_styles',
	'clean_images'
]);
