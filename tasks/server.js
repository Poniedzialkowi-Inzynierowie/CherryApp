module.exports = (gulp, releaseStage) => {
	this._server = require('gulp-webserver')
	this._exec = require('child_process').exec

	/* for the time being, there is no `./server/main` so keep
	  in mind that this server is only for development purposes */

	return releaseStage ? this._exec('./server/main')
		: gulp.src('./build').pipe(this._server({
			livereload: true, open: true
			// middleware: (req, res) => { console.log(`requested: ${req.originalUrl}`) }
		}))
}
