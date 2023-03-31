const mongoose = require("mongoose")

const application = new mongoose.Schema({
    tendererName: { type: String },
    postal: { type: String },
    code: { type: String },
    physical: { type: String },
    phone: {type: String},
    email: { type: String },
    registration:{ type: String },
    licence:{ type: String },
    dateOfSubmission: { type: String },
    tenderName: { type: String },
    to: { type: String },
    age: { type: String },
    nationality: { type: String },
    countryOfOrigin: { type: String },
    citizenship:{type: String}
})
module.exports=mongoose.model("apply", application)
