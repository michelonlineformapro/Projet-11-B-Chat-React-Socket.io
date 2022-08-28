const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors())

const server = app.listen(PORT, () => {
    console.log(`Le serveur tourne sur l'adresse http://localhost:${PORT}`);
});

const io = socket(server,{cors:{
    origin: "*"
}});

io.on('connection', socket => {
    console.log("socket=", socket.id);
    socket.on('CLIENT_MSG', data => {
        console.log("msg=", data);
        io.emit('SERVER_MSG', data)
    })
})
