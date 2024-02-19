const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type:String,
        unique: true,
    },
    password: {
        type: String,
        required:true
    },
    cartData:{
        type: Object,
    },
    date:{
        type:Date,
        default: Date.now(),
    }
})

const userModel = mongoose.model('User' , usersSchema)

module.exports = {userModel}