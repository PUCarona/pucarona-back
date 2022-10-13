const mongoose = require("mongoose")
const Schema = mongoose.Schema

function stopLimit(arr) {
    return arr.length <= 4 && arr.length >= 1;
}

const TripSchema = new Schema({
    start: {type: Schema.ObjectId, ref: "location", required: true},
    stops: {type: [{type: Schema.ObjectId, ref: "location"}], validate: [stopLimit, "Invalid number of stops"], require: true},
    sharred_price: {type: Boolean, default: false},
    price: {type: Number, required: false},
    finished: {type: Boolean, default: false},
},
{timestamps: {
    createdAt: "start_time",
    updatedAt: "end_time",
}}
)


module.exports = mongoose.model("trip",TripSchema)