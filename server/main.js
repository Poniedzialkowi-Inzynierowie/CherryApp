const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const port = process.env.PORT || 8080;

const app = express();

app.use(helmet());
app.use(express.static('build'));
// gzip returned files for better speed
app.use(compression());

app.listen(port);
