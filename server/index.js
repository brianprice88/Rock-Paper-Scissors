const express = require('express');
const utils = require('./utils.js')
const path = require('path')
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3001;

if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => res.send('hello world'))
    // app.use(express.static(path.join(__dirname, '../client/build')));
    // app.get('*', function (req, res) {
    //     res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
    // })
}

var rooms = {};
var users = {};

io.on('connection', function (socket) {
    const id = socket.id;
    users[id] = null
    console.log(`New user connected: current user count is ${Object.keys(users).length}`)

    socket.on('createGame', function (data) {
        var name = data.name;
        var toWin = data.toWin;
        var room = data.room;
        if (rooms[room]) {
            socket.emit('err', { message: 'Sorry, that room name is already taken!' });
        } else {
            rooms[room] = {
                players: 1,
                toWin: toWin,
                player1: name,
                player1score: 0,
                player1choice: ''
            }
            users[id] = room;
            socket.join(room)
            socket.emit('player1', { name, room, toWin }) //player 1 has joined
        }
    })

    socket.on('joinGame', function (data) {
        var name = data.name
        var room = data.room
        var roomName = io.nsps['/'].adapter.rooms[room]
        if (roomName && roomName.length === 1) {
            if (rooms[room].player1 === name) {
                socket.emit('err', { message: 'Sorry, that name is already taken!!' });
            } else {
                rooms[room].players = 2
                rooms[room].player2 = name
                rooms[room].player2score = 0;
                rooms[room].player2choice = '';
                var toWin = rooms[room].toWin
                var opponent = rooms[room].player1
                users[id] = room;
                socket.join(data.room);
                socket.emit('player2', { name, room, toWin, opponent }) // player 2 has joined
                socket.to(room).emit('player2joined', { name }) // notify player 1
                io.in(room).emit('startGame') // start the game
            }
        }
        else if (!roomName) {
            socket.emit('err', { message: 'Sorry, that room does not exist!' });
        }
        else if (roomName.length > 1) {
            socket.emit('err', { message: 'Sorry, that room is full!' });
        }
    });

    socket.on('playerChoice', function (data) {
        var roomName = data.room;
        var room = rooms[data.room];
        var name = data.name;
        var choice = data.choice;
        if (room.player1 === name) {
            room.player1choice = choice
        } else if (room.player2 === name) {
            room.player2choice = choice;
        }
        if (room.player1choice !== '' && room.player2choice !== '') { // only proceed if both players have selected
            var result = utils.roundResult(room.player1choice, room.player2choice);
            var player1 = room.player1choice;
            var player2 = room.player2choice;
            room.player1choice = '';
            room.player2choice = '';
            if (result === 'player1') {
                room.player1score++;
                io.in(roomName).emit('showResult', { player1choice: player1, player2choice: player2, winner: 'player1' })
            } else if (result === 'player2') {
                room.player2score++;
                io.in(roomName).emit('showResult', { player1choice: player1, player2choice: player2, winner: 'player2' })
            } else if (result === 'tie') {
                io.in(roomName).emit('showResult', { player1choice: player1, player2choice: player2, winner: 'tie' })
            }
        }
    })

    socket.on('resetGame', function (data) {
        var room = rooms[data.room]
        room.player1score = 0;
        room.player2score = 0;
        io.in(data.room).emit('startGame')
    })

    socket.on('leaveRoom', function (data) {
        var room = rooms[data.room]
        var player = data.player1 ? 'player1' : 'player2'
        delete room[player]
        socket.leave(data.room)
        if (rooms[data.room]) { //if the other player is still there, let them know
            socket.to(data.room).emit('playerLeft')
            rooms[data.room].players--
            room.player1score = 0;
            room.player2score = 0;
            if (rooms[data.room].players === 0) {
                delete rooms[data.room]
            }
        }
    })

    socket.on('disconnect', function () { //delete the room if it's empty
        var leftRoom = users[id];
        delete users[id];
        if (rooms[leftRoom]) {
            socket.to(leftRoom).emit('playerLeft')
            rooms[leftRoom].players--
            if (rooms[leftRoom].players === 0) {
                socket.leave(leftRoom)
                delete rooms[leftRoom]
            }
        }
        console.log(`A user disconnected: current user count is ${Object.keys(users).length}`)
    })
});

server.listen(port)