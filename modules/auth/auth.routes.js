const router = require("express").Router()
const controller = require("./auth.controller.js");

router.post("/register", controller.register)
router.post("/login", controller.login)

module.exports = router