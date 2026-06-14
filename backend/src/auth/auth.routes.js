const express = require('express'); 
const router = express.Router(); 

const {login, register} = require('./auth.controllers'); 

router.get('/', (req, res) => {
    res.send('This is Express Route')
}); 

router.post('/register', register)

router.get('/login', login); 

module.exports = router; 