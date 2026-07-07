const onlineUsers = new Map(); 

const handlerSocket = (io) => {
    io.on('connection', (socket) => {
        console.log("User connected: ", socket.id);
        socket.on('join', (userId) => {
            onlineUsers.set(userId, socket.id)
            console.log('Online Users:', onlineUsers)
        }) 
    

    socket.on('send_message', (messageData) => {
        const recieverSocketId = onlineUsers.get(messageData.reciever_id);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("recieve_message", messageData); 
        }
    })

    socket.on('disconnect', () => {
        for (const [userId, socketId] of onlineUsers.entries()){
            if(socketId === socket.id){
                onlineUsers.delete(userId); 
                break; 
            }
        }
    })

    })
}

module.exports = handlerSocket; 