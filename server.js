var path = require('path');
var express = require('express');
const http = require('http');

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

var server = http.createServer(app)
                 .listen(PORT, function () {
                   console.log('Listening on port ' + PORT + '.');
                 });
const socketIO = require('socket.io');
const io = socketIO(server);

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.on('disconnect', function (socket) {
    console.log('A user has disconnected.', io.engine.clientsCount);
  })
});
