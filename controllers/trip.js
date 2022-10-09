const dbcontroller = require("../dbcontroller")

async function get(req,res) {
    try {
        const id = req.params.id
        const Trips = await dbcontroller.getModel("trip")
        const trip = await Trips.findById(id)
        if (trip) {
            res.status(200)
            res.send({message: "Sucesso!", content: trip})
        } else {
            res.status(400)
            res.send({message: "Não foi possível achar a viagem!"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function create(req, res) {
    try {
        const info = req.body
        const Trips = await dbcontroller.getModel("trip")
        const trip = await Trips.create(info)
        if (trip) {
            res.status(200)
            res.send({message: "Sucesso!", content: trip})
        } else {
            res.status(400)
            res.send({message: "Não foi possível criar a viagem"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function update(req, res) {
    try {
        const info = req.body
        const _id = req.params.id
        const Trips = await dbcontroller.getModel("trip")
        const trip = await Trips.updateOne({_id},info)
        if (trip) {
            res.status(200)
            res.send({message: "Sucesso!", content: trip})
        } else {
            res.status(400)
            res.send({message: "Não foi possível achar a viagem"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function del(req, res) {
    try {
        const _id = req.params.id
        const Trips = await dbcontroller.getModel("trip")
        const trip = await Trips.deleteOne({_id})
        if (trip.deletedCount > 0) {
            res.status(200)
            res.send({message: "Sucesso!", content: trip})
        } else {
            res.status(400)
            res.send({message: "Não foi possível deletar a viagem"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

module.exports = {
    get,
    create,
    update,
    del,
}