const express = require("express")
const router = express.Router()
const controller = require("../controllers/user")

//ENDPOINTS

router.get("/get", controller.get)

router.post("/create", controller.create)

router.post("/update", controller.update)

router.post("/delete", controller.del)

router.get("/rating", controller.userRating)

module.exports = router