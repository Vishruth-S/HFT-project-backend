const User = require('../../models/User');

const getLeaderboard = async (req, res) => {
    try {
        const users= await User.find({}).sort({points:-1});
        console.log(users)
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong', message: err.message })
    }
}



module.exports = { getLeaderboard }
