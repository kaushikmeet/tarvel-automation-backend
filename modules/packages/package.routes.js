const router = require("express").Router()

const controller = require("./package.controller")

const auth = require("../../core/middleware/auth.middleware")
const role = require("../../core/middleware/role.middleware");
const upload = require("../../core/middleware/upload.middleware");

// public routes
router.get("/recommended", controller.getRecommended);
router.get("/:idOrSlug", controller.getOne);

router.post(
    "/",
    upload.array("images", 10), 
    auth, 
    role("admin"), 
    controller.createPackage
)

router.get("/", controller.getAllPackages)

router.get("/search", controller.searchPackages)

router.get("/:id", controller.getPackageById)

router.put(
    "/:id",
    upload.array("images", 10), 
    auth, 
    role("admin"), 
    controller.updatePackage
);

router.delete("/:id", auth, role("admin"), controller.deletePackage)


module.exports = router