// var cool = require('cool-ascii-faces');
const express = require('express'),
			request = require('request'),
			config = require('config');
var app = express();

app.set('port', (process.env.PORT || 1337));
// app.use(express.statuc(__dirname + '/public'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view angine', 'ejs');


// App secret can be retrieved from the App Dashboard
const APP_SECRET = (process.env.MESSENGER_APP_SECRET) ?
	process.env.MESSENGER_APP_SECRET : config.get('appSecret');
// token use for webhook
const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN) ?
	process.env.MESSENGER_VALIDATION_TOKEN : config.get('validationToken');

app.get('/', function (req, res) {
	res.send('hello word!');
});

app.get('/webhook', function(req, res) {
   if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

app.post('/webhook', function (req, res) {
	var data = req.body;
	// Make sure this is a page subscription
	if (data.object == 'page') {
		data.entry.forEach(function (pageEntry) {
			var pageID = pageEntry.id;
			var timeOfEvent = pageEntry.time;

			pageEntry.messageing.forEach(function (messagingEvent) {
				if (messagingEvent.optin) {
					// receivedAuthentication
				} else if (messagingEvent.message) {
					receivedMessage(messagingEvent);
				} else if (messagingEvent.delivery) {
					// receivedDeliveryConfirmation
				} else if (messagingEvent.postback) {
					// receivedPostback
				} else {

				}
			});
		});
		res.sendStatus(200);
	} else {
		console.log(data.object);
	}
});

app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});

function receivedMessage (event) {
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfMessage - event.timestamp;
	var message - event.message;

	console.log("Received message for user %d and page %d at %d with message: ",
		senderID, recipientID, timeOfMessage);
	console.log(JSON.stringify(message));

	var messageId = message.mid;

	// Get a message text
	var messageText = message.text;
	var messageAttachments = message.attachments;

	if (messageText) {
		// If we receive a text message, check to see if it matches any special
		// keywords and send back the corresponding example. Otherwise, just echo
		// the text we received.
		switch (messageText) {
			case 'image':

				break;
			case 'button':
				break;
			case 'generic':
				break;
			case 'receipt':
				break;
			default:
				sendTextMessage(senderID, messageText);
		}
	} else if (messageAttachments) {
		sendTextMessage(senderID, "Tôi đang đi vắng, có gì nhắn tin sau.\n -BOT-");
	} else {

	}
};

/**
	send message function
*/
function sendTextMessage (recipientId, messageText) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			text: messageText
		}
	};
	callSendAPI(messageData);
};

/**
	Call send API of Facebok
*/
function callSendAPI (messageData) {
	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: PAGE_ACCESS_TOKEN },
		method: 'POST',
		json: messageData

	}, function (e, res, body) {
		if (!e && res.status == 200) {
			var recipientId = body.recipient_id;
			var messageId = body.message_id;

		} else {
			console.error("Unable to send message.");
			console.error(e);
		}
	});
};

module.exports = app;
