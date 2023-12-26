const TemporaryBooking = require("../models/temporary-booking.model");

const getTemporaryBookingById = async (id) => {
  try {
    const response = await TemporaryBooking.findById(id);
    return { message: "Success", data: response };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const createTemporaryBooking = async (temporaryBookingObject) => {
  try {
    let newTemporaryBooking = await TemporaryBooking.create(
      temporaryBookingObject
    );
    return { message: "Success", data: newTemporaryBooking };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

module.exports = { getTemporaryBookingById, createTemporaryBooking };
