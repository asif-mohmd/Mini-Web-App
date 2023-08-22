var express = require("express");
var router = express.Router();
const app = express()
const session = require("express-session")
var bodyParser = require('body-parser');
const db = require("../config/connection");
const adminModel = require("../model/adminModel");
const userModel = require("../model/userModel");
var jsonParser = bodyParser.json()

app.use(bodyParser.urlencoded({ extended: false }));
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
   console.log(data)
   if(data){
    res.render("admin/index",{data})

   }else{
   }
  })



  router.get("/user-delete",async(req,res)=>{
    console.log(req.query.id)


   const data = await userModel.deleteOne({_id:req.query.id})
   const updatedData = await userModel.find()

   if(data){
    console.log(data+ " deleted")
    res.render("admin/index",{data:updatedData})
   }else{
    console.log("not deleted")
   }


  })


  router.get("/user-edit",async(req,res)=>{

    res.render("admin/signup")

  })
  module.exports = router