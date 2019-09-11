const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 4001

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
//const io = socketIO(server)
const io = socketIO(server)
// This is what the socket.io syntax is like, we will work this later

var socket = io.connect('https://ws-api.iextrading.com/1.0/tops');
socket.on('connect', function() {
 socket.emit('subscribe', 'fb');
   socket.on('fb', (res) => {
    console.log('XX', res)
  })
});
// io.on('connection', socket => {
//   // console.log('User connected')

//   //   // just like on the client side, we have a socket.on method that takes a callback function
//   //   socket.on('change color', (color) => {
//   //       // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
//   //       // we make use of the socket.emit method again with the argument given to use from the callback function above
//   //       console.log('Color Changed to: ', color)
//   //       io.sockets.emit('change color', color)
//   //   })
  
//   // socket.on('disconnect', () => {
//   //   console.log('user disconnected')
//   // })
//   socket.emit('subscribe', 'fb');
//   socket.on('subscribe', (res) => {
//     console.log('XX', res)
//   })
// })

server.listen(port, () => console.log(`Listening on port ${port}`))