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


router.get("/", async (req, res) => {

  const data = await userModel.find()
  console.log(data)
  if (data) {
    res.render("admin/index", { data })

  } else {
  }
})

router.get("/login", (req, res) => {
  res.render("admin/login")
})

app.use("/", function (err, req, res, next) {
  console.log(err)
  res.render("admin/login")
})



router.get("/user-delete", async (req, res) => {
  console.log(req.query.id)


  const data = await userModel.deleteOne({ _id: req.query.id })
  const updatedData = await userModel.find()

  if (data) {
    console.log(data + " deleted")
    res.render("admin/index", { data: updatedData })
  } else {
    console.log("not deleted")
  }


})


router.get("/user-edit", async (req, res) => {

  const data = await userModel.findOne({ _id: req.query.id })
  res.render("admin/signup", { id: req.query.id, email: data.email, name: data.name })

})

router.post("/updated-user", async (req, res) => {
  console.log("*****y", req.body)
  const data = await userModel.findOne({ _id: req.body.id })

  if (data) {
    const updateData = await userModel.updateOne({ _id: req.body.id }, { name: req.body.name, email: req.body.email })
    if (updateData) res.redirect('/admin')
  } else {
    console.log("not updated")
  }

})



function checkLogin(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    var err = new Error("user not logged in")
    next(err)
  }
}

module.exports = router