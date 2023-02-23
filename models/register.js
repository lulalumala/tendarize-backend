const mongoose = require("mongoose")

const register = new mongoose.Schema({
    email:{type:String, require},
    userName: {type: String, require},
    password: {type: String, require}
})
module.exports=mongoose.model("User", register)