var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io')

server.on('request', app);

var io = socketio(server);

var drawHistory = {};
/*

 {
 roomName: [fn]
 }
 */

io.on('connection', function (socket) {

    var room;

    socket.on('disconnect', function () {
        console.log('im disconnecting')
    });

    socket.on('wantToJoinRoom', function (roomName) {
        room = roomName;
        socket.join(room);
        if (!drawHistory[room]) drawHistory[room] = [];
        socket.emit('drawHistory', drawHistory[room]);
    });

    socket.on('imDrawing', function (start, end, color) {
        drawHistory[room].push({start: start, end: end, color: color});
        socket.broadcast.to(room).emit('otherDraw', start, end, color)
    });

});

server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/:roomname', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});