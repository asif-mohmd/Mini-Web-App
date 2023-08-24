const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({

    email:String,
    password:String,
})



const adminModel = mongoose.model('admins', adminSchema);
module.exports = adminModel;