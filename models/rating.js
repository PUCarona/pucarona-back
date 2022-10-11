const mongoose = require("mongoose")
const Schema = mongoose.Schema
const hooks = require("../hooks/rating")

const RatingSchema = new Schema({
    author: {type: Schema.ObjectId, ref: "user", required: true},
    target: {type: Schema.ObjectId, ref: "user", required: true},
    rating: {type: Number, default: 5},
    trip: {type: Schema.ObjectId, ref: "trip", required: true}
})

RatingSchema.pre("save", hooks.create)

module.exports = mongoose.model("rating", RatingSchema)