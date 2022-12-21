const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        minLength: [5, 'Usernames shouldmbe longer than 5 characters']
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    }
}, {timestamps: true})

module.exports=mongoose.model('User', userSchema)