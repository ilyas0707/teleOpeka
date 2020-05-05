const {Schema, model, Types} = require("mongoose")

const schema = new Schema({
    pulse: {type: String, required: true},
    temp: {type: String, required: true},
    pressure: {type: String, required: true},
    sugar: {type: String, required: true},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: "User"}
})

module.exports = model("Stats", schema)