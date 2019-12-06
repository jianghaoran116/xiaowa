var http = require('http');

var server = http.createServer(function(req, res) {
  res.end('handle by child, pid is ' + process.pid + '\n');
});

var work;

process.on('message', function(m, tcp) {
  if (m === 'server') {
    work = tcp;
    work.on('connection', function(socket) {
      server.emit('connection', socket);
    })
  }
})

process.on('uncaughtException', function() {
  work.close(function() {
    process.exit(1);
  })
})