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

const advertise = mongoose.Schema({
    category: {type:String, require},
    referenceNo: { type: String, require},
    tenderName: { type: String, require },
    lots:{type:String, require},
    enquiryAddress: { type: String, require },
    firmsProvidingConsultancy: { type: String, require },
    tenderDescription: { type: String, require },
    JVmax: { type: String, require },
    openingDate: { type: String, require },
    closingDate: { type: String, require },
    userId: { type: String },
    address: {type: addressSchema},
    company: {type: companySchema}
})
module.exports = mongoose.model("Add", advertise)