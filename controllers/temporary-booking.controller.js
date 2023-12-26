const temporaryBookingService = require("../services/temporary-booking.service");

const getTemporaryBookingById = async (req, res) => {
  try {
    let { message, data } =
      await temporaryBookingService.getTemporaryBookingById(req.params.id);
    res.json({ message, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTemporaryBooking = async (req, res) => {
  try {
    let { message, data } =
      await temporaryBookingService.createTemporaryBooking(req.body);
    res.json({ message, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTemporaryBookingById, createTemporaryBooking };
