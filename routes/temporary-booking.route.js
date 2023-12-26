const express = require("express");
const temporaryBookingController = require("../controllers/temporary-booking.controller");

const router = express.Router();

router.post("/new", temporaryBookingController.createTemporaryBooking);
router.get("/:id", temporaryBookingController.getTemporaryBookingById);

module.exports = router;