const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


getFile(path) -> {
	fs.readFile('static/app.min.js', 'utf8', (err, data) => {
		if (err) { console.log("Can't read file due to: "+ err)}
		else{ return data }
	}
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
app.listen(port, () => {
	console.log('Server started! At http://localhost:' + port)
});
