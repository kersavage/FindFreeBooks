//var pg = require("pg"); // This is the postgres database connection module.
//const connectionString = "postgres://postgres:1234@localhost/webnotes";

var express = require('express');
var app = express();
var url = require('url');
var https = require('https');

var session = require('express-session');

app.use(session({
  secret: 'my-super-secret-secret!',
  resave: false,
  saveUninitialized: true
}))

/*
app.use(function printSession(req, res, next) {
  console.log('req.session', req.session);
  return next();
});
*/

// Because we will be using post values, we need to include the body parser module
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// This shows how to use a middleware function for all requests (it is defined below)
// Becuse it comes after the static function call, we won't see it log requests
// for the static pages, only the ones that continue on passed that (e.g., /logout)
app.use(logRequest);

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Setup our routes
app.post('/login', handleLogin);
app.post('/logout', handleLogout);

// This method has a middleware function "verifyLogin" that will be called first
app.get('/getServerTime', verifyLogin, getServerTime);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


/****************************************************************
 * These methods should likely be moved into a different module
 * But they are hear for ease in looking at the code
 ****************************************************************/

// Checks if the username and password match a hardcoded set
// If they do, put the username on the session
function handleLogin(request, response) {
	var result = {success: false};

	// We should do better error checking here to make sure the parameters are present
	if (request.body.username == "admin" && request.body.password == "password") {
		request.session.user = request.body.username;
		result = {success: true};
	}

	response.json(result);
}

// If a user is currently stored on the session, removes it
function handleLogout(request, response) {
	var result = {success: false};

	// We should do better error checking here to make sure the parameters are present
	if (request.session.user) {
		request.session.destroy();
		result = {success: true};
	}

	response.json(result);
}

// This function returns the current server time
function getServerTime(request, response) {
	var time = new Date();
	
	var result = {success: true, time: time};
	response.json(result); 
}

// This is a middleware function that we can use with any request
// to make sure the user is logged in.
function verifyLogin(request, response, next) {
	if (request.session.user) {
		// They are logged in!

		// pass things along to the next function
		next();
	} else {
		// They are not logged in
		// Send back an unauthorized status
		var result = {succes:false, message: "Access Denied"};
		response.status(401).json(result);
	}
}

// This middleware function simply logs the current request to the server
function logRequest(request, response, next) {
	console.log("Received a request for: " + request.url);

	// don't forget to call next() to allow the next parts of the pipeline to function
	next();
}


/*
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
*/