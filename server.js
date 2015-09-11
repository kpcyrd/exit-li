#!/usr/bin/env js
var http = require('http');
var net = require('net');
var fs = require('fs');

var redis = require('redis');


var check = function(client, key, ok, fail) {
    client.exists(key, function(err, reply) {
        if(reply === 1) {
            ok();
        } else {
            fail();
        }
    });
};

var auth = function(client, dest, allow, deny) {
    var m = dest.match(/^([a-z0-9\.]+):(\d+)$/);

    if(m) {
        var host = m[1];
        var port = parseInt(m[2]);

        check(client, host + ':' + port, function() {
            console.log('[+] allowed by dest', dest);
            allow(host, port);
        }, function() {
            check(client, ':' + port, function() {
                console.log('[+] allowed by port', dest);
                allow(host, port);
            }, deny);
        });
    } else {
        deny();
    }
};

http.createServer(function(req, res) {
    res.end('use the CONNECT, luke\n');
}).on('connect', function(req, socket, head) {
    var dest = req.url;
    console.log('[*] request to', dest);

    var client = redis.createClient();
    client.on('connect', function() {
        // check destination
        auth(client, dest, function(host, port) {
            client.quit();
            socket.write('HTTP/1.1 200 OK\r\n\r\n');

            // cross the streams
            var c = net.connect({host: host, port: port}, function() {
                console.log('[+] connected to', dest);
                c.pipe(socket);
                socket.pipe(c);
            });
            c.on('error', function(err) {
                console.log('[-] connection failed', dest, err['errno']);
                socket.end();
            });
        }, function() {
            client.quit();
            console.log('[-] denied to', dest);
            socket.end('HTTP/1.1 403 Nope\r\n\r\n');
        });
    });
}).listen(8080, '::', function() {
    console.log('[+] proxy up');
});

fs.readFile('index.html', function(err, data) {
    if(err) return;

    http.createServer(function(req, res) {
        if(req.url == '/') {
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(data);
        } else if(req.url == '/robots.txt') {
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end('User-agent: *\nDisallow: /\n');
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end('404\n');
        }
    }).listen(80, '::', function() {
        console.log('[+] index up');
    });
});
