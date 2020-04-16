const router = require('./router.js')
const app = require('express')();
app.use('/api', router)

const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3001;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(_dirname, 'client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(_dirname, 'client/build', 'index.html'))
    })
}

var rooms = {}; //make sure to delete keys (rooms) when games end, not just when users disconnect
var users = {};

io.on('connection', function (socket) {
    const id = socket.id;
    users[id] = null
    console.log(`New user connected: current user count is ${Object.keys(users).length}`)

    socket.on('createGame', function (data) {
        var name = data.name;
        var rounds = data.rounds;
        var room = data.room;
        if (rooms[room]) {
            socket.emit('player1', { message: 'Sorry, that room name is already taken!' });
        } else {
            rooms[room] = {
                players: 1,
                rounds: rounds,
                player1: name
            }
            users[id] = room;
            socket.join(room)
            socket.emit('player1', { name, room, rounds }) //player 1 has joined
        }
    })

    socket.on('joinGame', function (data) {
        var name = data.name
        var room = data.room
        var roomName = io.nsps['/'].adapter.rooms[room]
        if (roomName && roomName.length === 1) {
            rooms[room].players = 2
            rooms[room].player2 = name
            var rounds = rooms[room].rounds
            var opponent = rooms[room].player1
            users[id] = room;
            socket.join(data.room);
            socket.emit('player2', { name, room, rounds, opponent }) // player 2 has joined
            socket.to(room).emit('player2joined', {name}) // notify player 1
            io.in(room).emit('startGame', {name, opponent}) // start the game
        }
        else if (!room) {
            socket.emit('player2', { message: 'Sorry, that room does not exist!' });
        }
        else if (room.length > 1) {
            socket.emit('player2', { message: 'Sorry, that room is full!' });
        }
    });

    socket.on('disconnect', function () { //delete the room if it's empty
        var leftRoom = users[id];
        delete users[id];
        if (rooms[leftRoom]) {
            socket.to(leftRoom).emit('playerLeft')
            rooms[leftRoom].players--
            if (rooms[leftRoom].players === 0) {
                delete rooms[leftRoom]
            }
        }
        console.log(`A user disconnected: current user count is ${Object.keys(users).length}`)
    })

});


server.listen(port)