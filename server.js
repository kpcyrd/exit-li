#!/usr/bin/env js
var http = require('http');
var net = require('net');
var fs = require('fs');

var ALLOWED = [
    'example.com:80'
];

var auth = function(dest, allow, deny) {
    var m = dest.match(/^([a-z0-9\.]+):(\d+)$/);

    if(m && ~ALLOWED.indexOf(dest)) {
        allow(m[1], parseInt(m[2]));
    } else {
        deny();
    }
};

http.createServer(function(req, res) {
    res.end('use the CONNECT, luke\n');
}).on('connect', function(req, socket, head) {
    var dest = req.url;
    console.log('[*] request to', dest);

    // check destination
    auth(dest, function(host, port) {
        socket.write('HTTP/1.1 200 OK\n\n');

        // cross the streams
        var c = net.connect({host: host, port: port}, function() {
            console.log('[+] connected to', dest);
            c.pipe(socket);
            socket.pipe(c);
        });
    }, function() {
        console.log('[-] denied to', dest);
        socket.end('HTTP/1.1 403 Nope\n\n');
    });
}).listen(8080, '::', function() {
    console.log('[+] proxy up');
});

fs.readFile('index.html', function(err, data) {
    if(err) return;

    http.createServer(function(req, res) {
        if(req.url == '/') {
            res.end(data);
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404\n');
        }
    }).listen(80, '::', function() {
        console.log('[+] index up');
    });
});
