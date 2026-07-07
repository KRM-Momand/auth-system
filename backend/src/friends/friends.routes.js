const express = require('express'); 
const router = express.Router(); 

const {getFriends} = require('./friends.controllers'); 

router.get('/friendsList', getFriends ); 

module.exports =  router ; 