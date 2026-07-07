const {pool} = require('../../db/db'); 

const getFriends = async (req, res) => {

    try {
        const result = await pool.query(`SELECT id, username FROM users`); 

        res.json(result.rows); 
    } catch (err){
        res.status(500).json({message: err.message}); 
    }
}

module.exports = {getFriends}; 