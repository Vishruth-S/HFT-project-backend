const bcrypt = require('bcryptjs')
const User = require('../../models/User')

const userLogin = async (req, res) => {
    try {
        console.log(';hi')
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        req.session.isAuth = true;
        req.session.user = user;
        console.log(req.session.user)

        res.status(200).json({
            message: 'User logged in successfully',
            data: user
        })

    } catch (error) {
        console.log(error)
    }
}

const userSignup = async (req, res) => {
    const { email, password, username } = req.body
    if (!email) {
        return res.status(400).json({ error: 'Invalid email' })
    }

    if (!password) {
        return res.status(400).json({ error: 'Invalid password' })
    }

    if (password.length < 6) {
        return res.status(400).json({
            error: 'Password must be atleast 6 characters',
        })
    }
    const encryptPassword = await bcrypt.hash(password, 10)

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                error: 'User already exists',
            })
        }
        user = new User({ email, password: encryptPassword, username })
        await user.save();

        req.session.user = user;
        console.log(req.session.user)
        req.session.isAuth = true;

        res.status(200).json({
            message: 'User created successfully',
        })
    } catch (err) {
        return res
            .status(500)
            .json({ error: 'Something went wrong', message: err.message })
    }
}

module.exports = { userLogin, userSignup }
