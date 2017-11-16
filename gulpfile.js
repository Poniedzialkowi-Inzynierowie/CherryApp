const gulp = require('gulp')
const releaseStage = process.env.NODE_ENV === 'production'

function getTask (task) { return require('./tasks/' + task)(gulp, releaseStage) }

// TODO: setup unit testing for server and components
// TODO: add external config where development localhost port is set

function build () {
	this.displayName = 'Build'
	this.description = 'Build all files from which frontend is made of'
	return getTask('build')
}
function server () {
	this.displayName = 'sslSupport'
	this.description = 'Generate keys, and certificates so server can support ssl'
	return getTask('ssl')
}
function server () {
	this.displayName = 'Server'
	this.description = 'Thanks to this function, depending on release stage, an adequate server is deployed'
	return getTask('server')
}

gulp.task(build)
// gulp.task(ssl)
gulp.task(server)

gulp.task('default', gulp.series('build', /*'ssl',*/ 'server'))
