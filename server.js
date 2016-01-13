var path = require('path');
var express = require('express');

var app = express();
var PORT = process.env.PORT || 8080;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.post('/', function(request, response) {
  console.log(request.body);
  response.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function() {
  console.log("Server is up and running on port: " + PORT)
});
