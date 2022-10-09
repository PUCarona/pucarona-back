const dbcontroller = require("../dbcontroller")

async function get_user(email) {
    const Users = await dbcontroller.getModel("user")
    const user = await Users.findOne({email})
    return user
}

async function get_trip(id) {
    const Trips = await dbcontroller.getModel("trip")
    const trip = await Trips.findById(id)
    return trip
}

module.exports = {
    get_user,
    get_trip,
}