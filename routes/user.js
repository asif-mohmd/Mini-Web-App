var express = require("express");
var router = express.Router();
const app = express()
const session = require("express-session")
var bodyParser = require('body-parser');
const db = require("../config/connection")
var jsonParser = bodyParser.json()


// session code
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }))



router.get("/",(req,res)=>{
    res.render("user/login")
})

router.get("/index",(req,res)=>{
    res.render("user/index")

})

router.get("/login",(req,res)=>{
    res.render("user/login")
})

router.post("/login", (req,res)=>{
    console.log(req.body.email)
    
    db.collection("users").findOne({email:req.body.email, password:req.body.password}, function(err,user)
    {
        console.log(user)
        console.log("aaima here")
        if(user) {
        res.redirect("/index")
        }else{
           res.render("user/login")
        }
        
    }
)});



router.get("/signup",(req,res)=>{
    res.render("user/signup")

})

router.post("/signup",(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    console.log(email)
    console.log(name)
    console.log(password)

    var data = {
        "name" : name,
        "email" : email,
        "password": password
    }

    db.collection("users").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }else{
            console.log("recored inserted successfully")
            res.redirect("/")
        }
    })
    
})

router.get


module.exports = router