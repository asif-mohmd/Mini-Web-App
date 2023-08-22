var express = require("express");
var router = express.Router();
const app = express()
const session = require("express-session")

// session code
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }))



router.get("/",(req,res)=>{
    res.render("user/index")
})



module.exports = router