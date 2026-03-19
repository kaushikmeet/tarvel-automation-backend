const express = require("express");
const router = express.Router();

const itineraryController = require("./itinerary.controller");
const auth = require("../../core/middleware/auth.middleware");
const role = require("../../core/middleware/role.middleware");

// --- 1. STATIC PUBLIC ROUTES (High Priority) ---
// Always put these first to avoid "Cast to ObjectId" errors
router.get("/recent", itineraryController.getRecent); 

// --- 2. PARAMETERIZED PUBLIC ROUTES ---
router.get("/package/:packageId", itineraryController.getByPackage);
router.get("/:id", itineraryController.getOne);
router.get("/", itineraryController.getAll);

// --- 3. PROTECTED ROUTES (Admin / Agent / User) ---

// Create Itinerary
router.post(
    "/", 
    auth, 
    role("admin", "agent", "user"), 
    itineraryController.create
);

// Clone Itinerary
router.post(
    "/:id/clone", 
    auth, 
    role("admin", "agent", "user"), 
    itineraryController.clone
);

// Update Specific Day
router.patch(
    "/:id/day/:day", 
    auth, 
    role("admin", "agent", "user"), 
    itineraryController.updateDay
);

// General Update
router.put(
    "/:id", 
    auth, 
    role("admin", "agent", "user"), 
    itineraryController.update
);

// Delete (Admin Only)
router.delete(
    "/:id", 
    auth, 
    role("admin"), 
    itineraryController.remove
);

module.exports = router;