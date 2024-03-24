const express = require("express")
const http = require("http")
const path = require('path')
const app = express()
const {Server} = require("socket.io")
const server = http.createServer(app)

const io = new Server(server);
let users = {}

io.on('connection',(socket)=>{
    // console.log("a new user connected",socket.id)
    socket.on('new-user-joined',name=>{
        users[socket.id] = name;
        socket.emit('user-joined',name)
    })
    socket.on('user-message',(message) =>{
        // console.log("new message",message)
        io.emit('message',message)
    })

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message, name : users[socket.id]})
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    })

})

app.use(express.static(path.resolve("./public")))

app.get('/',(req,res)=>{
    return res.sendFile("./public/index.html")
})
server.listen(9000,()=>{console.log(`server listening on PORT:9000`)})