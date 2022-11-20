const dbcontroller = require("../dbcontroller")
const { get_user, get_participant } = require("../utils/utils")
const mongoose = require("mongoose");

async function get(req, res) {
    try {
        const {email, id} = req.body
        const user = await get_user(email)
        const participant = get_participant(user.id, mongoose.Types.ObjectId(id))
        if (participant) {
            res.status(200)
            res.send({message: "Sucesso!", content: participant})
        } else {
            res.status(400)
            res.send({message: "Não foi possível achar o participante"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function create(req, res) {
    try{
        const {email, id, is_driver = false} = req.body
        const user = await get_user(email)
        const Participants = await dbcontroller.getModel("participant")
        const participant = await Participants.create({user,trip:id,is_driver})
        if (participant) {
            res.status(200)
            res.send({message: "Sucesso!", content: participant})
        } else {
            res.status(400)
            res.send({message: "Não foi possível criar o participante"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function update(req, res) {
    try {
        const {email, id: trip, info} = req.body
        const user = await get_user(email)
        const Participants = await dbcontroller.getModel("participant")
        const participant = await Participants.findOneAndUpdate({user, trip}, info, {new: true}, {runValidators: true})
        if (participant) {
            res.status(200)
            res.send({message: "Sucesso!", content: participant})
        } else {
            res.status(400)
            res.send({message: "Não foi possível achar o participante"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)

    }
}

async function del(req, res) {
    try {
        const {email, id} = req.body
        const Participants = await dbcontroller.getModel("participant")
        const user = await get_user(email)
        const participant = await Participants.deleteOne({user:user._id, trip: id}, {runValidators: true})
        if (participant.deletedCount>0) {
            res.status(200)
            res.send({message: "Sucesso!", content: participant})
        } else {
            console.log(participant)
            res.status(400)
            res.send({message: "Não foi possível deletar o participante"})
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