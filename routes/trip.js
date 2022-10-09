const express = require('express');
const router = express.Router();
const controller = require("../controllers/trip")

//ENDPOINTS

router.get("/get/:id", controller.get)

router.post("/create", controller.create)

router.post("/update/:id", controller.update)

router.post("/delete/:id", controller.delete)

module.exports = router;