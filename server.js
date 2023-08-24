const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const fs = require("fs")
const userRouter = require("./routes/user")
const adminRouter = require("./routes/admin")
const { default: mongoose } = require("mongoose")
const session = require("express-session")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000

app.set("view engine", "hbs")

// directory connection
app.set("views", path.join(__dirname, "./views"))
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/mini-web-app")

var db = mongoose.connection;

app.use("/", userRouter)
app.use("/admin", adminRouter)

// req.body convertion with this module otherwise undefined

app.listen(PORT, () => {
    console.log("port connected")
})

