var express = require("express");
var router = express.Router();

const session = require("express-session")
var bodyParser = require('body-parser');
const db = require("../config/connection")
const adminModel = require("../model/adminModel");
const userModel = require("../model/userModel"); 
var jsonParser = bodyParser.json()
const app = express()

// session code
app.set('trust proxy', 1) // trust first proxy



router.get("/", (req, res) => {
    if(!req.session.user)  res.redirect("/login")
    else res.render("user/index")
})


router.get("/login", (req, res) => {
    if(!req.session.user)  res.render("user/login")
    else res.redirect('/')
})

router.post("/login", async (req, res) => {
    const data = await userModel.findOne({ email: req.body.email, password: req.body.password })

    if (data) {
        console.log("aaima here");
        req.session.user = data;
        return res.redirect("/"); // Redirect to the root URL
    } else {
        return res.render("user/login");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy(function () {
        console.log("user logged out")
    })
    res.redirect("/login")
})

app.use("/", function (err, req, res, next) {

    console.log(err)


})

router.get("/signup", (req, res) => {
    res.render("user/signup")

})

router.post("/signup", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    console.log(email)
    console.log(name)
    console.log(password)

    var data = {
        "name": name,
        "email": email,
        "password": password
    }

    db.collection("users").insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        } else {
            console.log("recored inserted successfully")
            res.redirect("/")
        }
    })

})

module.exports = router