const {Schema, model, Types} = require("mongoose")

const schema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    middlename: {type: String, required: true},
    age: {type: String, required: true},
    height: {type: String, required: true},
    weight: {type: String, required: true},
    bloodType: {type: String, required: true},
    owner: {type: Types.ObjectId, ref: "User"}
})

module.exports = model("Account", schema)