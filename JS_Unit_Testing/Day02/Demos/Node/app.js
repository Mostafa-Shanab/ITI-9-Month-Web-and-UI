let express = require("express")
let app = express()
app.get("/",function(req,res){
    res.status(200).send("hello world")
})

let server = app.listen(3000)
module.exports = server