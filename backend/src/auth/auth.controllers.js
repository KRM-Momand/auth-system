const bcrypt = require('bcrypt'); 

const salted = 12; 
const users = []; 

const login = (req, res) => {
    res.send('I am from Controller as Login'); 
}

const register = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({
            message: 'Either username or password is invalid'
        })
    }

    const hashedPassword = await bcrypt.hash(password, salted); 
    users.push({
        username, 
        password: hashedPassword, 
    })

    res.json(users); 

}

module.exports = {login, register}; 