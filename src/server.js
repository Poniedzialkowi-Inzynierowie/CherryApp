const fs = require('fs');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 8080;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

function getFile(path) {
	fs.readFile('static/app.min.js', 'utf8', (err, data) => {
		if (err) { console.log("Can't read file due to: "+ err) }
		else{ return data }
	});
}


// ----------------------------------------------------------------------------
// As project is using REST api philosophy, we do not need
// any dynamic acces to static files and so we provide staticly
// typed routes to main.min.css and app.min.js

app.route('/static')
.get((req, res) => {
	switch(req.param("file")){
		case 'main.min.css':
			res.send( getFile('static/main.min.css') );
			break;
		case 'app.min.js':
			res.send( getFile('static/main.min.css') );
			break;
		default:
			console.log(
				"Warning: Requested static", req.param("file"), "file",
				"wich doesn't exist, or is not served by server"
			)
	}
})

// ----------------------------------------------------------------------------
http.createServer(app).listen(80);

app.listen = function() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};