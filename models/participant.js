const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ParticipantSchema = new Schema({
    user: {type: Schema.ObjectId, ref: "user", required: true},
    is_driver: {type: Boolean, default: false},
    trip: {type: Schema.ObjectId, ref: "trip", required: true}, 
})

module.exports = mongoose.model("participant", ParticipantSchema)