const express = require("express")

const app = express()
const path = require("path")
const hbs = require("hbs")
const fs = require("fs")
const userRouter = require("./routes/user")
const { default: mongoose } = require("mongoose")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000

app.set("view engine", "hbs")

// directory connection
app.set("views", path.join(__dirname, "views"))


mongoose.connect("mongodb://localhost:27017/mini-web-app")

var db = mongoose.connection;



app.use("/",userRouter)


app.use(express.static(path.join(__dirname, "public")));

// req.body convertion with this module otherwise undefined



app.listen(PORT,()=>{
    console.log("port connected")
})