var cluster = require('cluster');
var http = require('http');
var os = require('os');
var child = require('child_process');
var http = require('http');
http.globalAgent.maxSockets = 100;
var net = require('net');

exports.getProcess = function(req,res){
    var freeMem = os.freemem();
    var totalMem = os.totalmem();
    var socketsRun = process._getActiveHandles();
    var numCPUs = os.cpus();
    var pMemUsage = process.memoryUsage();
    var pListen = process.listeners();
    var serverRunning = socketsRun[0]._connections;

    res.status(200).send({
        cpu:numCPUs,
        cluster:cluster,
        freeMem:freeMem,
        totalMem:totalMem,
        processMem:pMemUsage,
        pListen: pListen,
        children: '1',
        server: socketsRun.length
    })
};


var callPass = function(){
    process.nextTick(function(data){
        console.log(data)
    })
}





