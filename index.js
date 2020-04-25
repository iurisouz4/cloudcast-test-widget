var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var message = "";

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render(__dirname + '/public/index.ejs', {message:message});
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', (msg) => {
    message = msg;
    console.log('message: ' + msg);
  });
});