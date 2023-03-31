const mongoose = require("mongoose")

const singleItem = new mongoose.Schema({
    category: {type:String, require},
    referenceNo: { type: String, require},
    tenderName: { type: String, require },
    lots:{type:String, require},
    enquiryAddress: { type: String, require },
    firmsProvidingConsultancy: { type: String, require },
    tenderDescription: { type: String, require },
    JVmax: { type: String, require },
    openingDate: { type: String, require },
    closingDate: { type: String, require }
})
module.exports=mongoose.model("One", singleItem)