module.exports = (gulp, plugins) => {
  return () => plugins.exec(`node ${process.env.server}`)
}
