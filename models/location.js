const mongoose = require("mongoose")
const Schema = mongoose.Schema

const LocationSchema = new Schema({
    label: {type: String, required: false},
    coordinates: {
        lagitude: {type: Number, required: true},
        longitude: {type: Number, required: true}
    }
})

module.exports = mongoose.model("location", LocationSchema)