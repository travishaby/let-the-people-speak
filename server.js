var PORT = process.env.PORT || 8080;
const http = require('http');
const socketIO = require('socket.io');
const _ = require('lodash');
const DataStore = require('./lib/dataStore')
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var dataStore = new DataStore

app.get('/', function(request, response) {
  response.render('index');
});

app.post('/', function(request, response) {
  if (!request.body.poll) { return response
                                      .status(500)
                                      .send("Bad poll data. Try again!") }
  var poll = dataStore.createPoll(request.body.poll);
  response.redirect('/' + poll.adminUrl);
});

app.get('/admin/:id', function(request, response) {
  response.render('admin', {
    poll: dataStore.findPollByAdminId(request.params.id)
  });
});

app.get('/poll/:id', function(request, response) {
  var poll = dataStore.findPollByPollId(request.params.id);
  returnPollIfStillActive(response, poll);
});

function returnPollIfStillActive(response, poll){
  if (poll.isActive()){
    response.render('poll', {
      pollQuestion: poll.question,
      pollChoices: poll.choices
    });
  } else {
    response.render('closed');
  }
};

var server = http.createServer(app)
                 .listen(PORT, function () {
                   console.log('Listening on port ' + PORT + '.');
                 });
const io = socketIO(server);

io.on('connection', function (socket) {
  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
      var poll = dataStore.findPollByPollId(message.pollId);
      poll.recordResponseIfNewResponder(message);
      notifyRespondantsIfAllowedAndNotifyAdmin(poll);
    }
  });
});

function notifyRespondantsIfAllowedAndNotifyAdmin(poll) {
  if (poll.showRespondants) {
    io.sockets.emit('pollResponse-' + poll.pollId, poll.responses);
  } else {
    io.sockets.emit('pollResponse-' + poll.adminId, poll.responses)
  }
};

module.exports = app;
