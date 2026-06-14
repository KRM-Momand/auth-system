const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config(); 

const authRoutes = require('./src/auth/auth.routes'); 

const app = express(); 

const PORT = process.env.PORT || 3000; 

app.use(express.json()); 
app.use(cors()); 
app.use('/auth', authRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`); 
})
