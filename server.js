const express = require('express')
const app= express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`)
})
app.use(express.static(__dirname+ '/public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+ '/index.html')
})
//express server created 

//socket

const io = require('socket.io')(http)
//receieve the mess sent by client.js and then broadcast it
io.on('connection',(socket)=>{
    console.log('Connected...')
    socket.on('message',(msg)=>{
        //message which was emited on the server using socket is received here and sent to all the other servers 
        socket.broadcast.emit('message',msg)
        //this will broadcast the message with name of the user to all the connected sockets just excluding the sender

    })
})



