const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/practice')

const userSchema = mongoose.Schema({
    image: String,
    email: String,
    username: String,
})

module.exports =  mongoose.model('user', userSchema)

