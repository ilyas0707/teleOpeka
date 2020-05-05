const {Schema, model, Types} = require("mongoose")

const schema = new Schema({
    name: {type: String, required: true},
    dateFrom: {type: String, required: true},
    dateTo: {type: String, required: true},
    timeFrom: {type: String, required: true},
    timeTo: {type: String, required: true},
    owner: {type: Types.ObjectId, ref: "User"}
})

module.exports = model("Notes", schema)