const router = require('./router.js')
const app = require('express')();
app.use('/api', router)

const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3001;

var rooms = 0;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(_dirname, 'client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(_dirname, 'client/build', 'index.html'))
    })
}

io.on('connection', function (socket) {
    console.log('a user connected')

    socket.on('createGame', function (data) {
        socket.emit('player1', { name: data.name, rounds: data.rounds, room: ++rooms })
    })

    socket.on('joinGame', function (data) {
        var room = data.room
        if (room && room.length == 1) {
            socket.join(data.room);
            socket.broadcast.to(data.room).emit('player1', {});
            socket.emit('player2', { name: data.name, room: data.room })
        }
        else {
            socket.emit('player2', { message: 'Sorry, that room is either full or does not exist!' });
        }

    });

    socket.on('disconnect', function () {
        console.log('A user disconnected!')
    })

});


server.listen(port)