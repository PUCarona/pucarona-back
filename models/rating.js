const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RatingSchema = new Schema({
    author: {type: Schema.ObjectId, ref: "user", required: true},
    target: {type: Schema.ObjectId, ref: "user", required: true},
    rating: {type: Number, default: 5},
    trip: {type: Schema.ObjectId, ref: "trip", required: true}
})

module.exports = mongoose.model("rating", RatingSchema)