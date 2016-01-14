var path = require('path');
var express = require('express');
const http = require('http');
const Poll = require('./poll');

var app = express();
var PORT = process.env.PORT || 8080;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join(__dirname, 'public')));

var dataStore = {};

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.post('/', function(request, response) {
  console.log(request.body);
  var poll = new Poll(request.body.poll);
  dataStore[poll.id] = poll;
  response.redirect('/' + poll.admin_url);
});

app.get('/admin/:id', function(request, response) {
  response.sendFile(__dirname + '/public/admin.html');
});

app.get('/poll/:id', function(request, response) {
  response.sendFile(__dirname + '/public/poll.html');
});


var server = http.createServer(app)
                 .listen(PORT, function () {
                   console.log('Listening on port ' + PORT + '.');
                 });
const socketIO = require('socket.io');
const io = socketIO(server);

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);
});
