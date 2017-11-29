//var pg = require("pg"); // This is the postgres database connection module.
//const connectionString = "postgres://postgres:1234@localhost/webnotes";

var express = require('express');
var app = express();
var url = require('url');
var https = require('https');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/login', function(request, response) {
	login(request, response);
});

function login(request, response) {
	var requestUrl = url.parse(request.url, true);

	console.log("Login info: " + JSON.stringify(requestUrl.query));

	// TODO: Here we should check to make sure we have all the correct parameters

	var name = requestUrl.query.uname;
	var password = requestUrl.query.psw;

	var credentials = {username: name};

	response.render('pages/webnotes', credentials);
}
