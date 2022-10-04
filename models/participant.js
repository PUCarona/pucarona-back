const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ParticipantSchema = new Schema({
    user: {type: Schema.ObjectId, ref: "user", required: true},
    is_driver: {type: Boolean, default: false},
    trip: {type: Schema.ObjectId, ref: "trip", required: true},
    rating: {type: [{type: Number}], default: []},
    
})

// VIRTUAL PROPERTY(esse atributo não fica salvo no banco de dados, ele só existe dentro do código)

ParticipantSchema.virtual("avg_rating").get(function () {
    if (this.rating == []) return 5.0
    let sum = 0
    for (let i=0;i<this.rating.length;i++) {
        sum += this.rating[i]
    }
    return sum/this.rating.length
})

module.exports = mongoose.model("participant", ParticipantSchema)