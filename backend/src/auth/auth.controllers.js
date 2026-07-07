const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const {pool} = require('../../db/db'); 

const salted = 12; 
const mySecretKey = process.env.MY_SECRET_WORD; 

const login =async (req, res) => {
    const {username, password} = req.body; 

    if(!username || !password){
        return res.status(400).json({
            message: 'Either username or password is invalid', 
        })
    }
    const data = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
    if(data.rows.length === 0){
        return res.status(400).json({
            message: 'Username cannot be found!', 
        })
    }

    const user = data.rows[0]; 
    const isMatch =await bcrypt.compare(password, user.password); 

    if(!isMatch){
        return res.status(400).json({
            message: 'Password did not match', 
        })
    }

    const token = jwt.sign({id: user.id, username : user.username}, mySecretKey, {expiresIn: '3min'}); 
    
    res.json({
        message: `Welcome ${user.username}`, 
        user_id: user.id, 
        token
    }); 
}

const register = async (req, res) => {
    try {

    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({
            message: 'Either username or password is invalid'
        })
    }

    const hashedPassword = await bcrypt.hash(password, salted); 
    await pool.query(`INSERT INTO users (username, password)
        VALUES ($1, $2)`, [username, hashedPassword]); 

    res.json({
        message: `user successfully registered as ${username}`,
    });         
        } catch (err) {
            res.status(500).json({
                message: 'User already existed',
            })
        }

}

const dashboard = (req, res) => {
    res.json({
        user: req.user.username
    })
}

module.exports = {login, register, dashboard}; 