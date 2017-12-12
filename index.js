// Import packages to be used
var express = require('express');
var app = express();
var url = require('url');
var https = require('https');

// Setup a session
var session = require('express-session');

app.use(session({
  secret: 'my-super-secret-secret!',
  resave: false,
  saveUninitialized: true
}))

// Because we will be using post values, we need to include the body parser module
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// Set the port
app.set('port', (process.env.PORT || 5000));

// Set which folder will host our files
app.use(express.static(__dirname + '/public'));

// Log whenever a new page is requested
app.use(logRequest);

// Views is the directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Listen for requests and log them
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// When a user tries to go to base URL redirect to home page
app.get('/', function (req, res) {
   res.redirect('/home.html');
});

// This middleware function simply logs the current request to the server
function logRequest(request, response, next) {
	console.log("Received a request for: " + request.url);
	// don't forget to call next() to allow the next parts of the pipeline to function
	next();
}