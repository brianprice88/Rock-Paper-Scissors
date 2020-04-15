const router = require('./router.js')
const app = require('express')();
app.use(router)

const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3001

server.listen(port)