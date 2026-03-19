const router = require("express").Router()

router.use("/auth", require("../modules/auth/auth.routes"))
router.use("/users", require("../modules/users/user.routes"))
router.use("/destinations", require("../modules/destinations/destination.routes"))
router.use("/packages", require("../modules/packages/package.routes"))
router.use("/bookings", require("../modules/bookings/booking.routes"))
router.use("/payments", require("../modules/payments/payment.routes"))
router.use("/reviews", require("../modules/reviews/review.routes"))
router.use("/analytics", require("../modules/analytics/analytics.routes"))
router.use("/itinerary", require("../modules/itinerary/itinerary.routes"))
module.exports = router