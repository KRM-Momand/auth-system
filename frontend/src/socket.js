import {io } from 'socket.io-client'; 

//const socket = io('http://localhost:3000', {
const socket = io('https://auth-system-vpih.onrender.com', {
    autoConnect: true
}); 

export default socket; 