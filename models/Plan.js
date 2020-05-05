const {Schema, model, Types} = require("mongoose")

const schema = new Schema({
    problem: {type: String, required: true},
    solution: {type: String, required: true},
    actions: {type: String, required: true},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: "User"}
})

module.exports = model("Plan", schema)