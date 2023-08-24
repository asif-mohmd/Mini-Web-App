const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    id:String,
    name:String,
    email:String,
    password:String,
})



const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel;