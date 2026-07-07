const express = require('express'); 
const router = express.Router(); 

const {sendMessage, getMessage} = require('./messages.controllers'); 
const authMiddleWare = require('../middlewares/authMiddleWare'); 

router.post('/send', authMiddleWare, sendMessage); 
router.get('/get/:id', authMiddleWare, getMessage); 
module.exports = router; 