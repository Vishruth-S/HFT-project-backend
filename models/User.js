const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    type: String,
    credit: {
        type: Number,
        default: 0
    }

})

const User = mongoose.model('user', UserSchema)
module.exports = User

