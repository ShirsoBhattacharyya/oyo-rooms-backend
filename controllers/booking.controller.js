const bookingService = require("../services/booking.service");
const { confirmationEmail } = require("../utils/email.util");

const getBookingById = async (req, res) => {
  try {
    let { message, data } = await bookingService.getBookingById(req.params.id);
    res.json({ message, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    let { message, data } = await bookingService.createBooking(req.body);
    if (data) {
      console.log(data);
      await confirmationEmail(data, res);
    }
    res.json({ message, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBookingById, createBooking };
