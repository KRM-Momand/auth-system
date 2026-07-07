const express = require('express'); 
const router = express.Router(); 
const authMiddleWare = require('../middlewares/authMiddleWare'); 


const {login, register, dashboard} = require('./auth.controllers'); 

router.get('/', (req, res) => {
    res.send('This is Express Route')
}); 

router.post('/register', register)

router.post('/login', login);
router.get('/dashboard',authMiddleWare, dashboard) 

module.exports = router; 