const router = require("express").Router()

const controller = require("./destination.controller")

const auth = require("../../core/middleware/auth.middleware")
const role = require("../../core/middleware/role.middleware")

router.get("/popular", controller.getPopular);
router.get("/:id", controller.getDestinationById);

router.post("/", auth, role("admin"), controller.createDestination)

router.get("/", controller.getDestinations)

router.get("/search", controller.searchDestinations)

router.put("/:id", auth, role("admin"), controller.updateDestination)

router.delete("/:id", auth, role("admin"), controller.deleteDestination)


module.exports = router