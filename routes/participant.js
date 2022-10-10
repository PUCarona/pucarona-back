const express = require("express")
const router = express.Router()
const controller = require("../controllers/participant")

//ENDPOINTS

router.get("/get", controller.get)

router.post("/create", controller.create)

router.post("/update", controller.update)

router.post("/delete", controller.del)

module.exports = router