const express = require("express")
const router = express.Router()
const controller = require("../controller/participant")

//ENDPOINTS

router.get("/get", controller.get)

router.post("/create", controller.create)

router.post("/update", controller.update)

router.post("/delete", controller.delete)

module.exports = router