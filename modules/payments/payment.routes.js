const router = require("express").Router()
const controller = require("./payment.controller")

router.post("/", controller.create)
router.get("/", controller.getAll)
router.put("/verify/:id", controller.verify)

module.exports = router