const dbcontroller = require("../dbcontroller")

async function get_user(email) {
    const Users = await dbcontroller.getModel("user")
    const user = await Users.findOne({email})
    return user
}

module.exports = {
    get_user,
}