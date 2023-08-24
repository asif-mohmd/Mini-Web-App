

const { default: mongoose } = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mini-web-app",{
    useNewUrlParser: true,
    useUnifiedTopoLogy:true
})

var db = mongoose.connection
db.on("error",()=>console.log("Error in connecting to database"))
db.once("open",()=>console.log("connection to database"))
