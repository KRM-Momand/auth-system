require('dotenv').config(); 
const jwt = require('jsonwebtoken'); 
const mySecretKey = process.env.MY_SECRET_WORD; 

const authMiddleWare = (req, res, next) => {
    const {authorization} = req.headers; 

    if(!authorization) {
        return res.status(401).json({
            message: 'Invalid token!',
        })
    }

    const token = authorization.split(' ')[1]; 

    if(!token){
        return res.status(401).json({
            message: 'Invalid token format', 
        })
    }

    jwt.verify(token, mySecretKey, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                message: 'Not valid token',
            })
        }

        req.user = decoded; 
        next(); 
    } )

}

module.exports = authMiddleWare; 