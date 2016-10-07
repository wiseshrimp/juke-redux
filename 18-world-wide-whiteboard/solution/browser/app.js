var socket = io(window.location.origin);

socket.on('connect', function () {

    var room = window.location.pathname;

    socket.emit('wantToJoinRoom', room);

    window.whiteboard.on('draw', function (start, end, color) {
        socket.emit('imDrawing', start, end, color)
    });

    socket.on('drawHistory', function (drawHistory) {
        drawHistory.forEach(function (draw) {
            whiteboard.draw(draw.start, draw.end, draw.color)
        });
    });

    socket.on('otherDraw', function (start, end, color) {
        window.whiteboard.draw(start, end, color)
    });

});