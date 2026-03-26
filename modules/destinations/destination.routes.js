const router = require("express").Router()

const controller = require("./destination.controller")

const auth = require("../../core/middleware/auth.middleware")
const role = require("../../core/middleware/role.middleware");
const upload = require("../../core/middleware/upload.middleware");

router.get("/popular", controller.getPopular);
router.get("/all", controller.getAllDestinations);
router.get("/", controller.getDestinations);
router.get("/search", controller.searchDestinations);
router.get("/:id", controller.getDestinationById);
router.get("/detail/:slug", controller.getDestinationBySlug);


router.post("/", upload.array("images", 10), auth, role("admin"),  controller.createDestination);
router.put("/:id", auth, role("admin"), controller.updateDestination)
router.delete("/:id", auth, role("admin"), controller.deleteDestination)


module.exports = router