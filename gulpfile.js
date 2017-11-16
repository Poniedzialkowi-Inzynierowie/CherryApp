const gulp = require('gulp')
const releaseStage = process.env.NODE_ENV === 'production'

/* gulp-watch have some problem with running same task in the row and so
  for now it's not switched on by default due to his blocking behavior */

function getTask (task) { return require('./tasks/' + task)(gulp, releaseStage) }

// TODO: setup unit testing for server and components
// TODO: add external config where development localhost port is set

function build () {
	this.displayName = ''
	this.description = ''
	return getTask('build')
}
function server () {
	this.displayName = 'runServer'
	this.description = 'Thankes to this function, depending on release stage, an adequate server is deployed'
	return getTask('server')
}
gulp.task(build)
gulp.task(server)
gulp.task('default', gulp.series('build', 'server'))
