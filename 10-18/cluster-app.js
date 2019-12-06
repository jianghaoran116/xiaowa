const numCPUs = require('os').cpus().length;	
const cluster = require('cluster');	

const server = require('./cluster-worker');

if(cluster.isMaster){	
    console.log('Master proces id is',process.pid);	
    // fork workers	
    for(let i= 0;i<numCPUs;i++){	
        cluster.fork();	
    }	
    cluster.on('exit',function(worker,code,signal){	
        console.log('worker process died,id',worker.process.pid)	
    })	
}else{	
    // Worker可以共享同一个TCP连接	
    // 这里是一个http服务器	server
    server.init();
}