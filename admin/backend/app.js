const { Server } = require('socket.io');
const io = new Server(4000, {
    cors: {
        origin: 'http://localhost:4444'
    }
})

const pending = [
    {
        "message": "success"
    }
]

io.on("connection", (socket) => {
    console.log('test')
    io.emit("sendPending", pending)
})
