const {pool} = require('../../db/db'); 

const sendMessage =async (req, res) => {

    try {

        const sender_id = req.user.id;
        const {reciever_id, message} = req.body; 

        const result = await pool.query(
            `INSERT INTO messages(sender_id, reciever_id, message) VALUES($1, $2, $3) RETURNING *`, [sender_id, reciever_id, message]
        )

        res.status(201).json(result.rows[0])

    } catch(err){
        res.status(500).json({
            message: err,
        })
    }

}; 
const getMessage = async (req, res) => {
    try {
        const sender_id = req.user.id; 
        const {id: reciever_id} = req.params; 
        const result = await pool.query(`SELECT m.id, 
                                                m.message, 
                                                m.created_at,
                                                
                                                sender.id AS sender_id, 
                                                reciever.id AS reciever_id,
                                                sender.username AS sender_username, 
                                                reciever.username AS reciever_username 
                                                
                                                FROM messages m 
                                                JOIN users AS sender ON sender.id = m.sender_id 
                                                JOIN users AS reciever ON reciever.id = m.reciever_id
                                                
                                                WHERE (m.sender_id = $1 AND m.reciever_id = $2) 
                                                OR (m.sender_id = $2 AND m.reciever_id = $1)
                                                ORDER BY m.created_at ASC`, 
                                                [sender_id, reciever_id]
                                                )


        res.status(200).json(result.rows); 
    } catch (err) {
        res.status(500).json({
            message: err,
        })
    }
}

module.exports = {sendMessage, getMessage}; 