const router = require("express").Router()
const controller = require("./booking.controller")

router.post("/", controller.create)
router.get("/", controller.getAll)
router.get("/:id", controller.getOne)
router.put("/:id", controller.update)
router.delete("/:id", controller.remove)

module.exports = router