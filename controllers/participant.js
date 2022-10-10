const dbcontroller = require("../dbcontroller")
const { get_user } = require("../utils/utils")

async function get(req, res) {
    try {
        const email = req.body.email
        const id = req.body.id
        const user = await get_user(email)
        const Participants = await dbcontroller.getModel("participant")
        const participant = await Participants.findOne({user: user.id, trip: new ObjectId(id)})
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
        const email = req.body.email
        const id = req.body.id
        const user = await get_user(email)
        const is_driver = req.body.driver || false
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
        const email = req.body.email
        const trip = req.body.id
        const info = req.body.info
        const user = await get_user(email)
        const Participants = await dbcontroller.getModel("participant")
        const participant = await Participants.updateOne({user, trip}, info)
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
        const email = req.body.email
        const trip = req.body.trip
        const Participants = await dbcontroller.getModel("participant")
        const user = await get_user(email)
        const participant = await Participants.deleteOne({user:user._id, trip})
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