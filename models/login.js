const mongoose = require("mongoose")

const login = new mongoose.Schema({
    userName: {type: String, require},
    password: {type: String, require}
})

module.exports=mongoose.models('login', login)