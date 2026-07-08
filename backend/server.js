const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config();
const http = require('http'); 
const {Server} = require('socket.io'); 

const handlerSocket = require('./socket/socket')

const authRoutes = require('./src/auth/auth.routes'); 
const messagesRoutes = require('./src/messages/messages.routes'); 
const friendsRoutes = require('./src/friends/friends.routes'); 
const {pool} = require('./db/db'); 

const app = express(); 
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST']
  }
}); 

handlerSocket(io);

const PORT = process.env.PORT || 3000; 

pool.query(`SELECT NOW()`)
  .then(() => console.log('Connected to Postgres'))
  .catch(err => console.log(err));

app.use(express.json()); 
app.use(cors()); 
app.use('/auth', authRoutes);
app.use('/messages', messagesRoutes);
app.use('/friends', friendsRoutes);   

server.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`); 
})
