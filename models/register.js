const mongoose = require("mongoose")


const addressSchema = new mongoose.Schema({
    postal: { type: String },
    code: { type: String },
    physical: {type: String},
    email: { type: String },
    phone: { type: String }
})

const companySchema = new mongoose.Schema({  
    logo: { type: String },
    name: { type: String },
    registration: { type: String },
    licence: { type: String },
    placeOfRegistration: { type: String },
    profileComplete:{type:Boolean, default:false, require}
})


const register = new mongoose.Schema({
    email:{type:String, require},
    userName: {type: String, require},
    password: { type: String, require },
    company: { type: companySchema },
    address: { type: addressSchema },
})
   
module.exports = mongoose.model("User", register)