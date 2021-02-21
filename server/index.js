const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});
const PORT = process.env.PORT || 5000;

app.get('/', function (req, res) {
  res.send('<h1>Test</h1>');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.emit('news', { hello: 'world' });
  socket.on('time-change', (time, status) => {
    console.log('time: ' + time);
    io.emit('all-time-change', time, status);
  });

  socket.on('pause', (time) => {
    io.emit('all-pause', time);
  });

  socket.on('play', (time) => {
    io.emit('all-play', time);
  });

  socket.on('disconnect', function (data) {
    console.log('a user disconnect :(');
  });
});

server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
