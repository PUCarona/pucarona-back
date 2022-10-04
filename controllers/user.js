const dbcontroller = require("../dbcontroller")
const { get_user } = require("../utils/utils")

async function get(req, res) {
    try {
        const email = req.body.email
        const user = await get_user(email)
        if (user) {
            res.status(200)
            res.send({message: "Sucesso!", content:user})
        } else {
            res.status(400)
            res.send({message: "Não foi possível achar o usuário."})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message:e})
    }
    
}

async function create(req, res) {
    try {
        const info = req.body
        const Users = await dbcontroller.getModel("user")
        const new_user = await Users.create(info)
        if (new_user) {
            console.log(new_user)
            res.status(200)
            res.send({message: "Sucesso!", content: new_user})
        } else {
            res.status(400)
            res.send({message: "Não foi possível criar o usuário"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function update(req, res) {
    try {
        const email = req.query.email
        const info = req.body
        const Users = await dbcontroller.getModel("user")
        const up_user = await Users.findOneAndUpdate({email},info, {new: true})
        if (up_user) {
            res.status(200)
            res.send({message: "Sucesso!", content: up_user})
        } else {
            res.status(400)
            res.send({message: "Não foi possível achar o usuário"})
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function del(req, res) {
    try {
        const email = req.body.email
        const Users = await dbcontroller.getModel("user")
        const del_user = await Users.deleteOne({email})
        if (del_user.deleteCount >0) {
            console.log(del_user)
            res.status(200)
            res.send({message: "Sucesso!", content: del_user})
        } else {
            res.status(400)
            res.send({message: "Não foi possível deletar o usuário"})
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