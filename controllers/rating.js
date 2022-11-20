const dbcontroller = require("../dbcontroller")
const { get_user } = require("../utils/utils")
const mongoose = require("mongoose");

async function get(req, res) {
    try {
        let {author, target, trip} = req.body
        author = await get_user(author)
        target = await get_user(target)
        author = author.id
        target = target.id
        trip = mongoose.Types.ObjectId(trip)
        const Ratings = await dbcontroller.getModel("rating")
        const rating = await Ratings.findOne({author, target, trip}, {runValidators: true})
        if (rating) {
            res.status(200)
            res.send({message: "Sucesso", content: rating})
        } else {
            res.status(400)
            res.send({message: "Não foi possível encontrar rating"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function create(req, res) {
    try {
        let {author, target, trip, rating} = req.body
        author = await get_user(author)
        target = await get_user(target)
        author = author.id
        target = target.id
        trip = mongoose.Types.ObjectId(trip)
        const Ratings = await dbcontroller.getModel("rating")
        const new_doc = await Ratings.create({author, target, trip, rating})
        if (new_doc) {
            res.status(200)
            res.send({message: "Sucesso", content: new_doc})
        } else {
            res.status(400)
            res.send({message: "Não foi possível criar rating"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function update(req, res) {
    try {
        let {author, target, trip, rating, info} = req.body
        author = await get_user(author)
        target = await get_user(target)
        author = author.id
        target = target.id
        trip = mongoose.Types.ObjectId(trip)
        const Ratings = await dbcontroller.getModel("rating")
        const new_doc = await Ratings.findOneAndUpdate({author, target, trip, rating},info, {runValidators: true})
        if (new_doc) {
            res.status(200)
            res.send({message: "Sucesso", content: new_doc})
        } else {
            res.status(400)
            res.send({message: "Não foi possível editar rating"})
        }	
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function del(req, res) {
    try {
        let {author, target, trip} = req.body
        author = await get_user(author)
        target = await get_user(target)
        author = author.id
        target = target.id
        trip = mongoose.Types.ObjectId(trip)
        const Ratings = await dbcontroller.getModel("rating")
        const doc = await Ratings.deleteOne({author, target, trip}, {runValidators: true})
        if (doc.deletedCount >0) {
            res.status(200)
            res.send({message: "Sucesso", content: doc})
        } else {
            res.status(400)
            res.send({message: "Não foi possível excluir rating"})
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
    del
}