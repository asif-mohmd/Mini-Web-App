var express = require("express");
var router = express.Router();
const app = express()
const session = require("express-session")
var bodyParser = require('body-parser');
const db = require("../config/connection");
const adminModel = require("../model/adminModel");
const userModel = require("../model/userModel");
var jsonParser = bodyParser.json()
// session code
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }))


router.get("/",async(req,res)=>{
   const data = await userModel.find()
   if(data){

   }else{
    
   }
   
  })


  module.exports = router