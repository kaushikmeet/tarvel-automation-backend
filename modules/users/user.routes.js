const router = require("express").Router()

const controller = require("./user.controller")

const auth = require("../../core/middleware/auth.middleware")
const role = require("../../core/middleware/role.middleware")


router.post("/", auth, role("admin"), controller.register)

router.get("/", auth, role("admin"), controller.getUsers)

router.get("/:id", auth, controller.getUserById)

router.put("/:id", auth, controller.updateUser)

router.delete("/:id", auth, role("admin"), controller.deleteUser)


module.exports = router