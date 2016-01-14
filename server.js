var path = require('path');
var express = require('express');
const http = require('http');
const Poll = require('./public/poll');
const socketIO = require('socket.io');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var PORT = process.env.PORT || 8080;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join(__dirname, 'public')));

var dataStore = {};

app.get('/', function(request, response) {
  response.render('index');
});

app.post('/', function(request, response) {
  var poll = new Poll(request.body.poll);
  console.log("Poll was created: ", poll, poll.admin_id)
  dataStore[poll.admin_id] = poll;
  response.redirect('/' + poll.admin_url);
});

app.get('/admin/:id', function(request, response) {
  response.render('admin', {
    pollQuestions: dataStore[request.params.id]
  });
});

app.get('/poll/:id', function(request, response) {
  response.render('poll');
});

var server = http.createServer(app)
                 .listen(PORT, function () {
                   console.log('Listening on port ' + PORT + '.');
                 });
const io = socketIO(server);

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);
});
