const Post = require('../../models/Post');

const getLeaderboard = async (req, res) => {
    try {
        
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong', message: err.message })
    }
}

module.exports = { getLeaderboard }
