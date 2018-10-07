const io = require('socket.io')();

io.on('connection', (client) => {
  client.on('subscribeToTimer', () => {
    console.log('client is subscribing to timer with interval ', 5000);
    setInterval(() => {
      client.emit('messageSend', new Date());
    }, 5000);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);