const dbcontroller = require("../dbcontroller")

async function get_by_name(req, res) {
    try {
        const label = req.query.label
        const Locations = await dbcontroller.getModel("location")
        const locate = await Locations.findOne({label})
        if (locate) {
            res.status(200)
            res.send({message: "Sucesso!", content: locate})
        } else {
            res.status(400)
            res.send({message: "Não foi possível achar o endereço"})
        }
    } catch (e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

module.exports = {
    get_by_name,

}