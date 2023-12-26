const express = require("express");
const hotelController = require("../controllers/hotel.controller");

const router = express.Router();

router.post("/", hotelController.getHotelsByFilter);
router.get("/:id", hotelController.getHotelsById);
router.post("/new", hotelController.createHotel);

module.exports = router;