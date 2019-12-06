const fork = require('child_process').fork;
const numCPUs = require('os').cpus().length;	
const server = require('net').createServer();

server.listen(3000);

var workers = {}

var createWork = function() {
    var worker = fork(__dirname + '/child-process-worker');

    worker.on('exit', function() {
        console.log('worker ' + worker.pid + ' exit');
        delete workers[worker.pid];
        createWork()
    })

    worker.send('server', server);
    workers[worker.pid] = worker;

    console.log('create worker pid: ' + worker.pid);
}

for (var i = 0; i < numCPUs; i += 1) {
    createWork();
}

process.on('exit', function() {
    for (var pid in workers) {
        workers[pid].kill();
    }
});
