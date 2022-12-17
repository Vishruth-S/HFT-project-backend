const User = require('../models/User');
const protectUser = async (req, res, next) => {
    try {
        if (req.session.isAuth) {
            const user = await User.findById(req.session.user._id);
            req.session.user = user;
            console.log(req.session.user)
            next()
        } else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    }
    catch (err) {
        console.log(err)
        res.status(401).json({
            error: 'Unauthorized access',
            message: err,
        })
        return
    }

}


module.exports = { protectUser } 
