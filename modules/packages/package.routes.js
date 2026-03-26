// --- package.routes.js ---
const router = require("express").Router();
const controller = require("./package.controller");
const auth = require("../../core/middleware/auth.middleware");
const role = require("../../core/middleware/role.middleware");
const upload = require("../../core/middleware/upload.middleware");

// 1. Static/Search Routes first
router.get("/recommended", controller.getRecommended);
router.get("/search", controller.searchPackages);
router.get("/", controller.getAllPackages);

router.get("/db/:id", controller.getPackageById); 

router.get("/:idOrSlug", controller.getOne);

// Admin Actions
router.post("/", upload.array("images", 10), auth, role("admin"), controller.createPackage);
router.put("/:id", upload.array("images", 10), auth, role("admin"), controller.updatePackage);
router.delete("/:id", auth, role("admin"), controller.deletePackage);

module.exports = router;