const express = require('express');
const compression = require('compression');

const port = process.env.PORT || 8080;

const app = express();

app.use(express.static('build'));
// gzip returned files for better speed
app.use(compression());

app.listen(port);
