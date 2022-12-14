const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type: String, required: true},
    gender: {type: String, default: ""},
    age: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    total_rating: {type: Number, default: 0.0},
    num_rating: {type: Number, default: 0},
    instagram: {type: String, required: false},
    about: {type: String, default: ""},

})

UserSchema.index({email:1}, {unique: true})

module.exports = mongoose.model("user", UserSchema)