const dbcontroller = require("../dbcontroller")
const mongoose = require("mongoose")
const { get_trip, location_to_id, stops_to_id } = require("../utils/utils")

async function get(req,res) {
    try {
        const { id } = req.params
        const trip = await get_trip(id)
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
        let info = req.body
        info.start =  mongoose.Types.ObjectId(info.start)
        info.stops = info.stops.map(e=> {
            return mongoose.Types.ObjectId(e)
        })
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
        if (info.start) {
            location_to_id(info.start)
        }
        if (info.stops) {
            stops_to_id(info.stops)
        }
        const _id = req.params.id
        const Trips = await dbcontroller.getModel("trip")
        const trip = await Trips.findOneAndUpdate({_id},info, {new:true, runValidators:true})
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
        const trip = await Trips.deleteOne({_id}, {runValidators: true})
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