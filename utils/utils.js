const dbcontroller = require("../dbcontroller")
const mongoose = require("mongoose")

async function get_user(email) {
    const Users = await dbcontroller.getModel("user")
    const user = await Users.findOne({email}, {runValidators: true})
    return user
}

async function get_trip(id) {
    const Trips = await dbcontroller.getModel("trip")
    const trip = await Trips.findById(id)
    return trip
}

async function get_participant(user,trip) {
    const Participants = await dbcontroller.getModel("participant")
    const participant = await Participants.findOne({user, trip}, {runValidators: true})
    return participant
}

async function insert_location(lctList) {
    const Locations = await dbcontroller.getModel("location")
    const create_loc = lctList.map(location => {
        return {
            label: location.name,
            confidence: location.confidence,
            coordinates: {
                lagitude: location.latitude,
                longitude: location.longitude,
            },
        }
    })
    const toReturn = await Locations.insertMany(create_loc, {runValidators: true})
    return toReturn
}

function location_to_id(lct) {
    lct = mongoose.Types.ObjectId(lct)
}

function stops_to_id(stps) {
    stps = stps.map(e => {
        return mongoose.Types.ObjectId(e)
    })
}

module.exports = {
    get_user,
    get_trip,
    get_participant,
    insert_location,
    location_to_id,
    stops_to_id,
}