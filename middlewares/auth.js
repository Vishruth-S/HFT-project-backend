const protectUser = async (req, res, next) => {
    try {
        if (req.session.isAuth) {
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
