if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js')
		.then(function (reg) {
			// registration worked
			console.log('Registration succeeded. Scope is ' + reg.scope) // eslint-disable-line no-console
		}).catch(function (error) {
			// registration failed
			console.log('Registration failed with ' + error) // eslint-disable-line no-console
		})
}
