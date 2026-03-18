const router = require("express").Router()
const controller = require("./review.controller")

router.post("/", controller.create)
router.get("/package/:id", controller.getByPackage)
router.delete("/:id", controller.remove)

module.exports = router