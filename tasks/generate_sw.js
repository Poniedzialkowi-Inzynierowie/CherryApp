module.exports = (_gulp, plugins) => {
  return require('workbox-build').generateSW({
    globDirectory: './build',
    swDest: './build/sw.js',
    globPatterns: ['**\/*.{html,js,css,json,ico}'], // eslint-disable-line no-useless-escape
    globIgnores: ['admin.html']
  })
    .then(() => console.log('Service worker generated.'))
    .catch((err) => plugins.handleError('Service-Wroker generation faild', err))
}
