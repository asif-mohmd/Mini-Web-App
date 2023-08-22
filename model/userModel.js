const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id:String,
    password:String,
    name:String,
})



const userModel = mongoose.model('user', userSchema);
module.exports = userModel;