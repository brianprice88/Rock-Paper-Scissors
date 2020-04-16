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
            rooms[room] = 1;
            users[id] = room;
            socket.join(room)
            socket.emit('player1', { name, rounds, room })
        }
    })

    socket.on('joinGame', function (data) {
        var room = io.nsps['/'].adapter.rooms[data.room]
        if (room && room.length === 1) {
            rooms[room] = 2
            socket.join(data.room);
            // socket.broadcast.to(data.room).emit('player1', {});
            socket.emit('player2', { name: data.name, room: data.room })
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
        rooms[leftRoom]--;
        if (rooms[leftRoom] === 0) { delete rooms[leftRoom] }
        console.log(`A user disconnected: current user count is ${Object.keys(users).length}`)
    })

});


server.listen(port)