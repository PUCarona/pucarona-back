const dbcontroller = require("../dbcontroller")
const { get_user } = require("../utils/utils")

async function get(req, res) { // Controller responsável por requests /user/get
    try {
        const { email } = req.body // Recebe atributo email do body do request
        const user = await get_user(email) // Chama a função get_user do arquivo utils.js
        if (user) {
            res.status(200)
            res.send({message: "Sucesso!", content:user}) // Envia user com status de 200 caso seja encontrado um user com o mesmo email
        } else { 
            res.status(400)
            res.send({message: "Não foi possível achar o usuário."}) // Erro
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message:e}) // Erro
    }
    
}

async function create(req, res) {
    try {
        const info = req.body // Recebe corpo do request
        const Users = await dbcontroller.getModel("user") // Recebe model "user"
        const new_user = await Users.create(info) // Cria nova instância de user
        if (new_user) {
            console.log(new_user)
            res.status(200)
            res.send({message: "Sucesso!", content: new_user}) // Retorna novo usuário com status de 200
        } else {
            res.status(400)
            res.send({message: "Não foi possível criar o usuário"}) // Erro
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e}) // Erro
    }
}

async function update(req, res) {
    try {
        const info = req.body // Recebe corpo do request
        const { email } = req.body // Recebe atributo email do body do request
        const Users = await dbcontroller.getModel("user") // Recebe model "user"
        const up_user = await Users.findOneAndUpdate({email},info, {new: true, runValidators: true}) // Modifica instância de user que tenha o mesmo email do passado
        if (up_user) {
            res.status(200)
            res.send({message: "Sucesso!", content: up_user}) // Retorna user modificado com status de 200
        } else {
            res.status(400)
            res.send({message: "Não foi possível achar o usuário"}) // Erro
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e}) // Erro
    }
}

async function del(req, res) {
    try {
        const { email } = req.body // Recebe atributo email do body do request
        const Users = await dbcontroller.getModel("user") // Recebe modelo "user"
        const del_user = await Users.deleteOne({email}, {runValidators: true}) // Deleta instância de user que tenha o mesmo email do passado
        if (del_user.deletedCount >0) {
            console.log(del_user)
            res.status(200)
            res.send({message: "Sucesso!", content: del_user}) // Retorna informações da query com status de 200 caso user tenha sido deletado
        } else {
            console.log(del_user)
            res.status(400)
            res.send({message: "Não foi possível deletar o usuário"}) // Erro
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message: e}) // Erro
    }

}

async function userRating(req, re) {
    try {
        const { email } = req.body // Recebe atributo email do body do request
        const user = await get_user(email)
        if (user) {
            res.status(200)
            res.send({message: "Sucesso", content: user})
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

module.exports = {
    get,
    create,
    update,
    del,
    userRating
}