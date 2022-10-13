const express = require("express")
const router = express.Router()
const controller = require("../controllers/location")

// ROTAS

//   FORWARD:
const forwardRouter = express.Router()
router.use("/forward", forwardRouter)
//   REVERSE:
const reverseRouter = express.Router()
router.use("/reverse", reverseRouter)

// ENDPOINTS

forwardRouter.get("/get", controller.get_by_name)

module.exports = router