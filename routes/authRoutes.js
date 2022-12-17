const express = require('express')
const { userSignup, userLogin } = require('../controllers/auth/userAuth')
const router = express.Router()



// BASE URL - /api/auth

router.post('/signup', userSignup)
router.post('/login', userLogin)
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong' })
        }
       res.status(200).json({ message: 'User logged out successfully' })
    })
})
module.exports = router
