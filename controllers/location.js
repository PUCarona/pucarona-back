const dbcontroller = require("../dbcontroller")
const geoapi = require("../geoapi")
const { insert_location } = require("../utils/utils")

async function get_by_name(req, res) {
    try {
        const label = req.query.label.toLowerCase()
        const Locations = await dbcontroller.getModel("location")
        const colation = {
            locale: "pt",
            strength: 1,
            alternate: "shifted",

        }
        const locate = await Locations.find({label}).collation(colation)
        
        if (locate.length > 0) {
            res.status(200)
            res.send({message: "Sucesso!", content: locate})
        } else {
            let locations_api = await geoapi.forward_coding(label)
            locations_api = locations_api.data
            locations_api = locations_api.filter(location => location.confidence >0.5)
            if (locations_api.length > 0) {
                const inserted = await insert_location(locations_api)
                console.log(inserted)
                if (inserted.length > 0) {
                    res.status(200)
                    res.send({message: "Sucesso!", content: inserted})
                } else {
                    res.status(400)
                    res.send({message: "Não foi possível criar localizações", content: inserted})
                }
            } else {
                res.status(201)
                res.send({message: "Nada", content: []})
            }
            
        }
    } catch (e) {
        console.log(e)
        res.status(404)
        res.send({message: e})
    }
}

async function get_by_cood(req, res) {
    try {
        const radiusSize = 10
        const cood = req.body.cood
        const Locations = await dbcontroller.getModel("location")
        const result = await Locations.find({"coordinates.latitude": {$gt: (cood.lagitude - radiusSize), $lt: (cood.latitude + radiusSize)}, "coordinates.longitude": {$gt: (cood.longitude - radiusSize), $lt: (cood.longitude + radiusSize)}})
        if (result.length > 0) {
            res.status(200)
            res.send({message: "Sucesso!", content: locate})
        } else {
            let locations_api = await geoapi.reverse_coding(cood)
            locations_api = locations_api.data
            locations_api = locations_api.filter(location => location.confidence >0.5)
            if (locations_api.length > 0) {
                const inserted = await insert_locations(locations_api)
                console.log(inserted)
                if (inserted.length > 0) {
                    res.status(200)
                    res.send({message: "Sucesso!", content: inserted})
                } else {
                    res.status(400)
                    res.send({message: "Não foi possível criar localizações", content: inserted})
                }
            } else {
                res.status(201)
                res.send({message: "Nada", content: []})
            }
        }
    } catch(e) {
        console.log(e)
        res.status(404)
        res.send({message})
    }
}

module.exports = {
    get_by_name,
    get_by_cood,
}