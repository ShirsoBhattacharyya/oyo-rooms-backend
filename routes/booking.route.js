const express = require("express");
const bookingController = require("../controllers/booking.controller");
const path = require("path");

const router = express.Router();

router.post("/new", bookingController.createBooking);
router.get("/:id", bookingController.getBookingById);
router.post("/", bookingController.getBookingByFilter);

module.exports = router;