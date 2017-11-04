const express = require('express')
const helmet = require('helmet')
const compression = require('compression')

const port = process.env.PORT || 8080

const app = express()

// set http security headers
app.use(helmet())
// serve static files from build folder
app.use(express.static('build'))
// gzip returned files for better speed
app.use(compression())

app.listen(port)
