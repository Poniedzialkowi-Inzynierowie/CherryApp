var Vue = require('vue')
var App = require('./app.vue')

new Vue({ // eslint-disable-line no-new
	el: '#app',
	render: function (createElement) {
		return createElement(App)
	}
})
