const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type: String, required: true},
    gender: {type: String, default: ""},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    rating: {type: Number, default: 5.0},
    instagram: {type: String, required: false},
    about: {type: String, default: ""},
})

module.exports = mongoose.model("user", UserSchema)