// var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 1337));
// app.use(express.statuc(__dirname + '/public'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view angine', 'ejs');

app.get('/', function (req, res) {
	res.send('hello word!');
});

app.post('/webhook', function(req, res) {
  res.send('hello world!');
});

app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});
