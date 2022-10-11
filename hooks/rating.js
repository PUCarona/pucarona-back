const mongoose = require('mongoose');

async function create() {
    const Users = await mongoose.model("user")
    await Users.updateOne({_id: this.target}, { $inc : {
        total_rating: this.rating,
        num_rating: 1,
    }})
}

module.exports = {
    create
}