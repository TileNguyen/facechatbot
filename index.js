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

app.get('/webhook', function(req, res) {
   if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'super-secrit') {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});
