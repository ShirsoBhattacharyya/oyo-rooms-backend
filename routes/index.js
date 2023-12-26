const express = require("express");
const authRoutes = require("./auth.route");
const hotelRoutes = require("./hotel.route");
const bookingRoutes = require("./booking.route");
const temporaryBookingRoutes = require("./temporary-booking.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/hotels", hotelRoutes);
router.use("/bookings", bookingRoutes);
router.use("/temporary-bookings", temporaryBookingRoutes);

module.exports = router;
